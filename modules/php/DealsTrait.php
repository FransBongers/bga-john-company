<?php

namespace Bga\Games\JohnCompany;

use Bga\GameFramework\Actions\CheckAction;
use Bga\GameFramework\Actions\Types\JsonParam;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Managers\Attention;
use Bga\Games\JohnCompany\Managers\AtomicActions;
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
  public function actNewOffer(string $description, int $opponentId, #[JsonParam(associative: true)] array $assets, bool $wait = false)
  {
    $playerId = (int) $this->getCurrentPlayerId();
    $players = Players::getAll();

    if ($opponentId === $playerId || !isset($players[$opponentId]) || !isset($players[$playerId])) {
      throw new \BgaUserException(clienttranslate('Invalid player for this offer'));
    }

    $node = Engine::getNextUnresolved();
    $info = $node?->getInfo() ?? [];
    if ($wait && (!$node || !in_array($playerId, $info['activePlayerIds'] ?? []) || in_array($playerId, $info['completedPlayerIds'] ?? []))) {
      throw new \BgaUserException(clienttranslate('You cannot wait for an offer after completing your action'));
    }

    $description = trim($description);
    if (mb_strlen($description) > 500) {
      throw new \BgaUserException(clienttranslate('Invalid description'));
    }

    $player = $players[$playerId];
    $opponent = $players[$opponentId];

    $dealAssets = [];
    foreach ([$player, $opponent] as $owner) {
      $dealAssets[$owner->getId()] = $this->validateDealAssets($owner, $assets[$owner->getId()] ?? []);
    }

    if ($description === '' && !$this->dealHasAssets($dealAssets)) {
      throw new \BgaUserException(clienttranslate('A deal without a description must include at least one asset'));
    }

    $description = $this->escapeStringForDB($description);
    $deal = Deals::newDeal($opponent->getId(), $player->getId(), $description, $dealAssets);

    Notifications::newDeal($player, $deal);
    Attention::create($opponentId, 'new_offer', 'deal', (string) $deal->getId());

    if ($wait && $node->getAction() !== WAIT_FOR_OFFER) {
      $node->insertBefore(Engine::buildTree([
        'action' => WAIT_FOR_OFFER,
        'playerId' => 'some',
        'activePlayerIds' => [$opponentId],
      ]));
      Engine::save();
      Engine::proceed();
      $this->gamestate->setPlayerNonMultiactive($playerId, 'next');
      Notifications::playerActivityChanged($playerId);
      return;
    }

    if ($wait) {
      $node->updateInfo('activePlayerIds', array_values(array_unique(array_merge($info['activePlayerIds'], [$opponentId]))));
      $node->updateInfo('completedPlayerIds', array_values(array_diff($info['completedPlayerIds'] ?? [], [$opponentId])));
      Engine::save();
      Notifications::actionParticipantsChanged($node->getInfo());
    }
    $this->gamestate->setPlayersMultiactive([$opponentId], 'next', false);
    Notifications::playerActivityChanged($opponentId);
    if ($wait) {
      AtomicActions::get(WAIT_FOR_OFFER, $node)->setPlayerActionCompleted($playerId);
    }
  }

  #[CheckAction(false)]
  public function actMakeInactive()
  {
    $playerId = (int) $this->getCurrentPlayerId();
    $node = Engine::getNextUnresolved();
    $info = $node?->getInfo() ?? [];
    $isWaiting = $node && $node->getAction() === WAIT_FOR_OFFER;
    $isNodePlayer = in_array($playerId, $info['activePlayerIds'] ?? []);
    $completed = in_array($playerId, $info['completedPlayerIds'] ?? []);

    if (!in_array($playerId, $this->gamestate->getActivePlayerList()) || (!$isWaiting && $isNodePlayer && !$completed)) {
      throw new \BgaUserException(clienttranslate('You must complete your current action first'));
    }

    if ($isWaiting && $isNodePlayer) {
      $action = AtomicActions::get(WAIT_FOR_OFFER, $node);
      $action->setPlayerActionCompleted($playerId);
      $info = $node->getInfo();
      if (count(array_diff($info['activePlayerIds'], $info['completedPlayerIds'] ?? [])) === 0) {
        $action->resolveAction([], true);
      }
      return;
    }

    $this->gamestate->setPlayerNonMultiactive($playerId, 'next');
    Notifications::playerActivityChanged($playerId);
  }

  #[CheckAction(false)]
  public function actAcceptOffer(string $dealId)
  {
    $player = Players::get((int) $this->getCurrentPlayerId());
    $deal = $this->getOpenDeal($dealId);

    if ($player === null || $deal->getPlayerId() !== $player->getId()) {
      throw new \BgaUserException(clienttranslate('Only the player receiving the offer can accept it'));
    }

    $offerer = Players::get($deal->getOfferedByPlayerId());
    $assets = $deal->getAssets();

    $validated = [];
    foreach ([$player, $offerer] as $owner) {
      $validated[$owner->getId()] = $this->validateDealAssets($owner, $assets[$owner->getId()] ?? []);
    }

    foreach ([[$offerer, $player], [$player, $offerer]] as [$from, $to]) {
      $shares = count($validated[$from->getId()]['share']);
      $supply = FamilyMembers::countInLocation(Locations::familyMemberSupply($to->getId()));
      if ($shares > $supply) {
        throw new \BgaUserException(clienttranslate('Not enough family members in supply to receive the shares'));
      }
    }

    $transferredAssets = [];
    foreach ([[$offerer, $player], [$player, $offerer]] as [$from, $to]) {
      $transferredAssets[$to->getId()] = $this->transferDealAssets($from, $to, $validated[$from->getId()]);
    }

    $deal->setStatus(
      trim($deal->getDescription()) === '' ? DEAL_STATUS_CLOSED : DEAL_STATUS_AGREEMENT
    );
    Attention::removeItem('deal', (string) $deal->getId());
    Notifications::dealUpdated($deal, $transferredAssets);
  }

  #[CheckAction(false)]
  public function actMarkAgreement(string $dealId, string $report)
  {
    $playerId = (int) $this->getCurrentPlayerId();
    $player = Players::get($playerId);
    $deal = Deals::get($dealId);
    if ($player === null || $deal->getStatus() !== DEAL_STATUS_AGREEMENT) {
      throw new \BgaUserException(clienttranslate('This agreement is no longer open'));
    }

    $otherPlayerId = $deal->getPlayerId() === $playerId
      ? $deal->getOfferedByPlayerId()
      : $deal->getPlayerId();
    if (
      !in_array($playerId, [$deal->getPlayerId(), $deal->getOfferedByPlayerId()], true)
      || !in_array($report, [DEAL_REPORT_FULFILLED, DEAL_REPORT_VIOLATED], true)
    ) {
      throw new \BgaUserException(clienttranslate('You cannot report on this agreement'));
    }

    $reports = $deal->getReports() ?? [];
    if (isset($reports[$playerId])) {
      throw new \BgaUserException(clienttranslate('You have already reported on this agreement'));
    }

    $reports[$playerId] = $report;
    $deal->setReports($reports);
    if (isset($reports[$otherPlayerId])) {
      $deal->setStatus(DEAL_STATUS_CLOSED);
    }

    Notifications::dealUpdated($deal);
  }

  #[CheckAction(false)]
  public function actRejectOffer(string $dealId)
  {
    $player = Players::get((int) $this->getCurrentPlayerId());
    $deal = $this->getOpenDeal($dealId);

    $isOfferer = $player !== null && $deal->getOfferedByPlayerId() === $player->getId();
    $isTarget = $player !== null && $deal->getPlayerId() === $player->getId();
    if (!$isOfferer && !$isTarget) {
      throw new \BgaUserException(clienttranslate('You are not part of this offer'));
    }

    $deal->setStatus(DEAL_STATUS_REJECTED);
    Attention::removeItem('deal', (string) $deal->getId());
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
    $toPlayerId = $to->getId();

    $assetsNotif = [
      'counters' => [],
      'shares' => [],
      'enterprises' => [],
      'promiseCards' => [],
      'prestigeCards' => [],
    ];

    if ($assets['cash'] > 0) {
      $source = clienttranslate('Deal');
      $from->gainCash(-$assets['cash'], $source, true);
      $assetsNotif['counters'][$from->getId()] = [
        CASH_COUNTER => -$assets['cash']
      ];
      $to->gainCash($assets['cash'], $source, true);
      $assetsNotif['counters'][$to->getId()] = [
        CASH_COUNTER => $assets['cash']
      ];
    }

    foreach ($assets['share'] as $id) {
      $newShare = FamilyMembers::getMemberFor($toPlayerId);
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
      $enterprise->changeOwner($toPlayerId);
      $assetsNotif['enterprises'][] = $enterprise;
    }

    foreach ($assets['promiseCard'] as $id) {
      $card = PromiseCards::get($id);
      $card->setLocation(Locations::promiseCards($toPlayerId));
      $assetsNotif['promiseCards'][] = $card;
    }

    foreach ($assets['prestige'] as $id) {
      $card = LondonSeasonCards::get($id);
      $card->setLocation(Locations::londonSeasonCards($toPlayerId));
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

  private function validateDealAssets(Player $owner, $given): array
  {
    $playerExtraData = $owner->getPlayerExtra();
    $ownerId = $owner->getId();
    $invalid = fn() => new \BgaUserException(clienttranslate('Offer contains assets that are not owned by the player'));

    $cash = (int) ($given['cash'] ?? 0);
    if ($cash < 0 || $cash > $playerExtraData->getTreasury()) {
      throw $invalid();
    }

    $result = ['cash' => $cash];

    $checks = [
      'share' => fn($id) => FamilyMembers::get($id)->getLocation() === COURT_OF_DIRECTORS
        && FamilyMembers::get($id)->getPlayerId() == $ownerId,
      'enterprise' => fn($id) => Enterprises::get($id)->getLocation() == $ownerId,
      'promiseCard' => fn($id) => PromiseCards::get($id)->getLocation() == Locations::promiseCards($ownerId),
      'prestige' => function ($id) use ($ownerId) {
        $card = LondonSeasonCards::get($id);
        return $card->getLocation() === Locations::londonSeasonCards($ownerId)
          && $card->getType() === PRESTIGE
          && $card->getSubtype() !== SPOUSE;
      },
      'blackmail' => function ($id) use ($ownerId) {
        $card = LondonSeasonCards::get($id);
        return $card->getLocation() === Locations::londonSeasonCards($ownerId) && $card->getType() === BLACKMAIL;
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
