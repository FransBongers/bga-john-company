interface OnEnteringCrownManagerOfShippingPlaceShipsArgs
  extends CommonStateArgs {
  seaZone: string;
  ships: JocoShipBase[];
}

class CrownManagerOfShippingPlaceShips implements State {
  private static instance: CrownManagerOfShippingPlaceShips;
  private args: OnEnteringCrownManagerOfShippingPlaceShipsArgs;

  constructor(private game: GameAlias) {}

  public static create(game: JohnCompany) {
    CrownManagerOfShippingPlaceShips.instance =
      new CrownManagerOfShippingPlaceShips(game);
  }

  public static getInstance() {
    return CrownManagerOfShippingPlaceShips.instance;
  }

  onEnteringState(args: OnEnteringCrownManagerOfShippingPlaceShipsArgs) {
    debug('Entering CrownManagerOfShippingPlaceShips state');
    this.args = args;

    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving CrownManagerOfShippingPlaceShips state');
  }

  setDescription(
    activePlayerIds: number,
    args: OnEnteringCrownManagerOfShippingPlaceShipsArgs
  ) {
    updatePageTitle(
      _('${tkn_playerName} must place ships'),
      {
        tkn_playerName: getCrownPlayerName(),
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
      _('${tkn_playerName_crown} wants to place ${shipsLog} in ${seaZone}'),
      {
        seaZone: getSeaName(this.args.seaZone),
        shipsLog: getShipsLog(this.args.ships),
        tkn_playerName_crown: getCrownPlayerName(),
      }
    );

    // const playerId = PlayerManager.getInstance().getCurrentPlayerId();
    // const optionToLeaveTwoUnspent = this.args.optionToLeaveTwoUnspent[playerId];

    // if (optionToLeaveTwoUnspent) {
    //   addSecondaryActionButton({
    //     id: 'buy_ship_btn',
    //     text: formatStringRecursive(
    //       _(
    //         'Pay ${tkn_playerName_crown} ${amount} ${tkn_promiseCube} to leave 2 ${tkn_pound} unspent'
    //       ),
    //       {
    //         amount: 1,
    //         tkn_playerName_crown: getCrownPlayerName(),
    //         tkn_promiseCube: tknPromiseCubes(),
    //         tkn_pound: tknPound(),
    //       }
    //     ),
    //     callback: () =>
    //       performAction('actCrownManagerOfShippingBuyCompanyShips', {
    //         option: BUY_COMPANY_SHIP,
    //       }),
    //   });
    // }

    addPrimaryActionButton({
      id: 'continue_btn',
      text: _('Continue'),
      callback: () =>
        performAction('actCrownManagerOfShippingPlaceShips', {
          continue: true,
        }),
    });
  }

  private updateInterfaceConfirm() {
    clearPossible();

    updatePageTitle(_('Confirm ship placement'));

    addConfirmButton(() => {
      performAction('actCrownManagerOfShippingPlaceShips', {});
    });
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

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
