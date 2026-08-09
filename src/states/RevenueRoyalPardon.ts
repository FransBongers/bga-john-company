import {
  debug,
  updatePageTitle,
  getPlayerName,
  clearPossible,
  addConfirmButton,
  performAction,
  addCancelButton,
} from '../boilerplate';
import { CommonStateArgs, GameState, GameAlias } from '../types';

interface OnEnteringRevenueRoyalPardonArgs extends CommonStateArgs {}

export class RevenueRoyalPardon implements GameState<OnEnteringRevenueRoyalPardonArgs> {
  private static instance: RevenueRoyalPardon;
  private args: OnEnteringRevenueRoyalPardonArgs;

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    RevenueRoyalPardon.instance = new RevenueRoyalPardon(game);
  }

  public static getInstance() {
    return RevenueRoyalPardon.instance;
  }

  onEnteringState(args: OnEnteringRevenueRoyalPardonArgs) {
    debug('Entering RevenueRoyalPardon state');
    this.args = args;

    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving RevenueRoyalPardon state');
  }

  setDescription(
    activePlayerIds: number,
    args: OnEnteringRevenueRoyalPardonArgs,
  ) {
    updatePageTitle(
      _('${tkn_playerName} may pay dividends'),
      {
        tkn_playerName: getPlayerName(activePlayerIds[0]),
      },
      true,
    );
  }

  //  .####.##....##.########.########.########..########....###.....######..########
  //  ..##..###...##....##....##.......##.....##.##.........##.##...##....##.##......
  //  ..##..####..##....##....##.......##.....##.##........##...##..##.......##......
  //  ..##..##.##.##....##....######...########..######...##.....##.##.......######..
  //  ..##..##..####....##....##.......##...##...##.......#########.##.......##......
  //  ..##..##...###....##....##.......##....##..##.......##.....##.##....##.##......
  //  .####.##....##....##....########.##.....##.##.......##.....##..######..########

  // ..######..########.########.########...######.
  // .##....##....##....##.......##.....##.##....##
  // .##..........##....##.......##.....##.##......
  // ..######.....##....######...########...######.
  // .......##....##....##.......##..............##
  // .##....##....##....##.......##........##....##
  // ..######.....##....########.##.........######.

  private updateInterfaceInitialStep() {
    this.game.clearPossible();

    updatePageTitle(_('${you} may pay dividends'));
  }

  private updateInterfaceConfirm(next: string) {
    clearPossible();

    addConfirmButton(() => {
      performAction('actRevenueRoyalPardon', {
        next,
      });
    });
    addCancelButton();
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  //  ..######..##.......####..######..##....##
  //  .##....##.##........##..##....##.##...##.
  //  .##.......##........##..##.......##..##..
  //  .##.......##........##..##.......#####...
  //  .##.......##........##..##.......##..##..
  //  .##....##.##........##..##....##.##...##.
  //  ..######..########.####..######..##....##

  // .##.....##....###....##....##.########..##.......########..######.
  // .##.....##...##.##...###...##.##.....##.##.......##.......##....##
  // .##.....##..##...##..####..##.##.....##.##.......##.......##......
  // .#########.##.....##.##.##.##.##.....##.##.......######....######.
  // .##.....##.#########.##..####.##.....##.##.......##.............##
  // .##.....##.##.....##.##...###.##.....##.##.......##.......##....##
  // .##.....##.##.....##.##....##.########..########.########..######.
}
