<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Models\Player;
use Bga\Games\JohnCompany\JoCoUtils;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Managers\LawCards;
use Bga\Games\JohnCompany\Managers\LondonSeasonCards;
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
    if ($this->getSource() === FAILED_LAW) {
      list($left, $right) = Parliament::getPolicyOptionsFailedLaw();
    } else {
      $law = LawCards::getTopOf(Locations::selectedLaw());
      list($left, $right) = Parliament::getPolicyOptions($law->getPolicyTarget(), $law->getPolicyConsequence());
    }

    return [
      'left' => $left,
      'right' => $right,
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
      throw new \Bga\GameFramework\VisibleSystemException("ERROR_060");
    }

    $player = Players::get($playerId);
    $this->selectPolicy($player, $dialPosition);

    if ($this->getSource() === FAILED_LAW) {
      $this->ctx->insertAsBrother(new LeafNode([
        'action' => PARLIAMENT_MEETS_RESOLVE_POLICY
      ]));

      // Allow additional window tax if Leader of the opposition owns Tax Collectors
      $taxCollectordsFamily = LondonSeasonCards::getOwnerFamily(TAX_COLLECTORS_ID);
      if ($taxCollectordsFamily !== null && $taxCollectordsFamily->getPlayerId() === $playerId) {
        $this->ctx->insertAsBrother(Engine::buildTree(
          LondonSeasonCards::get(TAX_COLLECTORS_ID)->getTaxCollectorsAction($taxCollectordsFamily->getPlayerId())
        ));
      }
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

  private function getSource(): string | null
  {
    return $this->ctx->getArgs()[SOURCE] ?? null;
  }

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
