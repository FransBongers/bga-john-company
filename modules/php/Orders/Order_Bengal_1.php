<?php

namespace Bga\Games\JohnCompany\Orders;

class Order_Bengal_1 extends \Bga\Games\JohnCompany\Models\Order
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = ORDER_BENGAL_1;
    $this->northernPriority = 7;
    $this->value = 5;
    $this->filledValue = 2;
    $this->regionId = BENGAL;
    $this->connectedOrders = [
      ORDER_BENGAL_2,
      ORDER_MARATHA_1,
      ORDER_MARATHA_3,
    ];
  }

}
