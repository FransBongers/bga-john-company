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

  protected $enterprisePrice = [
    LUXURY => 4,
    SHIPYARD => 2,
    WORKSHOP => 5,
  ];

  public function purchaseEnterprise($playerId, $enterpriseType)
  {
    $player = Players::get($playerId);
    $family = $player->getFamily();

    $enterprise = Enterprises::getTopOf(Locations::enterpriseSupply($enterpriseType));

    $enterprise->changeOwner($family->getId());

    $amount = $this->enterprisePrice[$enterpriseType];

    $family->incTreasury(-$amount);

    // Notifications::pay($player, $amount);
    Notifications::purchaseEnterprise($player, $enterprise, $amount);


    // TODO: insert action for bonus action
  }
}
