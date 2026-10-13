<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Managers\LawCards;
use Bga\Games\JohnCompany\Managers\Parliament;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Models\LawCard;
use Bga\Games\JohnCompany\Models\Player;

class ParliamentMeetsAdditionalRoundOrResolve extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_PARLIAMENT_MEETS_ADDITIONAL_ROUND_OR_RESOLVE;
  }

  // ..######..########....###....########.########
  // .##....##....##......##.##......##....##......
  // .##..........##.....##...##.....##....##......
  // ..######.....##....##.....##....##....######..
  // .......##....##....#########....##....##......
  // .##....##....##....##.....##....##....##......
  // ..######.....##....##.....##....##....########

  // ....###.....######..########.####..#######..##....##
  // ...##.##...##....##....##.....##..##.....##.###...##
  // ..##...##..##..........##.....##..##.....##.####..##
  // .##.....##.##..........##.....##..##.....##.##.##.##
  // .#########.##..........##.....##..##.....##.##..####
  // .##.....##.##....##....##.....##..##.....##.##...###
  // .##.....##..######.....##....####..#######..##....##

  public function stParliamentMeetsAdditionalRoundOrResolve()
  {
    if (Parliament::getVotesCastThisRound() > 0) {
      return;
    }

    $this->resolveVote();

    $this->resolveAction(['automatic' => true], true);
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsParliamentMeetsAdditionalRoundOrResolve()
  {
    $args = $this->ctx->getArgs();

    $data = [
      'skipOnEnteringState' => Parliament::getVotesCastThisRound() === 0,
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

  public function actPassParliamentMeetsAdditionalRoundOrResolve()
  {
    $playerId = $this->checkPlayer();

    Game::get()->gamestate->setPlayerNonMultiactive($playerId, 'next');
    $this->resolveAction(PASS, true);
  }

  public function actParliamentMeetsAdditionalRoundOrResolve($args)
  {
    self::checkAction('actParliamentMeetsAdditionalRoundOrResolve');
    $playerId = $this->checkPlayer();
    $stop = $args->stop;

    if ($stop) {
      $this->resolveVote($playerId);
    } else {
      $this->initiateAdditionalRound($playerId);
    }

    Parliament::setVotesCastThisRound(0);

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

  private function handlePassedLaw(LawCard $law)
  {
    // Place on top of passed laws
    $primeMinister = Parliament::getPrimeMinisterPlayer();
    $law->move($primeMinister, Locations::passedLaws());

    // Prime minister gets passed law token
    $primeMinister->getFamily()->gainPassedLawToken();


    $this->ctx->insertAsBrother(Engine::buildTree([
      'children' => [
        // Resolve policy consequence
        [
          'action' => PARLIAMENT_MEETS_RESOLVE_POLICY
        ],
        // Resolve any immediate effects
        [
          'action' => PARLIAMENT_MEETS_RESOLVE_LAW,
          'args' => [
            'passed' => true,
            'lawCardId' => $law->getId()
          ]
        ]
      ]
    ]));
  }

  private function handleFailedLaw(LawCard $law)
  {
    // Fail any if failed effects if dilemma
    $law->resolveImmediateEffects(false);

    $leaderOppositionPlayerId = Parliament::getLeaderOfOpposition();
    // Discard Law
    $law->move(Players::get($leaderOppositionPlayerId ?? Parliament::getPrimeMinisterPlayerId()), DISCARD);
    // Leader of opposition becomes PrimeMinister, selects policy and resolves its effects

    if ($leaderOppositionPlayerId === null) {
      Notifications::message(clienttranslate('Prime Minister does not change: there is no leader of the opposition'));
      return;
    }
    Parliament::changePrimeMinister(Players::get($leaderOppositionPlayerId)->getFamilyId());

    $this->ctx->insertAsBrother(new LeafNode([
      'action' => PARLIAMENT_MEETS_SELECT_POLICY,
      'playerId' => 'some',
      'activePlayerIds' => [$leaderOppositionPlayerId],
      'args' => [
        'playerId' => $leaderOppositionPlayerId,
        'source' => FAILED_LAW
      ]
    ]));
  }

  private function resolveVote(int | null $playerId = null)
  {
    $lawPasses = Parliament::getSupport() >= 0;

    if ($playerId === null) {
      Notifications::message(clienttranslate('No votes have been cast this round. The vote must be resolved: the law ${tkn_boldText_failsOrPasses}'), [
        'tkn_boldText_failsOrPasses' => clienttranslate($lawPasses ? 'passes' : 'fails'),
        'i18n' => ['tkn_boldText_failsOrPasses']
      ]);
    } else {
      Notifications::message(clienttranslate('${player_name} decides to stop and resolve the vote: the law ${tkn_boldText_failsOrPasses}'), [
        'player' => Players::get($playerId),
        'tkn_boldText_failsOrPasses' => clienttranslate($lawPasses ? 'passes' : 'fails'),
        'i18n' => ['tkn_boldText_failsOrPasses']
      ]);
    }

    $law = LawCards::getTopOf(Locations::selectedLaw());

    if ($lawPasses) {
      $this->handlePassedLaw($law);
    } else {
      $this->handleFailedLaw($law);
    }
  }

  private function initiateAdditionalRound(int $playerId)
  {
    Notifications::message(clienttranslate('${player_name} decides to initiate an additional round of voting'), ['player' => Players::get($playerId)]);

    $this->ctx->getParent()->insertAsBrother(Engine::buildTree(
      Parliament::getRoundOfVotingNodes()
    ));
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
    return clienttranslate('ParliamentMeetsAdditionalRoundOrResolve');
  }

  public function isDoable(Player $player): bool
  {
    return true;
  }
}
