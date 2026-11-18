import { Interaction, SELECTABLE, SELECTED } from '../boilerplate';
import { LondonSeasonCardsManager } from '../cards/london-season-cards';
import { PromiseCardsManager } from '../cards/promise-cards';
import { CASH_COUNTER } from '../constants';
import { PhaseTracker } from '../phase-tracker';
import { PlayerManager } from '../player-manager';
import { GameAlias } from '../types';
import { getAnytimeCardIds } from './eligibility';

export const ANYTIME_CARD_STATE = 'clientConfirmAnytimeCard';

export class AnytimeCards {
  private listeners: Array<{ element: HTMLElement; handler: EventListener }> = [];
  private selectedTitle = '';

  constructor(private game: GameAlias) {}

  public setup(stateName: string, args: any) {
    this.clear();
    if (this.game.isSpectator) return;

    const playerId = this.game.getPlayerId();
    const players = PlayerManager.getInstance();
    const player = players.getPlayer(playerId);
    const playerArea = player && players.getPlayerArea(playerId);
    if (!playerArea) return;

    const promiseCards = playerArea.getPromiseCards();
    const blackmailCards = playerArea.stocks[`londonSeasonCards_${player.familyId}`].getCards();
    const occupiedOffices = Object.keys(this.game.gamedatas.offices).filter((officeId) =>
      document.getElementById(`OfficeCard_${officeId}`) &&
      document.getElementById(officeId)?.querySelector('.joco-family-member'),
    );
    const cashByPlayer = Object.fromEntries(players.getPlayerIds().map((id) => [
      id, players.getPlayer(id).counters[CASH_COUNTER]?.getValue() ?? 0,
    ]));
    const eligibleIds = getAnytimeCardIds({
      playerId,
      phase: PhaseTracker.getInstance().getPhase(),
      promiseCards,
      blackmailCards,
      cashByPlayer,
      occupiedOffices,
    });
    const timingCardIds = stateName === 'TimingWindowAct'
      ? (args?._private ?? []).map((option: { cardId: string }) => option.cardId)
      : [];

    promiseCards.forEach((card) => {
      if (eligibleIds.includes(card.id) && !timingCardIds.includes(card.id)) {
        this.makeSelectable(PromiseCardsManager.getInstance().getCardElement(card), card.title);
      }
    });
    blackmailCards.forEach((card) => {
      if (eligibleIds.includes(card.id) && !timingCardIds.includes(card.hiddenId)) {
        this.makeSelectable(LondonSeasonCardsManager.getInstance().getCardElement(card), card.title);
      }
    });
  }

  private makeSelectable(element: HTMLElement, title: string) {
    if (!element) return;
    const handler: EventListener = (event) => {
      if (element.classList.contains(SELECTABLE) || element.classList.contains(SELECTED) || this.game._helpMode) return;
      // @ts-expect-error
      if (this.game.bga.actions.game.isInterfaceLocked()) return;
      event.stopPropagation();
      this.selectedTitle = title;
      this.game.bga.states.setClientState(ANYTIME_CARD_STATE, {
        descriptionmyturn: _('Play ${cardTitle}?'),
        args: { cardTitle: _(title) },
      });
    };
    element.classList.add('anytime-selectable');
    element.addEventListener('click', handler, true);
    this.listeners.push({ element, handler });
  }

  public showConfirmation() {
    this.clear();
    this.game.clearPossible();
    this.game.bga.statusBar.setTitle(_('Play ${cardTitle}?'), { cardTitle: _(this.selectedTitle) });
    this.game.bga.statusBar.addActionButton(_('Confirm'), () => {}, {
      id: 'confirm_anytime_card',
      color: 'primary',
      destination: document.getElementById('customActions'),
      disabled: true,
    });
    Interaction.use().addCancelButton();
  }

  public clear() {
    this.listeners.forEach(({ element, handler }) => {
      element.removeEventListener('click', handler, true);
      element.classList.remove('anytime-selectable');
    });
    this.listeners = [];
  }
}