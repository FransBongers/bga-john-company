import { TabContainer } from "../boilerplate/ui-components/tab-container";
import { GameAlias, GamedatasAlias, PlayerAlias } from "../types";
import { getFamilyName } from "../utility";
import { JocoPlayer } from "./player";
import { PlayerArea } from "./player-area";
import { tplPlayerArea, tplPlayerAreas } from "./templates";

//  .##.....##....###....##....##....###.....######...########.########.
//  .###...###...##.##...###...##...##.##...##....##..##.......##.....##
//  .####.####..##...##..####..##..##...##..##........##.......##.....##
//  .##.###.##.##.....##.##.##.##.##.....##.##...####.######...########.
//  .##.....##.#########.##..####.#########.##....##..##.......##...##..
//  .##.....##.##.....##.##...###.##.....##.##....##..##.......##....##.
//  .##.....##.##.....##.##....##.##.....##..######...########.##.....##

export class PlayerManager {
  private static instance: PlayerManager;
  private players: Record<number, JocoPlayer>;
  public playerAreas: Record<string, PlayerArea> = {};
  private tabContainer: TabContainer;

  constructor(private game: GameAlias) {
    this.players = {};

    for (const playerId in game.gamedatas.players) {
      const player = game.gamedatas.players[playerId];
      this.players[playerId] = new JocoPlayer(this.game, player);
    }

    this.setup(game.gamedatas);
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

  /**
   * @returns playerId of the player viewing the game
   * NOTE: this can be a spectator
   */
  getCurrentPlayerId() {
    return this.game.getPlayerId();
  }

  getCurrentPlayer(): JocoPlayer {
    const currentPlayerId = this.getCurrentPlayerId();
    return this.getPlayer(currentPlayerId);
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
      .insertAdjacentHTML('afterbegin', tplPlayerAreas());
    const container = document.getElementById('joco-player-areas');

    this.tabContainer = new TabContainer({
      id: 'joco-players-tabs',
      parentElement: container,
      gameName: this.game.gameName,
      tabs: this.game.playerOrder.map((playerId: number) => {
        const player = this.getPlayer(playerId);
        return {
          id: `joco-family-area-${player.getPlayerId()}`,
          title: `${player.getName()} - ${getFamilyName(player.familyId)}`,
          content: tplPlayerArea(player),
        };
      }),
      initialActiveTabId: `joco-family-area-${this.getPlayer(this.game.playerOrder[0]).getPlayerId()}`,
    });

    this.game.playerOrder.forEach((playerId) => {
      const player: PlayerAlias = gamedatas.players[playerId];

      this.playerAreas[player.id] = new PlayerArea({
        parentElement: container,
        game: this.game,
        player,
        gamedatas,
      });
    });
  }

  public getPlayerArea(playerId: number): PlayerArea {
    return this.playerAreas[playerId];
  }
}
