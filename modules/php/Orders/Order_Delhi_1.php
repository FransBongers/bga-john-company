<?php

namespace Bga\Games\JohnCompany\Orders;

class Order_Delhi_1 extends \Bga\Games\JohnCompany\Models\Order
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = ORDER_DELHI_1;
    $this->northernPriority = 1;
    $this->value = 5;
    $this->filledValue = 2;
    $this->regionId = DELHI;
    $this->connectedOrders = [
      ORDER_PUNJAB_1,
      ORDER_DELHI_3,
    ];
  }

}
