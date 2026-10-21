<?php

namespace Bga\Games\JohnCompany\Cards\CompanyFailure;

class CompanyFailureCard_01 extends \Bga\Games\JohnCompany\Models\CompanyFailureCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'CompanyFailureCard_01';
    $this->title = clienttranslate('Court of directors blameless!');
    $this->text = [clienttranslate('Treat the value of Company shares as if the Company had been successful.')];
  }
}
