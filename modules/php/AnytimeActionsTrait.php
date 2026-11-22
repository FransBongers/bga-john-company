<?php

namespace Bga\Games\JohnCompany;

use Bga\GameFramework\Actions\CheckAction;
use Bga\GameFramework\Actions\Types\JsonParam;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Managers\LondonSeasonCards;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Models\BlackmailCard;
use Bga\Games\JohnCompany\Managers\PromiseCards;

trait AnytimeActionsTrait
{
  // private function getAnytimeOptions(array $options, array $activePlayerIds, array $windows, string | int | null $itemId): array
  private function getAnytimeArgs(): array
  {
    $phases = [
      LONDON_SEASON,
      FAMILY,
      FIRMS,
      HIRING,
      CHAIRMAN,
      DIRECTOR_OF_TRADE,
      GOVERNOR_GENERAL,
      MANAGER_OF_SHIPPING,
      MILITARY_AFFAIRS,
      BOMBAY_PRESIDENCY,
      MADRAS_PRESIDENCY,
      BENGAL_PRESIDENCY,
      SUPERINTENDENT_OF_TRADE_IN_CHINA,
      BONUSES,
      REVENUE,
      EVENTS_IN_INDIA,
      PARLIAMENT_MEETS,
      UPKEEP_AND_REFRESH
    ];
    $phaseIndex = array_search(Globals::getPhase(), $phases, true);
    if ($phaseIndex === false) {
      return [];
    }

    $anytimeData = [
      'afterRevenue' => $phaseIndex > array_search(REVENUE, $phases, true),
      'beforeEvents' => $phaseIndex < array_search(EVENTS_IN_INDIA, $phases, true),
      'beforeFamily' => $phaseIndex < array_search(FAMILY, $phases, true),
    ];

    $cards = [];
    foreach (PromiseCards::getAll() as $card) {
      if (ctype_digit((string) $card->getLocation()) && $card->canBePlayedAnytime($anytimeData) && $card->getLocation() !== $card->getOwnerPlayerId()) {
        $cards[] = $card;
      }
    }
    foreach (LondonSeasonCards::getAll() as $card) {
      if (!$card instanceof BlackmailCard || !str_starts_with($card->getLocation(), 'londonSeasonCards_')) {
        continue;
      }
      if ($card->canBePlayedAnytime($anytimeData)) {
        $cards[] = $card;
      }
    }

    $anytimeOptionsPerPlayer = [];

    foreach ($cards as $card) {
      $effect = $card->effectCanBeApplied(ANYTIME, null);
      if ($effect === null) {
        continue;
      }
      $playerId = $effect[PLAYER_ID];
      $effect['card'] = $card;

      if (!isset($anytimeOptionsPerPlayer[$playerId])) {
        $anytimeOptionsPerPlayer[$playerId] = [];
      }
      $anytimeOptionsPerPlayer[$playerId][] = $effect;
    }
    return $anytimeOptionsPerPlayer;
  }

  #[CheckAction(false)]
  public function actAnytimeAction(string $cardId)
  {
    $playerId = (int) $this->getCurrentPlayerId();

    $anytimeArgs = $this->getAnytimeArgs();

    if (!isset($anytimeArgs[$playerId])) {
      throw new \Bga\GameFramework\VisibleSystemException("ANYTIME_ERROR_001");
    }


    $data = Utils::array_find($anytimeArgs[$playerId], fn($option) => $option['cardId'] === $cardId);
    if ($data === null) {
      throw new \Bga\GameFramework\VisibleSystemException("ANYTIME_ERROR_002");
    }
    $card = $data['card'];
    $player = Players::get($playerId);

    $nextUnresolved = Engine::getNextUnresolved();
    $activePlayerIds = $nextUnresolved->getActivePlayerIdsCurrentlyMultiactive();

    if ($card instanceof BlackmailCard) {
      $card->play($nextUnresolved, $player);
    } else {
      $card->applyEffect($nextUnresolved, $player, null);
    }

    // Nodes that insert an extra node before the current one. 
    // Set all active players of the current node inactive before proceeding
    if (in_array($card->getId(), [ENVOY_TO_THE_MUGHALS_ID, SCANDAL_IN_INDIA_ID, SCANDAL_ON_LEADENHALL_STREET_ID, THE_PRIME_MINISTERS_EAR_ID])) {
      foreach ($activePlayerIds as $activePlayerId) {
        Game::get()->gamestate->setPlayerNonMultiactive($activePlayerId, 'next');
        Engine::save();
      }

      Engine::proceed();
    }
  }
}
