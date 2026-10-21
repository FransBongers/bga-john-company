<?php

namespace Bga\Games\JohnCompany\Cards\CompanyFailure;

class CompanyFailureCard_03 extends \Bga\Games\JohnCompany\Models\CompanyFailureCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'CompanyFailureCard_03';
    $this->title = clienttranslate('Industry\'s Greed Condemned!');
    $this->text = [clienttranslate('Do not score workshops. If deregulated, do not score firm shares or pieces in Debtor\'s Prison.')];
  }
}
