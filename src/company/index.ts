import { createFamilyMember } from '../templates';
import {
  CHAIRMAN,
  COURT_OF_DIRECTORS,
  DIRECTOR_OF_TRADE,
  MANAGER_OF_SHIPPING,
  STOCK_EXCHANGE_POSITIONS,
  VACANT_OFFICES,
} from '../constants';
import { GameAlias, GamedatasAlias } from '../types';
import {
  COMPANY_STANDING_CONFIG,
  STOCK_EXCHANGE_CONFIG,
  tplCompanyStanding,
  tplCourtOfDirectors,
  tplCompanyDebt,
  COMPANY_DEBT_CONFIG,
  tplCompanyBalance,
  tplOffice,
  tplVacantOffices,
} from './templates';
import { getPhaseName } from '../phase-tracker/translations';
import { Treasury } from '../ui-components';
import { tplOfficeCard } from '../cards/office-cards';

const tplCompany = () => `
  <div id="joco-company" class="joco-tab">
    <div class="joco-row">
      <div class="joco-column">
        ${tplCourtOfDirectors()}
        ${tplOffice(DIRECTOR_OF_TRADE, DIRECTOR_OF_TRADE, getPhaseName(DIRECTOR_OF_TRADE))}
        ${tplOffice(MANAGER_OF_SHIPPING, MANAGER_OF_SHIPPING, getPhaseName(MANAGER_OF_SHIPPING))}
      </div>
      <div class="joco-column">
        ${tplCompanyBalance()}
        ${tplCompanyStanding()}
        ${tplCompanyDebt()}    
      </div>
      
    </div>

  ${tplVacantOffices()}
  </div>
`;

export class Company {
  private static instance: Company;
  private ui: {
    courtOfDirectors?: HTMLElement;
    stockExchange: Record<string, HTMLElement>;
    standing: Record<string, HTMLElement>;
    debt: Record<number, HTMLElement>;
    offices: Record<string, HTMLElement>;
    vacantOffices: HTMLElement;
  };
  public balance: Counter;
  public treasuries: Record<string, Treasury> = {};

  constructor(private game: GameAlias) {
    this.game = game;
    this.setup(game.gamedatas);
  }

  public static create(game: GameAlias) {
    Company.instance = new Company(game);
  }

  public static getInstance() {
    return Company.instance;
  }

  // ..######..########.########.##.....##.########.
  // .##....##.##..........##....##.....##.##.....##
  // .##.......##..........##....##.....##.##.....##
  // ..######..######......##....##.....##.########.
  // .......##.##..........##....##.....##.##.......
  // .##....##.##..........##....##.....##.##.......
  // ..######..########....##.....#######..##.......

  setupCourtOfDirectors(gamedatas: GamedatasAlias) {
    // document
    //   .getElementById('joco-company')
    //   .insertAdjacentHTML('afterbegin', tplCourtOfDirectors());

    this.ui.courtOfDirectors = document.getElementById('CourtOfDirectors')!;
    STOCK_EXCHANGE_CONFIG.forEach((item) => {
      this.ui.stockExchange[item.id] = document.getElementById(item.id)!;
    });

    this.updateCourtOfDirectors(gamedatas);
  }

  setupCompanyBalance(gamedatas: GamedatasAlias) {
    this.balance = new ebg.counter();
    this.balance.create(`joco-balance`);
    this.balance.setValue(gamedatas.company.balance);
  }

  setupCompanyStanding(gamedatas: GamedatasAlias) {
    COMPANY_STANDING_CONFIG.forEach((item) => {
      this.ui.standing[item.id] = document.getElementById(item.id)!;
    });
    this.updateCompanyStanding(gamedatas.company.standing);
  }

  setupCompanyDebt(gamedatas: GamedatasAlias) {
    COMPANY_DEBT_CONFIG.forEach((item, index) => {
      this.ui.debt[index] = document.getElementById(item.id)!;
    });
    this.updateCompanyDebt(gamedatas.company.debt);
  }

