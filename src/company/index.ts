import { GameAlias, GamedatasAlias } from '../types';

const tplCompany = () => `
  <div id="joco-company" class="joco-tab">
    <div id="joco-company-standing">
      Company Standing
    </div>
    <div id="joco-company-debt">
      Company Debt
    </div>
    <div id="joco-court-of-directors">
      Court of Directors
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

  setup(gamedatas: GamedatasAlias) {
    document
      .getElementById('joco')
      .insertAdjacentHTML('afterbegin', tplCompany());
  }

  // .##.....##.########..########.....###....########.########....##.....##.####
  // .##.....##.##.....##.##.....##...##.##......##....##..........##.....##..##.
  // .##.....##.##.....##.##.....##..##...##.....##....##..........##.....##..##.
  // .##.....##.########..##.....##.##.....##....##....######......##.....##..##.
  // .##.....##.##........##.....##.#########....##....##..........##.....##..##.
  // .##.....##.##........##.....##.##.....##....##....##..........##.....##..##.
  // ..#######..##........########..##.....##....##....########.....#######..####
}
