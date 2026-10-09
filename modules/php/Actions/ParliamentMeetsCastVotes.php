<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Managers\Families;
use Bga\Games\JohnCompany\Managers\LondonSeasonCards;
use Bga\Games\JohnCompany\Managers\Parliament;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Models\Family;
use Bga\Games\JohnCompany\Models\Player;

class ParliamentMeetsCastVotes extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_PARLIAMENT_MEETS_CAST_VOTES;
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsParliamentMeetsCastVotes()
  {
    $args = $this->ctx->getArgs();

    $playerId = $this->ctx->getArgs()['playerId'];
    $familyId = Players::get($playerId)->getFamilyId();
    $family = Families::get($familyId);

    $data = [
      'votes' => $this->getVotes($family),
      'options' => $this->getOptions($family, $playerId),
    ];

    return $data;
  }

  //  .########..##..........###....##....##.########.########.
  //  .##.....##.##.........##.##....##..##..##.......##.....##
  //  .##.....##.##........##...##....####...##.......##.....##
  //  .########..##.......##.....##....##....######...########.
  //  .##........##.......#########....##....##.......##...##..
  //  .##........##.......##.....##....##....##.......##....##.
  //  .##........########.##.....##....##....########.##.....##

  // ....###.....######..########.####..#######..##....##
  // ...##.##...##....##....##.....##..##.....##.###...##
  // ..##...##..##..........##.....##..##.....##.####..##
  // .##.....##.##..........##.....##..##.....##.##.##.##
  // .#########.##..........##.....##..##.....##.##..####
  // .##.....##.##....##....##.....##..##.....##.##...###
  // .##.....##..######.....##....####..#######..##....##

  public function actPassParliamentMeetsCastVotes()
  {
    $playerId = $this->checkPlayer();

    Game::get()->gamestate->setPlayerNonMultiactive($playerId, 'next');
    $this->resolveAction(PASS, true);
  }

  public function actParliamentMeetsCastVotes($args)
  {
    self::checkAction('actParliamentMeetsCastVotes');
    $playerId = $this->checkPlayer();

    Game::get()->gamestate->setPlayerNonMultiactive($playerId, 'next');
    $this->resolveAction([], true);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private function getOptions(Family $family, int $playerId)
  {
    if ($playerId === Parliament::getPrimeMinisterPlayerId()) {
      return [IN_FAVOR];
    }

    if ($family->getIsLeaderOfOpposition()) {
      return [AGAINST];
    }

    return [IN_FAVOR, AGAINST];
  }

  private function getVotes(Family $family)
  {

    $policyTarget = PRIME_MINISTER_DIAL[Parliament::getDialPosition()][TARGET];

    $options = [
      'money' => $family->getTreasury(),
      'enterprises' => [],
      'londonSeasonCards' => [],
    ];

    foreach ($family->getEnterprises() as $enterprise) {
      $votes = $enterprise->getVotes();
      if ($votes > 0 && $enterprise->getUsed() === 0) {
        $options['enterprises'][] = [
          'id' => $enterprise->getId(),
          'votes' => $votes,
        ];
      }
    }

    $policyTargets = [
      'PrestigeCard_23' => [MANUFACTURING_POLICY, SHIPPING_POLICY],
      'PrestigeCard_26' => [SOCIAL_POLICY, COMPANY_SHARES_POLICY],
    ];
    $cards = LondonSeasonCards::getInLocation(Locations::londonSeasonCards($family->getId()))->toArray();
    foreach ($cards as $card) {
      $votes = $card->getVotes();
      if ($votes <= 0 || $card->getUsed() !== 0) {
        continue;
      }

      $cardId = $card->getId();
      if (isset($policyTargets[$cardId]) && !in_array($policyTarget, $policyTargets[$cardId])) {
        continue;
      }

      $options['londonSeasonCards'][] = [
        'id' => $cardId,
        'votes' => $votes,
      ];
    }

    return $options;
  }

  // .########.##....##..######...####.##....##.########
  // .##.......###...##.##....##...##..###...##.##......
  // .##.......####..##.##.........##..####..##.##......
  // .######...##.##.##.##...####..##..##.##.##.######..
  // .##.......##..####.##....##...##..##..####.##......
  // .##.......##...###.##....##...##..##...###.##......
  // .########.##....##..######...####.##....##.########

  public function getDescription(): string|array
  {
    return clienttranslate('ParliamentMeetsCastVotes');
  }

  public function isDoable(Player $player): bool
  {
    return true;
  }
}
