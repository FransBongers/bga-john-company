<?php

namespace Bga\Games\JohnCompany\Orders;

class Order_Punjab_1 extends \Bga\Games\JohnCompany\Models\Order
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = ORDER_PUNJAB_1;
    $this->northernPriority = 2;
    $this->value = 7;
    $this->filledValue = 3;
    $this->regionId = PUNJAB;
    $this->connectedOrders = [
      ORDER_DELHI_1,
      ORDER_BOMBAY_1,
    ];
  }

}
