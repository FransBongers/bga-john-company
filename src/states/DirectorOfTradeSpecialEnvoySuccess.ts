// import { Board } from '../board';
import { Bar } from '../bar';
import {
  debug,
  updatePageTitle,
  getPlayerName,
  onClick,
  clearPossible,
  setSelected,
  addConfirmButton,
  addCancelButton,
  performAction,
} from '../boilerplate';
import { India } from '../india';
import { CommonStateArgs, GameAlias, GameState, JoCoOrderBase } from '../types';

interface OnEnteringDirectorOfTradeSpecialEnvoySuccessArgs extends CommonStateArgs {
  closedOrders: JoCoOrderBase[];
}

export class DirectorOfTradeSpecialEnvoySuccess implements GameState<OnEnteringDirectorOfTradeSpecialEnvoySuccessArgs> {
  private static instance: DirectorOfTradeSpecialEnvoySuccess;
  private args: OnEnteringDirectorOfTradeSpecialEnvoySuccessArgs;

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    DirectorOfTradeSpecialEnvoySuccess.instance =
      new DirectorOfTradeSpecialEnvoySuccess(game);
  }

  public static getInstance() {
    return DirectorOfTradeSpecialEnvoySuccess.instance;
  }

  onEnteringState(args: OnEnteringDirectorOfTradeSpecialEnvoySuccessArgs) {
    debug('Entering DirectorOfTradeSpecialEnvoySuccess state');
    this.args = args;
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving DirectorOfTradeSpecialEnvoySuccess state');
  }

  setDescription(
    activePlayerIds: number,
    args: OnEnteringDirectorOfTradeSpecialEnvoySuccessArgs,
  ) {
    updatePageTitle(
      _(
        '${tkn_playerName} may open trade with China or may open a closed order',
      ),
      {
        tkn_playerName: getPlayerName(activePlayerIds[0]),
      },
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
    Bar.getInstance().goTo('joco-india');

    updatePageTitle(
      _('${you} may open trade with China or may open a closed order'),
    );
    const india = India.getInstance();
    this.args.closedOrders.forEach((order) => {
      onClick(india.ui.orders[order.id], () =>
        this.updateInterfaceConfirm(order),
      );
    });

    // addCancelButton();
  }

  private updateInterfaceConfirm(order: JoCoOrderBase) {
    clearPossible();

    updatePageTitle(_('Open closed order in ${region}?'), {
      region: _(order.location),
    });
    setSelected(India.getInstance().ui.orders[order.id]);

    addConfirmButton(() => this.performAction(order, true));
    addCancelButton();
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private performAction(order: JoCoOrderBase, perform: boolean = false) {
    performAction('actDirectorOfTradeSpecialEnvoySuccess', {
      orderId: order.id,
      perform,
    });
  }

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
