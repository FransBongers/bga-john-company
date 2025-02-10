<?php

namespace Bga\Games\JohnCompany\Orders;

class Order_Maratha_1 extends \Bga\Games\JohnCompany\Models\Order
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = ORDER_MARATHA_1;
    $this->northernPriority = 6;
    $this->value = 4;
    $this->filledValue = 2;
    $this->regionId = MARATHA;
    $this->connectedOrders = [
      ORDER_DELHI_2,
      ORDER_BENGAL_1,
    ];
  }

}
