<?php

namespace Bga\Games\JohnCompany\Cards\CompanyFailure;

class CompanyFailureCard_06 extends \Bga\Games\JohnCompany\Models\CompanyFailureCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'CompanyFailureCard_06';
    $this->title = clienttranslate('The British Despots of India!');
    $this->text = [clienttranslate('Lower each player\'s score by 2VP for each of their Governors or by 4VP for the Governor General. Anyone who had a Governor that was removed in Region Loss on the final turn should lower their score by 2VP for each.')];
  }
}
