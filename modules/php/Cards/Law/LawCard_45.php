<?php

namespace Bga\Games\JohnCompany\Cards\Law;

use Bga\Games\JohnCompany\Managers\LawCards;
use Bga\Games\JohnCompany\Managers\Parliament;

class LawCard_45 extends \Bga\Games\JohnCompany\Models\LawCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'LawCard_45';
    $this->title = clienttranslate('Writer Privileges');
    $this->background = 'Law2';
    $this->policyTarget = WORKSHOP;
    $this->initialSupport = -3;
    $this->text = [
      clienttranslate('Players gain an additional £1 for each of their writers placed on an order in India. If the Writer Graft Reform law is in effect, discard it.'),
      '<br>',
      '<br>',
      [
        'log' => clienttranslate('If voting on deregulation, add 5 to its initial support. ${tkn_italicText_historicalNote}'),
        'args' => [
          'tkn_italicText_historicalNote' => clienttranslate('Historical note: relaxed restrictions led to cheaper prices on Indian goods in Britain and popular support for broader deregulation.'),
        ],
      ],
    ];
  }

  public function resolveImmediateEffects(object $ctx, bool $passed = true)
  {
    $primeMinister = Parliament::getPrimeMinisterPlayer();
    $writerGraftReformLaw = LawCards::get(WRITER_GRAFT_REFORM_ID);
    if ($writerGraftReformLaw->isInPlay()) {
      $writerGraftReformLaw->discard($primeMinister);
    }
  }
}
