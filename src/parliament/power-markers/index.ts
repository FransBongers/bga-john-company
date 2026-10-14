import { createHtmlElement } from '../../boilerplate';
import { GameAlias, GamedatasAlias } from '../../types';
import { tplPowerMarker, tplPowerMarkersContainer } from './templates';

export interface PowerMarkersProps {
  parentElement: HTMLElement;
  game: GameAlias;
}

export class PowerMarkers {
  private parentElement: HTMLElement;
  private game: GameAlias;
  private ui: {
    powerMarkers: Record<string, HTMLElement>;
    powerMarkerPositions: Record<string, HTMLElement>;
  };

  constructor(props: PowerMarkersProps) {
    this.parentElement = props.parentElement;
    this.game = props.game;

    this.setup(this.game.gamedatas);
  }

  private createPowerMarkers(gamedatas: GamedatasAlias) {
    Object.entries(gamedatas.powerMarkers).forEach(([position, type]) => {
      this.ui.powerMarkers[type] = createHtmlElement(tplPowerMarker({id: `joco-power-marker-${type}`, type}));
      this.ui.powerMarkerPositions[position].appendChild(
        this.ui.powerMarkers[type],
      );
    });
  }

  private setup(gamedatas: GamedatasAlias) {
    this.parentElement.insertAdjacentHTML(
      'beforeend',
      tplPowerMarkersContainer(),
    );
    this.ui = {
      powerMarkers: {},
      powerMarkerPositions: {},
    };
    [1, 2, 3, 4].forEach((position) => {
      this.ui.powerMarkerPositions[`position_${position}`] =
        document.getElementById(`joco-power-marker-position-${position}`)!;
    });

    this.createPowerMarkers(gamedatas);
  }

  public async swapPowerMarkers(changes: Record<string, string>) {
    await Promise.all(
      Object.entries(changes).map(async ([position, type]) => {
        const marker = this.ui.powerMarkers[type];
        const positionElement = this.ui.powerMarkerPositions[position];
        await this.game.animationManager.slideAndAttach(marker, positionElement);
      }),
    );
  }
}
