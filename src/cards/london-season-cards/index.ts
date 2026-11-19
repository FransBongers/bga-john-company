import { BLACKMAIL, PRESTIGE } from '../../constants';
import { BgaCards } from '../../libs';
import { GameAlias, JocoLondonSeasonCard } from '../../types';
import { TimingPreferences } from '../../timing-preferences';
import {
  tplBlackmailCardContent,
  tplLondonSeasonCardContent,
} from './templates';

export class LondonSeasonCardsManager extends BgaCards.Manager<JocoLondonSeasonCard> {
  private static instance: LondonSeasonCardsManager;

  public static create(game: GameAlias) {
    LondonSeasonCardsManager.instance = new LondonSeasonCardsManager(game);
  }

  public static getInstance() {
    return LondonSeasonCardsManager.instance;
  }

  constructor(public game: GameAlias) {
    super({
      getId: (card) => card.id,
      setupDiv: (card, div) => this.setupDiv(card, div),
      setupFrontDiv: (card, div: HTMLElement) => this.setupFrontDiv(card, div),
      setupBackDiv: (card, div: HTMLElement) => this.setupBackDiv(card, div),
      isCardVisible: (card) => this.isCardVisible(card),
      animationManager: game.animationManager,
      cardHeight: 351,
      cardWidth: 225,
      // cardBorderRadius: '5px',
    });
  }

  clearInterface() {}

  setupDiv(card: JocoLondonSeasonCard, div: HTMLElement) {
    div.classList.add('joco-card-container');
    div.setAttribute('data-type', card.type);
    if (card.type === PRESTIGE) {
      div.setAttribute('data-subtype', card.subtype);
    }
    this.updateAlertButton(card, div);
  }

  setupFrontDiv(card: JocoLondonSeasonCard, div: HTMLElement) {
    this.updateAlertButton(card, div.closest<HTMLElement>('.joco-card-container'));
    div.classList.add('joco-card');
    div.setAttribute(
      'data-background',
      card.type === BLACKMAIL ? 'Blackmail' : card.background,
    );
    div.setAttribute('data-has-text-note', card.textNote ? 'true' : 'false');
    div.setAttribute('data-card-id', card.id);
    if (card.type === PRESTIGE) {
      div.setAttribute('data-subtype', card.subtype);
    }

    if (card.type === BLACKMAIL && !card.hiddenId && div.children.length) {
      div.replaceChildren();
      return;
    }
    if (div.children.length || (card.type === BLACKMAIL && !card.hiddenId)) {
      return;
    }

    let cardContent = '';

    if (card.type === BLACKMAIL && card.hiddenId) {
      cardContent = tplBlackmailCardContent(card);
    } else if (card.type === PRESTIGE) {
      cardContent = tplLondonSeasonCardContent(card);
    }

    if (cardContent) {
      div.insertAdjacentHTML('beforeend', cardContent);
    }
  }

  private updateAlertButton(card: JocoLondonSeasonCard, container: HTMLElement | null) {
    if (!container) return;
    if (card.type === BLACKMAIL && card.hiddenId && this.game.gamedatas.staticData.londonSeasonCards[card.hiddenId]?.timingWindows.length) {
      TimingPreferences.get().addCardButton(container, card.hiddenId);
    } else {
      container.querySelector('.joco-card-timing-button')?.remove();
    }
  }

  setupBackDiv(card: JocoLondonSeasonCard, div: HTMLElement) {
    div.classList.add('joco-card');
    div.setAttribute(
      'data-background',
      card.type === PRESTIGE ? 'PrestigeBack' : 'BlackmailBack',
    );
  }

  isCardVisible(card: JocoLondonSeasonCard) {
    return (
      card.type !== BLACKMAIL || (card.type === BLACKMAIL && !!card.hiddenId)
    );
  }
}
