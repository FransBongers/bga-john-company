<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine\OrNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;

use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\Enterprises;
use Bga\Games\JohnCompany\Managers\Families;
use Bga\Games\JohnCompany\Models\Family;
use Bga\Games\JohnCompany\Models\Player;

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

    $this->purchaseEnterprise($playerId, $type);

    if ($source === FAMILY_ACTION) {

      $family = Families::get($args['familyId']);

      $this->checkExtraActionOpportunityMarker($family, $playerId, $type);

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

  public function purchaseEnterprise(string $playerId, string $enterpriseType)
  {
    $player = Players::get($playerId);
    $family = $player->getFamily();

    $enterprise = Enterprises::getTopOf(Locations::supplyEnterprises($enterpriseType));

    $enterprise->changeOwner($family->getId());

    $amount = $this->enterprisePrice[$enterpriseType];

    $family->incTreasury(-$amount);

    // Notifications::pay($player, $amount);
    Notifications::purchaseEnterprise($player, $enterprise, $amount, $family->getId());
  }

  private function checkExtraActionOpportunityMarker(Family $family, int $playerId, string $enterpriseType)
  {
    $opportunityMarker = $family->getOpportunityMarker();
    if ($opportunityMarker !== $this->enterpriseTypeOpportunityMarkerMap[$enterpriseType]) {
      return;
    }

    $isDoable = $this->canBePerformedBy($family, $enterpriseType);
    if (!$isDoable) {
      Notifications::message(clienttranslate('${player_name} cannot buy another ${enterpriseName}'), [
        'enterpriseName' => Notifications::getEnterpriseName($enterpriseType),
        'i18n' => ['enterpriseName']
      ]);
    }

    $this->ctx->insertAsBrother(Engine::buildTree(
      [
        'type' => NODE_OR,
        'playerId' => $playerId,
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
              'familyId' => $family->getId(),
              'type' => $enterpriseType,
              'playerId' => $playerId,
              SOURCE => OPPORTUNITY_MARKER,
            ]
          ]
        ]

      ]
    ));
  }

  public function canBePerformedBy(Family $family, string $enterpriseType)
  {
    $treasury = $family->getTreasury();

    return $treasury >= $this->enterprisePrice[$enterpriseType] && Enterprises::countInLocation(Locations::supplyEnterprises($enterpriseType)) > 0;
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
    // $familyId = $args['familyId'] ?? null;
    $type = $args['type'];

    return [
      'log' => clienttranslate('Buy ${enterpriseName} ${tkn_icon} for ${tkn_boldText_price}'),
      'args' => [
        'enterpriseName' => Notifications::getEnterpriseName($type),
        'tkn_icon' => $type,
        'tkn_boldText_price' => '£' . $this->enterprisePrice[$type],
      ],
    ];
  }

  public function isDoable(Player $player): bool
  {
    $args = $this->ctx->getArgs();
    $type = $args['type'];
    $familyId = $args['familyId'];
    $family = Families::get($familyId);

    return $this->canBePerformedBy($family, $type);
  }

  public function isAutomatic(?Player $player = null): bool
  {
    return true;
  }
}
