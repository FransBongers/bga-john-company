<?php

namespace Bga\Games\JohnCompany\Cards\Promise;

class TakeTwoOrLessFromMe extends \Bga\Games\JohnCompany\Models\PromiseCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->title = clienttranslate('Take £2 or less from me.');
  }
}
