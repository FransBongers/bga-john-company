import { createHtmlElement, DECK, HIDDEN } from '../boilerplate';
import {
  SEA_ZONES,
  MILITARY_AFFAIRS,
  OFFICER_IN_TRAINING,
  FILLED_BY_WRITER,
  BOMBAY_PRESIDENCY,
  BENGAL_PRESIDENCY,
  MADRAS_PRESIDENCY,
  SUPERINTENDENT_OF_TRADE_IN_CHINA,
  GOVERNOR_GENERAL,
} from '../constants';
import { createFamilyMember } from '../templates';
import { GameAlias, GamedatasAlias, JocoRegionBase } from '../types';
import { Army } from './army';
import { ORDERS_CONFIG } from './config';
import { Presidency } from './presidency';
import { Region } from './region';
import { ShipZone } from './ship-zone';
import {
  tplMilitaryAffairs,
  tplOrder,
  tplOrderToken,
  tplSuperintendentOfTradeInChina,
} from './templates';

const tplIndia = () => `
  <div id="joco-india" class="joco-tab">
    <div id="joco-india-map">
      <div id="joco-elephant"></div>
    </div>
    <div class="joco-row" style="align-self: stretch; gap: 12px;">
      ${tplMilitaryAffairs()}
      ${tplSuperintendentOfTradeInChina()}
    </div>
    <div id="joco-presidencies-and-armies">
      
      
    </div>
  </div>
`;

export class India {
  private static instance: India;
  private armies: Record<string, Army> = {};
  private presidencies: Record<string, Presidency> = {};
  private regions: Record<string, Region> = {};
  private seaZones: Record<string, ShipZone> = {};

  public ui: {
    map: HTMLElement;
    orders: Record<string, HTMLElement>;
    elephant: HTMLElement;
    militaryAffairsOffice: HTMLElement;
    officersInTraining: HTMLElement;
    superintendentOfTradeInChinaContainer: HTMLElement;
    superintendentOfTradeInChinaOffice: HTMLElement;
  };
  constructor(private game: GameAlias) {
    this.game = game;
    this.setup(game.gamedatas);
  }

  public static create(game: GameAlias) {
    India.instance = new India(game);
  }

  public static getInstance() {
    return India.instance;
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
      .getElementById('joco')
      .insertAdjacentHTML('afterbegin', tplIndia());

    this.ui = {
      map: document.getElementById('joco-india-map')!,
      orders: {},
      elephant: document.getElementById('joco-elephant')!,
      militaryAffairsOffice: document.getElementById(MILITARY_AFFAIRS)!,
      officersInTraining: document.getElementById(OFFICER_IN_TRAINING)!,
      superintendentOfTradeInChinaOffice: document.getElementById(
        SUPERINTENDENT_OF_TRADE_IN_CHINA,
      )!,
      superintendentOfTradeInChinaContainer: document.getElementById(
        `${SUPERINTENDENT_OF_TRADE_IN_CHINA}Office`,
      )!,
    };

    this.setupPresidencies(gamedatas);
    this.setupArmies(gamedatas);

    this.setupOrders(gamedatas);
    this.setupRegions(gamedatas);
    this.setupShipZones(gamedatas);

    this.updateGovernorGeneralActive(gamedatas.offices[GOVERNOR_GENERAL].location !== DECK);
    this.updateElephant(gamedatas.elephant);
    this.updateSuperintendentOfTradeInChina(gamedatas.offices[SUPERINTENDENT_OF_TRADE_IN_CHINA].location !== DECK);
    this.updateMilitaryAffairsOfficeAndSuperintendent(gamedatas);
  }

  private setupArmies(gamedatas: GamedatasAlias) {
    const presidencyContainer = document.getElementById(
      'joco-presidencies-and-armies',
    );
    [BOMBAY_PRESIDENCY, MADRAS_PRESIDENCY, BENGAL_PRESIDENCY].forEach(
      (army) => {
        const armyInstance = new Army({
          parentElement: presidencyContainer!,
          id: army,
          gamedatas,
          game: this.game,
        });
        this.armies[army] = armyInstance;
      },
    );
  }

  private setupPresidencies(gamedatas: GamedatasAlias) {
    const presidencyContainer = document.getElementById(
      'joco-presidencies-and-armies',
    );
    [BOMBAY_PRESIDENCY, MADRAS_PRESIDENCY, BENGAL_PRESIDENCY].forEach(
      (presidencyId) => {
        const presidencyInstance = new Presidency({
          gamedatas,
          parentElement: presidencyContainer!,
          id: presidencyId,
        });
        this.presidencies[presidencyId] = presidencyInstance;
      },
    );
  }

