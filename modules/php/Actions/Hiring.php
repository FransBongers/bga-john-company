<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Models\FamilyMember;
use Bga\Games\JohnCompany\Models\Office;

class Hiring extends \Bga\Games\JohnCompany\Models\AtomicAction
{


  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  protected function getTitleArgs(string $officeId, Office | null $office): string | array
  {
    return $office !== null ? $office->getTitle() : [
      'log' => clienttranslate('Commander of the ${armyName}'),
      'args' => [
        'armyName' => Notifications::getArmyNameForPresidency(explode('_', $officeId)[1])
      ],
    ];
  }

  protected function getPreviousFunctionFromLocation(string $location): string
  {
    switch ($location) {
      case Locations::commander(BENGAL_PRESIDENCY):
        return clienttranslate('Commander of the Army of Bengal');
      case Locations::commander(BOMBAY_PRESIDENCY):
        return clienttranslate('Commander of the Army of Bombay');
      case Locations::commander(MADRAS_PRESIDENCY):
        return clienttranslate('Commander of the Army of Madras');
      case OFFICER_IN_TRAINING:
        return clienttranslate('Officer-in-Training');
      case Locations::armyOfReady(BENGAL_PRESIDENCY):
        return clienttranslate('Officer in the Army of Bengal');
      case Locations::armyOfReady(BOMBAY_PRESIDENCY):
        return clienttranslate('Officer in the Army of Bombay');
      case Locations::armyOfReady(MADRAS_PRESIDENCY):
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

  public function performAction(int $hiringPlayerId, FamilyMember $familyMember, string $officeId)
  {
    $hiringPlayer = Players::get($hiringPlayerId);

    // $familyMember = FamilyMembers::get($familyMemberId);
    $hiredPlayer = $familyMember->getPlayer();


    $previousOffice = $familyMember->getOffice();
    $appointingCommander = Utils::startsWith($officeId, 'Commander_');

    if ($appointingCommander) {
      $familyMember->moveTo($hiringPlayer, $officeId, [
        'text' => clienttranslate('${player_name} appoints ${tkn_familyMember} as Commander of the ${tkn_boldText_army}'),
        'textArgs' => [
          'tkn_boldText_army' => Notifications::getArmyNameForPresidency(explode('_', $officeId)[1]),
          'i18n' => ['tkn_boldText_army'],
        ],
      ]);
    } else {
      $office = Offices::get($officeId);
      $familyMember->moveTo($hiringPlayer, $officeId, [
        'text' => clienttranslate('${player_name} hires ${tkn_familyMember} as ${tkn_boldText_office} (previously ${previousFunction})'),
        'textArgs' => [
          'previousFunction' => $previousOffice !== null ? $previousOffice->getTitle() : $this->getPreviousFunctionFromLocation($familyMember->getLocation()),
          'tkn_boldText_office' => $office->getTitle(),
          'i18n' => ['tkn_boldText_office', 'previousFunction'],
        ]
      ]);

      $office->setFamilyMemberId($familyMember->getId());
      $office->setLocation(Locations::familyOffices($familyMember->getFamilyId()));
      Notifications::moveOfficeCard($office, '', []);
    }

    if ($previousOffice !== null) {
      $previousOffice->moveToVacantOffices($hiredPlayer);
    }
  }
}
