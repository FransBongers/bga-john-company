import { createFamilyMember, tplFamilyMemberSpot } from '../../templates';
import { BENGAL, BOMBAY, MADRAS } from '../../constants';
import { GamedatasAlias, JocoFamilyMember } from '../../types';
import { tplOfficeHeader } from '../../company/templates';
import { Treasury } from '../../ui-components';
import { Company } from '../../company';

export interface PresidencyProps {
  gamedatas: GamedatasAlias;
  parentElement: HTMLElement | string;
  id: string;
}

export class Presidency {
  protected ui: {
    parent: HTMLElement;
    writers: HTMLElement;
    president: HTMLElement;
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
    const presidencyContainer = document.getElementById(
      `PresidencyOf${this.id}`,
    ) as HTMLElement;
    const company = Company.getInstance();

    company.treasuries[`PresidentOf${this.id}`] = new Treasury({
      parent: presidencyContainer,
      gamedatas: config.gamedatas,
      office: `PresidentOf${this.id}`,
    });

    presidencyContainer.insertAdjacentHTML(
      'beforeend',
      this.tplInnerContainer(),
    );

    this.ui = {
      parent: parentElement,
      writers: document.getElementById(`Writers_${this.id}`) as HTMLElement,
      president: document.getElementById(
        `PresidentOf${this.id}`,
      ) as HTMLElement,
    };

    // this.treasury = new ebg.counter();
    // this.treasury.create(`joco-treasury-${this.id.toLocaleLowerCase()}`);
    // this.treasury.setValue(
    //   config.gamedatas.offices[`PresidentOf${this.id}`].treasury,
    // );

    this.updateFamilyMembers(config.gamedatas);
  }

  private tplPresidency() {
    return `
      <div id="PresidencyOf${this.id}" class="joco-office joco-presidency joco-container">
        ${tplOfficeHeader(`PresidentOf${this.id}`, this.getName())}
       <!-- <div class="joco-treasury-container">
          <div><span class="fb-font-baskerville fb-font-12">${_('Treasury').toLocaleUpperCase()}</span></div>
          <div class="joco-treasury-counter-container">
            <span class="fb-font-baskerville fb-font-12">£</span><span id="joco-treasury-${this.id.toLocaleLowerCase()}" class="fb-font-baskerville fb-font-20"></span>
          </div>
        </div> -->

      </div>
    `;
  }

  private tplInnerContainer = () => {
    return `
    <div class="joco-inner-container">
      <div id="Writers_${this.id}" class="joco-family-members-stock"></div>
      <div>
        <span class="fb-font-baskerville fb-font-12">${_('Writers').toLocaleUpperCase()}</span>
      </div>
    </div>`;
  };

  // .##.....##.########..########.....###....########.########....##.....##.####
  // .##.....##.##.....##.##.....##...##.##......##....##..........##.....##..##.
  // .##.....##.##.....##.##.....##..##...##.....##....##..........##.....##..##.
  // .##.....##.########..##.....##.##.....##....##....######......##.....##..##.
  // .##.....##.##........##.....##.#########....##....##..........##.....##..##.
  // .##.....##.##........##.....##.##.....##....##....##..........##.....##..##.
  // ..#######..##........########..##.....##....##....########.....#######..####

  public updateFamilyMembers(gamedatas: GamedatasAlias) {
    // Writers
    Object.values(gamedatas.familyMembers).forEach((member) => {
      if (member.location === `Writers_${this.id}`) {
        // Writers
        const writerElement = createFamilyMember(member.familyId, member.id);
        this.ui.writers.appendChild(writerElement);
      } else if (member.location === `PresidentOf${this.id}`) {
        // President
        const presidentElement = createFamilyMember(member.familyId, member.id);
        this.ui.president.appendChild(presidentElement);
      }
    });
  }

  // .##.....##.########.####.##.......####.########.##....##
  // .##.....##....##.....##..##........##.....##.....##..##.
  // .##.....##....##.....##..##........##.....##......####..
  // .##.....##....##.....##..##........##.....##.......##...
  // .##.....##....##.....##..##........##.....##.......##...
  // .##.....##....##.....##..##........##.....##.......##...
  // ..#######.....##....####.########.####....##.......##...

  public getTreasury() {
    const company = Company.getInstance();
    return company.treasuries[`PresidentOf${this.id}`];
  }

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
