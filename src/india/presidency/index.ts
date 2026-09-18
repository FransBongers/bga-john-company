import { createFamilyMember } from '../../board/utility';
import { BENGAL, BOMBAY, MADRAS } from '../../constants';
import { GamedatasAlias, JocoFamilyMember } from '../../types';
import { getRegionName } from '../../utility';

export interface PresidencyProps {
  gamedatas: GamedatasAlias;
  parentElement: HTMLElement | string;
  id: string;
}

export class Presidency {
  protected ui: {
    parent: HTMLElement;
    writers: HTMLElement;
  };
  private id: string;
  private treasury: Counter;

  constructor(config: PresidencyProps) {
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

  private setup(config: PresidencyProps) {
    const parentElement =
      typeof config.parentElement === 'string'
        ? document.getElementById(config.parentElement)
        : config.parentElement;

    if (!parentElement) {
      throw new Error('FE_PRESIDENCY_01');
    }

    parentElement.insertAdjacentHTML('beforeend', this.tplPresidency());

    this.ui = {
      parent: parentElement,
      writers: document.getElementById(`${this.id}-writers`) as HTMLElement,
    };

    this.treasury = new ebg.counter();
    this.treasury.create(`joco-treasury-${this.id.toLocaleLowerCase()}`);
    this.treasury.setValue(
      config.gamedatas.offices[`PresidentOf${this.id}`].treasury,
    );
  }

  private tplPresidency() {
    return `
      <div id="${this.id}" class="joco-presidency joco-container">
        <div class="joco-header joco-background-${this.id.toLocaleLowerCase()}"><span class="fb-font-baskerville fb-font-16">${this.getName().toLocaleUpperCase()}</span></div>
        <div class="joco-treasury-container">
          <div><span class="fb-font-baskerville fb-font-12">${_('Treasury').toLocaleUpperCase()}</span></div>
          <div class="joco-treasury-counter-container">
            <span class="fb-font-baskerville fb-font-12">£</span><span id="joco-treasury-${this.id.toLocaleLowerCase()}" class="fb-font-baskerville fb-font-20"></span>
          </div>
        </div>
        <div class="joco-inner-container">
          <div id="${this.id}-writers" class="joco-writers-stock">
          </div>
          <div>
            <span class="fb-font-baskerville fb-font-8">${_('Writers').toLocaleUpperCase()}</span>
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

  public addWriters(writers: JocoFamilyMember[]) {
    writers.forEach((writer) => {
      const writerElement = createFamilyMember(writer.familyId, writer.id);

      this.ui.writers.appendChild(writerElement);
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
        return 'Presidency of Bengal';
      case BOMBAY:
        return 'Presidency of Bombay';
      case MADRAS:
        return 'Presidency of Madras';
      default:
        return '';
    }
  }
}
