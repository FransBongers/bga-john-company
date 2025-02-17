<?php

namespace Bga\Games\JohnCompany\Scenarios;

class The1710Scenario extends \Bga\Games\JohnCompany\Models\Scenario
{
  public function __construct()
  {
    parent::__construct();
    $this->id = THE_1710_SCENARIO;
    $this->name = clienttranslate('The 1710 Scenario');
    $this->setupCards = 1710;
    $this->companyDebt = 0;
    $this->companyStanding = 10;
    $this->companyTreasuries = 3;
    $this->companyShips = [];
    $this->startTurn = 1;
    $this->orders = [
      ORDER_PUNJAB_1 => CLOSED,
      ORDER_DELHI_2 => CLOSED,
      ORDER_DELHI_3 => CLOSED,
      ORDER_BOMBAY_2 => CLOSED,
      ORDER_HYDERABAD_1 => CLOSED,
      ORDER_MADRAS_2 => CLOSED,
      ORDER_MARATHA_2 => CLOSED,
    ];
    $this->regions = [
      BENGAL => [
        'strength' => 1
      ],
      BOMBAY => [
        'strength' => 1
      ],
      DELHI => [
        'strength' => 1
      ],
      HYDERABAD => [
        'strength' => 1
      ],
      MADRAS => [
        'strength' => 1
      ],
      MARATHA => [
        'control' => DELHI,
        'strength' => 2
      ],
      MYSORE => [
        'strength' => 1
      ],
      PUNJAB => [
        'control' => DELHI,
        'strength' => 0,
      ],
    ];
    $this->armies = [
      BENGAL => 1,
      BOMBAY => 1,
      MADRAS => 1,
    ];
    $this->passedLaws = [];
    $this->elephant = null;
  }
}
