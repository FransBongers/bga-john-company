<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Models\Office;
use Bga\Games\JohnCompany\Models\Player;

class HiringHireFamilyMember extends \Bga\Games\JohnCompany\Models\AtomicAction
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

    $options = $office->getCandidatesForHiring();

    $data = [
      'office' => $office,
      'options' => $options,
      'hiringFamilyId' => $familyId,
      'hiringPlayerId' => $hiringPlayerId,
      'constentForNepotismRequired' => Utils::array_some($options, function ($familyMember) use ($familyId) {
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

    $this->performAction($playerId, $familyMemberId, $stateArgs['office']);

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

  private function getPreviousFunctionFromLocation(string $location): string
  {
    switch ($location) {
      case 'Commander_Bengal':
        return clienttranslate('Commander of the Army of Bengal');
      case 'Commander_Bombay':
        return clienttranslate('Commander of the Army of Bombay');
      case 'Commander_Madras':
        return clienttranslate('Commander of the Army of Madras');
      case OFFICER_IN_TRAINING:
        return clienttranslate('Officer-in-Training');
      case Locations::armyOfReady(BENGAL):
        return clienttranslate('Officer in the Army of Bengal');
      case Locations::armyOfReady(BOMBAY):
        return clienttranslate('Officer in the Army of Bombay');
      case Locations::armyOfReady(MADRAS):
        return clienttranslate('Officer in the Army of Madras');
      case Locations::writers(BENGAL_PRESIDENCY):
        return clienttranslate('Writer in the Bengal Presidency');
      case Locations::writers(BOMBAY_PRESIDENCY):
        return clienttranslate('Writer in the Bombay Presidency');
      case Locations::writers(MADRAS_PRESIDENCY):
        return clienttranslate('Writer in the Madras Presidency');
      default:
        throw new \Bga\GameFramework\VisibleSystemException("ERROR_HIRING: " . $location);
    }
  }


  public function performAction(int $hiringPlayerId, string $familyMemberId, Office $office)
  {
    $hiringPlayer = Players::get($hiringPlayerId);

    $familyMember = FamilyMembers::get($familyMemberId);
    $hiredPlayer = $familyMember->getPlayer();

    $previousOffice = $familyMember->getOffice();

    $familyMember->moveTo($hiringPlayer, $office->getId(), [
      'text' => clienttranslate('${player_name} hires ${tkn_familyMember} as ${tkn_boldText_office} (previously ${previousFunction})'),
      'textArgs' => [
        'previousFunction' => $previousOffice !== null ? $previousOffice->getTitle() : $this->getPreviousFunctionFromLocation($familyMember->getLocation()),
        'tkn_boldText_office' => $office->getTitle(),
        'i18n' => ['tkn_boldText_office', 'previousFunction'],
      ]
    ]);

    $office->setFamilyMemberId($familyMember->getId());
    $office->setLocation(Locations::familyOffices($familyMember->getFamilyId()));
    Notifications::moveOfficeCard($hiredPlayer, $office, '', []);

    if ($previousOffice !== null) {
      $previousOffice->moveToVacantOffices($hiredPlayer);
    }
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
