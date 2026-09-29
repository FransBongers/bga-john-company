<?php

namespace Bga\Games\JohnCompany\Actions;


use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Managers\Company;
use Bga\Games\JohnCompany\Managers\Crown;
use Bga\Games\JohnCompany\Managers\Regions;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\SetupCards;

class EnlistWriter extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_ENLIST_WRITER;
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsEnlistWriter()
  {
    $info = $this->ctx->getInfo();
    $playerId = $info['activePlayerIds'][0];

    $data = [
      'options' => $this->getOptions($playerId),
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

  public function actPassEnlistWriter()
  {
    $player = self::getPlayer();
    // Stats::incPassActionCount($player->getId(), 1);
    // Engine::resolve(PASS);
    $this->resolveAction(PASS);
  }

  public function actEnlistWriter($args)
  {
    self::checkAction('actEnlistWriter');
    $playerId = $this->checkPlayer();

    $presidencyId = $args->presidencyId;

    $stateArgs = $this->argsEnlistWriter();

    if (!in_array($presidencyId, $stateArgs['options'])) {
      throw new \Bga\GameFramework\VisibleSystemException("ERROR_004");
    }

    $this->performAction($playerId, $presidencyId);

    Game::get()->gamestate->setPlayerNonMultiactive($playerId, 'next');
    $this->resolveAction([], true);
  }

  public function performAction(string $playerId, string $presidencyId)
  {
    $player = Players::get($playerId);
    $familyId = $player->getFamilyId();

    $familyMember = FamilyMembers::getMemberFor($familyId);
    $familyMember->setLocation(Locations::writers($presidencyId));
    $familyMember->setPresidency($presidencyId);

    Notifications::enlistWriter($player, $familyMember, Regions::get(PRESIDENCY_HOME_REGION_MAP[$presidencyId]));

    // TODO: insert extra actions
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  public function canBePerformedBy($family)
  {
    return $family->canPlaceFamilyMembers();
  }

  public function getOptions($playerId)
  {
    $player = Players::get($playerId);
    $family = $player->getFamily();

    $canPlaceFamilyMembers = $family->canPlaceFamilyMembers();

    if (!$canPlaceFamilyMembers) {
      return [];
    }
    return [BENGAL_PRESIDENCY, BOMBAY_PRESIDENCY, MADRAS_PRESIDENCY];
  }

  // ..######..########...#######..##......##.##....##
  // .##....##.##.....##.##.....##.##..##..##.###...##
  // .##.......##.....##.##.....##.##..##..##.####..##
  // .##.......########..##.....##.##..##..##.##.##.##
  // .##.......##...##...##.....##.##..##..##.##..####
  // .##....##.##....##..##.....##.##..##..##.##...###
  // ..######..##.....##..#######...###..###..##....##

  // ....###.....######..########.####..#######..##....##
  // ...##.##...##....##....##.....##..##.....##.###...##
  // ..##...##..##..........##.....##..##.....##.####..##
  // .##.....##.##..........##.....##..##.....##.##.##.##
  // .#########.##..........##.....##..##.....##.##..####
  // .##.....##.##....##....##.....##..##.....##.##...###
  // .##.....##..######.....##....####..#######..##....##

  private function getNumberOfCrownWriters($presidency, $familyMembers) {}

  public function performCrownAction()
  {
    $familyMembers = FamilyMembers::getAllFor(CROWN);

    $presidencies = Offices::getMany([PRESIDENT_OF_BENGAL, PRESIDENT_OF_BOMBAY, PRESIDENT_OF_MADRAS])->toArray();

    // 1. Vacant with no crown writers
    $vacantWithNoCrownWriters = Utils::filter($presidencies, function ($office) use ($familyMembers) {
      return $office->getFamilyMemberId() === null && $this->getNumberOfCrownWriters($office, $familyMembers) === 0;
    });
    if (count($vacantWithNoCrownWriters) > 0) {
      $presidency = Crown::getPresidencyWithHighestPriority($vacantWithNoCrownWriters);
      $this->performAction(CROWN_PLAYER_ID, $presidency->getRegionId());
      return;
    }

    $crownWritersPerPresidency = [];

    foreach ($presidencies as $presidency) {
      $crownWritersPerPresidency[$presidency->getId()] = $this->getNumberOfCrownWriters($presidency, $familyMembers);
    }

    // 1. Crown presidencies
    $crownPresidencies = Utils::filter($presidencies, function ($office) {
      return $office->getFamilyId() === CROWN;
    });
    Notifications::log('crownPresidencies', $crownPresidencies);

    $fewestWriters = 100;
    $possiblePresidencies = [];

    // Determine presidencies with fewest crown writers from either crown presidencies or all presidencies
    $presidenciesToChooseFrom = count($crownPresidencies) > 0 ? $crownPresidencies : $presidencies;
    Notifications::log('presidenciesToChooseFrom', $presidenciesToChooseFrom);
    foreach ($presidenciesToChooseFrom as $presidency) {
      $presidencyId = $presidency->getId();
      if ($crownWritersPerPresidency[$presidencyId] < $fewestWriters) {
        $fewestWriters = $crownWritersPerPresidency[$presidencyId];
        $possiblePresidencies = [$presidency];
      } else if ($crownWritersPerPresidency[$presidencyId] === $fewestWriters) {
        $possiblePresidencies[] = $presidency;
      }
    }

    // Get presidency with highest priority
    $presidency = count($possiblePresidencies) === 1 ? $possiblePresidencies[0] : Crown::getPresidencyWithHighestPriority($presidenciesToChooseFrom);

    $this->performAction(CROWN_PLAYER_ID, $presidency->getRegionId());
  }
}
