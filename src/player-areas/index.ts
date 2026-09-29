import { GameAlias, GamedatasAlias, PlayerAlias } from '../types';
import { PlayerArea } from './player-area';
import { tplPlayerAreas } from './templates';

export class PlayerAreas {
  private static instance: PlayerAreas;
  public playerAreas: Record<string, PlayerArea> = {};

  constructor(private game: GameAlias) {
    this.game = game;
    this.setup(game.gamedatas);
  }

  public static create(game: GameAlias) {
    PlayerAreas.instance = new PlayerAreas(game);
  }

  public static getInstance() {
    return PlayerAreas.instance;
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
    this.game.playerOrder.forEach((playerId) => {
      const player: PlayerAlias = gamedatas.players[playerId];

      this.playerAreas[player.familyId] = new PlayerArea({
        parentElement: container,
        game: this.game,
        player,
        gamedatas,
      });
      //   container.insertAdjacentHTML(
      //     'beforeend',
      //     tplPlayerArea(gamedatas.players[playerId]),
      //   );

      //   const countersContainer = document.getElementById(
      //     `joco-counters-${player.familyId}`,
      //   );
    });
  }

  // .##.....##.########..########.....###....########.########....##.....##.####
  // .##.....##.##.....##.##.....##...##.##......##....##..........##.....##..##.
  // .##.....##.##.....##.##.....##..##...##.....##....##..........##.....##..##.
  // .##.....##.########..##.....##.##.....##....##....######......##.....##..##.
  // .##.....##.##........##.....##.#########....##....##..........##.....##..##.
  // .##.....##.##........##.....##.##.....##....##....##..........##.....##..##.
  // ..#######..##........########..##.....##....##....########.....#######..####
}
