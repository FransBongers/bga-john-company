<?php

namespace Bga\Games\JohnCompany\Orders;

class Order_Bombay_1 extends \Bga\Games\JohnCompany\Models\Order
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = ORDER_BOMBAY_1;
    $this->northernPriority = 5;
    $this->value = 3;
    $this->filledValue = 1;
    $this->regionId = BOMBAY;
    $this->connectedOrders = [
      ORDER_PUNJAB_1,
      ORDER_DELHI_3,
      ORDER_BOMBAY_3,
    ];
  }

}
