<?php

namespace Bga\Games\JohnCompany\Orders;

class Order_Madras_2 extends \Bga\Games\JohnCompany\Models\Order
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = ORDER_MADRAS_2;
    $this->northernPriority = 17;
    $this->value = 4;
    $this->filledValue = 2;
    $this->regionId = MADRAS;
    $this->connectedOrders = [
      ORDER_MYSORE_2,
      ORDER_MADRAS_1,
    ];
  }

}
