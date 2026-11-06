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

    container.addEventListener('click', (event) =>
      this.onDealButtonClick(event),
    );

    this.updateTable(gamedatas);
  }

  // .##.....##.########..########.....###....########.########....##.....##.####
  // .##.....##.##.....##.##.....##...##.##......##....##..........##.....##..##.
  // .##.....##.##.....##.##.....##..##...##.....##....##..........##.....##..##.
  // .##.....##.########..##.....##.##.....##....##....######......##.....##..##.
  // .##.....##.##........##.....##.#########....##....##..........##.....##..##.
  // .##.....##.##........##.....##.##.....##....##....##..........##.....##..##.
  // ..#######..##........########..##.....##....##....########.....#######..####

  private getCurrentFamilyId(): string | null {
    return (
      PlayerManager.getInstance().getPlayer(this.game.getPlayerId())?.familyId ??
      null
    );
  }

  private updateTable(gamedatas: GamedatasAlias) {
    Object.values(gamedatas.deals).forEach((deal) => this.addDeal(deal));
  }

  public addDeal(deal: JocoDeal) {
    const target =
      deal.status === 'offer'
        ? this.ui.offers
        : deal.status === 'agreement'
          ? this.ui.agreements
          : null;
    target?.insertAdjacentHTML(
      'beforeend',
      tplDealsTableRow(deal, this.getCurrentFamilyId()),
    );
  }

  public updateDeal(deal: JocoDeal) {
    document.getElementById(`joco-deal-${deal.id}`)?.remove();
    this.addDeal(deal);
  }

  private async onDealButtonClick(event: Event) {
    const button = (event.target as HTMLElement).closest<HTMLElement>(
      '[data-deal-action]',
    );
    if (!button) {
      return;
    }
    const { dealAction, dealId } = button.dataset;
    const isAccept = dealAction === 'accept';
    const isReject = dealAction === 'reject';
    const report = dealAction === 'fulfilled' ? 'fulfilled' : 'violated';
    const confirmed = await this.game.bga.dialogs.confirmation(
      isAccept
        ? _('Are you sure you want to accept this offer?')
        : isReject
          ? _('Are you sure you want to reject this offer?')
          : report === 'fulfilled'
            ? _('Mark this agreement fulfilled?')
            : _('Mark this agreement violated?'),
    );
    if (!confirmed) {
      return;
    }
    this.game.bga.actions.performAction(
      isAccept
        ? 'actAcceptOffer'
        : isReject
          ? 'actRejectOffer'
          : 'actMarkAgreement',
      isAccept || isReject ? { dealId } : { dealId, report },
      { checkAction: false, checkPossibleActions: false },
    );
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
