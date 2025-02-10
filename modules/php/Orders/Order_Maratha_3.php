<?php

namespace Bga\Games\JohnCompany\Orders;

class Order_Maratha_3 extends \Bga\Games\JohnCompany\Models\Order
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = ORDER_MARATHA_3;
    $this->northernPriority = 11;
    $this->value = 2;
    $this->filledValue = 1;
    $this->regionId = MARATHA;
    $this->connectedOrders = [
      ORDER_MARATHA_2,
      ORDER_BENGAL_1,
      ORDER_HYDERABAD_1,
    ];
  }

}
