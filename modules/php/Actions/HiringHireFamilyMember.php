<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Offices;
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
    $officeId = $args['officeId'];

    $office = Offices::get($officeId);
    $hiringPlayerId = $office->getHiringPlayerId();
    $familyId = Players::get($hiringPlayerId)->getFamilyId();
    $familyIdFilter = $args['familyIdFilter'] ?? null;

    $options = $office->getCandidatesForHiring();
    if ($familyIdFilter !== null) {
      $options = array_filter($options, function ($candidate) use ($familyIdFilter) {
        return in_array($candidate->getFamilyId(), $familyIdFilter);
      });
    }

    $data = [
      'office' => $office,
      'options' => $options,
      'hiringFamilyId' => $familyId,
      'hiringPlayerId' => $hiringPlayerId,
      'consentForNepotismRequired' => Utils::array_some($options, function ($familyMember) use ($familyId) {
        return $familyMember->getFamilyId() !== $familyId;
      }),
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
      $this->performAction($playerId, $familyMember, $stateArgs['office']);
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
    Notifications::message(clienttranslate('${player_name} want to hire ${tkn_familyMember} as ${tkn_boldText_office} (previously ${previousFunction}) and needs consent for nepotism'), [
      'player' => Players::get($playerId),
      'previousFunction' => $previousOffice !== null ? $previousOffice->getTitle() : $this->getPreviousFunctionFromLocation($familyMember->getLocation()),
      'tkn_boldText_office' => $stateArgs['office']->getTitle(),
      'tkn_familyMember' => Notifications::tknFamilyMember($familyMember),
      'i18n' => ['tkn_boldText_office', 'previousFunction'],
    ]);

    $this->ctx->insertAsBrother(new LeafNode([
      'action' => HIRING_GIVE_CONSENT_FOR_NEPOTISM,
      'playerId' => 'some',
      'activePlayerIds' => $this->getPlayerIdsThatNeedToGiveConsentForNepotism($stateArgs['options'], $stateArgs['hiringPlayerId']),
      'args' => [
        'familyMemberId' => $familyMember->getId(),
        'officeId' => $stateArgs['office']->getId(),
        'hiringFamilyId' => $stateArgs['hiringFamilyId'],
        'hiringPlayerId' => $stateArgs['hiringPlayerId'],
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
