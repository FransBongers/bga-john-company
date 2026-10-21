<?php

namespace Bga\Games\JohnCompany\Cards\Promise;

class TakeMyLondonSeasonCard extends \Bga\Games\JohnCompany\Models\PromiseCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->title = clienttranslate('Take my card from the London Season Display.');
  }
}
