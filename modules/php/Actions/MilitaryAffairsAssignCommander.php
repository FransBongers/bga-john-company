<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Models\Player;

class MilitaryAffairsAssignCommander extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_MILITARY_AFFAIRS_ASSIGN_COMMANDER;
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsMilitaryAffairsAssignCommander()
  {
    $args = $this->ctx->getArgs();
    $presidencyId = $args['presidencyId'];

    return [
      'options' => $this->getOptions($presidencyId),
      'presidencyId' => $presidencyId,
    ];
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

  public function actPassMilitaryAffairsAssignCommander()
  {
    $this->resolveAction(PASS);
  }

  public function actMilitaryAffairsAssignCommander($args)
  {
    self::checkAction('actMilitaryAffairsAssignCommander');
    $playerId = $this->checkPlayer();

    $familyMemberId = $args->familyMemberId;

    $stateArgs = $this->argsMilitaryAffairsAssignCommander();
    $presidencyId = $stateArgs['presidencyId'];

    $familyMember = Utils::array_find(
      $stateArgs['options'],
      fn($option) => $option->getId() === $familyMemberId
    );
    if ($familyMember === null) {
      throw new \Bga\GameFramework\VisibleSystemException("ERROR_057");
    }

    $player = Players::get($playerId);
    $commanderLocation = Locations::commander(PRESIDENCY_HOME_REGION_MAP[$presidencyId]);

    $currentCommander = FamilyMembers::getTopOf($commanderLocation);
    if ($currentCommander !== null) {
      $currentCommander->moveTo($player, Locations::armyOfReady($presidencyId), [
        'skipFrom' => true,
      ]);
    }
    $familyMember->moveTo($player, $commanderLocation, [
      'text' => clienttranslate('${player_name} appoints ${tkn_familyMember} as Commander of the ${tkn_boldText_army}'),
      'textArgs' => [
        'tkn_boldText_army' => Notifications::getArmyNameForPresidency($presidencyId),
        'i18n' => ['tkn_boldText_army'],
      ],
    ]);

    Game::get()->gamestate->setPlayerNonMultiactive($playerId, 'next');
    $this->resolveAction([], true);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  public function getOptions(string $presidencyId)
  {
    $commander = FamilyMembers::getTopOf(Locations::commander(PRESIDENCY_HOME_REGION_MAP[$presidencyId]));

    $officers =
      FamilyMembers::getInLocation(Locations::armyOfReady($presidencyId))->toArray();

    $countByPlayerId = [];
    $officersByPlayerId = [];
    foreach ($officers as $officer) {
      $playerId = $officer->getPlayerId();
      $countByPlayerId[$playerId] = ($countByPlayerId[$playerId] ?? 0) + 1;
      $officersByPlayerId[$playerId][] = $officer;
    }
    if ($commander !== null) {
      $commanderPlayerId = $commander->getPlayerId();
      $countByPlayerId[$commanderPlayerId] = ($countByPlayerId[$commanderPlayerId] ?? 0) + 1;
    }

    if (count($countByPlayerId) === 0) {
      return [];
    }

    $max = max($countByPlayerId);
    // Commander keeps the position unless another player has strictly more family members
    if ($commander !== null && $countByPlayerId[$commander->getPlayerId()] >= $max) {
      return [];
    }

    $options = [];
    foreach ($countByPlayerId as $playerId => $count) {
      if ($count === $max) {
        $options = array_merge($options, $officersByPlayerId[$playerId] ?? []);
      }
    }
    return $options;
  }

  // .########.##....##..######...####.##....##.########
  // .##.......###...##.##....##...##..###...##.##......
  // .##.......####..##.##.........##..####..##.##......
  // .######...##.##.##.##...####..##..##.##.##.######..
  // .##.......##..####.##....##...##..##..####.##......
  // .##.......##...###.##....##...##..##...###.##......
  // .########.##....##..######...####.##....##.########

  public function getDescription(): string|array
  {
    return clienttranslate('MilitaryAffairsAssignCommander');
  }

  public function isDoable(Player $player): bool
  {
    return true;
  }
}
