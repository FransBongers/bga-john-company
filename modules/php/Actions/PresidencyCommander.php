<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Models\Player;

class PresidencyCommander extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_PRESIDENCY_COMMANDER;
  }

  // ..######..########....###....########.########
  // .##....##....##......##.##......##....##......
  // .##..........##.....##...##.....##....##......
  // ..######.....##....##.....##....##....######..
  // .......##....##....#########....##....##......
  // .##....##....##....##.....##....##....##......
  // ..######.....##....##.....##....##....########

  // ....###.....######..########.####..#######..##....##
  // ...##.##...##....##....##.....##..##.....##.###...##
  // ..##...##..##..........##.....##..##.....##.####..##
  // .##.....##.##..........##.....##..##.....##.##.##.##
  // .#########.##..........##.....##..##.....##.##..####
  // .##.....##.##....##....##.....##..##.....##.##...###
  // .##.....##..######.....##....####..#######..##....##

  public function stPresidencyCommander()
  {
    $args = $this->ctx->getArgs();
    $officeId = $args['officeId']; // president office

    $presidencyId = $args['presidencyId'];
    $presidentOffice = Offices::get($officeId);
    // Family Member
    $commander = $presidentOffice->getCommander();

    Notifications::nextPhase(clienttranslate('Commander'));

    $this->ctx->insertAsBrother(
      Engine::buildTree(
        [
          'children' => [
            [
              'action' => COMMANDER_PURCHASE_LOCAL_ALLIANCE,
              'playerId' => 'some',
              'activePlayerIds' => [$commander->getPlayerId()],
              'optional' => true,
              'args' => [
                'commanderPlayerId' => $commander->getPlayerId(),
                'regionId' => $presidentOffice->getRegionId(),
                'presidencyId' => $presidencyId,
                'presidentOfficeId' => $presidentOffice->getId(),
                'first' => true,
              ]
            ],
            [
              'action' => COMMANDER_DEPLOY,
              'playerId' => 'some',
              'activePlayerIds' => [$commander->getPlayerId()],
              'optional' => true,
              'args' => [
                'commanderPlayerId' => $commander->getPlayerId(),
                'presidentOfficeId' => $presidentOffice->getId(),
                'presidencyId' => $presidencyId,
                'first' => true,
              ]
            ]
          ],
          // 'stateDescription' => [
          //   'descriptionmyturn' => clienttranslate('${you} must choose who will act next'),
          //   'description' => clienttranslate('${actplayer} must choose who will act next'),
          //   'args' => []
          // ]
          // 'activePlayerIds' => [$presidentOffice->getPlayerId()],
          // 'officeId' => $presidentOffice->getId(),
        ]
      )
    );


    $this->resolveAction(['automatic' => true]);
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

    return clienttranslate('Commander');
  }

  public function isDoable(Player $player): bool
  {

    return true;
  }

  public function isAutomatic(?Player $player = null): bool
  {
    return true;
  }
}
