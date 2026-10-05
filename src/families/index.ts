import { GameAlias, GamedatasAlias, PlayerAlias } from '../types';
import { FamilyArea } from './family-area';
import { tplFamilies } from './templates';

export class Families {
  private static instance: Families;
  public families: Record<string, FamilyArea> = {};

  constructor(private game: GameAlias) {
    this.game = game;
    this.setup(game.gamedatas);
  }

  public static create(game: GameAlias) {
    Families.instance = new Families(game);
  }

  public static getInstance() {
    return Families.instance;
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
      .insertAdjacentHTML('afterbegin', tplFamilies());
    const container = document.getElementById('joco-families');
    this.game.playerOrder.forEach((playerId) => {
      const player: PlayerAlias = gamedatas.players[playerId];

      this.families[player.familyId] = new FamilyArea({
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

  public getFamily(familyId: string): FamilyArea {
    return this.families[familyId];
  }
}
