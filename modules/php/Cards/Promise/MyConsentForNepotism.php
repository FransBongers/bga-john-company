<?php

namespace Bga\Games\JohnCompany\Cards\Promise;

class MyConsentForNepotism extends \Bga\Games\JohnCompany\Models\PromiseCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->title = clienttranslate('My consent for nepotism.');
  }
}
