import { formatStringRecursive } from '../../boilerplate/utility';
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
    document
      .getElementById('joco-india-map')
      ?.insertAdjacentHTML('beforeend', tplSeaZone(this.id));

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

    this.ui.count.textContent = formatStringRecursive(ships.length === 1 ? '${count} Ship' : '${count} Ships', {
      count: ships.length,
    });
  }
}
