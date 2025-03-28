interface OnEnteringPresidencyTradeFillOrdersArgs extends CommonStateArgs {
  homePortOrderId: string;
  orders: Record<string, JoCoOrder>;
  writers: JocoFamilyMember[];
  numberOfOrdersToFill: number;
}

class PresidencyTradeFillOrders implements State {
  private static instance: PresidencyTradeFillOrders;
  private args: OnEnteringPresidencyTradeFillOrdersArgs;
  private spend: number;
  private filledOrders: Record<string, string>; // orderId / familyMemberId or 'filled' if not available
  private board: Board;

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
    this.filledOrders = {};
    this.board = Board.getInstance();
    // this.spend = args.proposal || 0;
    // this.selectedRegionIds = [this.args.options.homeRegionId];
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
    console.log('initital', this.filledOrders);
    clearPossible();

    const numberOfFilledOrders = Object.keys(this.filledOrders).length;
    if (numberOfFilledOrders === this.args.numberOfOrdersToFill) {
      this.updateIntefaceConfirm();
      return;
    }

    const placedWriters = Object.values(this.filledOrders);
    const availableWriters = this.args.writers.filter(
      (writer) => !placedWriters.includes(writer.id)
    );

    if (availableWriters.length === 0) {
      this.updateInterfaceSelectOrder();
    }

    updatePageTitle(_('Fill orders: ${you} must select a a writer'));

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

    console.log('available', this.getAvailableOrderIds());

    this.getAvailableOrderIds().forEach((orderId) => {
      onClick(this.board.ui.orders[orderId], async () => {
        this.filledOrders[orderId] = writer?.id || FILLED;
        if (writer) {
          console.log('writer');
          await this.board.moveFamilyMemberBetweenLocations(writer, orderId);
        } else {
          console.log('else');
          this.board.ui.orders[orderId].setAttribute('data-status', FILLED);
        }
        this.updateInterfaceInitialStep();
      });
    });
    // Object.values(this.args.writers).forEach((writer: JocoFamilyMember) => {
    //   onClick(this.board.ui.familyMembers[writer.id], () => {
    //     this.filledOrders[orderId] = writer.id;
    //     this.updateInterfaceInitialStep();
    //   });
    // });

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
    const filledOrderIds = Object.keys(this.filledOrders);
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
    for (let [orderId, filledBy] of Object.entries(this.filledOrders)) {
      if (filledBy === FILLED) {
        this.board.ui.orders[orderId].setAttribute('data-status', OPEN);
      } else {
        const writer = this.args.writers.find(
          (writer) => writer.id === filledBy
        );
        writer.location = orderId;
        await this.board.moveFamilyMemberBetweenLocations(
          writer,
          'Writers_Bombay'
        );
      }
    }
    // for (let data of Object.values(this.transfers.writers)) {
    //   await board.moveFamilyMemberBetweenLocations(data.writer, data.from);
    // }
  }

  private performAction(makeCheck: boolean = false) {
    performAction('actPresidencyTradeFillOrders', {
      // selectedRegionIds: this.selectedRegionIds,
      // spend: this.spend,
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
        this.returnPieces();
        this.game.onCancel();
      },
    });
  }
}
