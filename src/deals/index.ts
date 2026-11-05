import { TabContainer } from '../boilerplate/ui-components/tab-container';
import { PlayerManager } from '../player-manager';
import { GameAlias, GamedatasAlias, JocoDeal, JocoDealAssets } from '../types';
import { NewOffer } from './new-offer';
import { DealsPlayersTable } from './players-table';

import {
  tplAgreements,
  tplDeals,
  tplDealsPlayers,
  tplDealsTableRow,
  tplOffers,
} from './templates';

export class Deals {
  private static instance: Deals;
  private ui: {
    offers: HTMLElement;
    agreements: HTMLElement;
  };
  private tabContainer: TabContainer;
  private newOffer: NewOffer;
  private playersTable: DealsPlayersTable;

  constructor(private game: GameAlias) {
    this.game = game;
    this.setup(game.gamedatas);
  }

  public static create(game: GameAlias) {
    Deals.instance = new Deals(game);
  }

  public static getInstance() {
    return Deals.instance;
  }

  // ..######..########.########.##.....##.########.
  // .##....##.##..........##....##.....##.##.....##
  // .##.......##..........##....##.....##.##.....##
  // ..######..######......##....##.....##.########.
  // .......##.##..........##....##.....##.##.......
  // .##....##.##..........##....##.....##.##.......
  // ..######..########....##.....#######..##.......

  setup(gamedatas: GamedatasAlias) {
    const playerManager = PlayerManager.getInstance();

    document
      .getElementById('joco')
      .insertAdjacentHTML('afterbegin', tplDeals());
    const container = document.getElementById('joco-deals');

    this.tabContainer = new TabContainer({
      id: 'joco-deals-tabs',
      parentElement: container,
      gameName: this.game.gameName,
      tabs: [
        {
          id: 'joco-deals-players',
          title: _('Players'),
          content: tplDealsPlayers(gamedatas, this.game.playerOrder),
        },
        {
          id: 'joco-offers',
          title: _('Offers'),
          content: tplOffers(),
        },
        {
          id: 'joco-agreements',
          title: _('Agreements'),
          content: tplAgreements(),
        },
      ],
      initialActiveTabId: 'joco-deals-players',
    });

    this.newOffer = new NewOffer(this.game);
    this.playersTable = new DealsPlayersTable(this.game);

    this.ui = {
      offers: document.getElementById('joco-offers-inner'),
      agreements: document.getElementById('joco-agreements-inner'),
    };

    this.updateTable(gamedatas);
  }

  // .##.....##.########..########.....###....########.########....##.....##.####
  // .##.....##.##.....##.##.....##...##.##......##....##..........##.....##..##.
  // .##.....##.##.....##.##.....##..##...##.....##....##..........##.....##..##.
  // .##.....##.########..##.....##.##.....##....##....######......##.....##..##.
  // .##.....##.##........##.....##.#########....##....##..........##.....##..##.
  // .##.....##.##........##.....##.##.....##....##....##..........##.....##..##.
  // ..#######..##........########..##.....##....##....########.....#######..####

  private updateTable(gamedatas: GamedatasAlias) {
    Object.values(gamedatas.deals).forEach((deal) => {
      if (deal.status === 'offer') {
        this.ui.offers.insertAdjacentHTML('beforeend', tplDealsTableRow(deal));
      } else if (deal.status === 'agreement') {
        this.ui.agreements.insertAdjacentHTML(
          'beforeend',
          tplDealsTableRow(deal),
        );
      }
    });
  }

  public addDeal(deal: JocoDeal) {
    this.ui.offers.insertAdjacentHTML('beforeend', tplDealsTableRow(deal));
  }

  public startNewOffer(opponentId: number) {
    this.newOffer.startNewOffer(opponentId);
  }

  // public setAvailableItems(playerId: number, items: JocoDealAssets) {
  //   this.newOffer.setAvailableItems(playerId, items);
  // }

  public cancelNewOffer() {
    this.newOffer.cancelNewOffer();
  }
}
