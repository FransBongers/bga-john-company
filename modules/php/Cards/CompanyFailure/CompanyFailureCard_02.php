<?php

namespace Bga\Games\JohnCompany\Cards\CompanyFailure;

class CompanyFailureCard_02 extends \Bga\Games\JohnCompany\Models\CompanyFailureCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'CompanyFailureCard_02';
    $this->title = clienttranslate('Careless Shipbuilders indicted!');
    $this->text = [clienttranslate('Lower each player\'s score by 1VP for each of their shipyards.')];
  }
}
