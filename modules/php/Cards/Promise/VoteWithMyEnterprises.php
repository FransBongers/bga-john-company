<?php

namespace Bga\Games\JohnCompany\Cards\Promise;

class VoteWithMyEnterprises extends \Bga\Games\JohnCompany\Models\PromiseCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->title = clienttranslate('Vote with my enterprises as if you owned them.');
  }
}
