<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\JoCoUtils;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Models\Office;
use Bga\Games\JohnCompany\Models\Player;


class GovernorAdminister extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_GOVERNOR_ADMINISTER;
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsGovernorAdminister()
  {
    $args = $this->ctx->getArgs();
    $officeId = $args['officeId'];
    $dicePoolModifier = $args['dicePoolModifier'] ?? 0;

    $office = Offices::get($officeId);

    $data = [
      'dicePoolModifier' => $dicePoolModifier,
      'dicePool' => $office->getDicePool() + $dicePoolModifier,
      'governor' => $office,
      'previousRollNoSuccess' => $args['previousRollNoSuccess'] ?? false,
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

  public function actPassGovernorAdminister()
  {
    $playerId = $this->checkPlayer();

    Game::get()->gamestate->setPlayerNonMultiactive($playerId, 'next');
    $this->resolveAction(PASS, true);
  }

  public function actGovernorAdminister($args)
  {
    self::checkAction('actGovernorAdminister');
    $playerId = $this->checkPlayer();

    $stateArgs = $this->argsGovernorAdminister();
    $numberOfDice = $stateArgs['dicePool'];

    $player = Players::get($playerId);

    $checkResult = JoCoUtils::makeCheck($player, $numberOfDice, $stateArgs['governor']->getFamilyMember());

    $this->insertExtraAdministerAction($stateArgs['dicePoolModifier'],  $checkResult, $playerId, $stateArgs['governor']);

    if ($checkResult === SUCCESS) {
      $family = $player->getFamily();
      $family->gainCash($stateArgs['previousRollNoSuccess'] ? 2 : 1);
      $this->insertAdministerSuccessChoice($playerId, $stateArgs['governor']->getId());
    } else {
      $region = $stateArgs['governor']->getRegion();
      $region->addUnrest($player, 1);
    }


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

  private function insertExtraAdministerAction(int $dicePoolModifier, string $checkResult, int $playerId, Office $governorOffice)
  {
    $dicePoolModifier--;
    $nextDicePool = $governorOffice->getDicePool() + $dicePoolModifier;
    if ($nextDicePool <= 0 || $checkResult === CATASTROPHIC_FAILURE) {
      return;
    }

    $this->ctx->insertAsBrother(
      new LeafNode([
        'action' => GOVERNOR_ADMINISTER,
        'playerId' => 'some',
        'activePlayerIds' => [$playerId],
        'optional' => true,
        'args' => [
          'dicePoolModifier' => $dicePoolModifier,
          'officeId' => $governorOffice->getId(),
          'presidencyId' => $governorOffice->getPresidencyId(),
          'first' => false,
          'previousRollNoSuccess' => $checkResult !== SUCCESS,
        ],
      ])
    );
  }

  private function insertAdministerSuccessChoice(int $playerId, string $officeId)
  {
    $this->ctx->insertAsBrother(Engine::buildTree(
      [
        'type' => NODE_XOR,
        'children' => [
          [
            'action' => GOVERNOR_BUILD_COMPANY_SHIP,
            'args' => [
              'officeId' => $officeId,
              'playerId' => $playerId,
            ],
          ],
          [
            'action' => GOVERNOR_COMMISSION_REGIMENT,
            'args' => [
              'officeId' => $officeId,
              'playerId' => $playerId,
            ],
          ],
          [
            'action' => GOVERNOR_TAX,
            'args' => [
              'officeId' => $officeId,
              'playerId' => $playerId,
            ],
          ]
        ],
        'playerId' => $playerId,

      ]
    ));
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
    $args = $this->ctx->getArgs();
    $officeId = $args['officeId'];
    $office = Offices::get($officeId);

    return $office->getTitle();
  }

  public function isDoable(Player $player): bool
  {
    return true;
  }
}
