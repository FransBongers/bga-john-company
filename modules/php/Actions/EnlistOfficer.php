<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Managers\Families;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\SetupCards;
use Bga\Games\JohnCompany\Models\Family;
use Bga\Games\JohnCompany\Models\Player;

class EnlistOfficer extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_ENLIST_OFFICER;
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

  public function stEnlistOfficer()
  {
    $args = $this->ctx->getArgs();
    $playerId = $args['playerId'];

    $this->performAction($playerId);

    $nodeArgs = $this->ctx->getArgs();
    if ($nodeArgs[SOURCE] === FAMILY_ACTION) {

      $family = Families::get($nodeArgs['familyId']);

      $this->checkExtraActionOpportunityMarker($family, $playerId);

      $family->updateOpportunityMarker(ENLIST_OFFICER);
    }


    $this->resolveAction(['automatic' => true], true);
  }


  public function performAction($playerId)
  {
    $player = Players::get($playerId);
    $familyId = $player->getFamilyId();

    $familyMember = FamilyMembers::getMemberFor($familyId);

    $familyMember->setLocation(Locations::officerInTraining());

    Notifications::enlistOfficer($player, $familyMember);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private function checkExtraActionOpportunityMarker(Family $family, int $playerId)
  {
    $opportunityMarker = $family->getOpportunityMarker();
    if ($opportunityMarker !== ENLIST_OFFICER) {
      return;
    }

    $this->ctx->insertAsBrother(Engine::buildTree(
      [
        'type' => NODE_XOR,
        'playerId' => $playerId,
        'optional' => true,
        'stateDescription' => [
          'descriptionmyturn' => clienttranslate('${you} may enlist another officer'),
          'description' => clienttranslate('${actplayer} may enlist another officer'),
          'args' => []
        ],
        'args' => [
          'buttonType' => SECONDARY
        ],
        'children' => [
          [
            'action' => ENLIST_OFFICER,
            'playerId' => 'some',
            'activePlayerIds' => [$playerId],
            'optional' => true,
            'args' => [
              'familyId' => $family->getId(),
              'playerId' => $playerId,
              SOURCE => OPPORTUNITY_MARKER,
            ]
          ]
        ]

      ]
    ));
  }


  public function canBePerformedBy($family)
  {
    return $family->canPlaceFamilyMembers();
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

  public function performCrownAction()
  {
    $this->performAction(CROWN_PLAYER_ID);
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
      'log' => clienttranslate('Enlist Officer ${tkn_icon}'),
      'args' => [
        'tkn_icon' => OFFICER_IN_TRAINING,
      ],
    ];
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
