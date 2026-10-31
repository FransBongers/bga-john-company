<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\JoCoUtils;
use Bga\Games\JohnCompany\Managers\LawCards;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Models\Player;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\Regions;

class GovernorGeneralMakeCheck extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return \ST_GOVERNOR_GENERAL_MAKE_CHECK;
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsGovernorGeneralMakeCheck()
  {
    $args = $this->ctx->getArgs();

    $data = [
      'treasury' => Offices::get(GOVERNOR_GENERAL)->getTreasury(),
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

  public function actPassGovernorGeneralMakeCheck()
  {
    $playerId = $this->checkPlayer();
    Game::get()->gamestate->setPlayerNonMultiactive($playerId, 'next');
    $this->resolveAction(PASS, true);
  }

  public function actGovernorGeneralMakeCheck($args)
  {
    self::checkAction('actGovernorGeneralMakeCheck');
    $playerId = $this->checkPlayer();

    $stateArgs = $this->argsGovernorGeneralMakeCheck();

    $player = Players::get($playerId);

    $spend = $args->spend;
    $makeCheck = $args->makeCheck;

    $office = Offices::get(GOVERNOR_GENERAL);
    $office->pay($player, $spend);

    list($checkResult, $diceRolls) = JoCoUtils::makeCheck($player, $spend, $office->getFamilyMember());

    $companyControlledRegions = Regions::getCompanyControlledRegions();
    $zamindarTaxesInPlay = LawCards::isInPlay(ZAMINDAR_TAXES_ID);
    $unrestToAddForFailedCheck = $zamindarTaxesInPlay ? 2 : 0;

    $numberOfUnrestToAdd = count(Utils::filter($diceRolls, fn($roll) => $roll === 6)) + ($checkResult !== SUCCESS ? $unrestToAddForFailedCheck : 0);
    $this->addUnrestToCompanyControlledRegions($player, $numberOfUnrestToAdd, $companyControlledRegions);

    if ($checkResult === FAILURE && $office->getTreasury() > 0) {
      $action = [
        'action' => GOVERNOR_GENERAL_MAKE_CHECK,
        'playerId' => 'some',
        'activePlayerIds' => [$playerId],
        'optional' => true,
      ];
      $this->ctx->insertAsBrother(Engine::buildTree($action));
    } elseif ($checkResult === SUCCESS) {
      $player->getFamily()->gainCash(count($companyControlledRegions) + ($zamindarTaxesInPlay ? 3 : 0));
      $this->insertGovernorGeneralActions($player, $playerId);
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

  private function addUnrestToCompanyControlledRegions(Player $player, int $amount, array $companyControlledRegions)
  {
    if ($amount === 0) {
      return;
    }

    foreach ($companyControlledRegions as $region) {
      $region->addUnrest($player, $amount);
    }
  }

  private function insertGovernorGeneralActions(Player $player, $playerId)
  {
    $companyControlledRegionCount = Regions::getCompanyControlledRegionCount();

    $children = [
      [
        'action' => GOVERNOR_GENERAL_SHIPBUILDING,
        'args' => [
          'playerId' => $player->getId()
        ]
      ],
      [
        'action' => GOVERNOR_GENERAL_COMMISSION_REGIMENT,
        'args' => [
          'playerId' => $player->getId()
        ]
      ],
      [
        'action' => GOVERNOR_GENERAL_TAX,
        'args' => [
          'playerId' => $player->getId()
        ]
      ]
    ];

    $nodes = [];

    for ($i = $companyControlledRegionCount; $i > 0; $i--) {
      $nodes[] = [
        'type' => NODE_XOR,
        'children' => $children,
        'playerId' => $player->getId(),
        'stateDescription' => [
          'descriptionmyturn' => clienttranslate('Governor General: ${you} must choose an option (${number} remaining)'),
          'description' => clienttranslate('Governor General: ${actplayer} must choose an option'),
          'args' => [
            'number' => $i
          ]
        ],
      ];
    }

    $this->ctx->insertAsBrother(Engine::buildTree([
      'children' => $nodes
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
    return clienttranslate('GovernorGeneralMakeCheck');
  }

  public function isDoable(Player $player): bool
  {
    return true;
  }
}
