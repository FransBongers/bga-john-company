<?php

namespace Bga\Games\JohnCompany\Cards\Promise;

class TakeMyOfficeHolderBonus extends \Bga\Games\JohnCompany\Models\PromiseCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->title = clienttranslate('Take my officeholder\'s bonus.');
  }
}
