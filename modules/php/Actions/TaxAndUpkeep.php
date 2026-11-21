<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Models\Enterprise;
use Bga\Games\JohnCompany\Models\FamilyMember;
use Bga\Games\JohnCompany\Models\LondonSeasonCard;
use Bga\Games\JohnCompany\Models\Player;

class TaxAndUpkeep extends \Bga\Games\JohnCompany\Actions\TaxAndUpkeepBase
{
  public function getState()
  {
    return \ST_TAX_AND_UPKEEP;
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsTaxAndUpkeep()
  {
    $args = $this->ctx->getArgs();
    $type = $args['type'];
    $target = $args['target'] ?? null;
    $activePlayerIds = $this->getActivePlayerIds();

    $players = Players::getMany($activePlayerIds)->toArray();

    $taxDataPerPlayer = [];

    switch ($type) {
      case WINDOW_TAX:
        $taxDataPerPlayer = $this->getWindowCount($players);
        break;
      case UPKEEP:
        $taxDataPerPlayer = $this->getUpkeep($players);
        break;
      case TAX:
        $taxDataPerPlayer = $this->getTax($players, $target);
        break;
    }

    $private = [];

    foreach ($taxDataPerPlayer as $playerData) {
      $player = $playerData['player'];
      $private[$player->getId()] = [
        'amount' => $playerData['amount'],
        'targets' => $playerData['targets'],
        'treasury' => $player->getTreasury(),
      ];
    }

    $data = [
      'type' => $type,
      'target' => $target,
      '_private' => $private
    ];

    return $data;
  }

  //  .########..##..........###....##....##.########.########.
  //  .##.....##.##.........##.##....##..##..##.......##.....##
  //  .##.....##.##........##...##....####...##.......##.....##
  //  .########..##.......##.....##....##....######...########.
  //  .##........##.......#########....##....##.......##...##..
  //  .##........##.......##.....##....##....##.......##....##.
  //  .##........########.##.....##....##....########.##.....##

  // ....###.....######..########.####..#######..##....##
  // ...##.##...##....##....##.....##..##.....##.###...##
  // ..##...##..##..........##.....##..##.....##.####..##
  // .##.....##.##..........##.....##..##.....##.##.##.##
  // .#########.##..........##.....##..##.....##.##..####
  // .##.....##.##....##....##.....##..##.....##.##...###
  // .##.....##..######.....##....####..#######..##....##

  public function actPassTaxAndUpkeep()
  {
    $player = self::getPlayer();
    $this->resolveAction(PASS);
  }

  public function actTaxAndUpkeep($args)
  {
    self::checkAction('actTaxAndUpkeep');
    $playerId = $this->checkPlayer();
    $player = Players::get($playerId);
    $stateArgs = $this->argsTaxAndUpkeep();
    $playerData = $stateArgs['_private'][$playerId];
    $selectedTargets = $args->selectedTargets ?? null;

    if (!is_array($selectedTargets)) {
      throw new \BgaUserException(clienttranslate('Invalid selection'));
    }

    $items = [];
    foreach (array_merge(FamilyMembers::getAllFor($playerId), $player->getEnterprises(), $player->getLondonSeasonCards()) as $item) {
      $items[$item->getId()] = $item;
    }

    $amount = $playerData['amount'];
    $selected = [];
    foreach ($selectedTargets as $targetId) {
      if (!is_string($targetId) || !array_key_exists($targetId, $playerData['targets']) || !isset($items[$targetId]) || isset($selected[$targetId])) {
        throw new \Bga\GameFramework\VisibleSystemException("ERROR_091");
      }
      $selected[$targetId] = $items[$targetId];
      $amount -= $playerData['targets'][$targetId];
    }

    if ($amount > $player->getTreasury()) {
      throw new \Bga\GameFramework\VisibleSystemException("ERROR_092");
    }

    foreach ($selected as $item) {
      if ($item instanceof FamilyMember) {
        $prize = PRIZES[$item->getLocation()] ?? null;
        if ($prize !== null) {
          $player->incScore(-$prize[VICTORY_POINTS]);
        }
        $item->returnToSupply();
      } elseif ($item instanceof Enterprise) {
        $player->incScore(-$item->getVictoryPoints());
        $item->returnToSupply($player);
      } elseif ($item instanceof LondonSeasonCard) {
        $player->incScore(-($item->getVictoryPoints() ?? 0));
        $item->discard($player, true);
      }
    }

    if (count($selected) > 0) {
      Notifications::updatePower();
    }
    if ($amount > 0) {
      $player->pay($amount, false);
    }
    $this->setPlayerActionCompleted($playerId);
    if (count(array_diff($this->getActivePlayerIds(), $this->ctx->getInfo()['completedPlayerIds'] ?? [])) === 0) {
      $this->resolveAction([], true);
    }
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  // .########.##....##..######...####.##....##.########
  // .##.......###...##.##....##...##..###...##.##......
  // .##.......####..##.##.........##..####..##.##......
  // .######...##.##.##.##...####..##..##.##.##.######..
  // .##.......##..####.##....##...##..##..####.##......
  // .##.......##...###.##....##...##..##...###.##......
  // .########.##....##..######...####.##....##.########

  public function getDescription(): string|array
  {
    return clienttranslate('TaxAndUpkeep');
  }

  public function isDoable(Player $player): bool
  {
    return true;
  }
}
