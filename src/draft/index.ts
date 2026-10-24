import { SetupCardsManager } from '../cards/setup-cards';
import { BgaCards } from '../libs';
import { StaticData } from '../static-data';
import {
  GameAlias,
  GamedatasAlias,
  JocoSetupCard,
  JocoSetupCardBase,
} from '../types';
import { getSetupCard } from '../utility';
import { tplDraft } from './templates';

export class Draft {
  private static instance: Draft;
  private game: GameAlias;
  private ui: {
    container: HTMLElement;
    chosen: HTMLElement;
    hand: HTMLElement;
  };
  private playerId: number;

  public hand: InstanceType<typeof BgaCards.LineStock<JocoSetupCard>>;
  public chosen: InstanceType<typeof BgaCards.LineStock<JocoSetupCard>>;

  constructor(game: GameAlias) {
    this.game = game;
    this.playerId = game.getPlayerId();
    this.setup(game.gamedatas);
  }

  public static create(game: GameAlias) {
    Draft.instance = new Draft(game);
  }

  public static getInstance() {
    return Draft.instance;
  }

  // ..######..########.########.##.....##.########.
  // .##....##.##..........##....##.....##.##.....##
  // .##.......##..........##....##.....##.##.....##
  // ..######..######......##....##.....##.########.
  // .......##.##..........##....##.....##.##.......
  // .##....##.##..........##....##.....##.##.......
  // ..######..########....##.....#######..##.......

  // Setup functions
  setup(gamedatas: GamedatasAlias) {
    document
      .getElementById('joco')
      .insertAdjacentHTML('afterbegin', tplDraft());

    this.ui = {
      container: document.getElementById('joco-draft'),
      chosen: document.getElementById('joco-chosen-setup-cards'),
      hand: document.getElementById('joco-setup-hand'),
    };

    this.setupStocks(gamedatas);
    // StaticData.get()
    //   .setupCards()
    //   .forEach((card) => {
    //     const elt = (this.cards[card.id] = document.createElement('div'));
    //     elt.id = card.id;
    //     elt.classList.add('joco-setup-card');
    //     elt.setAttribute('data-card-id', card.id);
    //   });

    // const players = gamedatas.players;
  }

  private setupStocks(gamedatas: GamedatasAlias) {
    this.hand = new BgaCards.LineStock<JocoSetupCard>(
      SetupCardsManager.getInstance(),
      this.ui.hand,
      {
        gap: '12px',
      },
    );

    this.chosen = new BgaCards.LineStock<JocoSetupCard>(
      SetupCardsManager.getInstance(),
      this.ui.chosen,
      {
        gap: '12px',
      },
    );

    this.hand.addCards(
      gamedatas.players[this.playerId].setupDraftHand.map(getSetupCard),
    );
    // this.hand.addCards(
    //   gamedatas.players[this.playerId].setupCardsHand.map(getSetupCard),
    // );
    this.chosen.addCards(
      gamedatas.players[this.playerId].setupCardsChosen.map(getSetupCard),
    );
  }

  public async newCards(cards: JocoSetupCardBase[]) {
    this.hand.removeAll();

    if (cards[0].location.startsWith('setupCards_')) {
      await this.chosen.addCards(cards.map(getSetupCard));
    } else {
      await this.hand.addCards(cards.map(getSetupCard));
    }
  }

  public hide() {
    this.ui.container.style.display = 'none';
  }
}
