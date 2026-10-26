<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Models\Office;

class SelectOfficeHolder extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_SELECT_OFFICE_HOLDER;
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

  public function stSelectOfficeHolder()
  {
    $args = $this->ctx->getArgs();
    $source = $args['source'];

    $office = Offices::get($args[OFFICE_ID]);
    $actingPlayerId = $args['actingPlayerId'];
    Notifications::message(clienttranslate('${player_name} chooses ${tkn_boldText_office}'), [
      'player' => Players::get($actingPlayerId),
      'tkn_boldText_office' => $office->getTitle(),
      'i18n' => ['tkn_boldText_office']
    ]);

    switch ($source) {
      case SCANDAL_IN_INDIA_ID:
      case SCANDAL_ON_LEADENHALL_STREET_ID:
        $this->vacateOffice($office);
        break;
      case PUBLIC_DEMANDS_IMPEACHMENT_ID:
        $this->publicDemandsImpeachment($office);
        break;
      default:
        throw new \Bga\GameFramework\VisibleSystemException("ERROR_076");
    }


    $this->resolveAction(['automatic' => true]);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private function publicDemandsImpeachment(Office $office)
  {
    Globals::setSelectedOffice($office->getId());
  }

  private function vacateOffice(Office $office)
  {
    $currentOwner = $office->getFamily()->getPlayer();
    $office->returnFamilyMemberToSupply();
    $office->moveToVacantOffices($currentOwner);
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
    $args = $this->ctx->getArgs();
    $office = Offices::get($args[OFFICE_ID]);
    return $office->getTitle();
  }

  public function isDoable(\Bga\Games\JohnCompany\Models\Player $player): bool
  {
    return true;
  }

  public function isAutomatic(?\Bga\Games\JohnCompany\Models\Player $player = null): bool
  {
    return true;
  }
}
