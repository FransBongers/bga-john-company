import { tplDivider } from '../boilerplate/templates';
import { createHtmlElement } from '../boilerplate/utility';
import {
  BONUSES,
  CHAIRMAN,
  DIRECTOR_OF_TRADE,
  EVENTS_IN_INDIA,
  FAMILY,
  HIRING,
  LONDON_SEASON,
  MANAGER_OF_SHIPPING,
  MILITARY_AFFAIRS,
  PARLIAMENT_MEETS,
  UPKEEP_AND_REFRESH,
  REVENUE,
  BOMBAY_PRESIDENCY,
  MADRAS_PRESIDENCY,
  BENGAL_PRESIDENCY,
} from '../constants';
import { GameAlias, GamedatasAlias } from '../types';
import { getPhaseName } from './translations';

const PHASES = [
  LONDON_SEASON,
  FAMILY,
  HIRING,
  CHAIRMAN,
  DIRECTOR_OF_TRADE,
  MANAGER_OF_SHIPPING,
  MILITARY_AFFAIRS,
  BOMBAY_PRESIDENCY,
  MADRAS_PRESIDENCY,
  BENGAL_PRESIDENCY,
  BONUSES,
  REVENUE,
  EVENTS_IN_INDIA,
  PARLIAMENT_MEETS,
  UPKEEP_AND_REFRESH,
];

const tplPhaseTracker = (phases: string[]) => `
  <div id="joco-trackers">

  </div>
`;

const tplCurrentPhase = (phase: string) => `
  <div class="joco-phase-tracker" id="joco-current-phase">
    <div class="joco-label">
      <span class="fb-font-baskerville fb-font-bold fb-font-16">${_('PHASE')}</span>
    </div>
    <div class="joco-current-phase">
      <span class="fb-font-baskerville fb-font-bold fb-font-16">${getPhaseName(phase).toLocaleUpperCase()}</span>
    </div>
  </div>
`;

const tplCurrentTurn = (turn: number) => `
  <div class="joco-turn-tracker" id="joco-phase-turn">
    <div class="joco-label">
      <span class="fb-font-baskerville fb-font-bold fb-font-16">${_('TURN')}</span>
    </div>
    <div class="joco-turn-numbers">
      ${[1,2,3,4,5,6,7,8].map((t) => `<span class="joco-turn-number fb-font-baskerville fb-font-bold fb-font-16" data-active="${t === turn}">${t}</span>`).join('')}
    </div>
  </div>
`;

export class PhaseTracker {
  private static instance: PhaseTracker;
  private ui: {
    container: HTMLElement;
    phases: Record<string, HTMLElement>;
  };

  constructor(private game: GameAlias) {
    this.game = game;
    this.setup(game.gamedatas);
  }

  public static create(game: GameAlias) {
    PhaseTracker.instance = new PhaseTracker(game);
  }

  public static getInstance() {
    return PhaseTracker.instance;
  }

  // ..######..########.########.##.....##.########.
  // .##....##.##..........##....##.....##.##.....##
  // .##.......##..........##....##.....##.##.....##
  // ..######..######......##....##.....##.########.
  // .......##.##..........##....##.....##.##.......
  // .##....##.##..........##....##.....##.##.......
  // ..######..########....##.....#######..##.......

  private setupPhases(gamedatas: GamedatasAlias) {
    this.ui.container.insertAdjacentHTML(
      'beforeend',
      tplCurrentTurn(gamedatas.turn),
    );

    this.ui.container.insertAdjacentHTML(
      'beforeend',
      tplDivider('vertical'),
    );

    this.ui.container.insertAdjacentHTML(
      'beforeend',
      tplCurrentPhase(gamedatas.phase),
    );
    // PHASES.forEach((phase) => {
    //   const elt = createHtmlElement(tplPhase(phase));
    //   this.ui.container.appendChild(elt);
    //   this.ui.phases[phase] = elt;
    // });
  }

  setup(gamedatas: GamedatasAlias) {
    document
      .getElementById('game_play_area')
      .insertAdjacentHTML('afterbegin', tplPhaseTracker(PHASES));

    this.ui = {
      container: document.getElementById('joco-trackers') as HTMLElement,
      phases: {},
    };

    this.setupPhases(gamedatas);
  }

  // .##.....##.########..########.....###....########.########....##.....##.####
  // .##.....##.##.....##.##.....##...##.##......##....##..........##.....##..##.
  // .##.....##.##.....##.##.....##..##...##.....##....##..........##.....##..##.
  // .##.....##.########..##.....##.##.....##....##....######......##.....##..##.
  // .##.....##.##........##.....##.#########....##....##..........##.....##..##.
  // .##.....##.##........##.....##.##.....##....##....##..........##.....##..##.
  // ..#######..##........########..##.....##....##....########.....#######..####
}
