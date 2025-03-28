interface OnEnteringMilitaryAffairsTransfersArgs extends CommonStateArgs {
  options: {
    officers: Record<
      string,
      { familyMember: JocoFamilyMember; locations: string[] }
    >;
    regiments: Record<
      string,
      { regiment: JocoArmyPieceBase; locations: string[] }
    >;
  };
  transfers: {
    regiments: Record<
      string,
      { regiment: JocoArmyPieceBase; from: string; to: string }
    >;
    officers: Record<
      string,
      { officer: JocoFamilyMember; from: string; to: string }
    >;
  } | null;
}

class MilitaryAffairsTransfers implements State {
  private static instance: MilitaryAffairsTransfers;
  private args: OnEnteringMilitaryAffairsTransfersArgs;
  private transfers: {
    regiments: Record<
      string,
      { regiment: JocoArmyPieceBase; from: string; to: string }
    >;
    officers: Record<
      string,
      { officer: JocoFamilyMember; from: string; to: string }
    >;
  };

  constructor(private game: GameAlias) {}

  public static create(game: JohnCompany) {
    MilitaryAffairsTransfers.instance = new MilitaryAffairsTransfers(game);
  }

  public static getInstance() {
    return MilitaryAffairsTransfers.instance;
  }

  onEnteringState(args: OnEnteringMilitaryAffairsTransfersArgs) {
    debug('Entering MilitaryAffairsTransfers state');
    this.args = args;
    this.transfers = args.transfers ?? {
      officers: {},
      regiments: {},
    };
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving MilitaryAffairsTransfers state');
  }

  setDescription(
    activePlayerIds: number,
    args: OnEnteringMilitaryAffairsTransfersArgs
  ) {
    updatePageTitle(
      _('${tkn_playerName} may make Army transfers'),
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
      _('${you} may make up to two Army transfers (${number} remaining)'),
      {
        number: 2 - this.getTransferCount(),
      }
    );
    const board = Board.getInstance();
    Object.entries(this.args.options.regiments).forEach(([id, data]) => {
      if (this.transfers.regiments[id]) {
        return;
      }
      onClick(board.ui.armyPieces[id], () =>
        this.updateInterfaceSelectArmyForRegiment(data)
      );
    });

    // Object.entries(this.args.options.ships).forEach(([id, data]) =>
    //   onClick(board.ships[id], () => this.updateInterfaceSelectSeaZone(data))
    // );

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

  private updateInterfaceSelectArmyForRegiment({
    regiment,
    locations,
  }: {
    regiment: JocoArmyPieceBase;
    locations: string[];
  }) {
    clearPossible();
    const board = Board.getInstance();

    setSelected(board.ui.armyPieces[regiment.id]);

    locations.forEach((to) => {
      onClick(board.ui.selectBoxes[to], async () => {
        const from = regiment.location;
        this.transfers.regiments[regiment.id] = {
          regiment,
          from,
          to,
        };
        regiment.location = to;
        clearPossible();
        await board.moveRegimentBetweenArmies(regiment, from);
        this.updateInterfaceInitialStep();
      });
    });

    this.addCancelButton();
  }

  // private updateInterfaceSelectSeaZone({
  //   ship,
  //   locations,
  // }: {
  //   ship: JocoShipBase;
  //   locations: string[];
  // }) {
  //   clearPossible();
  //   const board = Board.getInstance();
  //   setSelected(board.ships[ship.id]);

  //   locations.forEach((seaZone) => {
  //     onClick(board.selectBoxes[seaZone], async () => {
  //       clearPossible();
  //       const from = ship.location;
  //       ship.location = seaZone;
  //       this.transfers.ships[ship.id] = {
  //         from,
  //         to: seaZone,
  //         ship,
  //       };
  //       await board.moveShip({ ship, from });
  //       this.updateInterfaceInitialStep();
  //     });
  //   });
  //   this.addCancelButton();
  // }

  private updateInterfaceConfirm() {
    clearPossible();
    updatePageTitle(_('Confirm transfers'));

    addConfirmButton(() => {
      performAction('actMilitaryAffairsTransfers', {
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
      Object.keys(this.transfers.officers).length +
      Object.keys(this.transfers.regiments).length
    );
  }



  private async returnPieces() {
    const board = Board.getInstance();

    for (let data of Object.values(this.transfers.regiments)) {
      data.regiment.location = data.from;
      await board.moveRegimentBetweenArmies(data.regiment, data.to);
    }
    // for (let data of Object.values(this.transfers.writers)) {
    //   data.writer.location = data.from;
    //   await board.moveFamilyMemberBetweenLocations(data.writer, data.to);
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
