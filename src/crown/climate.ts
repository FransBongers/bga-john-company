type Climate = 'Bull' | 'Bear' | 'Lion' | 'Stag' | 'Peacock';

class CrownClimate {
  private static instance: CrownClimate;
  private climate: Record<string, HTMLElement> = {};

  private active: Climate;

  constructor(private game: GameAlias) {
    this.game = game;
    this.setup(game.gamedatas);
  }

  public static create(game: GameAlias) {
    CrownClimate.instance = new CrownClimate(game);
  }

  public static getInstance() {
    return CrownClimate.instance;
  }

  // ..######..########.########.##.....##.########.
  // .##....##.##..........##....##.....##.##.....##
  // .##.......##..........##....##.....##.##.....##
  // ..######..######......##....##.....##.########.
  // .......##.##..........##....##.....##.##.......
  // .##....##.##..........##....##.....##.##.......
  // ..######..########....##.....#######..##.......

  setup(gamedatas: GamedatasAlias) {
    const row = document.createElement('div');
    row.classList.add('joco-crown-climate-row');
    // Add icons
    CROWN_CLIMATE.forEach((climate) => {
      const elt = document.createElement('div');
      elt.classList.add('joco-crown-climate-icon');
      elt.setAttribute('data-climate', climate);
      row.appendChild(elt);
    });
    // Add box to show current climate
    CROWN_CLIMATE.forEach((climate) => {
      const elt = (this.climate[climate] = document.createElement('div'));
      elt.classList.add('joco-crown-climate-indicator');
      row.appendChild(elt);
    });

    const node = document.querySelector(
      `#player_board_${CROWN_PLAYER_ID} .player-board-game-specific-content`
    );

    node.insertAdjacentElement('afterbegin', row);
    this.updateClimate('Peacock');
  }

  // .##.....##.########..########.....###....########.########....##.....##.####
  // .##.....##.##.....##.##.....##...##.##......##....##..........##.....##..##.
  // .##.....##.##.....##.##.....##..##...##.....##....##..........##.....##..##.
  // .##.....##.########..##.....##.##.....##....##....######......##.....##..##.
  // .##.....##.##........##.....##.#########....##....##..........##.....##..##.
  // .##.....##.##........##.....##.##.....##....##....##..........##.....##..##.
  // ..#######..##........########..##.....##....##....########.....#######..####

  public updateClimate(climate: Climate) {
    if (this.active) {
      this.climate[this.active].classList.remove('active');
    }
    this.active = climate;
    this.climate[this.active].classList.add('active');
  }
}
