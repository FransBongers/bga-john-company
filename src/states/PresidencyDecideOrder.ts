import { Board } from '../board';
import {
  debug,
  updatePageTitle,
  getPlayerName,
  addPrimaryActionButton,
  clearPossible,
  addConfirmButton,
  performAction,
  addCancelButton,
} from '../boilerplate';
import { TRADE, DONE } from '../constants';
import { CommonStateArgs, GameState, GameAlias } from '../types';

interface OnEnteringPresidencyDecideOrderArgs extends CommonStateArgs {
  trade: boolean;
  done: boolean;
  Commander: boolean;
  governors: Record<string, boolean>;
}

// TODO: replace with OR STATE
export class PresidencyDecideOrder implements GameState<OnEnteringPresidencyDecideOrderArgs> {
  private static instance: PresidencyDecideOrder;
  private args: OnEnteringPresidencyDecideOrderArgs;

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    PresidencyDecideOrder.instance = new PresidencyDecideOrder(game);
  }

  public static getInstance() {
    return PresidencyDecideOrder.instance;
  }

  onEnteringState(args: OnEnteringPresidencyDecideOrderArgs) {
    debug('Entering PresidencyDecideOrder state');
    this.args = args;

    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving PresidencyDecideOrder state');
  }

  setDescription(
    activePlayerIds: number,
    args: OnEnteringPresidencyDecideOrderArgs,
  ) {
    updatePageTitle(
      _('${tkn_playerName} must choose which is next to act'),
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

    updatePageTitle(_('${you} must choose which is next to act'));
    const board = Board.getInstance();
    if (this.args.trade) {
      addPrimaryActionButton({
        id: 'trade_btn',
        text: _('Trade'),
        callback: () => this.updateInterfaceConfirm(TRADE),
      });
    }
    if (this.args.done) {
      addPrimaryActionButton({
        id: 'done_btn',
        text: _('Done'),
        callback: () => this.updateInterfaceConfirm(DONE),
      });
    }
  }

  private updateInterfaceConfirm(next: string) {
    clearPossible();

    switch (next) {
      case TRADE:
        updatePageTitle(_('Perform the Trade action?'));
        break;
      case DONE:
        updatePageTitle(_('Done?'));
        break;
      default:
    }

    addConfirmButton(() => {
      performAction('actPresidencyDecideOrder', {
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
