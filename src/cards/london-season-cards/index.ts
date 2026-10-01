import { BLACKMAIL, PRESTIGE } from '../../constants';
import { BgaCards } from '../../libs';
import { GameAlias, JocoLondonSeasonCard } from '../../types';
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
    div.setAttribute('data-has-text-note', card.textNote ? 'true' : 'false');
  }

  setupFrontDiv(card: JocoLondonSeasonCard, div: HTMLElement) {
    div.classList.add('joco-card');
    div.setAttribute(
      'data-background',
      card.type === BLACKMAIL ? 'Blackmail' : card.background,
    );

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
