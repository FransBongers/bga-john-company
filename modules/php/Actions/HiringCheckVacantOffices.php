<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Models\Player;

class HiringCheckVacantOffices extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_HIRING_CHECK_VACANT_OFFICES;
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

  public function stHiringCheckVacantOffices()
  {
    $offices = Offices::getInLocation(Locations::vacantOffices())->toArray();
    usort($offices, fn($a, $b) => $a->getHirePriority() <=> $b->getHirePriority());

    $vacantOffice = false;

    foreach ($offices as $office) {
      $officeId = $office->getId();

      if ($officeId !== CHAIRMAN && count($office->getCandidatesForHiring()) === 0) {
        Notifications::message(clienttranslate('No eligible candidates for ${tkn_boldText_officeName}. The office is skipped in the hiring process'), [
          'tkn_boldText_officeName' => $office->getTitle(),
          'i18n' => ['tkn_boldText_officeName'],
        ]);
        continue;
      }

      if ($officeId !== CHAIRMAN && $office->getHiringPlayerId() === null) {
        Notifications::message(clienttranslate('No hirer for ${tkn_boldText_officeName}. The office is skipped in the hiring process'), [
          'tkn_boldText_officeName' => $office->getTitle(),
          'i18n' => ['tkn_boldText_officeName'],
        ]);
        continue;
      }

      $vacantOffice = true;

      // Inserted after the current node, so the hire node ends up before the re-check
      $this->ctx->insertAsBrother(new LeafNode([
        'action' => HIRING_CHECK_VACANT_OFFICES,
      ]));

      if ($officeId === CHAIRMAN) {
        $sharesRequired = $this->getPureMajorityCourtOfDirectors();
        Notifications::message(clienttranslate('${tkn_boldText_officeName}: it requires ${tkn_boldText_shares} shares to be elected'), [
          'tkn_boldText_shares' => $sharesRequired,
          'tkn_boldText_officeName' => $office->getTitle(),
          'sharesRequired' => $sharesRequired,
          'i18n' => ['tkn_boldText_officeName'],
        ]);
        $this->ctx->insertAsBrother(new LeafNode([
          'action' => HIRING_CHAIRMAN,
          'playerId' => 'some',
          'activePlayerIds' => FamilyMembers::getPlayerIdsWithShareInCourtOfDirectors(),
          'args' => [
            'sharesRequired' => $sharesRequired
          ]
        ]));
      } else {
        $hirer = $office->getHiringPlayerId();
        $this->ctx->insertAsBrother(new LeafNode([
          'action' => HIRING_HIRE_FAMILY_MEMBER,
          'playerId' => 'some',
          'activePlayerIds' => [$hirer],
          'args' => [
            'officeId' => $office->getId(),
            'hirerPlayerId' => $hirer,
          ],
        ]));
      }

      break;
    }

    if (!$vacantOffice) {
      $firstTimeResolving = count(Engine::getResolvedActions([HIRING_CHECK_VACANT_OFFICES])) === 0;
      // TODO: different text if there are open postions that cannot be filled?
      Notifications::message($firstTimeResolving ? clienttranslate('No open positions') : clienttranslate('No more open positions'), []);
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

  private function getPureMajorityCourtOfDirectors(): int
  {
    $count = count(FamilyMembers::getCourtOfDirectors());
    if ($count % 2 === 0) {
      return $count / 2 + 1;
    }
    return (int) ceil($count / 2);
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
    return clienttranslate('HiringCheckVacantOffices');
  }

  public function isDoable(Player $player): bool
  {
    return true;
  }

  public function isAutomatic(?Player $player = null): bool
  {
    return true;
  }
}
