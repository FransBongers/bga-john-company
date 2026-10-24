import { BgaCards } from '../../libs';
import { GameAlias, JocoSetupCard } from '../../types';
import { tplSetupCardContent } from './templates';

export class SetupCardsManager extends BgaCards.Manager<JocoSetupCard> {
  private static instance: SetupCardsManager;

  public static create(game: GameAlias) {
    SetupCardsManager.instance = new SetupCardsManager(game);
  }

  public static getInstance() {
    return SetupCardsManager.instance;
  }

  constructor(public game: GameAlias) {
    super({
      getId: (card) => card.id,
      setupDiv: (card, div) => this.setupDiv(card, div),
      setupFrontDiv: (card, div: HTMLElement) => this.setupFrontDiv(card, div),
      setupBackDiv: (card, div: HTMLElement) => this.setupBackDiv(card, div),
      isCardVisible: (card) => this.isCardVisible(card),
      animationManager: game.animationManager,
      cardHeight: 228.75,
      cardWidth: 150,
      type: 'setup-card',
    });
  }

  clearInterface() {}

  setupDiv(card: JocoSetupCard, div: HTMLElement) {
    div.classList.add('joco-setup-card-container');
  }

  setupFrontDiv(card: JocoSetupCard, div: HTMLElement) {
    div.classList.add('joco-setup-card');
    const itemCount = card.items.length;
    div.setAttribute(
      'data-background',
      `Setup${card.scenarioSetup}_${itemCount}`,
    );
    div.setAttribute('data-card-id', card.id);
    div.setAttribute('data-item-count', `${itemCount}`);

    if (div.children.length) {
      return;
    }
    div.insertAdjacentHTML('beforeend', tplSetupCardContent(card));
  }

  setupBackDiv(card: JocoSetupCard, div: HTMLElement) {
    div.setAttribute('data-background', 'SetupBack');
    div.classList.add('joco-setup-card');
  }

  isCardVisible(card: JocoSetupCard) {
    return true;
  }
}
