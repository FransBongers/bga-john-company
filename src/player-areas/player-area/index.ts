import { EnterpriseCardsManager } from '../../cards/enterprise-cards';
import { tplOfficeCard } from '../../cards/office-cards';
import { SHIPYARD, TROPHIES } from '../../constants';
import { BgaCards } from '../../libs copy';

import {
  GameAlias,
  GamedatasAlias,
  JocoEnterpriseCard,
  PlayerAlias,
} from '../../types';
import { TrophiesCounter } from '../../ui-components';
import { getEnterpriseCard } from '../../utility';

export interface PlayerAreaProps {
  parentElement: HTMLElement | string;
  // id: string;
  gamedatas: GamedatasAlias;
  game: GameAlias;
  player: PlayerAlias;
}

export class PlayerArea {
  protected ui: {
    parent: HTMLElement;
    counters: HTMLElement;
    offices: HTMLElement;
  };
  // private id: string;
  private game: GameAlias;
  // private color: string;
  private familyId: string;
  private player: PlayerAlias;
  private enterprises: InstanceType<
    typeof BgaCards.LineStock<JocoEnterpriseCard>
  >;
  public counters: Record<string, TrophiesCounter> = {};

  constructor(config: PlayerAreaProps) {
    // this.id = config.id;
    this.game = config.game;
    this.familyId = config.player.familyId;
    this.player = config.player;
    this.setup(config);
  }

  // ..######..########.########.##.....##.########.
  // .##....##.##..........##....##.....##.##.....##
  // .##.......##..........##....##.....##.##.....##
  // ..######..######......##....##.....##.########.
  // .......##.##..........##....##.....##.##.......
  // .##....##.##..........##....##.....##.##.......
  // ..######..########....##.....#######..##.......

  private setup(config: PlayerAreaProps) {
    // this.color = config.color;
    const parentElement =
      typeof config.parentElement === 'string'
        ? document.getElementById(config.parentElement)
        : config.parentElement;

    if (!parentElement) {
      throw new Error('FE_PLAYER_AREA_01');
    }

    parentElement.insertAdjacentHTML('beforeend', this.tplPlayerArea());

    this.ui = {
      parent: parentElement,
      counters: document.getElementById(
        `joco-counters-${this.familyId}`,
      ) as HTMLElement,
      offices: document.getElementById(
        `FamilyOffices_${this.familyId}`,
      ) as HTMLElement,
    };

    this.setupEnterprises(config.gamedatas);
    this.setupOffices(config.gamedatas);
    this.setupTrophiesCounter(config.gamedatas);
  }

  private setupEnterprises(gamedatas: GamedatasAlias) {
    this.enterprises = new BgaCards.LineStock<JocoEnterpriseCard>(
      EnterpriseCardsManager.getInstance(),
      document.getElementById(`joco-enterprises-${this.familyId}`)!,
    );

    this.updateEnterprises(gamedatas);
  }

  private setupOffices(gamedatas: GamedatasAlias) {
    Object.entries(gamedatas.offices).forEach(([officeId, office]) => {
      if (office.location !== `FamilyOffices_${this.familyId}`) {
        return;
      }
      this.ui.offices.insertAdjacentHTML('beforeend', tplOfficeCard(office));
    });
  }

  private setupTrophiesCounter(gamedatas: GamedatasAlias) {
    this.counters[TROPHIES] = new TrophiesCounter({
      id: `joco-trophies-${this.familyId}`,
      parentElement: this.ui.counters,
      initialValue: gamedatas.families[this.familyId].trophies,
    });
  }

  private tplPlayerArea() {
    return `
      <div class="joco-player-area joco-container">
        <div class="joco-player-name" style="background-color:#${this.player.color};"><span class="fb-font-baskerville fb-font-16 fb-font-semi-bold">${this.player.name}</span></div>
        <div class="joco-player-area-content">
          <div id="joco-counters-${this.familyId}" class="joco-player-area-counters">
          </div>
          <div class="joco-row">
            <div class="joco-inner-container joco-column">
              <span class="joco-header">${_('Offices')}</span>
              <div id="FamilyOffices_${this.familyId}" class="joco-family-offices"></div>
            </div>
            <div class="joco-column" style="flex-grow: 1;">
              <div class="joco-inner-container">
                <span class="joco-header">${_('Enterprises')}</span>
                <div id="joco-enterprises-${this.familyId}" class="joco-enterprises"></div>
              </div>
              <div class="joco-inner-container">
                <span class="joco-header">${_('Prestige & Blackmail cards')}</span>
                <div id="joco-prestige-blackmail-${this.familyId}" class="joco-prestige-blackmail"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // .##.....##.########..########.....###....########.########....##.....##.####
  // .##.....##.##.....##.##.....##...##.##......##....##..........##.....##..##.
  // .##.....##.##.....##.##.....##..##...##.....##....##..........##.....##..##.
  // .##.....##.########..##.....##.##.....##....##....######......##.....##..##.
  // .##.....##.##........##.....##.#########....##....##..........##.....##..##.
  // .##.....##.##........##.....##.##.....##....##....##..........##.....##..##.
  // ..#######..##........########..##.....##....##....########.....#######..####

  private updateEnterprises(gamedatas: GamedatasAlias) {
    const ships = Object.values(gamedatas.ships);
    Object.values(gamedatas.enterprises).forEach((enterprise) => {
      if (enterprise.location !== this.familyId) {
        return;
      }

      this.enterprises.addCard(getEnterpriseCard(enterprise));
      if (enterprise.type === SHIPYARD) {
        const ship = ships.find((s) => s.location === enterprise.id);
        if (ship) {
          const shipStock =
            EnterpriseCardsManager.getInstance().shipStocks[enterprise.shipId];
          if (shipStock) {
            shipStock.addCard(ship);
          }
        }
      }
    });
  }

  // .##.....##.########.####.##.......####.########.##....##
  // .##.....##....##.....##..##........##.....##.....##..##.
  // .##.....##....##.....##..##........##.....##......####..
  // .##.....##....##.....##..##........##.....##.......##...
  // .##.....##....##.....##..##........##.....##.......##...
  // .##.....##....##.....##..##........##.....##.......##...
  // ..#######.....##....####.########.####....##.......##...

  public async addEnterprise(enterprise: JocoEnterpriseCard) {
    await this.enterprises.addCard(getEnterpriseCard(enterprise));
  }

  public incCounters(changes: Record<string, number>) {
    Object.entries(changes).forEach(([counterId, change]) => {
      if (!this.counters[counterId]) {
        return;
      }
      this.counters[counterId].incValue(change);
    });
  }
}
