<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Parliament;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Models\FamilyMember;
use Bga\Games\JohnCompany\Models\Office;
use Bga\Games\JohnCompany\Models\Player;

class HiringHireFamilyMember extends Hiring
{
  public function getState()
  {
    return ST_HIRING_HIRE_FAMILY_MEMBER;
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsHiringHireFamilyMember()
  {
    $args = $this->ctx->getArgs();
    // Can also be location of the commander in case of Military Oversight
    $officeId = $args['officeId'];
    $consentForNepotismRejected = $args['consentForNepotismRejected'] ?? false;

    $options = [];
    $hiringPlayerId = null;
    $appointingCommander = false;
    $office = null;
    if (Utils::startsWith($officeId, 'Commander_')) {
      // Here $officeId is the location of the commander 'Commander_<presidencyId>'
      $presidencyId = explode('_', $officeId)[1];
      $options = FamilyMembers::getOfficers($presidencyId);
      $hiringPlayerId = Parliament::getPrimeMinisterPlayerId();
      $appointingCommander = true;
    } else {
      $office = Offices::get($officeId);
      $options = $office->getCandidatesForHiring();
      $hiringPlayerId = $office->getHiringPlayerId();
    }

    $familyId = Players::get($hiringPlayerId)->getFamilyId();
    $familyIdFilter = $args['familyIdFilter'] ?? null;

    if ($familyIdFilter !== null) {
      $options = Utils::filter($options, function ($candidate) use ($familyIdFilter) {
        return in_array($candidate->getFamilyId(), $familyIdFilter);
      });
    }

    if ($consentForNepotismRejected) {
      $options = Utils::filter($options, function ($candidate) use ($familyId) {
        return $candidate->getFamilyId() !== $familyId;
      });
    }

    $data = [
      'title' => $this->getTitleArgs($officeId, $office),
      'office' => $office,
      'options' => $options,
      'familyIdFilter' => $familyIdFilter,
      'officeId' => $officeId,
      'hiringFamilyId' => $familyId,
      'hiringPlayerId' => $hiringPlayerId,
      'consentForNepotismRequired' => Utils::array_some($options, function ($familyMember) use ($familyId) {
        return $familyMember->getFamilyId() !== $familyId;
      }),
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

  public function actPassHiringHireFamilyMember()
  {
    $this->resolveAction(PASS);
  }

  public function actHiringHireFamilyMember($args)
  {
    self::checkAction('actHiringHireFamilyMember');
    $playerId = $this->checkPlayer();

    $familyMemberId = $args->familyMemberId;

    $stateArgs = $this->argsHiringHireFamilyMember();
    $familyMember = Utils::array_find($stateArgs['options'], function ($candidate) use ($familyMemberId) {
      return $candidate->getId() === $familyMemberId;
    });

    if ($familyMember === null) {
      throw new \Bga\GameFramework\VisibleSystemException("ERROR_070");
    }

    if ($familyMember->getPlayerId() === $stateArgs['hiringPlayerId'] && $stateArgs['consentForNepotismRequired']) {
      $this->handleConsentForNepotism($familyMember, $playerId, $stateArgs);
    } else {
      $this->performAction($playerId, $familyMember, $stateArgs['officeId']);
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

  public function getPlayerIdsThatNeedToGiveConsentForNepotism(array $candidates, int $hiringPlayerId): array
  {
    // Implement the logic to determine which player IDs need to give consent for nepotism
    $playerIds = [];
    foreach ($candidates as $candidate) {
      $candidatePlayerId = $candidate->getPlayerId();
      if ($candidatePlayerId !== $hiringPlayerId && !in_array($candidatePlayerId, $playerIds)) {
        $playerIds[] = $candidatePlayerId;
      }
    }
    // TODO: add $hiringPlayerId if they have promissory note of one or more of the playerIds

    return $playerIds;
  }

  private function handleConsentForNepotism(FamilyMember $familyMember, int $playerId, array $stateArgs)
  {
    $previousOffice = $familyMember->getOffice();
    if ($stateArgs['appointingCommander']) {
      Notifications::message(clienttranslate('${player_name} want to appoint ${tkn_familyMember} as Commander of the ${tkn_boldText_army} and needs consent for nepotism'), [
        'player' => Players::get($playerId),
        'tkn_boldText_army' => Notifications::getArmyNameForPresidency(explode('_', $stateArgs['officeId'])[1]),
        'tkn_familyMember' => Notifications::tknFamilyMember($familyMember),
        'i18n' => ['tkn_boldText_army'],
      ]);
    } else {
      Notifications::message(clienttranslate('${player_name} want to hire ${tkn_familyMember} as ${tkn_boldText_office} (previously ${previousFunction}) and needs consent for nepotism'), [
        'player' => Players::get($playerId),
        'previousFunction' => $previousOffice !== null ? $previousOffice->getTitle() : $this->getPreviousFunctionFromLocation($familyMember->getLocation()),
        'tkn_boldText_office' => $stateArgs['office']->getTitle(),
        'tkn_familyMember' => Notifications::tknFamilyMember($familyMember),
        'i18n' => ['tkn_boldText_office', 'previousFunction'],
      ]);
    }

    $this->ctx->insertAsBrother(new LeafNode([
      'action' => HIRING_GIVE_CONSENT_FOR_NEPOTISM,
      'playerId' => 'some',
      'activePlayerIds' => $this->getPlayerIdsThatNeedToGiveConsentForNepotism($stateArgs['options'], $stateArgs['hiringPlayerId']),
      'args' => [
        'familyMemberId' => $familyMember->getId(),
        'officeId' => $stateArgs['officeId'],
        'hiringFamilyId' => $stateArgs['hiringFamilyId'],
        'hiringPlayerId' => $stateArgs['hiringPlayerId'],
        'appointingCommander' => $stateArgs['appointingCommander'],
      ],
    ]));
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
    return clienttranslate('HiringHireFamilyMember');
  }

  public function isDoable(Player $player): bool
  {
    return true;
  }
}
