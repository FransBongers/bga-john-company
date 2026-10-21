import { BgaCards } from '../../libs';
import { GameAlias, JocoPromiseCard } from '../../types';
import { tplPromiseCardContent } from './templates';

export class PromiseCardsManager extends BgaCards.Manager<JocoPromiseCard> {
  private static instance: PromiseCardsManager;

  public static create(game: GameAlias) {
    PromiseCardsManager.instance = new PromiseCardsManager(game);
  }

  public static getInstance() {
    return PromiseCardsManager.instance;
  }

  constructor(public game: GameAlias) {
    super({
      getId: (card) => card.id,
      setupDiv: (card, div) => this.setupDiv(card, div),
      setupFrontDiv: (card, div: HTMLElement) => this.setupFrontDiv(card, div),
      setupBackDiv: (card, div: HTMLElement) => this.setupBackDiv(card, div),
      isCardVisible: (card) => this.isCardVisible(card),
      animationManager: game.animationManager,
      cardHeight: 150,
      cardWidth: 228.75,
      type: 'promise-card',
    });
  }

  clearInterface() {}

  setupDiv(card: JocoPromiseCard, div: HTMLElement) {
    div.classList.add('joco-promise-card-container');
  }

  setupFrontDiv(card: JocoPromiseCard, div: HTMLElement) {
    div.classList.add('joco-promise-card');
    div.classList.add('joco-small-card-horizontal');
    // div.setAttribute('data-family-id', card.familyId);
    div.setAttribute('data-background', `PromiseCard${card.familyId}`);

    if (div.children.length) {
      return;
    }
    div.insertAdjacentHTML('beforeend', tplPromiseCardContent(card));
  }

  setupBackDiv(card: JocoPromiseCard, div: HTMLElement) {
    div.setAttribute('data-background', 'PromiseBack');
    div.classList.add('joco-small-card-horizontal');
  }

  isCardVisible(card: JocoPromiseCard) {
    return true;
  }
}
