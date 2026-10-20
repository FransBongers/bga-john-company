import { India } from '..';
import { formatStringRecursive } from '../../boilerplate/utility';
import { SUPERINTENDENT_OF_TRADE_IN_CHINA } from '../../constants';
import { BgaCards } from '../../libs';
import { ShipsManager } from '../../token-managers/ship-tokens';
import { GamedatasAlias, JocoShipBase } from '../../types';
import { tplSeaZone } from './templates';

export class ShipZone {
  private stock: InstanceType<typeof BgaCards.LineStock<JocoShipBase>>;
  private ui: {
    stock: HTMLElement;
    count: HTMLElement;
  };

  constructor(
    private id: string,
    private gamedatas: GamedatasAlias,
  ) {
    this.setup(gamedatas);
  }

  private setup(gamedatas: GamedatasAlias) {
    const elementId = this.id === SUPERINTENDENT_OF_TRADE_IN_CHINA ? `${SUPERINTENDENT_OF_TRADE_IN_CHINA}Office` : 'joco-india-map';
    document
      .getElementById(elementId)
      ?.insertAdjacentHTML('beforeend', tplSeaZone(this.id, this.id === SUPERINTENDENT_OF_TRADE_IN_CHINA));

    this.ui = {
      stock: document.getElementById(`joco-ship-stock-${this.id}`)!,
      count: document.getElementById(`joco-ship-count-${this.id}`)!,
    };

    this.stock = new BgaCards.LineStock<JocoShipBase>(
      ShipsManager.getInstance(),
      this.ui.stock,
    );

    this.updateShips(
      Object.values(gamedatas.ships).filter(
        (ship) => ship.location === this.id,
      ),
    );
  }

  public updateShips(ships: JocoShipBase[]) {
    this.stock.addCards(ships);

    this.updateCount();
  }

  public updateCount(modifier = 0) {
    this.ui.count.replaceChildren();
    const count = this.stock.getCards().length + modifier;
    let textContent = formatStringRecursive(
      count === 1 ? _('${count} Ship') : _('${count} Ships'),
      {
        count,
      },
    );
    if (this.id === SUPERINTENDENT_OF_TRADE_IN_CHINA) {
      textContent = textContent.toLocaleUpperCase();
    }
    this.ui.count.textContent = textContent;
  }

  public async addShip(ship: JocoShipBase, fromSea = null) {
    if (fromSea) {
      India.getInstance().getSeaZone(fromSea).updateCount(-1);
    }
    await this.stock.addCard(ship);

    this.updateCount();
  }

  public hasShip(shipId: string) {
    return this.stock.getCards().some((ship) => ship.id === shipId);
  }

  public async removeShip(ship: JocoShipBase) {
    await this.stock.removeCard(ship);
    this.updateCount();
  }
}
