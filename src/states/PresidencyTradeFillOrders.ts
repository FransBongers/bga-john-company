interface OnEnteringPresidencyTradeFillOrdersArgs extends CommonStateArgs {
  homePortOrderId: string;
  companyBalance: number;
  orders: Record<string, JoCoOrder>;
  writers: JocoFamilyMember[];
  numberOfOrdersToFill: number;
}

class PresidencyTradeFillOrders implements State {
  private static instance: PresidencyTradeFillOrders;
  private args: OnEnteringPresidencyTradeFillOrdersArgs;
  private filledOrders: Array<{ orderId: string; filledBy: string }>; // orderId / familyMemberId or 'filled' if not available
  private board: Board;
  private balance: number;

  constructor(private game: GameAlias) {}

  public static create(game: JohnCompany) {
    PresidencyTradeFillOrders.instance = new PresidencyTradeFillOrders(game);
  }

  public static getInstance() {
    return PresidencyTradeFillOrders.instance;
  }

  onEnteringState(args: OnEnteringPresidencyTradeFillOrdersArgs) {
    debug('Entering PresidencyTradeFillOrders state');
    this.args = args;
    this.filledOrders = [];
    this.board = Board.getInstance();
    this.balance = this.args.companyBalance;
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving PresidencyTradeFillOrders state');
  }

  setDescription(
    activePlayerIds: number,
    args: OnEnteringPresidencyTradeFillOrdersArgs
  ) {
    updatePageTitle(
      _('${tkn_playerName} must fill orders'),
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

  /**
   * 1. Determine orders remaining
   *  => if not to confirm
   * 2. Check if there are writers to place
   *  => if not continue to select order
   *  => else select writer
   * 3. select order
   * back to 1.
   */
  private updateInterfaceInitialStep() {
    clearPossible();

    const numberOfFilledOrders = this.filledOrders.length;
    if (numberOfFilledOrders === this.args.numberOfOrdersToFill) {
      this.updateIntefaceConfirm();
      return;
    }

    const placedWriters = this.filledOrders.map(
      (filledOrder) => filledOrder.filledBy
    );

    const availableWriters = this.args.writers.filter(
      (writer) => !placedWriters.includes(writer.id)
    );

    if (availableWriters.length === 0) {
      this.updateInterfaceSelectOrder();
      return;
    }

    updatePageTitle(_('Fill orders: ${you} must select a writer'));

    availableWriters.forEach((writer) => {
      onClick(this.board.ui.familyMembers[writer.id], () => {
        this.updateInterfaceSelectOrder(writer);
      });
    });

    if (numberOfFilledOrders > 0) {
      this.addCancelButton();
    }
  }

  private updateInterfaceSelectOrder(writer?: JocoFamilyMember) {
    clearPossible();

    if (writer) {
      setSelected(this.board.ui.familyMembers[writer.id]);
    }

    updatePageTitle(_('Fill orders: ${you} must select an order'));

    this.getAvailableOrderIds().forEach((orderId) => {
      onClick(this.board.ui.orders[orderId], async () => {
        this.filledOrders.push({ orderId, filledBy: writer?.id || FILLED });
        const promises: Promise<void>[] = [];
        const order = StaticData.get().order(orderId);
        // TODO: half values when using firms and already filled
        this.balance += order.value;
        if (writer) {
          promises.push(
            this.board.moveFamilyMemberBetweenLocations(writer, orderId)
          );
        } else {
          this.board.ui.orders[orderId].setAttribute('data-status', FILLED);
        }
        promises.push(this.board.movePawn('balance', this.balance));
        await Promise.all(promises);
        this.updateInterfaceInitialStep();
      });
    });

    this.addCancelButton();
  }

  private updateIntefaceConfirm() {
    clearPossible();

    updatePageTitle(_('Fill orders: confirm?'));

    addConfirmButton(() => this.performAction(true));
    this.addCancelButton();
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private getAvailableOrderIds() {
    const filledOrderIds = this.filledOrders.map((filledOrder) => filledOrder.orderId);
    if (filledOrderIds.length === 0) {
      // No orders selected yet
      return [this.args.homePortOrderId];
    }

    const staticData = StaticData.get();

    const orderIds = [];
    Object.values(this.args.orders).forEach((order) => {
      if (filledOrderIds.includes(order.id)) {
        return;
      }
      const staticOrder = staticData.order(order.id);
      const connectedOrderHasBeenFilled = filledOrderIds.some((orderId) =>
        staticOrder.connectedOrders.includes(orderId)
      );
      if (connectedOrderHasBeenFilled && !orderIds.includes(order.id)) {
        orderIds.push(order.id);
      }
    });
    return orderIds;
  }

  private async returnPieces() {
    for (let {orderId, filledBy} of this.filledOrders) {
      const promises: Promise<void>[] = [];
      if (filledBy === FILLED) {
        this.board.ui.orders[orderId].setAttribute('data-status', OPEN);
      } else {
        const writer = this.args.writers.find(
          (writer) => writer.id === filledBy
        );
        writer.location = orderId;
        promises.push(
          this.board.moveFamilyMemberBetweenLocations(writer, 'Writers_Bombay')
        );
      }
      this.balance = this.balance - StaticData.get().order(orderId).value;
      promises.push(this.board.movePawn('balance', this.balance));
      await Promise.all(promises);
    }
  }

  private performAction(makeCheck: boolean = false) {
    performAction('actPresidencyTradeFillOrders', {
      filledOrders: this.filledOrders,
      // makeCheck,
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

  private addCancelButton() {
    addDangerActionButton({
      id: 'cancel_btn',
      text: _('Cancel'),
      callback: async () => {
        await this.returnPieces();
        this.game.onCancel();
      },
    });
  }
}
