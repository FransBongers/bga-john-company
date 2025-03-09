<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Managers\AtomicActions;
use Bga\Games\JohnCompany\Managers\Company;
use Bga\Games\JohnCompany\Managers\Enterprises;
use Bga\Games\JohnCompany\Managers\Families;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\SetupCards;

class ChairmanDebtConsent extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_CHAIRMAN_DEBT_CONSENT;
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  // 'action' => CHAIRMAN_DEBT_CONSENT,
  //         'playerId' => 'all',
  //         'activePlayerIds' => Utils::filter($playerIdsWithShare, function ($pId) use ($playerId) {
  //           return $pId !== $playerId;
  //         }),
  //         'yay' => [$playerId],
  //         'nay' => [],
  //         'debt' => $debtVote,
  public function argsChairmanDebtConsent()
  {
    $info = $this->ctx->getInfo();
    // $player = self::getPlayer();
    $playerIds = $info['activePlayerIds'];

    $votes = $this->getCurrentVoteCount($info);
    $remainingVotesRequired = Company::getRequiredNumberForShareMajority() - $votes['yay'];

    $data = [
      'activePlayerIds' => $playerIds,
      'debt' => $info['debt'],
      'chairmanPlayerId' => Offices::get(CHAIRMAN)->getPlayerId(),
      'remainingVotesRequired' => $remainingVotesRequired,
      // 'votes' => $votes,
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

  public function actPassChairmanDebtConsent()
  {
    $player = self::getPlayer();
    // Stats::incPassActionCount($player->getId(), 1);
    // Engine::resolve(PASS);
    $this->resolveAction(PASS);
  }

  public function actChairmanDebtConsent($args)
  {
    self::checkAction('actChairmanDebtConsent');
    $playerId = $this->checkPlayer();

    $consent = $args->consent;
    Notifications::log('consent', $consent);

    $info = $this->ctx->getInfo();
    $player = Players::get($playerId);
    if ($consent) {
      $info['yay'][] = $playerId;
      $this->ctx->updateInfo('yay', $info['yay']);
      Notifications::message(clienttranslate('${player_name} gives consent to increase Company Debt'), [
        'player' => $player,
      ]);
    } else {
      $info['nay'][] = $playerId;
      $this->ctx->updateInfo('nay', $info['nay']);
      Notifications::message(clienttranslate('${player_name} does ${tkn_boldText_not} give consent to increase Company Debt'), [
        'player' => $player,
        'tkn_boldText_not' => clienttranslate('not'),
        'i18n' => ['tkn_boldText_not'],
      ]);
    }

    $next = $this->getNextStep($info);

    $game = Game::get();
    $game->gamestate->setPlayerNonMultiactive($playerId, 'next');

    if ($next === 'consent') {
      $newCompanyDebt = $info['debt'];
      Notifications::message(clienttranslate('The Court of Directors gives consent to increase Company Debt to ${value}'), [
        'tkn_boldText_not' => clienttranslate('not'),
        'value' => $newCompanyDebt,
        'i18n' => ['tkn_boldText_not'],
      ]);
      
      $currentDebt = Company::getDebt();
      $increase = $newCompanyDebt - $currentDebt;
      Company::setDebt($newCompanyDebt );
      $companyBalance = Company::incBalance($increase * 5);

      Notifications::increaseCompanyDebt(Offices::get(CHAIRMAN)->getPlayer(), $newCompanyDebt, $companyBalance);
      $this->resolveAction([], true);
      return;
    } else if ($next === 'noConsent') {
      Notifications::message(clienttranslate('The Court of Directors does ${tkn_boldText_not} give consent to increase Company Debt'), [
        'tkn_boldText_not' => clienttranslate('not'),
        'i18n' => ['tkn_boldText_not'],
      ]);
      $this->resolveAction([], true);
      return;
    } else {
      $this->ctx->updateInfo('activePlayerIds', Utils::filter($info['activePlayerIds'], function ($pId) use ($playerId) {
        return $pId !== $playerId;
      }));

      Engine::save();
      Engine::proceed();
    }

    // $this->resolveAction([], true);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private function getNextStep($info)
  {
    $required = Company::getRequiredNumberForShareMajority();
    $currentCount = $this->getCurrentVoteCount($info);
    $failLimit = $currentCount['shares'] - $required + 1;
    if ($currentCount['yay'] >= $required) {
      return 'consent';
    } else if ($currentCount['nay'] >= $failLimit) {
      return 'noConsent';
    } else {
      return 'proceed';
    }
  }

  private function getCurrentVoteCount($info)
  {
    $yayPlayerIds = $info['yay'];
    $nayPlayerIds = $info['nay'];
    $shares = Company::getShares();
    $map = Families::getFamilyIdPlayerIdMap();

    $yayCount = 0;
    $nayCount = 0;

    foreach ($shares as $familyMember) {
      $playerId = $map[$familyMember->getFamilyId()];
      if (in_array($playerId, $yayPlayerIds)) {
        $yayCount++;
      } else if (in_array($playerId, $nayPlayerIds)) {
        $nayCount++;
      }
    }
    return [
      'yay' => $yayCount,
      'nay' => $nayCount,
      'shares' => count($shares),
    ];
  }
}
