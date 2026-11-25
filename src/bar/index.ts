import { SETUP } from '../constants';
import { AttentionManager } from '../attention';
import { GameAlias, GamedatasAlias } from '../types';
import { tplTabButton } from './templates';
import { ATTENTION } from '../boilerplate/constants';

export interface BarConfig {
  id: string;
  text: string;
  icon?: string;
}

export class Bar {
  private static instance: Bar;
  private game: GameAlias;

  private ui: {
    tabs: Record<string, HTMLElement>;
    barButtons: Record<string, HTMLElement>;
  } = {
    tabs: {},
    barButtons: {},
  };
  private active: string = 'joco-player-areas';

  private config: BarConfig[] = [
    {
      id: 'joco-player-areas',
      text: _('Players'),
      icon: 'users',
    },
    {
      id: 'joco-company',
      text: _('Company'),
      icon: 'briefcase',
    },
    {
      id: 'joco-london',
      text: _('London'),
      icon: 'earth-europe',
    },
    {
      id: 'joco-parliament',
      text: _('Parliament'),
      icon: 'landmark',
    },
    {
      id: 'joco-india',
      text: _('India'),
      icon: 'earth-asia',
    },
    {
      id: 'joco-deals',
      text: _('Deals'),
      icon: 'handshake',
    },
  ];

  constructor(game: GameAlias) {
    this.game = game;
    this.setup(game.gamedatas);
  }

  public static create(game: GameAlias) {
    Bar.instance = new Bar(game);
  }

  public static getInstance() {
    return Bar.instance;
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
    const bar = document.getElementById('joco-bar');
    if (!this.game.isSpectator) {
      this.config.push({
        id: 'joco-timing-preferences',
        text: _('Alerts'),
        icon: 'bell',
      });
    }
    if (
      !this.game.bga.players.isCurrentPlayerSpectator() &&
      gamedatas.phase === SETUP
    ) {
      this.config.push({
        id: 'joco-draft',
        text: _('Draft'),
      });
    }

    this.config.forEach((barConfig) => {
      const { id } = barConfig;
      bar.insertAdjacentHTML('beforeend', tplTabButton(barConfig));
      this.ui.barButtons[id] = document.getElementById(`joco-bar-item-${id}`);
      this.ui.tabs[id] = document.getElementById(id);

      if (id === this.active) {
        this.ui.barButtons[id].classList.add('joco-bar-item-active');
        this.ui.tabs[id].classList.add('joco-tab-visible');
      } else {
        this.ui.tabs[id].classList.add('joco-tab-hidden');
      }
    });

    bar.addEventListener('click', (event: PointerEvent) =>
      this.onIconClick(event),
    );
    AttentionManager.getInstance().subscribe(() => this.updateDealAttention());
    this.updateDealAttention();
  }

  private updateDealAttention() {
    const count = AttentionManager.getInstance().getEntries(
      'new_offer',
      'deal',
    ).length;
    const button =
      this.ui.barButtons['joco-deals'];
    if (!button) return;
    let badge = button.querySelector<HTMLElement>('.joco-attention-count');
    if (count) {
      if (!badge) {
        badge = document.createElement('span');
        badge.className = 'joco-attention-count';
        button.appendChild(badge);
      }
      badge.textContent = String(count);
      badge.title = _('New offers');
      badge.setAttribute('aria-label', `${_('New offers')}: ${count}`);
    } else {
      badge?.remove();
    }
  }

  // .##.....##.########..########.....###....########.########....##.....##.####
  // .##.....##.##.....##.##.....##...##.##......##....##..........##.....##..##.
  // .##.....##.##.....##.##.....##..##...##.....##....##..........##.....##..##.
  // .##.....##.########..##.....##.##.....##....##....######......##.....##..##.
  // .##.....##.##........##.....##.#########....##....##..........##.....##..##.
  // .##.....##.##........##.....##.##.....##....##....##..........##.....##..##.
  // ..#######..##........########..##.....##....##....########.....#######..####

  private onIconClick(event: PointerEvent) {
    const target = (event.target as Element).closest<HTMLElement>(
      '.joco-bar-item',
    );
    if (!target) {
      return;
    }

    this.goTo(target.dataset.tabId);
  }

  private updateActive() {
    const tab = this.ui.tabs[this.active];
    tab.classList.toggle('joco-tab-visible');
    tab.classList.toggle('joco-tab-hidden');
    this.ui.barButtons[this.active].classList.toggle('joco-bar-item-active');
  }

  public goTo(id: string) {
    if (!this.ui.tabs[id]) {
      return;
    }
    this.updateActive();
    this.active = id;
    this.updateActive();
  }

  public getActiveTabId() {
    return this.active;
  }

  public removeTabWithId(id: string) {
    const index = this.config.findIndex((tab) => tab.id === id);
    if (index === -1) {
      return;
    }
    if (this.active === id) {
      const fallback = this.config.find((tab) => tab.id !== id);
      if (fallback) {
        this.goTo(fallback.id);
      }
    }
    this.config.splice(index, 1);
    const tab = this.ui.tabs[id];
    if (tab) {
      tab.remove();
      delete this.ui.tabs[id];
    }
    const button = this.ui.barButtons[id];
    if (button) {
      button.remove();
      delete this.ui.barButtons[id];
    }
  }

  public setAttention(tabIds: string | string[]) {
    if (typeof tabIds === 'string') {
      tabIds = [tabIds];
    }

    for (const tabId in this.ui.barButtons) {
      const tab = this.ui.barButtons[tabId];
      if (tabIds.includes(tabId)) {
        tab.classList.add(ATTENTION);
      } else {
        tab.classList.remove(ATTENTION);
      }
    }
  }

  public clearAttention() {
    for (const tabId in this.ui.barButtons) {
      const tab = this.ui.barButtons[tabId];
      tab.classList.remove(ATTENTION);
    }
  }
}
