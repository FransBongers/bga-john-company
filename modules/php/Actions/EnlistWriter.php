<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Managers\Company;
use Bga\Games\JohnCompany\Managers\Crown;
use Bga\Games\JohnCompany\Managers\Families;
use Bga\Games\JohnCompany\Managers\Regions;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\SetupCards;
use Bga\Games\JohnCompany\Models\Family;
use Bga\Games\JohnCompany\Models\Player;

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
    $args = $this->ctx->getArgs();
    $playerId = $info['activePlayerIds'][0];

    $data = [
      'options' => $this->getOptions($playerId),
      'source' => $args[SOURCE],
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

    $player = Players::get($playerId);
    $familyId = $player->getFamilyId();

    $this->performAction($player, $familyId, $presidencyId);

    if ($stateArgs[SOURCE] === FAMILY_ACTION) {
      $family = Families::get($familyId);

      $this->checkExtraActionOpportunityMarker($family, $playerId);
      $this->checkExtraActionVacantOffices($familyId, $playerId);

      $family->updateOpportunityMarker(ENLIST_WRITER);
    }

    Game::get()->gamestate->setPlayerNonMultiactive($playerId, 'next');
    $this->resolveAction([], true);
  }

  public function performAction(Player $player, string $familyId, string $presidencyId)
  {
    $familyMember = FamilyMembers::getMemberFor($familyId);
    $familyMember->setLocation(Locations::writers($presidencyId));
    $familyMember->setPresidency($presidencyId);

    Notifications::enlistWriter($player, $familyMember, Regions::get(PRESIDENCY_HOME_REGION_MAP[$presidencyId]));
  }


  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private function checkExtraActionVacantOffices(string $familyId, int $playerId)
  {
    $vacantOffices = Offices::countInLocation(Locations::vacantOffices());
    if ($vacantOffices >= 4) {
      $this->insertExtraActionNode($familyId, $playerId, VACANT_OFFICES);
    }
  }

  private function checkExtraActionOpportunityMarker(Family $family, int $playerId)
  {
    $opportunityMarker = $family->getOpportunityMarker();
    if ($opportunityMarker === ENLIST_WRITER) {
      $this->insertExtraActionNode($family->getId(), $playerId, OPPORTUNITY_MARKER);
    }
  }

  private function insertExtraActionNode(string $familyId, int $playerId, string $source)
  {
    $this->ctx->insertAsBrother(new LeafNode([
      'action' => ENLIST_WRITER,
      'playerId' => 'some',
      'optional' => true,
      'activePlayerIds' => [$playerId],
      'args' => [
        'familyId' => $familyId,
        'playerId' => $playerId,
        'source' => $source,
      ]
    ]));
  }

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
      // $this->performAction(CROWN_PLAYER_ID, $presidency->getRegionId());
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
    // Notifications::log('crownPresidencies', $crownPresidencies);

    $fewestWriters = 100;
    $possiblePresidencies = [];

    // Determine presidencies with fewest crown writers from either crown presidencies or all presidencies
    $presidenciesToChooseFrom = count($crownPresidencies) > 0 ? $crownPresidencies : $presidencies;
    // Notifications::log('presidenciesToChooseFrom', $presidenciesToChooseFrom);
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

    // $this->performAction(CROWN_PLAYER_ID, $presidency->getRegionId());
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
    return [
      'log' => clienttranslate('Enlist Writer ${tkn_icon}'),
      'args' => [
        'tkn_icon' => WRITER,
      ],
    ];
  }

  public function isDoable(Player $player): bool
  {
    return true;
  }
}
