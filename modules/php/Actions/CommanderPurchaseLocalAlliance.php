<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Managers\ArmyPieces;
use Bga\Games\JohnCompany\Managers\AtomicActions;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Models\Player;

class CommanderPurchaseLocalAlliance extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_COMMANDER_PURCHASE_LOCAL_ALLIANCE;
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


  public function stCommanderPurchaseLocalAlliance()
  {
    $stateArgs = $this->argsCommanderPurchaseLocalAlliance();
    if ($stateArgs['skipOnEnteringState']) {
      $args = $this->ctx->getArgs();
      if ($args['first']) {
        Notifications::message('${player_name} cannot purchase any local alliances', [
          'player' => Players::get($args['commanderPlayerId'])
        ]);
      }
      $this->resolveAction(['automatic' => true]);
    }
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsCommanderPurchaseLocalAlliance()
  {
    $info = $this->ctx->getInfo();
    $args = $this->ctx->getArgs();
    $presidentOfficeId = $args['presidentOfficeId'];
    $commanderPlayerId = $args['commanderPlayerId'];

    $options = $this->getOptions();

    $data = [
      'options' => $options,
      'commanderIsPresident' => $commanderPlayerId === Offices::get($presidentOfficeId)->getPlayerId(),
      'skipOnEnteringState' => count($options) === 0,
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

  public function actPassCommanderPurchaseLocalAlliance()
  {
    $playerId = $this->checkPlayer();
    Game::get()->gamestate->setPlayerNonMultiactive($playerId, 'next');
    $this->resolveAction(PASS);
  }

  public function actCommanderPurchaseLocalAlliance($args)
  {
    self::checkAction('actCommanderPurchaseLocalAlliance');
    $playerId = $this->checkPlayer();
    $localAllianceId = $args->localAllianceId;

    $presidentOfficeId = $this->ctx->getArgs()['presidentOfficeId'];
    $presidentPlayerId = Offices::get($presidentOfficeId)->getPlayerId();

    // Insert state again so the commander has the opportunity to purchase another local alliance
    $this->insertState();

    if (!Utils::array_some($this->getOptions(), function ($piece) use ($localAllianceId) {
      return $piece->getId() === $localAllianceId;
    })) {
      throw new \Bga\GameFramework\VisibleSystemException("ERROR_048");
    }

    if ($presidentPlayerId === $playerId) {
      ArmyPieces::get($localAllianceId)->purchaseAlliance(Players::get($playerId), $presidentOfficeId);
    } else {
      Notifications::message(clienttranslate('${player_name} requests funds to purchase a local alliance'), [
        'player' => Players::get($playerId),
      ]);
      $this->ctx->insertAsBrother(
        Engine::buildTree([
          'action' => COMMANDER_APPROVE_LOCAL_ALLIANCE,
          'playerId' => 'some',
          'activePlayerIds' => [$presidentPlayerId],
          'args' => [
            'localAllianceId' => $localAllianceId,
            'presidentOfficeId' => $presidentOfficeId,
            'commanderPlayerId' => $playerId,
          ]
        ])
      );
    }

    Game::get()->gamestate->setPlayerNonMultiactive($playerId, 'next');
    $this->resolveAction([]);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private function insertState()
  {
    $args = $this->ctx->getArgs();
    $commanderPlayerId = $args['commanderPlayerId'];
    $presidentOfficeId = $args['presidentOfficeId'];
    $regionId = $args['regionId'];


    $this->ctx->insertAsBrother(new LeafNode([
      'action' => COMMANDER_PURCHASE_LOCAL_ALLIANCE,
      'playerId' => 'some',
      'activePlayerIds' => [$commanderPlayerId],
      'optional' => true,
      'args' => [
        'commanderPlayerId' => $commanderPlayerId,
        'regionId' => $regionId,
        'presidentOfficeId' => $presidentOfficeId,
      ]
    ]));
  }

  private function getOptions()
  {
    $args = $this->ctx->getArgs();
    $regionId = $args['regionId'];
    $presidentOfficeId = $args['presidentOfficeId'];
    $treasury = Offices::get($presidentOfficeId)->getTreasury();

    $armyPieces = ArmyPieces::getInLocation(Locations::armyOfExhausted($regionId))->toArray();

    return Utils::filter($armyPieces, function ($piece) use ($treasury) {
      return $piece->getType() === LOCAL_ALLIANCE && $piece->getCost() <= $treasury;
    });
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
    return clienttranslate('Purchase Local Alliance');
  }

  public function isDoable(Player $player): bool
  {
    return count($this->getOptions()) > 0;
  }
}
