<?php

namespace Bga\Games\JohnCompany\Offices;

use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Offices;

class ManagerOfShipping extends \Bga\Games\JohnCompany\Models\Office
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = MANAGER_OF_SHIPPING;
    $this->title = clienttranslate('Manager of Shipping');
    $this->hirePriority = 3;
  }

  public function getCandidatesForHiring(): array
  {
    return FamilyMembers::getWriters();
  }

  public function getHiringPlayerId(): int | null
  {
    return Offices::get(CHAIRMAN)->getPlayerId();
  }
}
