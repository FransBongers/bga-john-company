<?php

namespace Bga\Games\JohnCompany\Orders;

class Order_Bombay_2 extends \Bga\Games\JohnCompany\Models\Order
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = ORDER_BOMBAY_2;
    $this->northernPriority = 9;
    $this->value = 3;
    $this->filledValue = 1;
    $this->regionId = BOMBAY;
    $this->connectedOrders = [
      ORDER_MARATHA_2,
      ORDER_BOMBAY_3,
    ];
  }
}
