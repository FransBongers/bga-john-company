<?php

namespace Bga\Games\JohnCompany\Cards\CompanyFailure;

class CompanyFailureCard_05 extends \Bga\Games\JohnCompany\Models\CompanyFailureCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'CompanyFailureCard_05';
    $this->title = clienttranslate('Military Rebuked!');
    $this->text = [clienttranslate('Lower each player\'s score by half of the sum of their officers, Commanders, and trophies (rounding down).')];
  }
}
