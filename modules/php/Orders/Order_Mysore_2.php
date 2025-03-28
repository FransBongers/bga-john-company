<?php

namespace Bga\Games\JohnCompany\Orders;

class Order_Mysore_2 extends \Bga\Games\JohnCompany\Models\Order
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = ORDER_MYSORE_2;
    $this->northernPriority = 16;
    $this->value = 6;
    $this->filledValue = 3;
    $this->regionId = MYSORE;
    $this->connectedOrders = [
      ORDER_HYDERABAD_1,
      ORDER_MADRAS_2,
      ORDER_MYSORE_1,
    ];
  }

}
