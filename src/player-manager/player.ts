//  .########..##..........###....##....##.########.########.
//  .##.....##.##.........##.##....##..##..##.......##.....##
//  .##.....##.##........##...##....####...##.......##.....##
//  .########..##.......##.....##....##....######...########.
//  .##........##.......#########....##....##.......##...##..
//  .##........##.......##.....##....##....##.......##....##.
//  .##........########.##.....##....##....########.##.....##

class JocoPlayer {
  private playerColor: string;
  protected playerId: number;
  private playerName: string;
  public familyId: string;
  public counters: Record<string, Counter> = {};

  public ui: Record<string, HTMLElement> = {};

  constructor(private game: GameAlias, player: JohnCompanyPlayerData) {
    this.game = game;
    const playerId = player.id;
    this.playerId = Number(playerId);
    this.playerName = player.name;
    this.playerColor = player.color;
    this.familyId = player.familyId;

    const gamedatas = game.gamedatas;

    this.setupPlayer(gamedatas);
  }

  // .##.....##.##....##.########...#######.
  // .##.....##.###...##.##.....##.##.....##
  // .##.....##.####..##.##.....##.##.....##
  // .##.....##.##.##.##.##.....##.##.....##
  // .##.....##.##..####.##.....##.##.....##
  // .##.....##.##...###.##.....##.##.....##
  // ..#######..##....##.########...#######.

  clearInterface() {}

  updatePlayer(gamedatas: GamedatasAlias) {
    this.updatePlayerPanel(gamedatas);
  }

  // ..######..########.########.##.....##.########.
  // .##....##.##..........##....##.....##.##.....##
  // .##.......##..........##....##.....##.##.....##
  // ..######..######......##....##.....##.########.
  // .......##.##..........##....##.....##.##.......
  // .##....##.##..........##....##.....##.##.......
  // ..######..########....##.....#######..##.......

  // Setup functions
  public setupPlayer(gamedatas: GamedatasAlias) {
    this.setupPlayerPanel(gamedatas);
  }

  setupPlayerPanel(gamedatas: GamedatasAlias) {
    const playerGamedatas = gamedatas.players[this.playerId];

    const node = document.querySelector(
      `#player_board_${this.playerId} .player-board-game-specific-content`
    );

    if (!node) {
      return;
    }

    node.insertAdjacentHTML('afterbegin', tplPlayerCounters(this.playerId));

    const familyId =
      this.familyId === CROWN
        ? COLOR_FAMILY_MAP[HEX_COLOR_COLOR_MAP[this.getColor()]]
        : this.familyId;
    const elt = createFamilyMember(familyId, Math.floor(Math.random() * 18));
    elt.id = `joco-familyMembers-${this.playerId}`;

    document
      .getElementById(`joco-counters-${this.playerId}-row-1`)
      .insertAdjacentElement('afterbegin', elt);

    COUNTERS.forEach((counter) => {
      this.counters[counter] = new ebg.counter();
      this.counters[counter].create(`joco-${counter}-counter-${this.playerId}`);
      this.ui[counter] = document.getElementById(
        `joco-${counter}-${this.playerId}`
      );
    });

    // this.counters = {
    //   cash: new ebg.counter(),
    //   familyMembers: new ebg.counter(),
    //   ships: new ebg.counter(),
    // }

    this.updatePlayerPanel(gamedatas);
  }

  updatePlayerPanel(gamedatas: GamedatasAlias) {
    this.counters[CASH_COUNTER].setValue(
      gamedatas.families[this.familyId].treasury
    );
    this.counters[FAMILY_MEMBERS_COUNTER].setValue(
      Object.values(gamedatas.familyMembers).filter(
        ({ familyId, location }) =>
          familyId === this.familyId && location.startsWith('supply')
      ).length
    );
    this.counters[SHARES_COUNTER].setValue(
      Object.values(gamedatas.familyMembers).filter(
        ({ familyId, location }) =>
          familyId === this.familyId && (location === COURT_OF_DIRECTORS || location === CHAIRMAN)
      ).length
    );
    this.counters[SHIPYARDS_COUNTER].setValue(
      Object.values(gamedatas.enterprises).filter(
        ({ type, location }) => type === SHIPYARD && location === this.familyId
      ).length
    );
    this.counters[LUXURIES_COUNTER].setValue(
      Object.values(gamedatas.enterprises).filter(
        ({ type, location }) => type === LUXURY && location === this.familyId
      ).length
    );
    this.counters[WORKSHOPS_COUNTER].setValue(
      Object.values(gamedatas.enterprises).filter(
        ({ type, location }) => type === WORKSHOP && location === this.familyId
      ).length
    );
  }

  // ..######...########.########.########.########.########...######.
  // .##....##..##..........##.......##....##.......##.....##.##....##
  // .##........##..........##.......##....##.......##.....##.##......
  // .##...####.######......##.......##....######...########...######.
  // .##....##..##..........##.......##....##.......##...##.........##
  // .##....##..##..........##.......##....##.......##....##..##....##
  // ..######...########....##.......##....########.##.....##..######.

  // ..######..########.########.########.########.########...######.
  // .##....##.##..........##.......##....##.......##.....##.##....##
  // .##.......##..........##.......##....##.......##.....##.##......
  // ..######..######......##.......##....######...########...######.
  // .......##.##..........##.......##....##.......##...##.........##
  // .##....##.##..........##.......##....##.......##....##..##....##
  // ..######..########....##.......##....########.##.....##..######.

  getColor(): string {
    return this.playerColor;
  }

  getName(): string {
    return this.playerName;
  }

  getPlayerId(): number {
    return this.playerId;
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  // ....###.....######..########.####..#######..##....##..######.
  // ...##.##...##....##....##.....##..##.....##.###...##.##....##
  // ..##...##..##..........##.....##..##.....##.####..##.##......
  // .##.....##.##..........##.....##..##.....##.##.##.##..######.
  // .#########.##..........##.....##..##.....##.##..####.......##
  // .##.....##.##....##....##.....##..##.....##.##...###.##....##
  // .##.....##..######.....##....####..#######..##....##..######.
}
