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
    if ($description === '' || mb_strlen($description) > 500) {
      throw new \BgaUserException(clienttranslate('Invalid description'));
    }

    $player = $players[$playerId];
    $opponent = $players[$opponentId];

    $dealAssets = [];
    foreach ([$player, $opponent] as $owner) {
      $dealAssets[$owner->getFamilyId()] = $this->validateDealAssets($owner, $assets[$owner->getId()] ?? []);
    }

    $deal = Deals::newDeal($opponent->getFamilyId(), $player->getFamilyId(), $description, $dealAssets);

    Notifications::newDeal($player, $deal);
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
