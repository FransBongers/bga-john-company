import { COMPANY_SHIP, FULL, PLAYER_OWNED_SHIP } from '../../constants';
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
      cardHeight: 45,
      cardWidth: 50,
      type: 'law-card',
    });
  }

  clearInterface() {}

  setupDiv(card: JocoShipBase, div: HTMLElement) {
    div.classList.add('joco-ship');
  }

  setupFrontDiv(card: JocoShipBase, div: HTMLElement) {
    div.classList.add('joco-ship');
    // div.setAttribute('data-background', card.background);
    div.setAttribute('data-type', card.type);

    if (div.children.length) {
      return;
    }
    div.insertAdjacentHTML('beforeend', tplShipContent(card));
  }

  setupBackDiv(card: JocoShipBase, div: HTMLElement) {
    div.classList.add('joco-ship');
    div.setAttribute('data-type', card.type);
    if (card.type === PLAYER_OWNED_SHIP) {
      div.setAttribute('data-fatigued', '1');
    }

    if (div.children.length) {
      return;
    }
    div.insertAdjacentHTML('beforeend', tplShipContent(card, true));
  }

  isCardVisible(card: JocoShipBase) {
    return card.side === FULL || card.side === COMPANY_SHIP;
  }
}
