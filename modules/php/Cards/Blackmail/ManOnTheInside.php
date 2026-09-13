<?php

namespace Bga\Games\JohnCompany\Cards\Blackmail;

class ManOnTheInside extends \Bga\Games\JohnCompany\Models\BlackmailCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->title = clienttranslate('Man on the Inside');
  }
}
