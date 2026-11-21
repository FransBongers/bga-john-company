<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\PromiseCards;
use Bga\Games\JohnCompany\Models\Player;

class HiringGiveConsentForNepotism extends Hiring
{
  public function getState()
  {
    return ST_HIRING_GIVE_CONSENT_FOR_NEPOTISM;
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsHiringGiveConsentForNepotism()
  {
    $args = $this->ctx->getArgs();

    $familyMember = FamilyMembers::get($args['familyMemberId']);
    $currentOffice = $familyMember->getOffice();

    $appointingCommander = $args['appointingCommander'] ?? false;
    $officeId = $args['officeId'];
    $hiringPlayerId = $args['hiringPlayerId'];

    $office = null;
    if ($appointingCommander) {
    } else {
      $office = Offices::get($args['officeId']);
    }

    $data = [
      'title' => $this->getTitleArgs($officeId, $office),
      'officeId' => $officeId,
      'office' => $office,
      'hiringPlayerId' => $hiringPlayerId,
      'familyMember' => $familyMember,
      'currentPosition' => $currentOffice !== null ? $currentOffice->getTitle() : $this->getPreviousFunctionFromLocation($familyMember->getLocation()),
      'appointingCommander' => $appointingCommander,
      'promiseCards' => $this->getPromiseCards($officeId),
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

  public function actPassHiringGiveConsentForNepotism()
  {
    $this->resolveAction(PASS);
  }

  public function actHiringGiveConsentForNepotism($args)
  {
    self::checkAction('actHiringGiveConsentForNepotism');
    $playerId = $this->checkPlayer();

    $consent = $args->consent ?? null;
    $promiseCardId = $args->promiseCardId ?? null;
    $isHiringPlayer = $args->isHiringPlayer ?? false;

    $stateArgs = $this->argsHiringGiveConsentForNepotism();

    if ($isHiringPlayer) {
      $this->handleHiringPlayer($playerId, $promiseCardId, $stateArgs);
    } else {
      $this->handleConsentGiven($playerId, $consent, $stateArgs);
    }

    $this->nextStep();
  }

  private function handleHiringPlayer(int $playerId, string | null $promiseCardId, array $stateArgs)
  {
    if ($playerId !== $stateArgs['hiringPlayerId']) {
      throw new \Bga\GameFramework\VisibleSystemException("ERROR_088");
    }
    if ($promiseCardId === null) {
      $this->setPlayerActionCompleted($playerId);
      return;
    }

    $promiseCard = Utils::array_find($stateArgs['promiseCards'], function ($card) use ($promiseCardId) {
      return $card->getId() === $promiseCardId;
    });
    if ($promiseCard === null) {
      throw new \Bga\GameFramework\VisibleSystemException("ERROR_089");
    }

    $promiseCard->applyEffect($this->ctx, Players::get($playerId), null);
    $this->updateConsent($promiseCard->getOwnerPlayerId());

    if (count($this->getPromiseCards($stateArgs['officeId'])) === 0) {
      $this->setPlayerActionCompleted($playerId);
    }
  }

  private function handleConsentGiven(int $playerId, bool $consent, array $stateArgs)
  {
    if ($playerId === $stateArgs['hiringPlayerId']) {
      throw new \Bga\GameFramework\VisibleSystemException("ERROR_090");
    }
    Notifications::message($consent ? clienttranslate('${player_name} gives their consent') : clienttranslate('${player_name} does not give their consent'), [
      'player' => Players::get($playerId),
    ]);
    $this->updateConsent($playerId, $consent);
    $this->setPlayerActionCompleted($playerId);
  }

  private function nextStep()
  {
    $stateArgs = $this->argsHiringGiveConsentForNepotism();
    $consent = $this->getConsentGiven();
    $hiringPlayerId = $stateArgs['hiringPlayerId'];

    if ($this->allConsentsGiven($hiringPlayerId)) {
      $this->handleConsentIsGiven($stateArgs);
      return;
    }

    $hiringPlayerCanAct = in_array($hiringPlayerId, $this->getActivePlayerIds())
      && !in_array($hiringPlayerId, $this->ctx->getInfo()['completedPlayerIds'] ?? []);
    foreach ($consent as $playerId => $given) {
      if ($given !== false) {
        continue;
      }
      $promiseCard = Utils::array_find($stateArgs['promiseCards'], function ($card) use ($playerId) {
        return $card->getOwnerPlayerId() === (int) $playerId;
      });
      if (!$hiringPlayerCanAct || $promiseCard === null) {
        $this->onNoConsentGiven($stateArgs);
        return;
      }
    }

    Engine::proceed();
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private function handleConsentIsGiven(array $stateArgs)
  {

    $this->setAllActivePlayerIdsNonMultiactive();

    Notifications::message(clienttranslate('All candidates have given their consent'));

    $this->performAction($stateArgs['hiringPlayerId'], $stateArgs['familyMember'], $stateArgs['officeId']);

    $this->resolveAction([], true);
  }

  private function getConsentGiven(): array
  {
    return $this->ctx->getInfo()['consent'] ?? [];
  }

  private function getPromiseCards(string $officeId)
  {
    list($hiringPlayerId, $options, $appointingCommander, $office) = $this->getCandidatesForHiringAndHiringPlayerId($officeId);

    $promiseCards = PromiseCards::getInLocation(Locations::promiseCards($hiringPlayerId))->toArray();
    $consent = $this->getConsentGiven();

    return Utils::filter($promiseCards, function ($card) use ($options, $hiringPlayerId, $consent) {
      $ownerPlayerId = $card->getOwnerPlayerId();
      $ownwerHasGivenConsent = $consent[$ownerPlayerId] ?? false;
      return $card->getType() === MY_CONSENT_FOR_NEPOTISM && $ownerPlayerId !== $hiringPlayerId && !$ownwerHasGivenConsent && Utils::array_some($options, function ($candidate) use ($ownerPlayerId) {
        return $candidate->getPlayerId() === $ownerPlayerId;
      });
    });
  }

  private function onNoConsentGiven(array $stateArgs)
  {
    $hiringPlayerId = $stateArgs['hiringPlayerId'];
    $officeId = $stateArgs['officeId'];
    $appointingCommander = $stateArgs['appointingCommander'];

    $this->ctx->insertAsBrother(new LeafNode([
      'action' => HIRING_HIRE_FAMILY_MEMBER,
      'playerId' => 'some',
      'activePlayerIds' => [$hiringPlayerId],
      'args' => [
        'officeId' => $officeId,
        'hiringPlayerId' => $hiringPlayerId,
        'appointingCommander' => $appointingCommander,
        'consentForNepotismRejected' => true
      ],
    ]));

    $this->setAllActivePlayerIdsNonMultiactive();
    $this->resolveAction([], true);
  }

  private function allConsentsGiven(int $hiringPlayerId): bool
  {
    $consent = $this->getConsentGiven();
    $activePlayerIds = $this->getActivePlayerIds();
    foreach ($activePlayerIds as $playerId) {
      if ($playerId === $hiringPlayerId) {
        continue;
      }
      if (!($consent[$playerId] ?? false)) {
        return false;
      }
    }
    return true;
  }

  private function updateConsent(int $playerId, bool $consent = true)
  {
    $currentConsent = $this->getConsentGiven();

    $currentConsent[$playerId] = $consent;
    $this->ctx->updateInfo('consent', $currentConsent);
    Engine::save();
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
    return clienttranslate('HiringGiveConsentForNepotism');
  }

  public function isDoable(Player $player): bool
  {
    return true;
  }
}
