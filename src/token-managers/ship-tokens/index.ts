import { COMPANY_SHIP, EXTRA_SHIP, FATIGUED, FULL, PLAYER_OWNED_SHIP } from '../../constants';
import { BgaCards } from '../../libs';
import { GameAlias, JocoShipBase } from '../../types';
import { tplShipContent } from './templates';

export class ShipsManager extends BgaCards.Manager<JocoShipBase> {
  private static instance: ShipsManager;

  public static create(game: GameAlias) {
    ShipsManager.instance = new ShipsManager(game);
  }

  public static getInstance() {
    return ShipsManager.instance;
  }

  constructor(public game: GameAlias) {
    super({
      getId: (card) => card.id,
      setupDiv: (card, div) => this.setupDiv(card, div),
      setupFrontDiv: (card, div: HTMLElement) => this.setupFrontDiv(card, div),
      setupBackDiv: (card, div: HTMLElement) => this.setupBackDiv(card, div),
      isCardVisible: (card) => this.isCardVisible(card),
      animationManager: game.animationManager,
      cardWidth: 75,
      cardHeight: 68,
      type: 'ship',
    });
  }

  clearInterface() {}

  setupDiv(card: JocoShipBase, div: HTMLElement) {
    div.classList.add('joco-ship-container');
  }

  setupFrontDiv(card: JocoShipBase, div: HTMLElement) {
    div.classList.add('joco-ship');
    // div.setAttribute('data-background', card.background);
    div.setAttribute('data-side', card.type === PLAYER_OWNED_SHIP ? FULL : COMPANY_SHIP);

    if (div.children.length) {
      return;
    }
    div.insertAdjacentHTML('beforeend', tplShipContent(card));
  }

  setupBackDiv(card: JocoShipBase, div: HTMLElement) {
    div.classList.add('joco-ship');
    div.setAttribute('data-side', card.type === PLAYER_OWNED_SHIP ? FATIGUED : EXTRA_SHIP);

    if (div.children.length) {
      return;
    }
    div.insertAdjacentHTML('beforeend', tplShipContent(card, true));
  }

  isCardVisible(card: JocoShipBase) {
    return card.side === FULL || card.side === COMPANY_SHIP;
  }
}
