import { EventTilesManager } from '../../cards/event-tiles';
import { BgaCards } from '../../libs';
import {
  GameAlias,
  GamedatasAlias,
  JocoEventTile,
  JocoEventTileBase,
} from '../../types';
import { getEventTile } from '../../utility';

export class EventTiles {
  private static instance: EventTiles;
  private deck: InstanceType<typeof BgaCards.LineStock<JocoEventTile>>;
  private discard: InstanceType<typeof BgaCards.LineStock<JocoEventTile>>;

  public ui: {};
  constructor(private game: GameAlias) {
    this.game = game;
    this.setup(game.gamedatas);
  }

  public static create(game: GameAlias) {
    EventTiles.instance = new EventTiles(game);
  }

  public static getInstance() {
    return EventTiles.instance;
  }

  // ..######..########.########.##.....##.########.
  // .##....##.##..........##....##.....##.##.....##
  // .##.......##..........##....##.....##.##.....##
  // ..######..######......##....##.....##.########.
  // .......##.##..........##....##.....##.##.......
  // .##....##.##..........##....##.....##.##.......
  // ..######..########....##.....#######..##.......

  setup(gamedatas: GamedatasAlias) {
    document
      .getElementById('joco-india')
      .insertAdjacentHTML('beforeend', this.tplEventTiles());

    this.ui = {};

    this.setupStocks(gamedatas);
  }

  private setupStocks(gamedatas: GamedatasAlias) {
    this.discard = new BgaCards.LineStock<JocoEventTile>(
      EventTilesManager.getInstance(),
      document.getElementById(`joco-event-tiles-discard`),
    );

    this.deck = new BgaCards.LineStock<JocoEventTile>(
      EventTilesManager.getInstance(),
      document.getElementById(`joco-event-tiles-deck`),
    );

    if (gamedatas.eventTiles.deck) {
      this.deck.addCard(getEventTile(gamedatas.eventTiles.deck));
    }

    if (gamedatas.eventTiles.discard) {
      this.discard.addCard(getEventTile(gamedatas.eventTiles.discard));
    }
    // this.discard.addCards(gamedatas.eventTiles.all.map(getEventTile));
  }

  tplEventTiles() {
    return `
    <div class="joco-container joco-event-tiles-container">
      <div class="joco-header"><span class="fb-font-baskerville fb-font-16 fb-font-bold">${_('Event Tiles').toLocaleUpperCase()}</span></div>
      <div class="joco-row">
        <div id="joco-event-tiles-discard" class="joco-event-tiles-stock"></div>
        <div id="joco-event-tiles-deck" class="joco-event-tiles-stock"></div>
      </div>
    </div>`;
  }

  // .##.....##.########..########.....###....########.########....##.....##.####
  // .##.....##.##.....##.##.....##...##.##......##....##..........##.....##..##.
  // .##.....##.##.....##.##.....##..##...##.....##....##..........##.....##..##.
  // .##.....##.########..##.....##.##.....##....##....######......##.....##..##.
  // .##.....##.##........##.....##.#########....##....##..........##.....##..##.
  // .##.....##.##........##.....##.##.....##....##....##..........##.....##..##.
  // ..#######..##........########..##.....##....##....########.....#######..####

  public async drawEventTile(
    eventTile: JocoEventTileBase,
    topOfDeck: JocoEventTileBase | null,
  ) {
    // const promises = [
    //   this.discard.addCard(getEventTile(eventTile)),
    // ];
    // if (topOfDeck) {
    //   promises.push(this.deck.addCard(getEventTile(topOfDeck)));
    // }
    await Promise.all([
      this.discard.addCard(getEventTile(eventTile)),
      this.deck.addCard(getEventTile(topOfDeck)),
    ]);
    // TODO: remove current top of discard?
  }
}
