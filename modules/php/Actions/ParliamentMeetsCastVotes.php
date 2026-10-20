<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Managers\Enterprises;
use Bga\Games\JohnCompany\Managers\Families;
use Bga\Games\JohnCompany\Managers\LawCards;
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
      'primeMinisterPlayerId' => Parliament::getPrimeMinisterPlayerId(),
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

    Notifications::message(clienttranslate('${player_name} does not cast any votes'), [
      'player' => Players::get($playerId)
    ]);

    Game::get()->gamestate->setPlayerNonMultiactive($playerId, 'next');
    $this->resolveAction(PASS, true);
  }

  public function actParliamentMeetsCastVotes($args)
  {
    self::checkAction('actParliamentMeetsCastVotes');
    $playerId = $this->checkPlayer();

    $stateArgs = $this->argsParliamentMeetsCastVotes();
    $option = $args->option; // IN_FAVOR or AGAINST
    $money = (int) $args->money; // Money
    $enterpriseCardIds = $args->enterpriseCardIds ?? [];
    $londonSeasonCardIds = $args->londonSeasonCardIds ?? [];
    $targetPlayerId = isset($args->targetPlayerId) ? (int) $args->targetPlayerId : null;

    if (!in_array($option, $stateArgs['options'])) {
      throw new \Bga\GameFramework\VisibleSystemException("ERROR_061");
    }
    if ($money < 0 || $money > $stateArgs['votes']['money'] || $money % $stateArgs['votes']['pricePerVote'] !== 0) {
      throw new \Bga\GameFramework\VisibleSystemException("ERROR_062");
    }
    if (
      $option === AGAINST &&
      ($targetPlayerId === null || $targetPlayerId === CROWN_PLAYER_ID || $targetPlayerId === $stateArgs['primeMinisterPlayerId'])
    ) {
      throw new \Bga\GameFramework\VisibleSystemException("ERROR_063");
    }

    $player = Players::get($playerId);
    $family = $player->getFamily();

    $totalVotes = $money / $stateArgs['votes']['pricePerVote'];
    $enterprises = [];
    $londonSeasonCards = [];
    foreach (array_unique($enterpriseCardIds) as $cardId) {
      $option_ = Utils::array_find($stateArgs['votes']['enterprises'], function ($item) use ($cardId) {
        return $item['id'] === $cardId;
      });
      if ($option_ === null) {
        throw new \Bga\GameFramework\VisibleSystemException("ERROR_064");
      }
      $totalVotes += $option_['votes'];
      $enterprises[] = Enterprises::get($cardId);
    }
    foreach (array_unique($londonSeasonCardIds) as $cardId) {
      $option_ = Utils::array_find($stateArgs['votes']['londonSeasonCards'], function ($item) use ($cardId) {
        return $item['id'] === $cardId;
      });
      if ($option_ === null) {
        throw new \Bga\GameFramework\VisibleSystemException("ERROR_065");
      }
      $totalVotes += $option_['votes'];
      $londonSeasonCards[] = LondonSeasonCards::get($cardId);
    }

    if ($totalVotes <= 0) {
      throw new \Bga\GameFramework\VisibleSystemException("ERROR_066");
    }

    $family->incTreasury(-$money);
    foreach ($enterprises as $enterprise) {
      $enterprise->setUsed(1);
    }
    foreach ($londonSeasonCards as $card) {
      $card->setUsed(1);
    }

    $targetNeedsToCommitToOpposition = false;
    if ($option === IN_FAVOR) {
      $this->voteInFavor($totalVotes);
    } else {
      $targetNeedsToCommitToOpposition = $this->voteAgainst($targetPlayerId, $playerId, $totalVotes);
    }
    Parliament::incVotesCastThisRound($totalVotes);

    Notifications::castVotes(
      $player,
      $option,
      $totalVotes,
      $money,
      Parliament::getSupport(),
      $option === AGAINST ? Players::get($targetPlayerId) : null,
      $enterprises,
      $londonSeasonCards
    );

    if ($targetNeedsToCommitToOpposition) {
      $this->handleCommitToOpposition($targetPlayerId, $playerId, $totalVotes);
    }

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

  private function voteInFavor(int $totalVotes) {
    Parliament::incSupport($totalVotes);
  }

  private function voteAgainst(int $targetPlayerId, int $playerId, int $totalVotes)
  {
    Parliament::incSupport(-$totalVotes);
    if ($targetPlayerId === $playerId) {
      Parliament::addPlayerThatVotedAgainst($playerId);
    }
    if (in_array($targetPlayerId, Parliament::getPlayersThatVotedAgainst())) {
      Parliament::incOppositionVotes($targetPlayerId, $totalVotes);
      return false;
    }

    return true;
  }

  private function handleCommitToOpposition(int $targetPlayerId, int $votingPlayerId, int $numberOfVotes)
  {
    Notifications::message(clienttranslate('${player_name} has not voted against the proposed law yet'), [
      'player' => Players::get($targetPlayerId),
    ]);
    $this->ctx->insertAsBrother(new LeafNode([
      'action' => PARLIAMENT_MEETS_COMMIT_TO_OPPOSITION,
      'playerId' => 'some',
      'activePlayerIds' => [$targetPlayerId],
      'args' => [
        'targetPlayerId' => $targetPlayerId,
        'votingPlayerId' => $votingPlayerId,
        'numberOfVotes' => $numberOfVotes,
      ]
    ]));
  }

  private function getOptions(Family $family, int $playerId)
  {
    if ($playerId === Parliament::getPrimeMinisterPlayerId()) {
      return [IN_FAVOR];
    }

    $playersThatVotedAgainst = Parliament::getPlayersThatVotedAgainst();
    if (in_array($playerId, $playersThatVotedAgainst)) {
      return [AGAINST];
    }

    return [IN_FAVOR, AGAINST];
  }

  private function getVotes(Family $family)
  {

    $policyTarget = PRIME_MINISTER_DIAL[Parliament::getDialPosition()][TARGET];

    $options = [
      'money' => $family->getTreasury(),
      'pricePerVote' => LawCards::isInPlay(MASSED_DEMAND_FRANCHISE_ID) ? 2 : 1,
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
      'PrestigeCard_23' => [WORKSHOP, SHIPYARD],
      'PrestigeCard_26' => [LUXURY, SHARE],
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
