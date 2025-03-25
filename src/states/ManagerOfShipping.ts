interface OnEnteringManagerOfShippingArgs extends CommonStateArgs {}

class ManagerOfShipping implements State {
  private static instance: ManagerOfShipping;
  private args: OnEnteringManagerOfShippingArgs;
  // private transfers: {
  //   ships: Record<string, { ship: JocoShipBase; from: string; to: string }>;
  //   writers: Record<
  //     string,
  //     { writer: JocoFamilyMember; from: string; to: string }
  //   >;
  // };

  constructor(private game: GameAlias) {}

  public static create(game: JohnCompany) {
    ManagerOfShipping.instance = new ManagerOfShipping(game);
  }

  public static getInstance() {
    return ManagerOfShipping.instance;
  }

  onEnteringState(args: OnEnteringManagerOfShippingArgs) {
    debug('Entering ManagerOfShipping state');
    this.args = args;
    // this.transfers = args.transfers ?? {
    //   ships: {},
    //   writers: {},
    // };
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving ManagerOfShipping state');
  }

  setDescription(
    activePlayerIds: number,
    args: OnEnteringManagerOfShippingArgs
  ) {
    updatePageTitle(
      _('${tkn_playerName} may fit, buy and lease ships'),
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

    updatePageTitle(_('${you} may fit, buy and lease or ships'));
    const board = Board.getInstance();

    // if (this.getTransferCount() > 0) {
    //   this.addCancelButton();
    // }
  }

  private updateInterfaceConfirm() {
    updatePageTitle(_('Confirm transfers'));

    addConfirmButton(() => {
      performAction('actManagerOfShipping', {});
    });
    this.addCancelButton();
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private async returnPieces() {
    const board = Board.getInstance();

    // for (let data of Object.values(this.transfers.ships)) {
    //   data.ship.location = data.from;
    //   await board.moveShip({ ship: data.ship, from: data.to });
    // }
    // for (let data of Object.values(this.transfers.writers)) {
    //   data.writer.location = data.from
    //   await board.moveWriter(data.writer, data.to);
    // }
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
