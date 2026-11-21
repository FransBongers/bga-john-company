<?php

namespace Bga\Games\JohnCompany\Models;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine\AbstractNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Preferences;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Managers\AtomicActions;
use Bga\Games\JohnCompany\Managers\Company;
use Bga\Games\JohnCompany\Managers\Enterprises;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\PlayersExtra;
use Bga\Games\JohnCompany\Managers\LondonSeasonCards;
use Bga\Games\JohnCompany\Managers\SetupCards;

/*
 * Player: all utility functions concerning a player
 */

class Player extends \Bga\Games\JohnCompany\Boilerplate\Helpers\DB_Model
{
  protected $id;

  protected $table = 'player';
  protected $primary = 'player_id';
  protected $attributes = [
    'id' => ['player_id', 'int'],
    'no' => ['player_no', 'int'],
    'avatar' => 'player_avatar',
    'name' => 'player_name',
    'color' => 'player_color',
    'eliminated' => 'player_eliminated',
    'score' => ['player_score', 'int'],
    'scoreAux' => ['player_score_aux', 'int'],
    'zombie' => 'player_zombie',
  ];

  /*
   * Getters
   */
  public function getPref($prefId)
  {
    return Preferences::get($this->id, $prefId);
  }

  public function jsonSerialize($currentPlayerId = null): array
  {
    $data = parent::jsonSerialize();
    $isCurrentPlayer = intval($currentPlayerId) == $this->getId();

    $londonSeasonCards = array_map(function ($card) use ($isCurrentPlayer) {
      if ($card->getType() === BLACKMAIL && $isCurrentPlayer) {
        return $card->jsonSerializePrivate();
      }
      return $card->jsonSerialize();
    }, $this->getLondonSeasonCards());

    $playedBlackmailCards = LondonSeasonCards::getInLocationOrdered(Locations::playedBlackmailCards($this->getId()))->toArray();

    return array_merge(
      $data,
      [
        'setupDraftHand' => $isCurrentPlayer ? $this->getHandForDraft() : [],
        'setupCardsChosen' => $isCurrentPlayer ? $this->getSetupCards() : [],
        'familyId' => $this->getFamilyId(),
        'setupCards' => $isCurrentPlayer ? $this->getSetupCards() : [],
        'londonSeasonCards' => $londonSeasonCards,
        'playedBlackmailCards' => array_map(function ($card) {
          return $card->jsonSerializePrivate();
        }, $playedBlackmailCards),
      ],
    );
  }

  public function getId()
  {
    return (int) parent::getId();
  }

  public function canTakeAction(string $action, null|array|AbstractNode $ctx): bool
  {
    return AtomicActions::isDoable($action, $ctx, $this);
  }

  public function getPlayerExtra()
  {
    return PlayersExtra::get($this->getId());
  }

  public function getFamilyId()
  {
    if ($this->getId() === CROWN_PLAYER_ID) {
      return CROWN;
    } else {
      return COLOR_FAMILY_MAP[HEX_COLOR_COLOR_MAP[$this->getColor()]];
    }
  }

  public function getHandForDraft()
  {
    return SetupCards::getInLocation(Locations::hand($this->getId()))->toArray();
  }

  public function getSetupCards()
  {
    return SetupCards::getInLocation(Locations::setupCards($this->getId()))->toArray();
  }

  public function getLondonSeasonCards()
  {
    return LondonSeasonCards::getInLocation(Locations::londonSeasonCards($this->getId()))->toArray();
  }

  public function incScore(int $change)
  {
    Game::get()->bga->playerScore->inc($this->getId(), $change);
  }

  public function getEnterprises($type = null)
  {
    $enterprises = Enterprises::getAll()->toArray();
    $playerId = $this->getId();
    return Utils::filter($enterprises, function ($enterprise) use ($playerId, $type) {
      return $enterprise->getLocation() == $playerId && ($type === null || $enterprise->getType() === $type);
    });
  }

