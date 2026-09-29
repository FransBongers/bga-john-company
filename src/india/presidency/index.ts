import { createFamilyMember, tplFamilyMemberSpot } from '../../templates';
import { BENGAL, BOMBAY, MADRAS } from '../../constants';
import {
  GamedatasAlias,
  JocoControlToken,
  JocoFamilyMember,
} from '../../types';
import { tplOfficeHeader } from '../../company/templates';
import { Treasury } from '../../ui-components';
import { Company } from '../../company';
import { BgaCards } from '../../libs copy';
import { ControlTokensManager } from '../../token-managers/control-tokens';
import { createControlToken } from '../../utility';

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
    tokensAndTreasury: HTMLElement;
  };
  private id: string;
  private controlTokenStock: InstanceType<
    typeof BgaCards.LineStock<JocoControlToken>
  >;

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

    this.ui = {
      parent: parentElement,
      writers: document.getElementById(`Writers_${this.id}`) as HTMLElement,
      president: document.getElementById(
        `PresidentOf${this.id}`,
      ) as HTMLElement,
      tokensAndTreasury: document.getElementById(
        `joco-control-tokens-and-treasury-${this.id}`,
      ) as HTMLElement,
    };

    this.setupTreasury(config.gamedatas);
    this.setupControlTokens(config.gamedatas);
    // this.treasury = new ebg.counter();
    // this.treasury.create(`joco-treasury-${this.id.toLocaleLowerCase()}`);
    // this.treasury.setValue(
    //   config.gamedatas.offices[`PresidentOf${this.id}`].treasury,
    // );

    this.updateFamilyMembers(config.gamedatas);
  }

  private setupControlTokens(gamedatas: GamedatasAlias) {
    this.controlTokenStock = new BgaCards.LineStock<JocoControlToken>(
      ControlTokensManager.getInstance(),
      document.getElementById(`joco-control-tokens-PresidencyOf${this.id}`),
    );

    Object.values(gamedatas.regions).forEach((region) => {
      if (region.control === `${this.id}Presidency`) {
        console.log(`Adding control token for region: ${region.id}`);
        this.controlTokenStock.addCard(createControlToken(region));
      }
    });
  }

  private setupTreasury(gamedatas: GamedatasAlias) {
    const company = Company.getInstance();

    company.treasuries[`PresidentOf${this.id}`] = new Treasury({
      parent: this.ui.tokensAndTreasury,
      gamedatas,
      office: `PresidentOf${this.id}`,
    });
  }

  private tplPresidency() {
    return `
      <div id="PresidencyOf${this.id}" class="joco-office joco-presidency joco-container">
        ${tplOfficeHeader(`PresidentOf${this.id}`, this.getName())}
        <div id="joco-control-tokens-and-treasury-${this.id}" class="joco-row joco-control-tokens-treasury">
          <div id="joco-control-tokens-PresidencyOf${this.id}"></div>
        </div>
        <div class="joco-inner-container">
          <div id="Writers_${this.id}" class="joco-family-members-stock"></div>
          <div>
            <span class="fb-font-baskerville fb-font-12">${_('Writers').toLocaleUpperCase()}</span>
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

  public async addControlToken(controlToken: JocoControlToken) {
    await this.controlTokenStock.addCard(controlToken);
  }

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
