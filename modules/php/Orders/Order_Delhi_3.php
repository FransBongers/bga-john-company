<?php

namespace Bga\Games\JohnCompany\Orders;

class Order_Delhi_3 extends \Bga\Games\JohnCompany\Models\Order
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = ORDER_DELHI_3;
    $this->northernPriority = 4;
    $this->value = 3;
    $this->filledValue = 1;
    $this->regionId = DELHI;
    $this->connectedOrders = [
      ORDER_BOMBAY_1,
      ORDER_DELHI_1,
      ORDER_DELHI_2,
    ];
  }

}
