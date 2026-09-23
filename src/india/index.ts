import { createHtmlElement } from '../boilerplate';
import {
  BOMBAY,
  MADRAS,
  BENGAL,
  ORDER_MADRAS_2,
  ORDER_HYDERABAD_1,
  WEST_INDIAN,
  SEA_ZONES,
  MILITARY_AFFAIRS,
  OFFICER_IN_TRAINING,
} from '../constants';
import { createFamilyMember } from '../templates';
import { GameAlias, GamedatasAlias, JocoRegionBase } from '../types';
import { Army } from './army';
import { ORDERS_CONFIG } from './config';
import { Presidency } from './presidency';
import { Region } from './region';
import { ShipZone } from './ship-zone';
import { tplMilitaryAffairs, tplOrder, tplOrderToken } from './templates';

const tplIndia = () => `
  <div id="joco-india" class="joco-tab">
    <div id="joco-india-map">
      <div id="joco-elephant"></div>
    </div>
    ${tplMilitaryAffairs()}
    <div id="joco-presidencies-and-armies">
      
      
    </div>
  </div>
`;

export class India {
  private static instance: India;
  private armies: Record<string, Army> = {};
  private presidencies: Record<string, Presidency> = {};
  private regions: Record<string, Region> = {};

  private ui: {
    map: HTMLElement;
    orders: Record<string, HTMLElement>;
    elephant: HTMLElement;
    militaryAffairsOffice: HTMLElement;
    officersInTraining: HTMLElement;
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
    };

    this.setupPresidencies(gamedatas);
    this.setupArmies(gamedatas);

    this.setupOrders(gamedatas);
    this.setupRegions(gamedatas);
    this.setupShipZones(gamedatas);

    this.updateElephant(gamedatas.elephant);
    this.updateMilitaryAffairsOffice(gamedatas);
  }

  private setupArmies(gamedatas: GamedatasAlias) {
    const presidencyContainer = document.getElementById(
      'joco-presidencies-and-armies',
    );
    [BOMBAY, MADRAS, BENGAL].forEach((army) => {
      const armyInstance = new Army({
        parentElement: presidencyContainer!,
        id: army,
        gamedatas,
      });
      this.armies[army] = armyInstance;
    });
  }

  private setupPresidencies(gamedatas: GamedatasAlias) {
    const presidencyContainer = document.getElementById(
      'joco-presidencies-and-armies',
    );
    [BOMBAY, MADRAS, BENGAL].forEach((presidency) => {
      const presidencyInstance = new Presidency({
        gamedatas,
        parentElement: presidencyContainer!,
        id: presidency,
      });
      this.presidencies[presidency] = presidencyInstance;
    });
  }

  private setupOrders(gamedatas: GamedatasAlias) {
    Object.entries(ORDERS_CONFIG).forEach(([orderId, position]) => {
      const elt = createHtmlElement(tplOrder(orderId, position));
      this.ui.orders[orderId] = elt;
      this.ui.map.appendChild(elt);
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
      new ShipZone(seaZone, gamedatas);
    });
  }

  // .##.....##.########..########.....###....########.########....##.....##.####
  // .##.....##.##.....##.##.....##...##.##......##....##..........##.....##..##.
  // .##.....##.##.....##.##.....##..##...##.....##....##..........##.....##..##.
  // .##.....##.########..##.....##.##.....##....##....######......##.....##..##.
  // .##.....##.##........##.....##.#########....##....##..........##.....##..##.
  // .##.....##.##........##.....##.##.....##....##....##..........##.....##..##.
  // ..#######..##........########..##.....##....##....########.....#######..####

  updateMilitaryAffairsOffice(gamedatas: GamedatasAlias) {
    Object.values(gamedatas.familyMembers).forEach((member) => {
      if (member.location === OFFICER_IN_TRAINING) {
        const officer = createFamilyMember(member.familyId, member.id);
        this.ui.officersInTraining.appendChild(officer);
      } else if (member.location === MILITARY_AFFAIRS) {
        // President
        const presidentElement = createFamilyMember(member.familyId, member.id);
        this.ui.militaryAffairsOffice.appendChild(presidentElement);
      }
    });
  }

  updateElephant({ location, facing }: { location: string; facing: string }) {
    this.ui.elephant.setAttribute('data-location', location);
    this.ui.elephant.setAttribute('data-facing', facing);
  }

  private updateOrders(gamedatas: GamedatasAlias) {
    // this.ui.orders[ORDER_MADRAS_2].appendChild(
    //   createFamilyMember('Sykes', 'familyMember_Sykes_18'),
    // );
    // this.ui.orders[ORDER_HYDERABAD_1].insertAdjacentHTML('beforeend', tplOrderToken('filled'));
    Object.entries(gamedatas.orders).forEach(([orderId, order]) => {
      if (order.status === 'open') {
        return;
      }
      this.ui.orders[orderId].insertAdjacentHTML(
        'beforeend',
        tplOrderToken(order.status),
      );
    });
  }
}
