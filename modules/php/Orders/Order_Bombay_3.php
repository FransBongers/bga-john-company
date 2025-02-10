<?php

namespace Bga\Games\JohnCompany\Orders;

class Order_Bombay_3 extends \Bga\Games\JohnCompany\Models\Order
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = ORDER_BOMBAY_3;
    $this->northernPriority = 12;
    $this->value = 4;
    $this->filledValue = 2;
    $this->regionId = BOMBAY;
    $this->homePort = BOMBAY;
    $this->connectedOrders = [
      ORDER_MYSORE_1,
      ORDER_BOMBAY_1,
      ORDER_BOMBAY_3,
    ];
  }

}
