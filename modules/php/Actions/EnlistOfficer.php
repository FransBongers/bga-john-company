<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Managers\PlayersExtra;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\SetupCards;
use Bga\Games\JohnCompany\Models\Player;
use Bga\Games\JohnCompany\Models\PlayerExtra;

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

      $playerExtraData = PlayersExtra::get($nodeArgs['playerId']);

      $this->checkExtraActionOpportunityMarker($playerExtraData, $playerId);

      $playerExtraData->updateOpportunityMarker(ENLIST_OFFICER);
    }

    
    $this->resolveAction(['automatic' => true], true);
  }


  public function performAction(int $playerId)
  {
    $familyMember = FamilyMembers::getMemberFor($playerId);

    $familyMember->setLocation(Locations::officerInTraining());

    Notifications::enlistOfficer(Players::get($playerId), $familyMember);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private function checkExtraActionOpportunityMarker(PlayerExtra $playerExtraData, int $playerId)
  {
    $opportunityMarker = $playerExtraData->getOpportunityMarker();
    if ($opportunityMarker !== ENLIST_OFFICER) {
      return;
    }

    $this->ctx->insertAsBrother(Engine::buildTree(
      [
        'type' => NODE_XOR,
        'playerId' => 'some',
        'activePlayerIds' => [$playerId],
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
            'args' => [
              'playerId' => $playerId,
              SOURCE => OPPORTUNITY_MARKER,
            ]
          ]
        ]

      ]
    ));
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
    $source = $this->ctx->getArgs()[SOURCE];
    return $source === EXTRA_ACTION || !$player->hasPrestigeCard(WILLIAM_COLLINS_ID);
  }

  public function isAutomatic(?Player $player = null): bool
  {
    return true;
  }
}
