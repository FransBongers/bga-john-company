import { India } from '..';
import { createHtmlElement } from '../../boilerplate';
import { PRESIDENCIES } from '../../constants';
import { BgaCards } from '../../libs copy';
import { createFamilyMember, tplCube } from '../../templates';
import { ControlTokensManager } from '../../token-managers/control-tokens';
import { ShipsManager } from '../../token-managers/ship-tokens';
import {
  JocoRegionBase,
  GameAlias,
  JocoControlToken,
  JocoFamilyMember,
  JocoShipBase,
  GamedatasAlias,
} from '../../types';
import { createControlToken } from '../../utility';
import { CONTROL_TOKEN_STOCK_CONFIG, TOWER_CONFIG } from './config';
import {
  tplControlTokenStock,
  tplGovernorOverlay,
  tplTowerLevel,
  tplTowerTop,
  tplUnrestContainer,
} from './templates';

export class Region {
  private tower: HTMLElement;
  private towerTop: HTMLElement;
  private data: JocoRegionBase;
  private controlTokenStock: InstanceType<
    typeof BgaCards.LineStock<JocoControlToken>
  >;
  private shipStock: InstanceType<typeof BgaCards.LineStock<JocoShipBase>>;
  private ui: {
    governorOverlay: HTMLElement;
    unrestContainer: HTMLElement;
  };

  constructor(
    private id: string,
    private game: GameAlias,
    data: JocoRegionBase,
  ) {
    this.data = data;
    this.setup(data, game);
  }

  // ..######..########.########.##.....##.########.
  // .##....##.##..........##....##.....##.##.....##
  // .##.......##..........##....##.....##.##.....##
  // ..######..######......##....##.....##.########.
  // .......##.##..........##....##.....##.##.......
  // .##....##.##..........##....##.....##.##.......
  // ..######..########....##.....#######..##.......

  private setup(data: JocoRegionBase, game: GameAlias) {
    const map = document.getElementById('joco-india-map');
    // Tower
    const elt = (this.tower = document.createElement('div'));
    elt.id = `joco-tower-${data.id}`;
    elt.classList.add('joco-tower');
    elt.style.bottom = `${TOWER_CONFIG[data.id].bottom}px`;
    elt.style.left = `${TOWER_CONFIG[data.id].left}px`;
    this.towerTop = createHtmlElement(tplTowerTop());
    elt.appendChild(this.towerTop);

    map.appendChild(elt);

    // Control token stock

    map.insertAdjacentHTML(
      'beforeend',
      tplControlTokenStock(data.id, CONTROL_TOKEN_STOCK_CONFIG[data.id]),
    );

    map.insertAdjacentElement(
      'beforeend',
      createHtmlElement(tplGovernorOverlay(data.id)),
    );

    map.insertAdjacentHTML(
      'beforeend',
      tplUnrestContainer(data.id),
    );

    this.ui = {
      governorOverlay: document.getElementById(
        `joco-governor-overlay-${data.id}`,
      ),
      unrestContainer: document.getElementById(
        `joco-unrest-${data.id}`,
      ),
    };

    this.controlTokenStock = new BgaCards.LineStock<JocoControlToken>(
      ControlTokensManager.getInstance(),
      document.getElementById(`joco-control-token-stock-${data.id}`),
    );

    this.setupShipStock(game.gamedatas);

    this.updateControlToken(data);
    this.updateStrength(data.strength);
    this.updateCapital(data.isCapital);
    this.updateEmpire(data.isCapital, data.control);
    this.updateCompanyControl(data);
    this.updateFamilyMembers(Object.values(game.gamedatas.familyMembers));
    this.updateUnrest(data.unrest);
  }

  private setupShipStock(gamedatas: GamedatasAlias) {
    const regionId = this.data.id;
    this.shipStock = new BgaCards.LineStock<JocoShipBase>(
      ShipsManager.getInstance(),
      document.getElementById(`shipConstruction_${regionId}`),
    );
    const ship = Object.values(gamedatas.ships).find(
      (s) => s.location === `shipConstruction_${regionId}`,
    );
    if (ship) {
      this.shipStock.addCard(ship);
    }
  }

