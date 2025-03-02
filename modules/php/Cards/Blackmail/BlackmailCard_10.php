<?php

namespace Bga\Games\JohnCompany\Cards\Blackmail;

class BlackmailCard_10 extends \Bga\Games\JohnCompany\Models\BlackmailCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'BlackmailCard_10';
    $this->title = clienttranslate('Man on the Inside');
  }
}
