import { createFamilyMember } from '../../board/utility';
import { BENGAL, BOMBAY, MADRAS } from '../../constants';
import { JocoFamilyMember } from '../../types';
import { getRegionName } from '../../utility';

export interface PresidencyProps {
  parentElement: HTMLElement | string;
  id: string;
}

export class Presidency {
  protected ui: {
    parent: HTMLElement;
    writers: HTMLElement;
  };
  private id: string;

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
  }

  private tplPresidency() {
    return `
      <div id="${this.id}" class="joco-presidency joco-container">
        <div><span class="fb-font-baskerville fb-font-12">${this.getName()}</span></div>
        <div>
          <div>
            <span class="fb-font-baskerville fb-font-12">${_('Writers').toLocaleUpperCase()}</span>
          </div>
          <div id="${this.id}-writers">
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