  private setupOrders(gamedatas: GamedatasAlias) {
    Object.entries(ORDERS_CONFIG).forEach(([orderId, position]) => {
      const elt = createHtmlElement(tplOrder(orderId, position));
      this.ui.orders[orderId] = elt;
      this.ui.map.appendChild(elt);

      elt.insertAdjacentHTML('beforeend', tplOrderToken('closed'));
      elt.insertAdjacentHTML('beforeend', tplOrderToken('filled'));
    });

    this.updateOrders(gamedatas);
  }

  private setupRegions(gamedatas: GamedatasAlias) {
    Object.values(gamedatas.regions).forEach((region: JocoRegionBase) => {
      this.regions[region.id] = new Region(region.id, this.game, region);
    });
  }

  private setupShipZones(gamedatas: GamedatasAlias) {
    SEA_ZONES.forEach((seaZone) => {
      this.seaZones[seaZone] = new ShipZone(seaZone, gamedatas);
    });
    this.seaZones[SUPERINTENDENT_OF_TRADE_IN_CHINA] = new ShipZone(
      SUPERINTENDENT_OF_TRADE_IN_CHINA,
      gamedatas,
    );
  }

  // .##.....##.########..########.....###....########.########....##.....##.####
  // .##.....##.##.....##.##.....##...##.##......##....##..........##.....##..##.
  // .##.....##.##.....##.##.....##..##...##.....##....##..........##.....##..##.
  // .##.....##.########..##.....##.##.....##....##....######......##.....##..##.
  // .##.....##.##........##.....##.#########....##....##..........##.....##..##.
  // .##.....##.##........##.....##.##.....##....##....##..........##.....##..##.
  // ..#######..##........########..##.....##....##....########.....#######..####

  updateGovernorGeneralActive(visible: boolean) {
    this.ui.map.setAttribute('data-governor-general-active', visible ? 'true' : 'false');
  }

  updateSuperintendentOfTradeInChina(visible: boolean) {
    const elt = this.ui.superintendentOfTradeInChinaContainer;
    if (!visible) {
      elt.classList.add(HIDDEN);
      return;
    }
    elt.classList.remove(HIDDEN);
    // Implementation for updating the Superintendent of Trade in China office
  }

  updateMilitaryAffairsOfficeAndSuperintendent(gamedatas: GamedatasAlias) {
    Object.values(gamedatas.familyMembers).forEach((member) => {
      if (member.location === OFFICER_IN_TRAINING) {
        const officer = createFamilyMember(member.familyId, member.id);
        this.ui.officersInTraining.appendChild(officer);
      } else if (member.location === MILITARY_AFFAIRS) {
        // President
        const presidentElement = createFamilyMember(member.familyId, member.id);
        this.ui.militaryAffairsOffice.appendChild(presidentElement);
      } else if (member.location === SUPERINTENDENT_OF_TRADE_IN_CHINA) {
        const superintendent = createFamilyMember(member.familyId, member.id);
        this.ui.superintendentOfTradeInChinaOffice.appendChild(superintendent);
      }
    });
  }

  updateElephant({ location, facing }: { location: string; facing: string }) {
    this.ui.elephant.setAttribute('data-location', location);
    this.ui.elephant.setAttribute('data-facing', facing);
  }

  private updateOrders(gamedatas: GamedatasAlias) {
    Object.entries(gamedatas.orders).forEach(([orderId, order]) => {
      this.ui.orders[orderId].setAttribute('data-status', order.status);
      if (order.status === FILLED_BY_WRITER) {
        const familyMember = Object.values(gamedatas.familyMembers).find(
          (m) => {
            return m.location === orderId;
          },
        );

        if (familyMember) {
          const writer = createFamilyMember(
            familyMember.familyId,
            familyMember.id,
          );
          this.ui.orders[orderId].appendChild(writer);
        }
      }
    });
  }

  public getArmy(presidencyId: string): Army {
    return this.armies[presidencyId];
  }

  public getPresidency(presidencyId: string): Presidency {
    return this.presidencies[presidencyId];
  }

  public getSeaZone(seaZone: string): ShipZone {
    return this.seaZones[seaZone];
  }

  public getRegion(regionId: string): Region {
    return this.regions[regionId];
  }
}
