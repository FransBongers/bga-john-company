import { TabContainer } from '../boilerplate/ui-components/tab-container';
import { PlayerManager } from '../player-manager';
import { GameAlias, GamedatasAlias, PlayerAlias } from '../types';
import { getFamilyName } from '../utility';
import { FamilyArea } from './family-area';
import { tplFamilies, tplPlayerArea } from './templates';

export class Families {
  private static instance: Families;
  public families: Record<string, FamilyArea> = {};
  private tabContainer: TabContainer;

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
    const playerManager = PlayerManager.getInstance();

    document
      .getElementById('joco')
      .insertAdjacentHTML('afterbegin', tplFamilies());
    const container = document.getElementById('joco-families');

    this.tabContainer = new TabContainer({
      id: 'joco-families-tabs',
      parentElement: container,
      gameName: this.game.gameName,
      tabs: this.game.playerOrder.map((playerId: number) => {
        const player = playerManager.getPlayer(playerId);
        return {
          id: `joco-family-area-${player.familyId}`,
          title: `${player.getName()} - ${getFamilyName(player.familyId)}`,
          content: tplPlayerArea(player),
        };
      }),
      initialActiveTabId: `joco-family-area-${playerManager.getPlayer(this.game.playerOrder[0]).familyId}`,
    });

    this.game.playerOrder.forEach((playerId) => {
      const player: PlayerAlias = gamedatas.players[playerId];

      this.families[player.familyId] = new FamilyArea({
        parentElement: container,
        game: this.game,
        player,
        gamedatas,
      });
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
