<?php

namespace Bga\Games\JohnCompany\Offices;

class ManagerOfShipping extends \Bga\Games\JohnCompany\Models\Office
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = MANAGER_OF_SHIPPING;
    $this->title = clienttranslate('Manager of Shipping');
    $this->hirePriority = 3;
  }

}
