import { TabContainer } from '../boilerplate/ui-components/tab-container';
import { AttentionManager } from '../attention';
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

    document.getElementById('joco-offers-tab').addEventListener('click', () => {
      if (document.getElementById('joco-offers-tab').classList.contains('active')) {
        this.acknowledgeVisibleOffers();
      }
    }, true);

    AttentionManager.getInstance().subscribe(() => this.updateAttention());

    this.updateTable(gamedatas);
    this.updateAttention();
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
    this.updateAttention();
  }

  public updateDeal(deal: JocoDeal) {
    document.getElementById(`joco-deal-${deal.id}`)?.remove();
    if (deal.status !== 'offer') {
      const attention = AttentionManager.getInstance();
      attention.remove(attention.getEntries('new_offer', 'deal', deal.id).map((entry) => entry.id));
    }
    this.addDeal(deal);
  }

  private updateAttention() {
    const entries = AttentionManager.getInstance().getEntries('new_offer', 'deal');
    this.ui.offers.querySelectorAll<HTMLElement>('.joco-table-row[id^="joco-deal-"]').forEach((row) => {
      row.classList.toggle('joco-needs-attention', entries.some((entry) => `joco-deal-${entry.itemId}` === row.id));
    });
    const tab = document.getElementById('joco-offers-tab');
    let badge = tab.querySelector<HTMLElement>('.joco-attention-count');
    if (entries.length) {
      if (!badge) {
        badge = document.createElement('span');
        badge.className = 'joco-attention-count';
        tab.appendChild(badge);
      }
      badge.textContent = String(entries.length);
      badge.title = _('New offers');
      badge.setAttribute('aria-label', `${_('New offers')}: ${entries.length}`);
    } else {
      badge?.remove();
    }
  }

  private acknowledgeVisibleOffers() {
    const attention = AttentionManager.getInstance();
    const container = this.ui.offers.parentElement.getBoundingClientRect();
    const entries = attention.getEntries('new_offer', 'deal').filter((entry) => {
      const row = document.getElementById(`joco-deal-${entry.itemId}`);
      if (!row) return false;
      const rect = row.getBoundingClientRect();
      return rect.bottom > Math.max(0, container.top) &&
        rect.top < Math.min(window.innerHeight, container.bottom) &&
        rect.right > Math.max(0, container.left) &&
        rect.left < Math.min(window.innerWidth, container.right);
    });
    void attention.acknowledge(entries);
  }

  private async onDealButtonClick(event: Event) {
    const row = (event.target as HTMLElement).closest<HTMLElement>('.joco-table-row[id^="joco-deal-"]');
    if (row && this.ui.offers.contains(row)) {
      const attention = AttentionManager.getInstance();
      await attention.acknowledge(attention.getEntries('new_offer', 'deal', row.id.slice('joco-deal-'.length)));
    }
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

  public updateWaitButton() {
    this.newOffer.updateWaitButton();
  }

  // public setAvailableItems(playerId: number, items: JocoDealAssets) {
  //   this.newOffer.setAvailableItems(playerId, items);
  // }

  public cancelNewOffer() {
    this.newOffer.cancelNewOffer();
  }
}
