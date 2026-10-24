import { SETUP } from '../constants';
import { GameAlias, GamedatasAlias } from '../types';
import { tplTabButton } from './templates';

export class Bar {
  private static instance: Bar;
  private game: GameAlias;

  private ui: {
    tabs: Record<string, HTMLElement>;
    barButtons: HTMLElement[];
  } = {
    tabs: {},
    barButtons: [],
  };
  private active: number = 0;

  private config = [
    {
      id: 'joco-families',
      text: _('Families'),
    },
    {
      id: 'joco-india',
      text: _('India'),
    },
    {
      id: 'joco-parliament',
      text: _('Parliament'),
    },
    {
      id: 'joco-london',
      text: _('London'),
    },
    {
      id: 'joco-company',
      text: _('Company'),
    },
    {
      id: 'joco-negotiation',
      text: _('Negotiation'),
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
    if (
      !this.game.bga.players.isCurrentPlayerSpectator() &&
      gamedatas.phase === SETUP
    ) {
      this.config.push({
        id: 'joco-draft',
        text: _('Draft'),
      });
    }

    this.config.forEach(({ id, text }, index) => {
      bar.insertAdjacentHTML('beforeend', tplTabButton(text, index));
      this.ui.barButtons.push(
        document.getElementById(`joco-bar-item-${index}`),
      );
      this.ui.tabs[id] = document.getElementById(id);

      if (index === this.active) {
        this.ui.barButtons[index].classList.add('joco-bar-item-active');
        this.ui.tabs[id].classList.add('joco-tab-visible');
      } else {
        this.ui.tabs[id].classList.add('joco-tab-hidden');
      }
    });

    bar.addEventListener('click', (event: PointerEvent) =>
      this.onIconClick(event),
    );
  }

  // .##.....##.########..########.....###....########.########....##.....##.####
  // .##.....##.##.....##.##.....##...##.##......##....##..........##.....##..##.
  // .##.....##.##.....##.##.....##..##...##.....##....##..........##.....##..##.
  // .##.....##.########..##.....##.##.....##....##....######......##.....##..##.
  // .##.....##.##........##.....##.#########....##....##..........##.....##..##.
  // .##.....##.##........##.....##.##.....##....##....##..........##.....##..##.
  // ..#######..##........########..##.....##....##....########.....#######..####

  private onIconClick(event: PointerEvent) {
    const target = event.target as HTMLElement;
    if (!target.classList.contains('joco-bar-item')) {
      return;
    }

    const index = Number(target.id.split('-')[3]);
    this.updateActive();
    this.active = index;
    this.updateActive();
  }

  private updateActive() {
    const tab = this.ui.tabs[this.config[this.active].id];
    tab.classList.toggle('joco-tab-visible');
    tab.classList.toggle('joco-tab-hidden');
    this.ui.barButtons[this.active].classList.toggle('joco-bar-item-active');
  }

  public goTo(id: string) {
    const index = this.config.findIndex((tab) => tab.id === id);
    this.updateActive();
    this.active = index;
    this.updateActive();
  }

  public getActiveTabId() {
    return this.config[this.active].id;
  }

  public removeTabWithId(id: string) {
    const index = this.config.findIndex((tab) => tab.id === id);
    if (index === -1) {
      return;
    }
    this.config.splice(index, 1);
    const tab = this.ui.tabs[id];
    if (tab) {
      tab.remove();
      delete this.ui.tabs[id];
    }
    const button = this.ui.barButtons[index];
    if (button) {
      button.remove();
      this.ui.barButtons.splice(index, 1);
    }
    if (this.active >= this.config.length) {
      this.active = this.config.length - 1;
    }
  }
}
