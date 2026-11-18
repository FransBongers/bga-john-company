<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine\OrNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\Enterprises;
use Bga\Games\JohnCompany\Managers\PlayersExtra;
use Bga\Games\JohnCompany\Managers\LawCards;
use Bga\Games\JohnCompany\Managers\LondonSeasonCards;
use Bga\Games\JohnCompany\Models\Player;
use Bga\Games\JohnCompany\Models\PlayerExtra;

class PurchaseEnterprise extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  protected array $enterpriseTypeOpportunityMarkerMap = [
    LUXURY => PURCHASE_LUXURY,
    SHIPYARD => PURCHASE_SHIPYARD,
    WORKSHOP => PURCHASE_WORKSHOP,
  ];

  protected array $enterprisePrice = [
    LUXURY => 4,
    SHIPYARD => 2,
    WORKSHOP => 5,
  ];

  public function getState()
  {
    return ST_PURCHASE_ENTERPRISE;
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

  public function stPurchaseEnterprise()
  {
    $args = $this->ctx->getArgs();
    $playerId = $args['playerId'];
    $type = $args['type'];
    $source = $args[SOURCE];

    $this->purchaseEnterprise($playerId, $type, $source);

    if ($source === FAMILY_ACTION) {

      $family = PlayersExtra::get($playerId);

      $this->checkExtraActionOpportunityMarker($family, $playerId, $type, $source);

      $family->updateOpportunityMarker($this->enterpriseTypeOpportunityMarkerMap[$type]);
    }

    $this->resolveAction(['automatic' => true], true);
  }



  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  public function purchaseEnterprise(int $playerId, string $enterpriseType, string | null $source = null)
  {
    $player = Players::get($playerId);
    $playerExtraData = $player->getPlayerExtra();

    $enterprise = Enterprises::getTopOf(Locations::supplyEnterprises($enterpriseType));

    $enterprise->changeOwner($playerId);

    $amount = $this->getEnterprisePrice($playerExtraData, $enterpriseType, $source);
    $playerExtraData->incTreasury(-$amount);

    // Notifications::pay($player, $amount);
    Notifications::purchaseEnterprise($player, $enterprise, $amount);
    Notifications::updatePower();

    $victoryPoints = $enterprise->getVictoryPoints();
    if ($victoryPoints > 0) {
      Game::get()->bga->playerScore->inc($playerId, $victoryPoints);
    }

    $ownerFamily = LondonSeasonCards::getOwnerFamily(FOUNDRY_CARD_ID);
    if ($ownerFamily !== null) {
      $ownerFamily->gainCash(1, LondonSeasonCards::get(FOUNDRY_CARD_ID)->getTitle());
    }
  }

  private function checkExtraActionOpportunityMarker(PlayerExtra $family, int $playerId, string $enterpriseType, string | null $source = null)
  {
    $opportunityMarker = $family->getOpportunityMarker();
    if ($opportunityMarker !== $this->enterpriseTypeOpportunityMarkerMap[$enterpriseType]) {
      return;
    }

    $isDoable = $this->canBePerformedBy($family, $enterpriseType, $source);
    if (!$isDoable) {
      Notifications::message(clienttranslate('${player_name} cannot buy another ${enterpriseName}'), [
        'enterpriseName' => Notifications::getEnterpriseName($enterpriseType),
        'i18n' => ['enterpriseName']
      ]);
    }

    $this->ctx->insertAsBrother(Engine::buildTree(
      [
        'type' => NODE_OR,
        'playerId' => 'some',
        'activePlayerIds' => [$playerId],
        'optional' => true,
        'stateDescription' => [
          'descriptionmyturn' => clienttranslate('${you} may buy another enterprise'),
          'description' => clienttranslate('${actplayer} may buy another enterprise'),
          'args' => []
        ],
        'args' => [
          'buttonType' => SECONDARY
        ],
        'children' => [
          [
            'action' => PURCHASE_ENTERPRISE,
            'args' => [
              'type' => $enterpriseType,
              'playerId' => $playerId,
              SOURCE => OPPORTUNITY_MARKER,
            ]
          ]
        ]

      ]
    ));
  }

  public function canBePerformedBy(PlayerExtra $playerExtraData, string $enterpriseType, string | null $source = null)
  {
    $player = Players::get($playerExtraData->getPlayerId());
    if ($enterpriseType === WORKSHOP && $player->hasPrestigeCard(JOHN_THORPE_ID)) {
      return false;
    }
    if ($enterpriseType === SHIPYARD && $player->hasPrestigeCard(VIOLET_EFFINGHAM_ID)) {
      return false;
    }

    $treasury = $player->getTreasury();
    $price = $this->getEnterprisePrice($playerExtraData, $enterpriseType, $source);

    return $treasury >= $price && Enterprises::countInLocation(Locations::supplyEnterprises($enterpriseType)) > 0;
  }

  public function getEnterprisePrice(PlayerExtra $playerExtraData, string $enterpriseType, $source = null): int
  {
    if ($source === FAMILY_ACTION && $enterpriseType === WORKSHOP && LawCards::isInPlay(INDUSTRY_SUBSIDY_ID) && $playerExtraData->getOpportunityMarker() !== $this->enterpriseTypeOpportunityMarkerMap[$enterpriseType]) {
      return 3;
    }

    return $this->enterprisePrice[$enterpriseType];
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
    throw new \Bga\GameFramework\VisibleSystemException("IMPLEMENT_CROWN");
    // $this->performAction(CROWN_PLAYER_ID);
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
    $type = $args['type'];
    $playerId = $args['playerId'];
    $family = PlayersExtra::get($playerId);
    $source = $args['source'] ?? null;

    return [
      'log' => clienttranslate('Buy ${enterpriseName} ${tkn_icon} for ${tkn_boldText_price}'),
      'args' => [
        'enterpriseName' => Notifications::getEnterpriseName($type),
        'tkn_icon' => $type,
        'tkn_boldText_price' => '£' . $this->getEnterprisePrice($family, $type, $source),
      ],
    ];
  }

  public function isDoable(Player $player): bool
  {
    $args = $this->ctx->getArgs();
    $type = $args['type'];
    $playerId = $args['playerId'];
    $family = PlayersExtra::get($playerId);
    $source = $args['source'] ?? null;

    return $this->canBePerformedBy($family, $type, $source);
  }

  public function isAutomatic(?Player $player = null): bool
  {
    return true;
  }
}
