import { EnterpriseCardsManager } from '../cards/enterprise-cards';
import { BgaCards } from '../libs';
import { GameAlias, GamedatasAlias, JocoEnterpriseCard } from '../types';
import { getEnterpriseCard } from '../utility';
import { tplPlayerAreas, tplPlayerArea } from './templates';

export class PlayerAreas {
  private static instance: PlayerAreas;
  private enterprises: Record<
    string,
    InstanceType<typeof BgaCards.LineStock<JocoEnterpriseCard>>
  > = {};

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
      const player = gamedatas.players[playerId];

      container.insertAdjacentHTML(
        'beforeend',
        tplPlayerArea(gamedatas.players[playerId]),
      );

      this.enterprises[player.familyId] =
        new BgaCards.LineStock<JocoEnterpriseCard>(
          EnterpriseCardsManager.getInstance(),
          document.getElementById(`joco-enterprises-${player.familyId}`)!,
        );
    });

    this.updateEnterprises(gamedatas);
  }

  // .##.....##.########..########.....###....########.########....##.....##.####
  // .##.....##.##.....##.##.....##...##.##......##....##..........##.....##..##.
  // .##.....##.##.....##.##.....##..##...##.....##....##..........##.....##..##.
  // .##.....##.########..##.....##.##.....##....##....######......##.....##..##.
  // .##.....##.##........##.....##.#########....##....##..........##.....##..##.
  // .##.....##.##........##.....##.##.....##....##....##..........##.....##..##.
  // ..#######..##........########..##.....##....##....########.....#######..####

  private updateEnterprises(gamedatas: GamedatasAlias) {
    Object.values(gamedatas.enterprises).forEach((enterprise) => {
      const stock = this.enterprises[enterprise.location];
      if (stock) {
        stock.addCard(getEnterpriseCard(enterprise));
      }
    });
  }
}
