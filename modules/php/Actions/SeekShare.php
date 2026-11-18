<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Managers\PlayersExtra;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Models\Player;
use Bga\Games\JohnCompany\Models\PlayerExtra;

class SeekShare extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_SEEK_SHARE;
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsSeekShare()
  {
    $args = $this->ctx->getArgs();
    $source = $args['source'];
    $playerId = $args['playerId'];
    $family = PlayersExtra::get($playerId);

    $data = [
      'options' => $this->getOptions($family),
      'source' => $source,
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

  public function actPassSeekShare()
  {
    $player = self::getPlayer();
    // Stats::incPassActionCount($player->getId(), 1);
    // Engine::resolve(PASS);
    $this->resolveAction(PASS);
  }

  public function actSeekShare($args)
  {
    self::checkAction('actSeekShare');
    $playerId = $this->checkPlayer();

    $position = $args->position;

    $stateArgs = $this->argsSeekShare();

    if (!isset($position, $stateArgs['options'])) {
      throw new \Bga\GameFramework\VisibleSystemException("ERROR_005");
    }

    $price = $stateArgs['options'][$position];

    $this->performAction($playerId, $position, $price);

    if ($stateArgs[SOURCE] === FAMILY_ACTION) {
      $playerId = $this->ctx->getArgs()['playerId'];
      $playerExtraData = PlayersExtra::get($playerId);

      $this->checkExtraActionOpportunityMarker($playerExtraData, $playerId);

      $playerExtraData->updateOpportunityMarker(SEEK_SHARE);
    }

    $this->setPlayerActionCompleted($playerId);
    $this->resolveAction([], true);
  }

  public function performAction(int $playerId, string $position, int $price)
  {
    $player = Players::get($playerId);
    $player->pay($price);

    $familyMember = FamilyMembers::getMemberFor($player->getId());
    $familyMember->setLocation($position);

    Notifications::seekShare($player, $familyMember, $price);
  }


  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private function checkExtraActionOpportunityMarker(PlayerExtra $playerExtraData, int $playerId)
  {
    $opportunityMarker = $playerExtraData->getOpportunityMarker();
    if ($opportunityMarker !== SEEK_SHARE) {
      return;
    }

    $isDoable = $this->canBePerformedBy($playerExtraData);
    if (!$isDoable) {
      Notifications::message(clienttranslate('${player_name} cannot seek another share'), [
        'player' => Players::get($playerId),
      ]);
      return;
    }

    $this->ctx->insertAsBrother(new LeafNode([
      'action' => SEEK_SHARE,
      'playerId' => 'some',
      'activePlayerIds' => [$playerId],
      'optional' => true,
      'args' => [
        'playerId' => $playerId,
        SOURCE => OPPORTUNITY_MARKER,
      ]
    ]));
  }

  private function getStockPrice($stockExchangeLocation)
  {
    return intval(explode('_', $stockExchangeLocation)[1]);
  }

  public function canBePerformedBy(PlayerExtra $playerExtraData)
  {
    return count($this->getOptions($playerExtraData)) > 0;
  }

  public function getOptions(PlayerExtra $playerExtra)
  {
    $treasury = $playerExtra->getTreasury();

    $membersOnStockExchange = FamilyMembers::getOnStockExchange();

    $options = [];

    // TODO: allow other players to use Stock Broker
    $hasStockBroker = Players::get($playerExtra->getPlayerId())->hasPrestigeCard(STOCK_BROKER_ID);

    foreach (STOCK_EXCHANGE_POSITIONS as $location) {
      if (Utils::array_some($membersOnStockExchange, function ($member) use ($location, $hasStockBroker) {
        return $member->getLocation() === $location;
      })) {
        continue;
      }
      $price = $hasStockBroker ? 1 : $this->getStockPrice($location);
      if ($price <= $treasury) {
        $options[$location] = $price;
      }
    }

    return $options;
  }

  // ..######..########...#######..##......##.##....##
  // .##....##.##.....##.##.....##.##..##..##.###...##
  // .##.......##.....##.##.....##.##..##..##.####..##
  // .##.......########..##.....##.##..##..##.##.##.##
  // .##.......##...##...##.....##.##..##..##.##..####
  // .##....##.##....##..##.....##.##..##..##.##...###
  // ..######..##.....##..#######...###..###..##....##

  // ....###.....######..########.####..#######..##....##
  // ...##.##...##....##....##.....##..##.....##.###...##
  // ..##...##..##..........##.....##..##.....##.####..##
  // .##.....##.##..........##.....##..##.....##.##.##.##
  // .#########.##..........##.....##..##.....##.##..####
  // .##.....##.##....##....##.....##..##.....##.##...###
  // .##.....##..######.....##....####..#######..##....##

  public function performCrownAction()
  {
    $family = PlayersExtra::get(CROWN_PLAYER_ID);

    $options = $this->getOptions($family);

    $cheapest = 100;
    $position = null;

    foreach (STOCK_EXCHANGE_POSITIONS as $sePosition) {
      if (isset($options[$sePosition]) && $options[$sePosition] < $cheapest) {
        $position = $sePosition;
        $cheapest = $options[$sePosition];
      }
    }

    $this->performAction(CROWN_PLAYER_ID, $position, $cheapest);
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
    return [
      'log' => clienttranslate('Seek Share ${tkn_icon}'),
      'args' => [
        'tkn_icon' => SHARE,
      ],
    ];
  }

  public function isDoable(Player $player): bool
  {
    $args = $this->ctx->getArgs();
    $playerId = $args['playerId'];
    $playerExtra = PlayersExtra::get($playerId);

    return count($this->getOptions($playerExtra)) > 0 && !$player->hasPrestigeCard(JOSEPH_SEDLEY_ID);
  }
}
