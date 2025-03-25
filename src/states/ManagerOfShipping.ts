interface OnEnteringManagerOfShippingArgs extends CommonStateArgs {
  playerShips: JocoShipBase[];
  otherShips: JocoShipBase[];
  treasury: number;
}

class ManagerOfShipping implements State {
  private static instance: ManagerOfShipping;
  private args: OnEnteringManagerOfShippingArgs;
  private placedCompanyShips: Record<string, string>;
  private placedExtraShips: Record<string, string>;
  private placedPlayerShips: Record<string, string>;
  private treasury: number;

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
    this.placedCompanyShips = {};
    this.placedExtraShips = {};
    this.placedPlayerShips = {};
    this.treasury = this.args.treasury;

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

    if (this.treasury < 2) {
      this.updateInterfaceConfirm();
      return;
    }

    updatePageTitle(
      _('${you} may fit, buy and lease ships (£${amount} remaining)'),
      { amount: this.treasury }
    );
    const board = Board.getInstance();

    let playerShipsAvailable = false;

    this.args.playerShips.forEach((ship) => {
      const { id, type, name, fatigued, owner: playerId } = ship;
      if (this.placedPlayerShips[ship.id] || this.treasury < 3) {
        return;
      }
      playerShipsAvailable = true;
      addPlayerButton({
        id: `${ship.id}_btn`,
        text: formatStringRecursive(_('Fit ${tkn_ship}'), {
          tkn_ship: tknShipValue({ type, name, fatigued }),
        }),
        playerId,
        callback: () => {
          this.updateInterfaceSelectSeaZone(ship, playerId);
        },
      });
    });
    if (this.treasury >= 2) {
      addSecondaryActionButton({
        id: 'extraShip_btn',
        text: formatStringRecursive(_('Lease ${tkn_ship}'), {
          tkn_ship: tknShipValue({
            type: EXTRA_SHIP,
            name: _('Extra Ship'),
            fatigued: 0,
          }),
        }),
        callback: () => {
          const ship = this.args.otherShips.pop();
          ship.type = EXTRA_SHIP;
          this.updateInterfaceSelectSeaZone(ship);
        },
      });
    }
    if (!playerShipsAvailable && this.treasury >= 5) {
      addSecondaryActionButton({
        id: 'companyShip_btn',
        text: formatStringRecursive(_('Buy ${tkn_ship}'), {
          tkn_ship: tknShipValue({
            type: COMPANY_SHIP,
            name: _('Company Ship'),
            fatigued: 0,
          }),
        }),
        callback: () => {
          const ship = this.args.otherShips.pop();
          ship.type = COMPANY_SHIP;
          this.updateInterfaceSelectSeaZone(ship);
        },
      });
    }

    if (this.treasury === 2) {
      addPrimaryActionButton({
        id: 'done_btn',
        text: _('Done'),
        callback: () => this.updateInterfaceConfirm(),
      });
    }
    if (
      Object.keys(this.placedPlayerShips).length > 0 ||
      Object.keys(this.placedExtraShips).length > 0 ||
      Object.keys(this.placedCompanyShips).length > 0
    ) {
      this.addCancelButton();
    }
  }

  private updateInterfaceSelectSeaZone(ship: JocoShipBase, playerId?: number) {
    clearPossible();

    const board = Board.getInstance();

    updatePageTitle(_('${you} must select a sea zone'));

    SEA_ZONES.forEach((seaZone) => {
      onClick(board.selectBoxes[seaZone], async () => {
        ship.location = seaZone;
        let fromElt = undefined;
        clearPossible();
        if (playerId) {
          // Player Ship
          this.placedPlayerShips[ship.id] = seaZone;
          const player = PlayerManager.getInstance().getPlayer(playerId);
          player.counters[SHIPS_COUNTER].incValue(-1);
          fromElt = player.ui[SHIPS_COUNTER];
          this.pay(3);
        } else if (ship.type === EXTRA_SHIP) {
          ship = board.updateOtherShip(ship, EXTRA_SHIP);
          this.placedExtraShips[ship.id] = seaZone;
          this.pay(2);
        } else {
          // Company ship
          ship = board.updateOtherShip(ship, COMPANY_SHIP);
          this.placedCompanyShips[ship.id] = seaZone;
          this.pay(5);
        }

        await board.placeShip(ship, fromElt);
        this.updateInterfaceInitialStep();
      });
    });

    this.addCancelButton();
  }

  private updateInterfaceConfirm() {
    clearPossible();

    updatePageTitle(_('Confirm ship placement'));

    addConfirmButton(() => {
      performAction('actManagerOfShipping', {
        playerShips: this.placedPlayerShips,
        extraShips: this.placedExtraShips,
        companyShips: this.placedCompanyShips,
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

  private async returnPieces() {
    const board = Board.getInstance();

    [
      this.placedCompanyShips,
      this.placedExtraShips,
      this.placedPlayerShips,
    ].forEach((category) => {
      Object.entries(category).forEach(([shipId, seaZone]) => {
        board.removeShip(shipId, seaZone);
      });
    });
  }

  private async pay(amount: number) {
    this.treasury -= amount;
    Board.getInstance().treasuries[MANAGER_OF_SHIPPING].toValue(this.treasury);
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
