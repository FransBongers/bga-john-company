<?php

namespace Bga\Games\JohnCompany\Orders;

class Order_Delhi_2 extends \Bga\Games\JohnCompany\Models\Order
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = ORDER_DELHI_2;
    $this->northernPriority = 3;
    $this->value = 5;
    $this->filledValue = 2;
    $this->regionId = DELHI;
    $this->connectedOrders = [
      ORDER_MARATHA_1,
      ORDER_DELHI_3,
    ];
  }

}