  /**
   * Total windows owned by a player's family: retired family members on
   * prizes, plus enterprises, plus prestige cards.
   */
  public function getWindowCount()
  {
    $playerId = $this->id;

    $windows = 0;
    $targets = [];

    $prizeMembers = Utils::filter(FamilyMembers::getAll()->toArray(), function ($familyMember) use ($playerId) {
      return $familyMember->getPlayerId() === $playerId && array_key_exists($familyMember->getLocation(), PRIZES);
    });
    foreach ($prizeMembers as $familyMember) {
      $windowCount = PRIZES[$familyMember->getLocation()][WINDOWS];
      if ($windowCount > 0) {
        $windows += $windowCount;
        $targets[$familyMember->getId()] = $windowCount;
      }
    }

    foreach ($this->getEnterprises() as $enterprise) {
      $windowCount = $enterprise->getWindows();
      if ($windowCount > 0) {
        $windows += $windowCount;
        $targets[$enterprise->getId()] = $windowCount;
      }
    }

    $prestigeCards = Utils::filter($this->getLondonSeasonCards(), function ($card) {
      return $card->getType() === PRESTIGE;
    });
    foreach ($prestigeCards as $card) {
      $windowCount = $card->getWindows() ?? 0;
      if ($windowCount > 0) {
        $windows += $windowCount;
        $targets[$card->getId()] = $windowCount;
      }
    }

    return [$windows, $targets];
  }

  public function getShareCount()
  {
    return count(Company::getShares($this->getId()));
  }

  public function getCrownPromiseCubes()
  {
    return PlayersExtra::get($this->getId())->getCrownPromiseCubes();
  }

  public function updateOpportunityMarker(string | null $familyActionOrRemoved)
  {
    PlayersExtra::get($this->getId())->updateOpportunityMarker($familyActionOrRemoved);
  }

  public function setOpportunityMarker(string | null $familyActionOrRemoved)
  {
    PlayersExtra::get($this->getId())->setOpportunityMarker($familyActionOrRemoved);
  }

  public function gainCash(int $amount, string | null $source = null, bool $skipNotification = false)
  {
    PlayersExtra::get($this->getId())->gainCash($amount, $source, $skipNotification);
  }

  public function getTrophies(): int
  {
    return PlayersExtra::get($this->getId())->getTrophies();
  }

  public function getPassedLawTokens(): int
  {
    return PlayersExtra::get($this->getId())->getPassedLawTokens();
  }

  public function pay(int $amount, $skipNotification = true)
  {
    PlayersExtra::get($this->getId())->pay($amount, $skipNotification);
  }

  public function incTreasury(int $amount)
  {
    PlayersExtra::get($this->getId())->incTreasury($amount);
  }

  public function gainPassedLawToken(int $number = 1)
  {
    PlayersExtra::get($this->getId())->gainPassedLawToken($number);
  }

  public function hasPrestigeCard(string $prestigeCardId): bool
  {
    $prestigeCards = LondonSeasonCards::getInLocation(Locations::londonSeasonCards($this->getId()))->toArray();
    return Utils::array_some($prestigeCards, function ($card) use ($prestigeCardId) {
      return $card->getId() === $prestigeCardId;
    });
  }

  public function hasChairmanMarker(): bool
  {
    return PlayersExtra::get($this->getId())->hasChairmanMarker();
  }

  // TODO: include members on prizes in count
  public function canPlaceFamilyMembers()
  {
    return count(FamilyMembers::getInLocation(Locations::familyMemberSupply($this->id))) > 0;
  }

  public function gainPromiseCubes(int $amount, bool $notify = true)
  {
    PlayersExtra::get($this->getId())->gainPromiseCubes($amount, $notify);
  }

  public function payPromiseCubes(int $amount, bool $notify = true)
  {
    PlayersExtra::get($this->getId())->payPromiseCubes($amount, $notify);
  }

  public function loseHalfTrophiesRoundedUp()
  {
    PlayersExtra::get($this->getId())->loseHalfTrophiesRoundedUp();
  }

  public function getRetirementDiscount(bool $applyLettersOfIntroduction = false)
  {
    $prestigeCards = $applyLettersOfIntroduction ?
      Utils::filter(LondonSeasonCards::getAll()->toArray(), function ($card) {
        return Utils::startsWith($card->getLocation(), 'londonSeasonCards_');
      })
      : LondonSeasonCards::getInLocation(Locations::londonSeasonCards($this->getId()))->toArray();
    $discount = 0;
    foreach ($prestigeCards as $card) {
      if ($card->getType() === PRESTIGE) {
        $discount += $card->getDiscount() ?? 0;
      }
    }
    return $discount;
  }

  public function getTreasury(): int
  {
    return PlayersExtra::get($this->getId())->getTreasury();
  }

  public function gainTrophies(int $amount)
  {
    return PlayersExtra::get($this->getId())->gainTrophies($amount);
  }
}
