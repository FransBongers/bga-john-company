import { createFamilyMember } from '../board/utility';
import { createHtmlElement } from '../boilerplate';
import {
  BOMBAY,
  MADRAS,
  BENGAL,
  ORDER_MADRAS_2,
  ORDER_HYDERABAD_1,
} from '../constants';
import { StaticData } from '../static-data';
import { tplAmount } from '../templates';
import { GameAlias, GamedatasAlias, JocoRegionBase } from '../types';
import { ORDERS_CONFIG } from './config';
import { Presidency } from './presidency';
import { Region } from './region';
import { tplOrder, tplOrderToken } from './templates';

const tplIndia = () => `
  <div id="joco-india" class="joco-tab">
    <div id="joco-india-map">
      <div id="joco-elephant"></div>
    </div>
    <div id="joco-presidencies-and-armies">
      
      
    </div>
    <div id="joco-armies">
      Armies
    </div>

  </div>
`;

export class India {
  private static instance: India;
  private presidencies: Record<string, Presidency> = {};
  private regions: Record<string, Region> = {};

  private ui: {
    map: HTMLElement;
    orders: Record<string, HTMLElement>;
    elephant: HTMLElement;
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
    };

    this.setupOrders(gamedatas);
    this.setupRegions(gamedatas);

    const presidencyContainer = document.getElementById(
      'joco-presidencies-and-armies',
    );
    [BOMBAY, MADRAS, BENGAL].forEach((presidency) => {
      const presidencyInstance = new Presidency({
        parentElement: presidencyContainer!,
        id: presidency,
      });
      this.presidencies[presidency] = presidencyInstance;

      presidencyInstance.addWriters(
        Object.values(gamedatas.familyMembers).filter(
          (member) => member.location === `Writers_${presidency}`,
        ),
      );
    });

    this.updateElephant(gamedatas.elephant);
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

  // .##.....##.########..########.....###....########.########....##.....##.####
  // .##.....##.##.....##.##.....##...##.##......##....##..........##.....##..##.
  // .##.....##.##.....##.##.....##..##...##.....##....##..........##.....##..##.
  // .##.....##.########..##.....##.##.....##....##....######......##.....##..##.
  // .##.....##.##........##.....##.#########....##....##..........##.....##..##.
  // .##.....##.##........##.....##.##.....##....##....##..........##.....##..##.
  // ..#######..##........########..##.....##....##....########.....#######..####

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
