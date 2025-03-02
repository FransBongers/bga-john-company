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

class PurchaseEnterprise extends \Bga\Games\JohnCompany\Models\AtomicAction
{

  protected $familyActionEnterpriseMap = [
    PURCHASE_LUXURY => LUXURY,
    PURCHASE_SHIPYARD => SHIPYARD,
    PURCHASE_WORKSHOP => WORKSHOP,
  ];
  protected $enterprisePrice = [
    LUXURY => 4,
    SHIPYARD => 2,
    WORKSHOP => 5,
  ];

  public function getState()
  {
    return ST_PURCHASE_ENTERPRISE;
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsPurchaseEnterprise()
  {
    $info = $this->ctx->getInfo();
    $playerId = $info['activePlayerId'];

    $data = [
      'playerId' => $playerId,
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

  public function actPassPurchaseEnterprise()
  {
    $player = self::getPlayer();
    // Stats::incPassActionCount($player->getId(), 1);
    // Engine::resolve(PASS);
    $this->resolveAction(PASS);
  }

  public function actPurchaseEnterprise($args)
  {
    self::checkAction('actPurchaseEnterprise');
    $playerId = $this->checkPlayer();

    // $this->performAction($playerId);

    $this->resolveAction([], true);
  }

  public function performAction($playerId, $familyAction)
  {
    $player = Players::get($playerId);
    $family = $player->getFamily();

    $enterpriseType = $this->familyActionEnterpriseMap[$familyAction];
    $enterprise = Enterprises::getTopOf(Locations::enterpriseSupply($enterpriseType));
    $enterprise->setLocation($family->getId());

    $amount = $this->enterprisePrice[$enterpriseType];

    $family->incTreasury(-$amount);

    // Notifications::pay($player, $amount);
    Notifications::purchaseEnterprise($player, $enterprise, $amount);

    // TODO: insert action for bonus action
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

    $treasury = $family->getTreasury();
    $options = [];

    $enterpises = Enterprises::getAll()->toArray();

    if ($treasury >= 4 && count(Utils::itemsInLocation($enterpises, Locations::enterpriseSupply(LUXURY))) > 0) {
      $options[] = PURCHASE_LUXURY;
    }

    if ($treasury >= 2 && count(Utils::itemsInLocation($enterpises, Locations::enterpriseSupply(SHIPYARD))) > 0) {
      $options[] = PURCHASE_SHIPYARD;
    }

    if ($treasury >= 5 && count(Utils::itemsInLocation($enterpises, Locations::enterpriseSupply(WORKSHOP))) > 0) {
      $options[] = PURCHASE_WORKSHOP;
    }

    return $options;
  }
}
