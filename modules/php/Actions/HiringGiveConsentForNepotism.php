<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Models\Player;

class HiringGiveConsentForNepotism extends Hiring
{
  public function getState()
  {
    return ST_HIRING_GIVE_CONSENT_FOR_NEPOTISM;
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsHiringGiveConsentForNepotism()
  {
    $args = $this->ctx->getArgs();

    $familyMember = FamilyMembers::get($args['familyMemberId']);
    $currentOffice = $familyMember->getOffice();

    $appointingCommander = $args['appointingCommander'] ?? false;
    $officeId = $args['officeId'];

    $office = null;
    if ($appointingCommander) {
    } else {
      $office = Offices::get($args['officeId']);
    }

    $data = [
      'title' => $this->getTitleArgs($officeId, $office),
      'officeId' => $args['officeId'],
      'office' => $office,
      'hiringPlayerId' => $args['hiringPlayerId'],
      'familyMember' => $familyMember,
      'currentPosition' => $currentOffice !== null ? $currentOffice->getTitle() : $this->getPreviousFunctionFromLocation($familyMember->getLocation()),
      'appointingCommander' => $appointingCommander,
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

  public function actPassHiringGiveConsentForNepotism()
  {
    $this->resolveAction(PASS);
  }

  public function actHiringGiveConsentForNepotism($args)
  {
    self::checkAction('actHiringGiveConsentForNepotism');
    $playerId = $this->checkPlayer();

    $consent = $args->consent;

    $stateArgs = $this->argsHiringGiveConsentForNepotism();

    if (!$consent) {
      $this->onNoConsentGiven($playerId, $stateArgs);
      $this->setAllActivePlayerIdsNonMultiactive();
      $this->resolveAction([], true);
      return;
    }

    $this->updateConsent($playerId);
    Game::get()->gamestate->setPlayerNonMultiactive($playerId, 'next');

    if (! $this->allConsentsGiven()) {
      return;
    }

    $this->setAllActivePlayerIdsNonMultiactive();

    Notifications::message(clienttranslate('All candidates have given their consent'));

    $this->performAction($stateArgs['hiringPlayerId'], $stateArgs['familyMember'], $stateArgs['officeId']);

    $this->resolveAction([], true);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private function onNoConsentGiven(int $playerId, array $stateArgs)
  {
    Notifications::message(clienttranslate('${player_name} does not give their consent'), [
      'player' => Players::get($playerId),
    ]);

    $hiringPlayerId = $stateArgs['hiringPlayerId'];
    $officeId = $stateArgs['officeId'];
    $appointingCommander = $stateArgs['appointingCommander'];

    $this->ctx->insertAsBrother(new LeafNode([
      'action' => HIRING_HIRE_FAMILY_MEMBER,
      'playerId' => 'some',
      'activePlayerIds' => [$hiringPlayerId],
      'args' => [
        'officeId' => $officeId,
        'hiringPlayerId' => $hiringPlayerId,
        'appointingCommander' => $appointingCommander,
        'consentForNepotismRejected' => true
      ],
    ]));
  }

  private function allConsentsGiven(): bool
  {
    $consent = $this->ctx->getInfo()['consent'] ?? [];
    $activePlayerIds = $this->getActivePlayerIds();
    foreach ($activePlayerIds as $playerId) {
      if (!in_array($playerId, $consent)) {
        return false;
      }
    }
    return true;
  }

  private function updateConsent(int $playerId)
  {
    $consent = $this->ctx->getInfo()['consent'] ?? [];
    $consent[] = $playerId;
    $this->ctx->updateInfo('consent', $consent);
    Engine::save();
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
    return clienttranslate('HiringGiveConsentForNepotism');
  }

  public function isDoable(Player $player): bool
  {
    return true;
  }
}
