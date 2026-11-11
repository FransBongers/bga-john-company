<?php

namespace Bga\Games\JohnCompany;

use Bga\GameFramework\Actions\CheckAction;
use Bga\GameFramework\Actions\Types\JsonParam;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Managers\Deals;
use Bga\Games\JohnCompany\Managers\Enterprises;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\LondonSeasonCards;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\PromiseCards;
use Bga\Games\JohnCompany\Models\Player;

trait DealsTrait
{
  /**
   * @param array $assets playerId => ['cash' => int, 'share' => string[], 'enterprise' => string[],
   *                                     'promiseCard' => string[], 'prestige' => string[], 'blackmail' => string[]]
   */
  #[CheckAction(false)]
  public function actNewOffer(string $description, int $opponentId, #[JsonParam(associative: true)] array $assets)
  {
    $playerId = (int) $this->getCurrentPlayerId();
    $players = Players::getAll();

    if ($opponentId === $playerId || !isset($players[$opponentId]) || !isset($players[$playerId])) {
      throw new \BgaUserException(clienttranslate('Invalid player for this offer'));
    }

    $description = trim($description);
    if (mb_strlen($description) > 500) {
      throw new \BgaUserException(clienttranslate('Invalid description'));
    }

    $player = $players[$playerId];
    $opponent = $players[$opponentId];

    $dealAssets = [];
    foreach ([$player, $opponent] as $owner) {
      $dealAssets[$owner->getFamilyId()] = $this->validateDealAssets($owner, $assets[$owner->getId()] ?? []);
    }

    if ($description === '' && !$this->dealHasAssets($dealAssets)) {
      throw new \BgaUserException(clienttranslate('A deal without a description must include at least one asset'));
    }

    $description = $this->escapeStringForDB($description);
    $deal = Deals::newDeal($opponent->getFamilyId(), $player->getFamilyId(), $description, $dealAssets);

    Notifications::newDeal($player, $deal);
  }

  #[CheckAction(false)]
  public function actAcceptOffer(string $dealId)
  {
    $player = Players::get((int) $this->getCurrentPlayerId());
    $deal = $this->getOpenDeal($dealId);

    if ($player === null || $deal->getFamilyId() !== $player->getFamilyId()) {
      throw new \BgaUserException(clienttranslate('Only the player receiving the offer can accept it'));
    }

    $offerer = Players::getPlayerForFamily($deal->getOfferedByFamilyId());
    $assets = $deal->getAssets();

    $validated = [];
    foreach ([$player, $offerer] as $owner) {
      $validated[$owner->getFamilyId()] = $this->validateDealAssets($owner, $assets[$owner->getFamilyId()] ?? []);
    }

    foreach ([[$offerer, $player], [$player, $offerer]] as [$from, $to]) {
      $shares = count($validated[$from->getFamilyId()]['share']);
      $supply = FamilyMembers::countInLocation(Locations::familyMemberSupply($to->getFamilyId()));
      if ($shares > $supply) {
        throw new \BgaUserException(clienttranslate('Not enough family members in supply to receive the shares'));
      }
    }

    $transferredAssets = [];
    foreach ([[$offerer, $player], [$player, $offerer]] as [$from, $to]) {
      $transferredAssets[$to->getId()] = $this->transferDealAssets($from, $to, $validated[$from->getFamilyId()]);
    }

    $deal->setStatus(
      trim($deal->getDescription()) === '' ? DEAL_STATUS_CLOSED : DEAL_STATUS_AGREEMENT
    );
    Notifications::dealUpdated($deal, $transferredAssets);
  }

  #[CheckAction(false)]
  public function actMarkAgreement(string $dealId, string $report)
  {
    $player = Players::get((int) $this->getCurrentPlayerId());
    $deal = Deals::get($dealId);
    if ($player === null || $deal->getStatus() !== DEAL_STATUS_AGREEMENT) {
      throw new \BgaUserException(clienttranslate('This agreement is no longer open'));
    }

    $familyId = $player->getFamilyId();
    $otherFamilyId = $deal->getFamilyId() === $familyId
      ? $deal->getOfferedByFamilyId()
      : $deal->getFamilyId();
    if (
      !in_array($familyId, [$deal->getFamilyId(), $deal->getOfferedByFamilyId()], true)
      || !in_array($report, [DEAL_REPORT_FULFILLED, DEAL_REPORT_VIOLATED], true)
    ) {
      throw new \BgaUserException(clienttranslate('You cannot report on this agreement'));
    }

    $reports = $deal->getReports() ?? [];
    if (isset($reports[$familyId])) {
      throw new \BgaUserException(clienttranslate('You have already reported on this agreement'));
    }

    $reports[$familyId] = $report;
    $deal->setReports($reports);
    if (isset($reports[$otherFamilyId])) {
      $deal->setStatus(DEAL_STATUS_CLOSED);
    }

    Notifications::dealUpdated($deal);
  }

  #[CheckAction(false)]
  public function actRejectOffer(string $dealId)
  {
    $player = Players::get((int) $this->getCurrentPlayerId());
    $deal = $this->getOpenDeal($dealId);

    $isOfferer = $player !== null && $deal->getOfferedByFamilyId() === $player->getFamilyId();
    $isTarget = $player !== null && $deal->getFamilyId() === $player->getFamilyId();
    if (!$isOfferer && !$isTarget) {
      throw new \BgaUserException(clienttranslate('You are not part of this offer'));
    }

    $deal->setStatus(DEAL_STATUS_REJECTED);
    Notifications::dealUpdated($deal);
  }

  private function getOpenDeal(string $dealId)
  {
    $deal = Deals::get($dealId);
    if ($deal->getStatus() !== DEAL_STATUS_OFFER) {
      throw new \Bga\GameFramework\VisibleSystemException("DEALS_001");
    }
    return $deal;
  }

  private function transferDealAssets(Player $from, Player $to, array $assets): array
  {
    $toFamilyId = $to->getFamilyId();

    $assetsNotif = [
      'counters' => [],
      'shares' => [],
      'enterprises' => [],
      'promiseCards' => [],
      'prestigeCards' => [],
    ];

    if ($assets['cash'] > 0) {
      $source = clienttranslate('Deal');
      $from->getFamily()->gainCash(-$assets['cash'], $source, true);
      $assetsNotif['counters'][$from->getId()] = [
        CASH_COUNTER => -$assets['cash']
      ];
      $to->getFamily()->gainCash($assets['cash'], $source, true);
      $assetsNotif['counters'][$to->getId()] = [
        CASH_COUNTER => $assets['cash']
      ];
    }

    foreach ($assets['share'] as $id) {
      $newShare = FamilyMembers::getMemberFor($toFamilyId);
      $newShare->moveTo($to, COURT_OF_DIRECTORS, [
        'skipNotification' => true,
      ]);
      $returnedShare = FamilyMembers::get($id);
      $returnedShare->returnToSupply(true);
      $assetsNotif['shares'][] = [
        'returned' => $returnedShare,
        'new' => $newShare,
      ];
    }

    foreach ($assets['enterprise'] as $id) {
      $enterprise = Enterprises::get($id);
      $enterprise->changeOwner($toFamilyId);
      $assetsNotif['enterprises'][] = $enterprise;
    }

    foreach ($assets['promiseCard'] as $id) {
      $card = PromiseCards::get($id);
      $card->setLocation(Locations::promiseCards($toFamilyId));
      $assetsNotif['promiseCards'][] = $card;
    }

    foreach ($assets['prestige'] as $id) {
      $card = LondonSeasonCards::get($id);
      $card->setLocation(Locations::londonSeasonCards($toFamilyId));
      $assetsNotif['prestigeCards'][] = $card;
    }
    return $assetsNotif;
  }

  private function dealHasAssets(array $dealAssets): bool
  {
    foreach ($dealAssets as $assets) {
      if (($assets['cash'] ?? 0) > 0) {
        return true;
      }
      foreach (['share', 'enterprise', 'promiseCard', 'prestige', 'blackmail'] as $type) {
        if (!empty($assets[$type])) {
          return true;
        }
      }
    }
    return false;
  }

  private function validateDealAssets($owner, $given): array
  {
    $family = $owner->getFamily();
    $familyId = $family->getId();
    $ownerId = $owner->getId();
    $invalid = fn() => new \BgaUserException(clienttranslate('Offer contains assets that are not owned by the player'));

    $cash = (int) ($given['cash'] ?? 0);
    if ($cash < 0 || $cash > $family->getTreasury()) {
      throw $invalid();
    }

    $result = ['cash' => $cash];

    $checks = [
      'share' => fn($id) => FamilyMembers::get($id)->getLocation() === COURT_OF_DIRECTORS
        && FamilyMembers::get($id)->getPlayerId() === $ownerId,
      'enterprise' => fn($id) => Enterprises::get($id)->getLocation() === $familyId,
      'promiseCard' => fn($id) => PromiseCards::get($id)->getLocation() === Locations::promiseCards($familyId),
      'prestige' => function ($id) use ($familyId) {
        $card = LondonSeasonCards::get($id);
        return $card->getLocation() === Locations::londonSeasonCards($familyId)
          && $card->getType() === PRESTIGE
          && $card->getSubtype() !== SPOUSE;
      },
      'blackmail' => function ($id) use ($familyId) {
        $card = LondonSeasonCards::get($id);
        return $card->getLocation() === Locations::londonSeasonCards($familyId) && $card->getType() === BLACKMAIL;
      },
    ];

    foreach ($checks as $type => $isOwned) {
      $ids = $given[$type] ?? [];
      if (!is_array($ids) || count($ids) !== count(array_unique($ids))) {
        throw $invalid();
      }
      foreach ($ids as $id) {
        if (!is_string($id) || !$isOwned($id)) {
          throw $invalid();
        }
      }
      $result[$type] = array_values($ids);
    }

    return $result;
  }
}
