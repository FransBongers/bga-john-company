<?php

namespace Bga\Games\JohnCompany\Cards\Blackmail;

class PrestigeCard_23 extends \Bga\Games\JohnCompany\Models\PrestigeCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PrestigeCard_23';
    $this->title = clienttranslate('LABOUR NEWSPAPER');
    $this->type = ENTERPRISE;
  }
}