  private setupTreasury(gamedatas: GamedatasAlias, id: string) {
    const parent = document.getElementById(`${id}Office`)!;
    this.treasuries[id] = new Treasury({
      parent,
      gamedatas,
      office: id,
    });

    // this.treasuries[id] = new ebg.counter();
    // this.treasuries[id].create(`${id}-treasury`);
    // this.treasuries[id].setValue(gamedatas.offices[id].treasury);
  }

  private setupVacantOffices(gamedatas: GamedatasAlias) {
    Object.values(gamedatas.offices).forEach((office) => {
      if (office.location === VACANT_OFFICES) {
        this.ui.vacantOffices.insertAdjacentHTML(
          'beforeend',
          tplOfficeCard(office),
        );
      }
    });
  }

  setup(gamedatas: GamedatasAlias) {
    document
      .getElementById('joco')
      .insertAdjacentHTML('afterbegin', tplCompany());

    this.ui = {
      stockExchange: {},
      standing: {},
      debt: {},
      offices: {},
      vacantOffices: document.getElementById(VACANT_OFFICES)!,
    };

    [CHAIRMAN, DIRECTOR_OF_TRADE, MANAGER_OF_SHIPPING].forEach((officeId) => {
      this.ui.offices[officeId] = document.getElementById(officeId)!;
    });

    this.setupCourtOfDirectors(gamedatas);
    this.setupCompanyBalance(gamedatas);
    this.setupCompanyStanding(gamedatas);
    this.setupCompanyDebt(gamedatas);
    this.setupTreasury(gamedatas, DIRECTOR_OF_TRADE);
    this.setupTreasury(gamedatas, MANAGER_OF_SHIPPING);
    this.updateFamilyMembers(gamedatas);
    this.setupVacantOffices(gamedatas);
  }

  // .##.....##.########..########.....###....########.########....##.....##.####
  // .##.....##.##.....##.##.....##...##.##......##....##..........##.....##..##.
  // .##.....##.##.....##.##.....##..##...##.....##....##..........##.....##..##.
  // .##.....##.########..##.....##.##.....##....##....######......##.....##..##.
  // .##.....##.##........##.....##.#########....##....##..........##.....##..##.
  // .##.....##.##........##.....##.##.....##....##....##..........##.....##..##.
  // ..#######..##........########..##.....##....##....########.....#######..####

  public getDebtElt(debt: number): HTMLElement {
    return this.ui.debt[debt];
  }

  public updateFamilyMembers(gamedatas: GamedatasAlias) {
    const offices = [CHAIRMAN, DIRECTOR_OF_TRADE, MANAGER_OF_SHIPPING];
    Object.values(gamedatas.familyMembers).forEach((member) => {
      if (offices.includes(member.location)) {
        const officeId = member.location;
        const familyMemberElement = createFamilyMember(
          member.familyId,
          member.id,
        );
        this.ui.offices[officeId].appendChild(familyMemberElement);
      }
    });
  }

  public updateCompanyStanding(standing: number | 'fail') {
    Object.values(this.ui.standing).forEach((element) => {
      element.classList.remove('active');
    });

    const activeId = `company-standing-${standing}`;
    const activeElement = this.ui.standing[activeId];

    if (activeElement) {
      activeElement.classList.add('active');
    }
  }

  public updateCompanyDebt(debt: number) {
    Object.values(this.ui.debt).forEach((element) => {
      element.classList.remove('active');
    });

    const activeElement = this.ui.debt[debt];

    if (activeElement) {
      activeElement.classList.add('active');
    }
  }

  private updateCourtOfDirectors(gamedatas: GamedatasAlias) {
    Object.values(gamedatas.familyMembers).forEach((familyMember) => {
      const { id, familyId, location } = familyMember;
      if (STOCK_EXCHANGE_POSITIONS.includes(location)) {
        const familyMemberElement = createFamilyMember(familyId, id);
        this.ui.stockExchange[location].appendChild(familyMemberElement);
      } else if (location === COURT_OF_DIRECTORS) {
        const familyMemberElement = createFamilyMember(familyId, id);
        this.ui.courtOfDirectors?.appendChild(familyMemberElement);
      }
    });
  }

  public incBalance(change: number) {
    this.balance.incValue(change);
  }
}
