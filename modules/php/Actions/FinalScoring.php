<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Managers\Company;
use Bga\Games\JohnCompany\Managers\Enterprises;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\JoCoUtils;
use Bga\Games\JohnCompany\Managers\CompanyFailureCards;
use Bga\Games\JohnCompany\Managers\Parliament;
use Bga\Games\JohnCompany\Models\Player;

class FinalScoring extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  protected $turnPowerAwardPointsMap = [
    1 => [3, 1],
    2 => [3, 1],
    3 => [3, 1],
    4 => [5, 2],
    5 => [5, 2],
    6 => [5, 2],
    7 => [8, 4],
    8 => [8, 4],
  ];

  public function getState()
  {
    return ST_FINAL_SCORING;
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

  public function stFinalScoring()
  {
    Notifications::nextPhase(FINAL_SCORING);

    $args = $this->ctx->getArgs();
    $companySurvived = $args['companySurvived'] ?? false;

    $this->powerAward();
    $this->scoreCourtAndWorkshops($companySurvived);





    $this->resolveAction(['automatic' => true]);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private function powerAward()
  {
    Notifications::nextPhase(clientTranslate('Power Award'));
    $powerTotals = JoCoUtils::calculateTotalPower();

    $points = $this->turnPowerAwardPointsMap[Globals::getTurn()] ?? null;
    if ($points === null || count($powerTotals) === 0) {
      return;
    }

    $totals = array_map(fn($data) => $data['total'], $powerTotals);
    $highest = max($totals);
    $firstPlaceIds = array_keys(array_filter($totals, fn($total) => $total === $highest));

    if (count($firstPlaceIds) > 1) {
      // Tied for most power: lower value to tied players only
      $awards = array_fill_keys($firstPlaceIds, $points[1]);
    } else {
      $awards = [$firstPlaceIds[0] => $points[0]];
      $rest = array_filter($totals, fn($total) => $total < $highest);
      if (count($rest) > 0) {
        $second = max($rest);
        $secondPlaceIds = array_keys(array_filter($rest, fn($total) => $total === $second));
        if (count($secondPlaceIds) === 1) {
          $awards[$secondPlaceIds[0]] = $points[1];
        }
      }
    }

    foreach ($awards as $playerId => $victoryPoints) {
      $player = Players::get($playerId);
      Notifications::message(clienttranslate('${player_name} gains ${tkn_boldText_value} victory points'), [
        'player' => $player,
        'tkn_boldText_value' => $victoryPoints,
      ]);
      $player->incScore($victoryPoints);
    }
  }

  private function scoreCourtAndWorkshops(bool $companySurvived)
  {
    Notifications::nextPhase(clientTranslate('Score Court and Workshops'));

    $shareValue = Company::getShareValue();
    $enterprises = Enterprises::getAll()->toArray();
    $players = Players::getAll();

    $courtOfDirectorsBlameless = CompanyFailureCards::get(COURT_OF_DIRECTORS_BLAMELESS_ID)->hasBeenDrawn();
    $industrysGreedCondemned = CompanyFailureCards::get(INDUSTRYS_GREED_CONDEMNED_ID)->hasBeenDrawn();

    $primeMinisterOrder = Players::getTurnOrder(Parliament::getPrimeMinisterPlayerId());
    foreach ($primeMinisterOrder as $playerId) {
      $player = $players[$playerId];
      $familyId = $player->getFamilyId();
      $shares = count(Company::getShares($familyId));
      $workshops = count(Utils::filter($enterprises, function ($enterprise) use ($familyId) {
        return $enterprise->getType() === WORKSHOP && $enterprise->getLocation() === $familyId;
      }));

      if ($shares > 0) {
        $points = $shares * $shareValue;
        if ($companySurvived || $courtOfDirectorsBlameless) {
          Notifications::message(clienttranslate('${player_name} gains ${tkn_boldText_value} victory point(s) for their ${tkn_boldText_shares} ${tkn_icon}'), [
            'player' => $player,
            'tkn_boldText_value' => $points,
            'tkn_icon' => SHARE,
            'tkn_boldText_shares' => clienttranslate('Company shares'),
            'i18n' => ['tkn_boldText_shares']
          ]);
          $player->incScore($points);
        } else {
          Notifications::message(clienttranslate('${player_name} loses ${tkn_boldText_value} victory point(s) for their ${tkn_boldText_shares} ${tkn_icon}'), [
            'player' => $player,
            'tkn_boldText_value' => $points,
            'tkn_icon' => SHARE,
            'tkn_boldText_shares' => clienttranslate('Company shares'),
            'i18n' => ['tkn_boldText_shares']
          ]);
          $player->incScore(-$points);
        }
      }

      if ($workshops > 0 && !$companySurvived && !$industrysGreedCondemned) {
        Notifications::message(clienttranslate('${player_name} gains ${tkn_boldText_value} victory point(s) for their ${tkn_boldText_workshops} ${tkn_icon}'), [
          'player' => $player,
          'tkn_boldText_value' => $workshops,
          'tkn_icon' => WORKSHOP,
          'tkn_boldText_workshops' => clienttranslate('Workshops'),
          'i18n' => ['tkn_boldText_workshops']
        ]);
        $player->incScore($workshops);
      }
    }
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
    return clienttranslate('FinalScoring');
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
