import { createFamilyMember } from '../board/utility';
import { COURT_OF_DIRECTORS, STOCK_EXCHANGE_POSITIONS } from '../constants';
import { GameAlias, GamedatasAlias } from '../types';
import { STOCK_EXCHANGE_CONFIG, tplCourtOfDirectors } from './templates';

const tplCompany = () => `
  <div id="joco-company" class="joco-tab">


    <div id="joco-company-standing">
      Company Standing
    </div>
    <div id="joco-company-debt">
      Company Debt
    </div>
    <div id="joco-offices">
      Offices
    </div>
    <div id="joco-vacant-offices">
      Vacant Offices
    </div>
  </div>
`;

export class Company {
  private static instance: Company;
  private ui: {
    courtOfDirectors?: HTMLElement;
    stockExchange: Record<string, HTMLElement>;
  } = {
    stockExchange: {},
  };

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
    document
      .getElementById('joco-company')
      .insertAdjacentHTML('afterbegin', tplCourtOfDirectors());

    this.ui.courtOfDirectors = document.getElementById('CourtOfDirectors')!;
    STOCK_EXCHANGE_CONFIG.forEach((item) => {
      this.ui.stockExchange[item.id] = document.getElementById(item.id)!;
    });

    this.updateCourtOfDirectors(gamedatas);
  }

  setup(gamedatas: GamedatasAlias) {
    document
      .getElementById('joco')
      .insertAdjacentHTML('afterbegin', tplCompany());

    this.setupCourtOfDirectors(gamedatas);
  }

  // .##.....##.########..########.....###....########.########....##.....##.####
  // .##.....##.##.....##.##.....##...##.##......##....##..........##.....##..##.
  // .##.....##.##.....##.##.....##..##...##.....##....##..........##.....##..##.
  // .##.....##.########..##.....##.##.....##....##....######......##.....##..##.
  // .##.....##.##........##.....##.#########....##....##..........##.....##..##.
  // .##.....##.##........##.....##.##.....##....##....##..........##.....##..##.
  // ..#######..##........########..##.....##....##....########.....#######..####

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
}
