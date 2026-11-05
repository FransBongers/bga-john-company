import { Deals } from '..';
import { GamedatasAlias, GameAlias } from '../../types';
import { tplDealsPlayersTable, tplPlayerRow } from './templates';

export class DealsPlayersTable {
  private ui: {
    newDealButtons: Record<number, HTMLElement>;
  }

  constructor(private game: GameAlias) {
    this.game = game;
    this.ui = {
      newDealButtons: {},
    };
    this.setup(game.gamedatas);
  }

  // ..######..########.########.##.....##.########.
  // .##....##.##..........##....##.....##.##.....##
  // .##.......##..........##....##.....##.##.....##
  // ..######..######......##....##.....##.########.
  // .......##.##..........##....##.....##.##.......
  // .##....##.##..........##....##.....##.##.......
  // ..######..########....##.....#######..##.......

  private setup(gamedatas: GamedatasAlias) {
    document
      .getElementById('joco-deals-players')
      .insertAdjacentHTML('beforeend', tplDealsPlayersTable());

    this.setupPlayerRows(gamedatas);
  }

  private setupPlayerRows(gamedatas: GamedatasAlias) {
    const playerOrder = this.game.playerOrder;
    const currentPlayerId = this.game.isSpectator
      ? 'Spectator'
      : this.game.getPlayerId();

    playerOrder.forEach((playerId) => {
      const familyId = gamedatas.players[playerId].familyId;
      document.getElementById('joco-players-table').insertAdjacentHTML(
        'beforeend',
        tplPlayerRow({
          currentPlayerId,
          playerId,
          familyId,
        }),
      );

      if (!this.game.isSpectator && currentPlayerId !== playerId) {
        const newDealButton = document.getElementById(
          `joco-new-offer-${playerId}`,
        );

        if (newDealButton) {
          this.ui.newDealButtons[playerId] = newDealButton;
          newDealButton.onclick = () => this.onNewDealClick(playerId);
        }
      }
    });
  }

  private onNewDealClick(playerId: number) {
    if (this.game.isSpectator) {
      return;
    }
    Deals.getInstance().startNewOffer(playerId);
  }
}
