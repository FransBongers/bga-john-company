<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Models\Player;
use Bga\Games\JohnCompany\JoCoUtils;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Managers\LawCards;
use Bga\Games\JohnCompany\Managers\Parliament;
use Bga\Games\JohnCompany\Managers\Players;

class ParliamentMeetsSelectPolicy extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_PARLIAMENT_MEETS_SELECT_POLICY;
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsParliamentMeetsSelectPolicy()
  {
    $law = LawCards::getTopOf(Locations::selectedLaw());
    list($left, $right) = Parliament::getPolicyOptions($law->getPolicyTarget(), $law->getPolicyConsequence());

    return [
      'left' => $left,
      'right' => $right,
      'lawId' => $law->getId(),
    ];
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

  public function actParliamentMeetsSelectPolicy($args)
  {
    self::checkAction('actParliamentMeetsSelectPolicy');
    $playerId = $this->checkPlayer();

    $dialPosition = $args->dialPosition;
    $stateArgs = $this->argsParliamentMeetsSelectPolicy();
    $left = $stateArgs['left'];
    $right = $stateArgs['right'];

    if (!in_array($dialPosition, [$left, $right])) {
      throw new \Bga\GameFramework\VisibleSystemException("ERROR_059");
    }

    $player = Players::get($playerId);
    $this->selectPolicy($player, $dialPosition);

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

  private function selectPolicy(Player $player, int $dialPosition)
  {
    Parliament::selectPolicy($player, $dialPosition);
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
    $policyIndex = $args['policyIndex'];

    $policy = PRIME_MINISTER_DIAL[$policyIndex];
    $windowTax = $policy[WINDOW_TAX]  ?? false;

    return [
      'log' => $windowTax ? clienttranslate('${policyConsequence} ${tkn_icon} & Window Tax') : '${policyConsequence} ${tkn_icon}',
      'args' => [
        'policyConsequence' => JoCoUtils::getPolicyConsequenceTranslation($policy[CONSEQUENCE]),
        'tkn_icon' => $policy[TARGET],
      ],
    ];
  }

  public function isDoable(Player $player): bool
  {
    return true;
  }
}
