<?php

namespace Bga\Games\JohnCompany\Cards\Law;

use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Managers\Ships;

class LawCard_32 extends \Bga\Games\JohnCompany\Models\LawCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'LawCard_32';
    $this->title = clienttranslate('Envoy to China');
    $this->background = 'Law2';
    $this->policyTarget = SHIPYARD;
    $this->initialSupport = -3;
    $this->text = [
      clienttranslate('Trade in China is worth £5 per export icon.'),
      '<br>',
      '<br>',
      clienttranslate('If the oﬃce has not been created, create the Superintendent of Trade in China oﬃce.'),
    ];
  }
}
