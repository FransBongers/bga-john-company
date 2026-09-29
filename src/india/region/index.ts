import { createHtmlElement } from '../../boilerplate';
import { PRESIDENCIES } from '../../constants';
import { BgaCards } from '../../libs copy';
import { ControlTokensManager } from '../../token-managers/control-tokens';
import { JocoRegionBase, GameAlias, JocoControlToken } from '../../types';
import { createControlToken } from '../../utility';
import { CONTROL_TOKEN_STOCK_CONFIG, TOWER_CONFIG } from './config';
import {
  tplControlTokenStock,
  tplGovernorOverlay,
  tplTowerLevel,
  tplTowerTop,
} from './templates';

export class Region {
  private tower: HTMLElement;
  private towerTop: HTMLElement;
  private data: JocoRegionBase;
  private controlTokenStock: InstanceType<
    typeof BgaCards.LineStock<JocoControlToken>
  >;
  private ui: {
    governorOverlay: HTMLElement;
  };

  constructor(
    private id: string,
    private game: GameAlias,
    data: JocoRegionBase,
  ) {
    this.data = data;
    this.setup(data);
  }

  private setup(data: JocoRegionBase) {
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

    this.ui = {
      governorOverlay: document.getElementById(
        `joco-governor-overlay-${data.id}`,
      ),
    };

    this.controlTokenStock = new BgaCards.LineStock<JocoControlToken>(
      ControlTokensManager.getInstance(),
      document.getElementById(`joco-control-token-stock-${data.id}`),
    );

    this.updateControlToken(data);
    this.updateStrength(data.strength);
    this.updateCapital(data.isCapital);
    this.updateEmpire(data.isCapital, data.control);
    this.updateCompanyControl(data);
  }

  public update(region: JocoRegionBase) {
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
    if (data.control?.endsWith('Presidency')) {
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
    // TODO: implementation
  }

  public hasControlToken(token: JocoControlToken) {
    return this.controlTokenStock.contains(token);
  }
}
