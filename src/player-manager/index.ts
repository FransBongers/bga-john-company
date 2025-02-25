//  .########..##..........###....##....##.########.########.
//  .##.....##.##.........##.##....##..##..##.......##.....##
//  .##.....##.##........##...##....####...##.......##.....##
//  .########..##.......##.....##....##....######...########.
//  .##........##.......#########....##....##.......##...##..
//  .##........##.......##.....##....##....##.......##....##.
//  .##........########.##.....##....##....########.##.....##

//  .##.....##....###....##....##....###.....######...########.########.
//  .###...###...##.##...###...##...##.##...##....##..##.......##.....##
//  .####.####..##...##..####..##..##...##..##........##.......##.....##
//  .##.###.##.##.....##.##.##.##.##.....##.##...####.######...########.
//  .##.....##.#########.##..####.#########.##....##..##.......##...##..
//  .##.....##.##.....##.##...###.##.....##.##....##..##.......##....##.
//  .##.....##.##.....##.##....##.##.....##..######...########.##.....##

class PlayerManager {
  private static instance: PlayerManager;
  private players: Record<number, JocoPlayer>;

  constructor(private game: GameAlias) {
    this.players = {};

    for (const playerId in game.gamedatas.players) {
      const player = game.gamedatas.players[playerId];
      this.players[playerId] = new JocoPlayer(this.game, player);
    }
  }

  public static create(game: GameAlias) {
    PlayerManager.instance = new PlayerManager(game);
  }

  public static getInstance() {
    return PlayerManager.instance;
  }

  getPlayer(playerId: number): JocoPlayer {
    return this.players[playerId];
  }

  getPlayerForFamily(familyId: string): JocoPlayer {
    return Object.values(this.players).find((player) => player.familyId === familyId);
  }

  getPlayers(): JocoPlayer[] {
    return Object.values(this.players);
  }

  getPlayerIds(): number[] {
    return Object.keys(this.players).map(Number);
  }

  updatePlayers(gamedatas: GamedatasAlias) {
    for (const playerId in gamedatas.players) {
      this.players[playerId].updatePlayer(gamedatas);
    }
  }

  clearInterface() {
    Object.keys(this.players).forEach((playerId) => {
      this.players[playerId].clearInterface();
    });
  }
}