  // .##.....##.########..########.....###....########.########....##.....##.####
  // .##.....##.##.....##.##.....##...##.##......##....##..........##.....##..##.
  // .##.....##.##.....##.##.....##..##...##.....##....##..........##.....##..##.
  // .##.....##.########..##.....##.##.....##....##....######......##.....##..##.
  // .##.....##.##........##.....##.#########....##....##..........##.....##..##.
  // .##.....##.##........##.....##.##.....##....##....##..........##.....##..##.
  // ..#######..##........########..##.....##....##....########.....#######..####

  public update(region: JocoRegionBase) {
    if (this.data.unrest !== region.unrest) {
      this.updateUnrest(region.unrest);
    }
    if (this.data.strength !== region.strength) {
      this.updateStrength(region.strength);
    }
    if (this.data.isCapital !== region.isCapital) {
      this.updateCapital(region.isCapital);
    }
    if (this.data.control !== region.control) {
      this.updateEmpire(region.isCapital, region.control);
    }
    this.updateCompanyControl(region);
  }

  public updateCapital(isCapital: boolean) {
    this.data.isCapital = isCapital;

    this.tower.children[0].setAttribute(
      'data-capital',
      isCapital ? 'true' : 'false',
    );

    if (isCapital) {
      this.updateEmpire(isCapital, null);
    }
  }

  public updateControlToken(data: JocoRegionBase) {
    if (data.control?.startsWith('Presidency')) {
      return;
    }
    this.controlTokenStock.addCard(createControlToken(data));
  }

  public updateEmpire(isCapital: boolean, control: string | null) {
    this.data.control = control;

    const isPartOfEmpire =
      isCapital || (control !== null && !PRESIDENCIES.includes(control));

    this.tower.children[0].setAttribute(
      'data-empire',
      isPartOfEmpire ? 'true' : 'false',
    );
    if (isPartOfEmpire) {
      this.tower.children[0].setAttribute(
        'data-empire-id',
        isCapital ? this.id : control,
      );
    }
  }

  public async updateCompanyControl(data: JocoRegionBase) {
    if (PRESIDENCIES.includes(data.control)) {
      this.tower.classList.add('company-controlled');
      this.ui.governorOverlay.classList.add('company-controlled');
    } else {
      this.tower.classList.remove('company-controlled');
      this.ui.governorOverlay.classList.remove('company-controlled');
    }
  }

  public updateStrength(value: number) {
    this.data.strength = value;

    this.tower.querySelectorAll('.joco-tower-level').forEach((level) => {
      level.remove();
    });

    for (let i = 0; i < value; i++) {
      this.tower.insertAdjacentHTML('beforeend', tplTowerLevel());
    }

    // const children = this.tower.children;
    // for (let i = 0; i < children.length; i++) {
    //   const child = children[i];
    //   if (i > value) {
    //     child.classList.add('hidden');
    //   } else {
    //     child.classList.remove('hidden');
    //   }
    // }
  }

  public updateUnrest(value: number) {
    this.data.unrest = value;
    
    this.ui.unrestContainer.replaceChildren();
    for (let i = 0; i < value; i++) {
      this.ui.unrestContainer.insertAdjacentHTML('beforeend', tplCube('unrest'));
    }
  }

  private updateFamilyMembers(familyMembers: JocoFamilyMember[]) {
    const location = `GovernorOf${this.data.id}`;
    const governor = familyMembers.find(
      (member) => member.location === location,
    );
    if (governor) {
      const elt = createFamilyMember(governor.familyId, governor.id);
      document.getElementById(location)?.appendChild(elt);
    }
  }

  public hasControlToken(token: JocoControlToken) {
    return this.controlTokenStock.contains(token);
  }



  // .##.....##.########.####.##.......####.########.##....##
  // .##.....##....##.....##..##........##.....##.....##..##.
  // .##.....##....##.....##..##........##.....##......####..
  // .##.....##....##.....##..##........##.....##.......##...
  // .##.....##....##.....##..##........##.....##.......##...
  // .##.....##....##.....##..##........##.....##.......##...
  // ..#######.....##....####.########.####....##.......##...

  public async addShip(ship: JocoShipBase, fromSea = null) {
    if (fromSea) {
      India.getInstance().getSeaZone(fromSea).updateCount(-1);
    }
    await this.shipStock.addCard(ship);
  }
}
