<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\LawCards;
use Bga\Games\JohnCompany\Models\Player;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Models\FamilyMember;

class ChooseFamilyMember extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_CHOOSE_FAMILY_MEMBER;
  }

  // ..######..########....###....########.########
  // .##....##....##......##.##......##....##......
  // .##..........##.....##...##.....##....##......
  // ..######.....##....##.....##....######..
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

  public function stChooseFamilyMember()
  {
    $args = $this->ctx->getArgs();
    $familyMemberId = $args['familyMemberId'];
    $playerId = $args['playerId'];
    $player = Players::get($playerId);
    $source = $args['source'];

    // Currently only used for Military Oversight so we now they are all commanders
    $familyMember = FamilyMembers::get($familyMemberId);

    switch ($source) {
      case MILITARY_OVERSIGHT_ID:
        $this->resolveMilitaryOversight($player, $familyMember, $source);
        break;
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

  private function resolveMilitaryOversight(Player $player, FamilyMember $familyMember, string $source)
  {
    $location = $familyMember->getLocation();
    $presidencyId = explode('_', $location)[1];
    $playerId = $player->getId();

    $familyMember->moveTo($player, Locations::armyOfReady($presidencyId), [
      'skipFrom' => true,
      'text' => clienttranslate('${tkn_boldText_source}: ${player_name} demotes ${tkn_familyMember} to officer in the ${tkn_boldText_armyName}'),
      'textArgs' => [
        'tkn_boldText_source' => LawCards::get($source)->getTitle(),
        'player' => $player,
        'tkn_familyMember' => Notifications::tknFamilyMember($familyMember),
        'tkn_boldText_armyName' => Notifications::getArmyNameForPresidency($presidencyId),
        'i18n' => ['tkn_boldText_source', 'tkn_boldText_armyName']
      ]
    ]);

    // Implement the logic for resolving military oversight here
    $this->ctx->insertAsBrother(Engine::buildTree([
      'children' => [
        [
          'action' => TIMING_WINDOW_CHECK,
          'args' => [
            TIMING_WINDOW => [DURING_HIRING_IF_YOU_ARE_A_CANDIDATE],
            BLACKMAIL_CARD => [HIRING_PREFERENCE_ID],
            TIMING_DATA => [
              'officeId' => $location
            ],
          ],
        ],
        [
          'action' => HIRING_HIRE_FAMILY_MEMBER,
          'playerId' => 'some',
          'activePlayerIds' => [$playerId],
          'args' => [
            'officeId' => $location,
            'hiringPlayerId' => $playerId,
            'appointingCommander' => true,
          ],
        ]
      ]
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
    $args = $this->ctx->getArgs();
    $familyMemberId = $args['familyMemberId'];

    // Currently only used for Military Oversight so we now they are all commanders
    $familyMember = FamilyMembers::get($familyMemberId);
    $location = $familyMember->getLocation();
    $presidencyId = explode('_', $location)[1];
    $armyName = Notifications::getArmyNameForPresidency($presidencyId);
    return [
      'log' => clienttranslate('Commander of the ${armyName}'),
      'args' => [
        'armyName' => $armyName,
      ]
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
