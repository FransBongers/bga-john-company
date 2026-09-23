import { SHIPYARD, WORKSHOP } from '../../constants';
import { BgaCards } from '../../libs';
import { ShipsManager } from '../../token-managers/ship-tokens';
import { GameAlias, JocoEnterpriseCard, JocoShipBase } from '../../types';
import { tplEnterpriseCardContent } from './templates';

export class EnterpriseCardsManager extends BgaCards.Manager<JocoEnterpriseCard> {
  private static instance: EnterpriseCardsManager;
  public shipStocks: Record<
    string,
    InstanceType<typeof BgaCards.LineStock<JocoShipBase>>
  > = {};

  public static create(game: GameAlias) {
    EnterpriseCardsManager.instance = new EnterpriseCardsManager(game);
  }

  public static getInstance() {
    return EnterpriseCardsManager.instance;
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
      type: 'enterprise-card',
    });
  }

  clearInterface() {}

  setupDiv(card: JocoEnterpriseCard, div: HTMLElement) {}

  setupFrontDiv(card: JocoEnterpriseCard, div: HTMLElement) {
    div.classList.add('joco-enterprise-card');
    div.classList.add('joco-small-card-horizontal');
    div.setAttribute('data-background', card.type);

    if (div.children.length) {
      return;
    }
    div.insertAdjacentHTML('beforeend', tplEnterpriseCardContent(card));
    if (card.type === SHIPYARD) {
      this.shipStocks[card.id] = new BgaCards.LineStock<JocoShipBase>(
        ShipsManager.getInstance(),
        document.getElementById(`${card.id}-ship`)!,
      );
    }
  }

  setupBackDiv(card: JocoEnterpriseCard, div: HTMLElement) {
    div.classList.add('joco-enterprise-card');
    div.classList.add('joco-small-card-horizontal');
    div.setAttribute(
      'data-background',
      card.type === WORKSHOP ? `${WORKSHOP}Invested` : card.type,
    );
  }

  isCardVisible(card: JocoEnterpriseCard) {
    if (card.type === WORKSHOP && card.invested) {
      return false;
    }
    return true;
  }
}
