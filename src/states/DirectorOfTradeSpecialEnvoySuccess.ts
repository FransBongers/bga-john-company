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
  addPrimaryActionButton,
} from '../boilerplate';
import { India } from '../india';
import { CommonStateArgs, GameAlias, GameState, JoCoOrderBase } from '../types';

interface OnEnteringDirectorOfTradeSpecialEnvoySuccessArgs extends CommonStateArgs {
  closedOrders: JoCoOrderBase[];
  openTradeWithChina: boolean;
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
      args.openTradeWithChina
        ? _(
            '${tkn_playerName} may open trade with China or may open a closed order',
          )
        : _('${tkn_playerName} may open a closed order'),
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
      this.args.openTradeWithChina
        ? _('${you} may open trade with China or may open a closed order')
        : _('${you} may open a closed order'),
    );
    const india = India.getInstance();
    this.args.closedOrders.forEach((order) => {
      onClick(india.ui.orders[order.id], () =>
        this.updateInterfaceConfirm(order),
      );
    });
    if (this.args.openTradeWithChina) {
      addPrimaryActionButton({
        id: 'china-btn',
        text: _('Open trade with China'),
        callback: () => this.updateInterfaceConfirm(null, true),
      });
    }

    // addCancelButton();
  }

  private updateInterfaceConfirm(
    order: JoCoOrderBase | null,
    openTradeWithChina: boolean = false,
  ) {
    clearPossible();

    if (openTradeWithChina) {
      updatePageTitle(_('Open trade with China?'));
    } else {
      updatePageTitle(_('Open closed order in ${region}?'), {
        region: _(order.location),
      });
      setSelected(India.getInstance().ui.orders[order.id]);
    }

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

  private performAction(
    order: JoCoOrderBase | null,
    openTradeWithChina: boolean = false,
    perform: boolean = false,
  ) {
    performAction('actDirectorOfTradeSpecialEnvoySuccess', {
      orderId: order?.id ?? null,
      openTradeWithChina,
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
