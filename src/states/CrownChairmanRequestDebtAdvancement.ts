interface OnEnteringCrownChairmanRequestDebtAdvancementArgs
  extends CommonStateArgs {
  additionalAdvancement: {
    cost: number;
    possible: boolean;
    playerCanPay: Record<number, boolean>;
  };
  oneLessAdvancement: {
    cost: number;
    possible: boolean;
    playerCanPay: Record<number, boolean>;
  };
  currentDebt: number;
  newDebt: number;
}

class CrownChairmanRequestDebtAdvancement implements State {
  private static instance: CrownChairmanRequestDebtAdvancement;
  private args: OnEnteringCrownChairmanRequestDebtAdvancementArgs;
  private ship: JocoShipBase;
  private location: string;

  constructor(private game: GameAlias) {}

  public static create(game: JohnCompany) {
    CrownChairmanRequestDebtAdvancement.instance =
      new CrownChairmanRequestDebtAdvancement(game);
  }

  public static getInstance() {
    return CrownChairmanRequestDebtAdvancement.instance;
  }

  onEnteringState(args: OnEnteringCrownChairmanRequestDebtAdvancementArgs) {
    debug('Entering CrownChairmanRequestDebtAdvancement state');
    this.args = args;

    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving CrownChairmanRequestDebtAdvancement state');
  }

  setDescription(
    activePlayerIds: number,
    args: OnEnteringCrownChairmanRequestDebtAdvancementArgs
  ) {
    updatePageTitle(
      _('${tkn_playerName} may fit ships'),
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

    this.updatePageTitle();

    const playerId = PlayerManager.getInstance().getCurrentPlayerId();

    if (this.args.oneLessAdvancement.possible) {
      addSecondaryActionButton({
        id: 'one_less_btn',
        text: formatStringRecursive(
          _(
            'Pay ${amount} ${tkn_promiseCube} for -1 Debt'
          ),
          {
            amount: this.args.oneLessAdvancement.cost,
            tkn_promiseCube: tknPromiseCubes(),
          }
        ),
        extraClasses: !this.args.oneLessAdvancement.playerCanPay[playerId]
          ? DISABLED
          : '',
        callback: () =>
          performAction('actCrownChairmanRequestDebtAdvancement', {
            continue: false,
            oneLessAdvancement: true,
            additionalAdvancement: false,
          }),
      });
    }
    if (this.args.additionalAdvancement.possible) {
      addSecondaryActionButton({
        id: 'additional_btn',
        text: formatStringRecursive(
          _(
            'Pay ${amount} ${tkn_promiseCube} for +1 Debt'
          ),
          {
            amount: this.args.additionalAdvancement.cost,
            tkn_promiseCube: tknPromiseCubes(),
          }
        ),
        extraClasses: !this.args.additionalAdvancement.playerCanPay[playerId]
          ? DISABLED
          : '',
        callback: () =>
          performAction('actCrownChairmanRequestDebtAdvancement', {
            continue: false,
            oneLessAdvancement: false,
            additionalAdvancement: true,
          }),
      });
    }

    addPrimaryActionButton({
      id: 'continue_btn',
      text: _('Continue'),
      callback: () =>
        performAction('actCrownChairmanRequestDebtAdvancement', {
          continue: true,
          oneLessAdvancement: false,
          additionalAdvancement: false,
        }),
    });
  }

  private updateInterfaceConfirm() {
    clearPossible();

    updatePageTitle(_('Confirm ship placement'));

    addConfirmButton(() => {
      performAction('actCrownChairmanRequestDebtAdvancement', {});
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
    if (this.args.currentDebt === this.args.newDebt) {
      updatePageTitle(
        _('${tkn_playerName} does not want to advance the Debt marker'),
        {
          tkn_playerName: getCrownPlayerName(),
        }
      );
    } else {
      updatePageTitle(
        _('${tkn_playerName} wants to increase Company Debt to ${tkn_boldText_debtValue}'),
        {
          tkn_playerName: getCrownPlayerName(),
          tkn_boldText_debtValue: this.args.newDebt,
        }
      );
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
}
