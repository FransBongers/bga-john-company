interface OnEnteringDirectorOfTradeTransfersArgs extends CommonStateArgs {
  options: {
    ships: Record<
      string,
      {
        ship: JocoShipBase;
        locations: string[];
      }
    >;
    writers: Record<
      string,
      {
        familyMember: JocoFamilyMember;
        locations: string[];
      }
    >;
  };
  transfers: {
    ships: Record<string, { ship: JocoShipBase; from: string; to: string }>;
    writers: Record<
      string,
      { writer: JocoFamilyMember; from: string; to: string }
    >;
  } | null;
}

class DirectorOfTradeTransfers implements State {
  private static instance: DirectorOfTradeTransfers;
  private args: OnEnteringDirectorOfTradeTransfersArgs;
  private transfers: {
    ships: Record<string, { ship: JocoShipBase; from: string; to: string }>;
    writers: Record<
      string,
      { writer: JocoFamilyMember; from: string; to: string }
    >;
  };

  constructor(private game: GameAlias) {}

  public static create(game: JohnCompany) {
    DirectorOfTradeTransfers.instance = new DirectorOfTradeTransfers(game);
  }

  public static getInstance() {
    return DirectorOfTradeTransfers.instance;
  }

  onEnteringState(args: OnEnteringDirectorOfTradeTransfersArgs) {
    debug('Entering DirectorOfTradeTransfers state');
    this.args = args;
    this.transfers = args.transfers ?? {
      ships: {},
      writers: {},
    };
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving DirectorOfTradeTransfers state');
  }

  setDescription(
    activePlayerIds: number,
    args: OnEnteringDirectorOfTradeTransfersArgs
  ) {
    updatePageTitle(
      _('${tkn_playerName} may move writers or ships'),
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

    const transferCount = this.getTransferCount();
    if (transferCount === 2) {
      this.updateInterfaceConfirm();
      return;
    }

    updatePageTitle(
      _('${you} may make up to two transfers (${number} remaining)'),
      {
        number: 2 - this.getTransferCount(),
      }
    );
    const board = Board.getInstance();
    Object.entries(this.args.options.writers).forEach(([id, data]) =>
      onClick(board.ui.familyMembers[id], () =>
        this.updateInterfaceSelectPresidency(data)
      )
    );

    Object.entries(this.args.options.ships).forEach(([id, data]) =>
      onClick(board.ui.ships[id], () => this.updateInterfaceSelectSeaZone(data))
    );

    if (this.getTransferCount() > 0) {
      addPrimaryActionButton({
        id: 'done_btn',
        text: _('Done'),
        callback: () => this.updateInterfaceConfirm(),
      });
      this.addCancelButton();
    } else {
      addPassButton(this.args.optionalAction);
    }
  }

  private updateInterfaceSelectPresidency({
    familyMember: writer,
    locations,
  }: {
    familyMember: JocoFamilyMember;
    locations: string[];
  }) {
    clearPossible();
    const board = Board.getInstance();
    setSelected(board.ui.familyMembers[writer.id]);

    locations.forEach((newLocation) => {
      onClick(board.ui.selectBoxes[newLocation], async () => {
        this.transfers.writers[writer.id] = {
          writer,
          from: writer.location,
          to: newLocation,
        };
        await board.moveFamilyMemberBetweenLocations(writer, newLocation);
        this.updateInterfaceInitialStep();
      });
    });

    this.addCancelButton();
  }

  private updateInterfaceSelectSeaZone({
    ship,
    locations,
  }: {
    ship: JocoShipBase;
    locations: string[];
  }) {
    clearPossible();
    const board = Board.getInstance();
    setSelected(board.ui.ships[ship.id]);

    locations.forEach((seaZone) => {
      onClick(board.ui.selectBoxes[seaZone], async () => {
        clearPossible();
        const from = ship.location;
        ship.location = seaZone;
        this.transfers.ships[ship.id] = {
          from,
          to: seaZone,
          ship,
        };
        await board.moveShip({ ship, from });
        this.updateInterfaceInitialStep();
      });
    });
    this.addCancelButton();
  }

  private updateInterfaceConfirm() {
    clearPossible();
    updatePageTitle(_('Confirm transfers'));

    addConfirmButton(() => {
      performAction('actDirectorOfTradeTransfers', {
        transfers: this.transfers,
      });
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

  private getTransferCount() {
    return (
      Object.keys(this.transfers.ships).length +
      Object.keys(this.transfers.writers).length
    );
  }

  private async returnPieces() {
    const board = Board.getInstance();

    for (let data of Object.values(this.transfers.ships)) {
      data.ship.location = data.from;
      await board.moveShip({ ship: data.ship, from: data.to });
    }
    for (let data of Object.values(this.transfers.writers)) {
      await board.moveFamilyMemberBetweenLocations(data.writer, data.from);
    }
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
