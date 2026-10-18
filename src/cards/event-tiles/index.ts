import { DISCARD } from '../../boilerplate';
import { BgaCards } from '../../libs';
import { GameAlias, JocoEventTile } from '../../types';
import { tplEventTileContent } from './templates';


export class EventTilesManager extends BgaCards.Manager<JocoEventTile> {
  private static instance: EventTilesManager;

  public static create(game: GameAlias) {
    EventTilesManager.instance = new EventTilesManager(game);
  }

  public static getInstance() {
    return EventTilesManager.instance;
  }

  constructor(public game: GameAlias) {
    super({
      getId: (card) => card.id,
      setupDiv: (card, div) => this.setupDiv(card, div),
      setupFrontDiv: (card, div: HTMLElement) => this.setupFrontDiv(card, div),
      setupBackDiv: (card, div: HTMLElement) => this.setupBackDiv(card, div),
      isCardVisible: (card) => this.isCardVisible(card),
      animationManager: game.animationManager,
      cardHeight: 300,
      cardWidth: 300,
      type: 'event-tile',
      cardBorderRadius: '100%',
    });
  }

  clearInterface() {}

  setupDiv(card: JocoEventTile, div: HTMLElement) {
    div.classList.add('joco-event-tile-container');
  }

  setupFrontDiv(card: JocoEventTile, div: HTMLElement) {
    div.classList.add('joco-event-tile');
    div.setAttribute('data-background', card.background);
    div.setAttribute('data-type', card.type);

    if (div.children.length) {
      return;
    }
    div.insertAdjacentHTML('beforeend', tplEventTileContent(card));
  }

  setupBackDiv(card: JocoEventTile, div: HTMLElement) {
    div.classList.add('joco-event-tile');
    div.setAttribute('data-background', card.regionId);
  }

  isCardVisible(card: JocoEventTile) {
    return card.location === DISCARD;
  }
}
