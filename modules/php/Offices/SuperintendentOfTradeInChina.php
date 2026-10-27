<?php

namespace Bga\Games\JohnCompany\Offices;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Families;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Models\Player;

class SuperintendentOfTradeInChina extends \Bga\Games\JohnCompany\Models\Office
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = SUPERINTENDENT_OF_TRADE_IN_CHINA;
    $this->title = clienttranslate('Superintendent of Trade in China');
    $this->hirePriority = 8;
  }

  public function getCandidatesForHiring(): array
  {
    return FamilyMembers::getWriters();
  }

  public function getHiringPlayerId(): int | null
  {
    return Offices::get(CHAIRMAN)->getPlayerId();
  }

  public function createOffice(Player $player, object $ctx)
  {
    Notifications::openTradeWithChina($player);

    $office = Offices::get(SUPERINTENDENT_OF_TRADE_IN_CHINA);
    $office->moveToVacantOffices($player);

    if (count($office->getCandidatesForHiring()) > 0) {
      $chairmanPlayerId = Families::getChairmanFamily()->getPlayerId();
      $ctx->insertAsBrother(new LeafNode([
        'action' => HIRING_HIRE_FAMILY_MEMBER,
        'playerId' => 'some',
        'activePlayerIds' => [$chairmanPlayerId],
        'args' => [
          'officeId' => $office->getId(),
          'hirerPlayerId' => $chairmanPlayerId,
        ],
      ]));
    }
  }
}
