interface OnEnteringCrownManagerOfShippingUnfittedShipOptionsArgs
  extends CommonStateArgs {
  ship: JocoShipBase;
  location: string;
  options: {
    ships: JocoShipBase[];
    locations: string[];
  };
  phase: 'unfitted' | 'CompanyShip' | 'ExtraShip';
  promiseCubes: Record<number, number>;

}

class CrownManagerOfShippingUnfittedShipOptions implements State {
  private static instance: CrownManagerOfShippingUnfittedShipOptions;
  private args: OnEnteringCrownManagerOfShippingUnfittedShipOptionsArgs;
  private ship: JocoShipBase;
  private location: string;

  constructor(private game: GameAlias) {}

  public static create(game: JohnCompany) {
    CrownManagerOfShippingUnfittedShipOptions.instance =
      new CrownManagerOfShippingUnfittedShipOptions(game);
  }

  public static getInstance() {
    return CrownManagerOfShippingUnfittedShipOptions.instance;
  }

  onEnteringState(args: OnEnteringCrownManagerOfShippingUnfittedShipOptionsArgs) {
    debug('Entering CrownManagerOfShippingUnfittedShipOptions state');
    this.args = args;
    this.location = args.location;
    this.ship = args.ship;

    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving CrownManagerOfShippingUnfittedShipOptions state');
  }

  setDescription(
    activePlayerIds: number,
    args: OnEnteringCrownManagerOfShippingUnfittedShipOptionsArgs
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

    this.updatePageTitle();

    if (this.args.ship.id === this.ship.id && this.args.options.ships.length > 0) {
      addPrimaryActionButton({
        id: 'fit_ship_btn',
        text: _('Pay to fit a ship'),
        callback: () => this.updateInterfaceSelectShip(),
      })
    }

  if (true) {
    addPrimaryActionButton({
      id: 'choose_location_btn',
      text: _('Choose Sea Zone'),
      callback: () => this.updateInterfaceSelectSeaZone()
    })
  }
  }

  private updateInterfaceSelectShip()
  {
    this.game.clearPossible();
    updatePageTitle(_('${you} must select a ship to fit'));

    addCancelButton();
  }

  private updateInterfaceSelectSeaZone() {
    clearPossible();

    const board = Board.getInstance();

    updatePageTitle(_('${you} must select a sea zone'));

    // SEA_ZONES.forEach((seaZone) => {
    //   onClick(board.ui.selectBoxes[seaZone], async () => {
    //     ship.location = seaZone;
    //     let fromElt = undefined;
    //     clearPossible();
    //     if (playerId) {
    //       // Player Ship
    //       this.placedPlayerShips[ship.id] = seaZone;
    //       const player = PlayerManager.getInstance().getPlayer(playerId);
    //       player.counters[SHIPS_COUNTER].incValue(-1);
    //       fromElt = player.ui[SHIPS_COUNTER];
    //       this.pay(3);
    //     } else if (ship.type === EXTRA_SHIP) {
    //       ship = board.updateOtherShip(ship, EXTRA_SHIP);
    //       this.placedExtraShips[ship.id] = seaZone;
    //       this.pay(2);
    //     } else {
    //       // Company ship
    //       ship = board.updateOtherShip(ship, COMPANY_SHIP);
    //       this.placedCompanyShips[ship.id] = seaZone;
    //       this.pay(5);
    //     }

    //     await board.placeShip(ship, fromElt);
    //     this.updateInterfaceInitialStep();
    //   });
    // });
  }

  private updateInterfaceConfirm() {
    clearPossible();

    updatePageTitle(_('Confirm ship placement'));

    addConfirmButton(() => {
      performAction('actCrownManagerOfShippingUnfittedShipOptions', {});
    });
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private updatePageTitle() {
    let text = '';
    switch (this.args.phase) {
      case UNFITTED:
        text = _(
          '${tkn_playerName_crown} wants to fit ${tkn_ship} and place it in ${location}'
        );
        break;
      case COMPANY_SHIP:
        text = _(
          '${tkn_playerName_crown} wants to fit ${tkn_ship} and place it in ${location}'
        );
        break;
      case EXTRA_SHIP:
        text = _(
          '${tkn_playerName_crown} wants to fit ${tkn_ship} and place it in ${location}'
        );
        break;
      default:
        throw new Error('Unknown phase');
    }
    const type = this.args.phase === UNFITTED ? this.args.ship.type : this.args.phase;
    updatePageTitle(text, {
      tkn_playerName_crown: getCrownPlayerName(),
      tkn_ship: tknShipValue({
        type,
        name: _(this.args.ship.name),
        fatigued: 0,
      }),
      location: getSeaName(this.args.location)
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
