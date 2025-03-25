interface OnEnteringDirectorOfTradeSpecialEnvoySuccessArgs
  extends CommonStateArgs {
  closedOrders: JoCoOrder[];
}

class DirectorOfTradeSpecialEnvoySuccess implements State {
  private static instance: DirectorOfTradeSpecialEnvoySuccess;
  private args: OnEnteringDirectorOfTradeSpecialEnvoySuccessArgs;

  constructor(private game: GameAlias) {}

  public static create(game: JohnCompany) {
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
    args: OnEnteringDirectorOfTradeSpecialEnvoyArgs
  ) {
    updatePageTitle(
      _(
        '${tkn_playerName} may open trade with China or may open a closed order'
      ),
      {
        tkn_playerName: getPlayerName(activePlayerIds[0]),
      },
      true
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

    updatePageTitle(
      _('${you} may open trade with China or may open a closed order')
    );
    const board = Board.getInstance();
    this.args.closedOrders.forEach((order) => {
      onClick(board.orders[order.id], () => this.updateIntefaceConfirm(order))
      
    })

    // addCancelButton();
  }

  private updateIntefaceConfirm(order: JoCoOrder) {
    clearPossible();

    updatePageTitle(_('Open closed order in ${region}?'), {
      region: _(order.location),
    });
    setSelected(Board.getInstance().orders[order.id]);

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

  private performAction(order: JoCoOrder, perform: boolean = false) {
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
