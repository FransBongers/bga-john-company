<?php

namespace Bga\Games\JohnCompany\Orders;

class Order_Hyderabad_1 extends \Bga\Games\JohnCompany\Models\Order
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = ORDER_HYDERABAD_1;
    $this->northernPriority = 13;
    $this->value = 7;
    $this->filledValue = 3;
    $this->regionId = HYDERABAD;
    $this->connectedOrders = [
      ORDER_MARATHA_3,
      ORDER_MADRAS_1,
      ORDER_MYSORE_2,
    ];
  }

}
