<?php

namespace Bga\Games\JohnCompany\Orders;

class Order_Madras_1 extends \Bga\Games\JohnCompany\Models\Order
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = ORDER_MADRAS_1;
    $this->northernPriority = 15;
    $this->value = 5;
    $this->filledValue = 2;
    $this->regionId = MADRAS;
    $this->homePort = MADRAS;
    $this->connectedOrders = [
      ORDER_HYDERABAD_1,
      ORDER_MADRAS_2,
    ];
  }

}
