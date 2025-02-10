<?php

namespace Bga\Games\JohnCompany\Orders;

class Order_Bengal_2 extends \Bga\Games\JohnCompany\Models\Order
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = ORDER_BENGAL_2;
    $this->northernPriority = 8;
    $this->value = 6;
    $this->filledValue = 3;
    $this->regionId = BENGAL;
    $this->homePort = BENGAL;
    $this->connectedOrders = [
      ORDER_BENGAL_1,
    ];
  }

}
