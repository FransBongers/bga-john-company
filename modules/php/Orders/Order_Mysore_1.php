<?php

namespace Bga\Games\JohnCompany\Orders;

class Order_Mysore_1 extends \Bga\Games\JohnCompany\Models\Order
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = ORDER_MYSORE_1;
    $this->northernPriority = 14;
    $this->value = 3;
    $this->filledValue = 1;
    $this->regionId = MYSORE;
    $this->connectedOrders = [
      ORDER_BOMBAY_3,
      ORDER_MYSORE_2,
    ];
  }

}
