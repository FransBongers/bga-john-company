<?php

namespace Bga\Games\JohnCompany\Actions;


use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Managers\Enterprises;
use Bga\Games\JohnCompany\Managers\Regions;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\SetupCards;

class EnlistWriter extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_ENLIST_WRITER;
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsEnlistWriter()
  {
    $info = $this->ctx->getInfo();
    $playerId = $info['activePlayerId'];

    $data = [
      'playerId' => $playerId,
      'options' => $this->getOptions($playerId),
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

  public function actPassEnlistWriter()
  {
    $player = self::getPlayer();
    // Stats::incPassActionCount($player->getId(), 1);
    // Engine::resolve(PASS);
    $this->resolveAction(PASS);
  }

  public function actEnlistWriter($args)
  {
    self::checkAction('actEnlistWriter');

    $regionId = $args->regionId;

    $stateArgs = $this->argsEnlistWriter();
    $playerId = $stateArgs['playerId'];

    $player = Players::get($playerId);
    $familyId = $player->getFamilyId();

    $familyMember = FamilyMembers::getMemberFor($familyId);
    $familyMember->setLocation(Locations::writers($regionId));

    Notifications::enlistWriter($player, $familyMember, Regions::get($regionId));

    // TODO: insert extra actions

    $this->resolveAction([], true);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  public function getOptions($playerId)
  {
    $player = Players::get($playerId);
    $family = $player->getFamily();

    $canPlaceFamilyMembers = $family->canPlaceFamilyMembers();

    if (!$canPlaceFamilyMembers) {
      return [];
    }
    return [BENGAL, BOMBAY, MADRAS];
  }
}
