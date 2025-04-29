<?php

namespace Bga\Games\JohnCompany\EventTiles;

use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Managers\Families;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Orders;
use Bga\Games\JohnCompany\Managers\Regions;

class Windfall extends \Bga\Games\JohnCompany\Models\EventTile
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->title = clienttranslate('Windfall');
    $this->type = WINDFALL;
  }

  public function resolveEvent($regionId)
  {
    parent::resolveEvent($regionId);

    $regions = Regions::getAll();
    $orders = Orders::getAll()->toArray();
    $familyMembers = FamilyMembers::getAll();

    // Create array of all regions affected by Windfall
    $regionIds = $regions[$regionId]->getAdjacentRegionIds();
    $regionIds[] = $regionId;

    // Create array with all orders affected by Windfall
    $affectedOrders = Utils::returnIds(Utils::filter($orders, function ($order) use ($regionIds) {
      return in_array($order->getRegionId(), $regionIds);
    }));

    // Determine amount gained per family
    $gainPerFamily = [];
    foreach($familyMembers as $familyMember) {
      if (!in_array($familyMember->getLocation(), $affectedOrders)) {
        continue;
      }

      $familyId = $familyMember->getFamilyId();
      if (isset($gainPerFamily[$familyId])) {
        $gainPerFamily[$familyId] += 1;
      } else {
        $gainPerFamily[$familyId] = 1;
      }
    }

    // Pay to families
    $families = Families::getAll();
    foreach($gainPerFamily as $familyId => $amount) {
      $families[$familyId]->gainCash($amount);
    }
  }
}
