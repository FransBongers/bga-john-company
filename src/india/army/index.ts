import { BENGAL, BOMBAY, MADRAS } from '../../constants';
import { GamedatasAlias } from '../../types';
import { tplRegiment } from './templates';

export interface ArmyProps {
  parentElement: HTMLElement | string;
  id: string;
  gamedatas: GamedatasAlias;
}

export class Army {
  protected ui: {
    parent: HTMLElement;
    army: {
      ready: HTMLElement;
      exhausted: HTMLElement;
    };
  };
  private id: string;

  constructor(config: ArmyProps) {
    this.id = config.id;
    this.setup(config);
  }

  // ..######..########.########.##.....##.########.
  // .##....##.##..........##....##.....##.##.....##
  // .##.......##..........##....##.....##.##.....##
  // ..######..######......##....##.....##.########.
  // .......##.##..........##....##.....##.##.......
  // .##....##.##..........##....##.....##.##.......
  // ..######..########....##.....#######..##.......

  private setup(config: ArmyProps) {
    const parentElement =
      typeof config.parentElement === 'string'
        ? document.getElementById(config.parentElement)
        : config.parentElement;

    if (!parentElement) {
      throw new Error('FE_ARMY_01');
    }

    parentElement.insertAdjacentHTML('beforeend', this.tplArmy());

    this.ui = {
      parent: parentElement,
      army: {
        ready: document.getElementById(
          `joco-army-${this.id.toLocaleLowerCase()}-ready`,
        ) as HTMLElement,
        exhausted: document.getElementById(
          `joco-army-${this.id.toLocaleLowerCase()}-exhausted`,
        ) as HTMLElement,
      },
    };

    this.addPieces(config.gamedatas);
  }

  private tplArmy() {
    return `
      <div id="${this.id}" class="joco-army joco-container">
        <div class="joco-inner-container">
          <div><span class="fb-font-baskerville fb-font-8">${_('Ready pieces').toLocaleUpperCase()}</span></div>
          <div id="joco-army-${this.id.toLocaleLowerCase()}-ready" class="joco-army-stock"></div>
        </div>
        <div class="joco-army-banner joco-background-${this.id.toLocaleLowerCase()}"><span class="fb-font-baskerville fb-font-16">${this.getName().toLocaleUpperCase()}</span></div>
        <div class="joco-inner-container">
          <div id="joco-army-${this.id.toLocaleLowerCase()}-exhausted" class="joco-army-stock"></div>
          <div><span class="fb-font-baskerville fb-font-8">${_('Exhausted pieces').toLocaleUpperCase()}</span></div>
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

  public addPieces(gamedatas: GamedatasAlias) {
    Object.values(gamedatas.armyPieces).forEach((piece) => {
      if (piece.location !== `Army_${this.id}`) {
        
        return;
      }
      const parent = piece.exhausted
        ? this.ui.army.exhausted
        : this.ui.army.ready;
      parent.insertAdjacentHTML('beforeend', tplRegiment({ id: piece.id }));
    });
  }

  // .##.....##.########.####.##.......####.########.##....##
  // .##.....##....##.....##..##........##.....##.....##..##.
  // .##.....##....##.....##..##........##.....##......####..
  // .##.....##....##.....##..##........##.....##.......##...
  // .##.....##....##.....##..##........##.....##.......##...
  // .##.....##....##.....##..##........##.....##.......##...
  // ..#######.....##....####.########.####....##.......##...

  public getName() {
    switch (this.id) {
      case BENGAL:
        return 'Army of Bengal';
      case BOMBAY:
        return 'Army of Bombay';
      case MADRAS:
        return 'Army of Madras';
      default:
        return '';
    }
  }
}
