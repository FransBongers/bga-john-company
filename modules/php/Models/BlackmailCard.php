<?php

namespace Bga\Games\JohnCompany\Models;

class BlackmailCard extends \Bga\Games\JohnCompany\Models\LondonSeasonCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->type = BLACKMAIL;
    $this->background = 'Blackmail';
  }

  public function jsonSerializePrivate(): array
  {
    $hiddenId = $this->getId();
    $data = parent::jsonSerialize();
    $data['hiddenId'] = $hiddenId;
    return $data;
  }
}
