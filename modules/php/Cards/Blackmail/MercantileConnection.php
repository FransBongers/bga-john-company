<?php

namespace Bga\Games\JohnCompany\Cards\Blackmail;

class MercantileConnection extends \Bga\Games\JohnCompany\Models\BlackmailCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->title = clienttranslate('Mercantile Connection');
  }
}
