<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Managers\Families;
use Bga\Games\JohnCompany\Models\Player;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Players;

class HiringChairman extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_HIRING_CHAIRMAN;
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsHiringChairman()
  {
    $args = $this->ctx->getArgs();
    $sharesRequired = $args['sharesRequired'];

    return [
      'sharesRequired' => $sharesRequired,
      'options' => $this->getOptions(),
      'support' => $this->getSupport()
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

  public function actPassHiringChairman()
  {
    $this->resolveAction(PASS);
  }

  public function actHiringChairman($args)
  {
    self::checkAction('actHiringChairman');
    $playerId = $this->checkPlayer();
    $support = $args->support;
    $stateArgs = $this->argsHiringChairman();

    $supportData = $this->getSupport();
    if (isset($supportData[$playerId])) {
      throw new \Bga\GameFramework\VisibleSystemException("ERROR_067");
    }
    $supportData[$playerId] = $support;
    $this->ctx->updateInfo('support', $supportData);
    Engine::save();

    Notifications::message(
      '${player_name} supports ${player_name2} for ${tkn_boldText_office} with ${tkn_boldText_number} shares',
      [
        'support' => $supportData,
        'player' => Players::get($playerId),
        'player_name2' => Players::get($support)->getName(),
        'tkn_boldText_office' => Offices::get(CHAIRMAN)->getTitle(),
        'tkn_boldText_number' => $stateArgs['options'][$playerId],
        'i18n' => ['tkn_boldText_office']
      ]
    );

    // Make the player inactive
    $game = Game::get();
    $game->gamestate->setPlayerNonMultiactive($playerId, 'next');

    $chairmanWasChosen = $this->checkRequiredSupport();
    if ($chairmanWasChosen) {
      if (count($game->gamestate->getActivePlayerList()) > 0) {
        $game->gamestate->setAllPlayersNonMultiactive('next');
      }

      $this->resolveAction([], true);
      return; // Stop further execution if chairman was chosen
    }


    if (count($game->gamestate->getActivePlayerList()) > 0) {
      return;
    }

    // If this code is reached all players voted and no chairman was chosen
    // Previous chairman player gets to decide
    $this->noCandidateReceivesRequiredSupport();


    $this->resolveAction([], true);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private function noCandidateReceivesRequiredSupport()
  {
    Notifications::message('No candidate receives the necessary support', []);

    $chairmanFamily = Families::getChairmanFamily();
    $playerId = Players::getPlayerForFamily($chairmanFamily->getId())->getId();

    $this->ctx->insertAsBrother(new LeafNode([
      'action' => HIRING_CHOOSE_CHAIRMAN,
      'playerId' => 'some',
      'activePlayerIds' => [$playerId],
    ]));
  }

  public function hireChairman(int $playerId)
  {
    $familyMembers = Utils::filter(FamilyMembers::getCourtOfDirectors(), fn($familyMember) => $familyMember->getPlayerId() === $playerId,);
    shuffle($familyMembers);
    $familyMember = $familyMembers[0];
    $office = Offices::get(CHAIRMAN);
    $player = Players::get($playerId);

    $familyMember->moveTo($player, $office->getId(), [
      'text' => clienttranslate('${player_name} has gathered the required support and is chosen as the new ${tkn_boldText_office}'),
      'textArgs' => [
        'tkn_boldText_office' => $office->getTitle(),
        'i18n' => ['tkn_boldText_office',],
      ]
    ]);

    $formerChairmanFamily = Families::getChairmanFamily();
    $formerChairmanFamily->setHasChairmanMarker(0);

    $familyMember->getFamily()->setHasChairmanMarker(1);

    $office->setFamilyMemberId($familyMember->getId());
    $office->setLocation(Locations::familyOffices($familyMember->getFamilyId()));
    Notifications::moveOfficeCard($office, '', []);
  }

  private function checkRequiredSupport()
  {
    $support = $this->getSupport();
    $options = $this->getOptions();
    $sharesRequired = $this->ctx->getArgs()['sharesRequired'];

    $votesPerPlayer = [];
    $chairmanWasChosen = false;

    foreach ($support as $playerId => $supportedPlayerId) {
      if (!isset($votesPerPlayer[$supportedPlayerId])) {
        $votesPerPlayer[$supportedPlayerId] = 0;
      }
      $votesPerPlayer[$supportedPlayerId] += $options[$playerId];
    }

    foreach ($votesPerPlayer as $playerId => $votes) {
      if ($votes < $sharesRequired) {
        continue;
      }
      $chairmanWasChosen = true;
      $this->hireChairman($playerId);
      break; // Stop after hiring the first eligible chairman
    }

    return $chairmanWasChosen;
  }

  private function getOptions()
  {
    $options = [];
    $familyMembers = FamilyMembers::getCourtOfDirectors();
    foreach ($familyMembers as $familyMember) {
      $playerId = $familyMember->getPlayerId();
      if (!isset($options[$playerId])) {
        $options[$playerId] = 0;
      }
      $options[$playerId]++;
    }
    return $options;
  }

  // Array of playerId => supportingPlayerId
  private function getSupport(): array
  {
    $info = $this->ctx->getInfo();
    return $info['support'] ?? [];
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
    return clienttranslate('HiringChairman');
  }

  public function isDoable(Player $player): bool
  {
    return true;
  }
}
