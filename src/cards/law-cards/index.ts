import { BgaCards } from '../../libs';
import { GameAlias, JocoLawCard } from '../../types';
import { tplLawCardContent } from './templates';

export class LawCardsManager extends BgaCards.Manager<JocoLawCard> {
  private static instance: LawCardsManager;

  public static create(game: GameAlias) {
    LawCardsManager.instance = new LawCardsManager(game);
  }

  public static getInstance() {
    return LawCardsManager.instance;
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
      type: 'law-card',
    });
  }

  clearInterface() {}

  setupDiv(card: JocoLawCard, div: HTMLElement) {
    div.classList.add('joco-law-card');
  }

  setupFrontDiv(card: JocoLawCard, div: HTMLElement) {
    div.classList.add('joco-law-card');
    div.setAttribute('data-background', card.background);

    if (div.children.length) {
      return;
    }
    div.insertAdjacentHTML('beforeend', tplLawCardContent(card));
  }

  setupBackDiv(card: JocoLawCard, div: HTMLElement) {
    div.setAttribute('data-background', 'LawBack');
  }

  isCardVisible(card: JocoLawCard) {
    return true;
  }
}
