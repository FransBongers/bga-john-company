<?php

namespace Bga\Games\JohnCompany\Cards\Blackmail;

class EnvoyToTheMughals extends \Bga\Games\JohnCompany\Models\BlackmailCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->title = clienttranslate('Envoy to the Mughals');
    $this->text = [
      clienttranslate('Play anytime on a turn before the Events in India phase. Move the Elephant to any legal position and then take £ equal to the highest open order in the region with the Elephant\'s tail.')
    ];
  }
}
