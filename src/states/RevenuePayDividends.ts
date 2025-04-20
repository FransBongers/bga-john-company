interface OnEnteringRevenuePayDividendsArgs extends CommonStateArgs {
  costPerDividend: number;
  maxNumberOfDividends: number;
}

class RevenuePayDividends implements State {
  private static instance: RevenuePayDividends;
  private args: OnEnteringRevenuePayDividendsArgs;
  private selectedNumberOfDividends: number;

  constructor(private game: GameAlias) {}

  public static create(game: JohnCompany) {
    RevenuePayDividends.instance = new RevenuePayDividends(game);
  }

  public static getInstance() {
    return RevenuePayDividends.instance;
  }

  onEnteringState(args: OnEnteringRevenuePayDividendsArgs) {
    debug('Entering RevenuePayDividends state');
    this.args = args;
    this.selectedNumberOfDividends = 0;
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving RevenuePayDividends state');
  }

  setDescription(
    activePlayerIds: number,
    args: OnEnteringRevenuePayDividendsArgs
  ) {
    updatePageTitle(
      _('${tkn_playerName} may pay dividends'),
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
      _(
        '${you} may pay up to ${maxNumber} dividends for ${amount} ${tkn_pound} each'
      ),
      {
        maxNumber: this.args.maxNumberOfDividends,
        amount: this.args.costPerDividend,
        tkn_pound: 'pound',
      }
    );

    addSecondaryActionButton({
      id: 'minus_btn',
      text: '-',
      callback: () => {
        this.selectedNumberOfDividends--;
        this.updateInterfaceInitialStep();
      },
      extraClasses: this.selectedNumberOfDividends === 0 ? DISABLED : '',
    });

    addSecondaryActionButton({
      id: 'plus_btn',
      text: '+',
      callback: () => {
        this.selectedNumberOfDividends++;
        this.updateInterfaceInitialStep();
      },
      extraClasses:
        this.selectedNumberOfDividends === this.args.maxNumberOfDividends
          ? DISABLED
          : '',
    });

    addPrimaryActionButton({
      id: 'make_check_btn',
      text: formatStringRecursive(_('Pay ${number} dividend(s)'), {
        number: this.selectedNumberOfDividends,
      }),
      callback: () => this.updateInterfaceConfirm(),
    });

    addCancelButton({
      extraClasses: this.selectedNumberOfDividends === 0 ? DISABLED : '',
    });
  }

  private updateInterfaceConfirm() {
    clearPossible();

    if (this.selectedNumberOfDividends === 0) {
      updatePageTitle(_('Do not pay any dividends?'));
    } else {
      updatePageTitle(
        this.selectedNumberOfDividends === 1
          ? _('Spend ${amount} ${tkn_pound} to pay ${number} dividend?')
          : _('Spend ${amount} ${tkn_pound} to pay ${number} dividends?'),
        {
          number: this.selectedNumberOfDividends,
          amount: this.args.costPerDividend * this.selectedNumberOfDividends,
          tkn_pound: 'pound',
        }
      );
    }

    addConfirmButton(() => {
      performAction('actRevenuePayDividends', {
        numberOfDividends: this.selectedNumberOfDividends,
      });
    });
    addCancelButton();
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
