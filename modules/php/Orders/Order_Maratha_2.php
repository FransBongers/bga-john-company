<?php

namespace Bga\Games\JohnCompany\Orders;

class Order_Maratha_2 extends \Bga\Games\JohnCompany\Models\Order
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = ORDER_MARATHA_2;
    $this->northernPriority = 10;
    $this->value = 3;
    $this->filledValue = 1;
    $this->regionId = MARATHA;
    $this->connectedOrders = [
      ORDER_MARATHA_3,
      ORDER_BOMBAY_2,
    ];
  }

}
