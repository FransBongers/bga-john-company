<?php

namespace Bga\Games\JohnCompany\Models;

use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Managers\LawCards;

class LawCard extends \Bga\Games\JohnCompany\Boilerplate\Helpers\DB_Model
{
  protected $id;
  protected $table = 'law_cards';
  protected $primary = 'card_id';
  protected $location;
  protected $state;

  protected $background;
  protected $header = 'default';
  protected $title;
  protected $text = [];
  protected $extraActionText = null;
  protected $extraAction = null;
  protected $initialSupport = null;
  protected $policyTarget = null;
  protected $policyConsequence = null;
  // protected $type;

  protected $attributes = [
    'id' => ['card_id', 'str'],
    'location' => 'card_location',
    'state' => ['card_state', 'int'],
    'used' => ['used', 'int'],
  ];

  protected $staticAttributes = [
    'background',
    'header',
    'title',
    'text',
    'extraActionText',
    'extraAction',
    'initialSupport',
    'policyTarget',
    'policyConsequence',
    // 'type',
  ];

  public function jsonSerialize(): array
  {
    $data = parent::jsonSerialize();
    return $data;
  }

  public function getUiData()
  {
    // Notifications::log('getUiData card model', []);
    return $this->jsonSerialize(); // Static datas are already in js file
  }

  public function isInPlay(): bool
  {
    return $this->getLocation() === Locations::passedLaws();
  }

  public function hasBeenUsed(): bool
  {
    return $this->getUsed() === 1;
  }

  public function reveal(Player $player)
  {
    $state = LawCards::insertOnTop($this->getId(), Locations::revealedLaws());
    $this->state = $state;
    $this->location = Locations::revealedLaws();
    
    Notifications::moveLaws($player, [$this], clienttranslate('${player_name} draw and reveals ${tkn_lawCard}'), [
      'tkn_lawCard' => $this->getId(),
    ]);
  }

  public function select(Player $player)
  {
    $this->setLocation(Locations::selectedLaw());
    Notifications::selectLaw($player, $this);
  }

  public function isDilemma(): bool
  {
    return $this->header === 'dilemma';
  }

  public function resolveImmediateEffects(object $ctx, bool $passed = true)
  {
    // Resolve any immediate effects of the law
  }

  public function discard(Player $player, $text = null, $textArgs = null)
  {
    $text = $text ?? clienttranslate('${player_name} discards ${tkn_lawCard}');
    $textArgs = $textArgs ?? [
      'tkn_lawCard' => $this->getId(),
    ];

   $this->move($player, DISCARD, $text, $textArgs);
  }

  public function move(Player $player, string $location, $text = null, $textArgs = null)
  {
    $state = LawCards::insertOnTop($this->getId(), $location);
    $this->state = $state;
    $this->location = $location;
    Notifications::moveLaws($player, [$this], $text, $textArgs);
  }

  /**
   * Acting player for any effect of this law card
   */
  public function getActingPlayerId(): int
  {
    throw new \Bga\GameFramework\VisibleSystemException("LAW_CARD_001");
  }

  /**
   * Whether the effect of this law card can be applied
   * Only for effects with specific timing windows
   */
  public function effectCanBeApplied(array $timingData): array | null
  {
    throw new \Bga\GameFramework\VisibleSystemException("LAW_CARD_002");
  }

  /**
   * Apply the effect of this law card
   * Only for effects with specific timing windows
   */
  public function applyEffect(object $ctx, Player $player, array $timingData)
  {
    throw new \Bga\GameFramework\VisibleSystemException("LAW_CARD_003");
  }

  public function returnToDeck(Player $player)
  {
    $this->setLocation(DECK);
    LawCards::shuffle(DECK);
    Notifications::moveLaws($player, [$this], clienttranslate('${player_name} shuffles ${tkn_lawCard} back into the deck'), [
      'tkn_lawCard' => $this->getId(),
    ]);
  }
}
