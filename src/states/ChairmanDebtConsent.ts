interface OnEnteringChairmanDebtConsentArgs extends CommonStateArgs {
  chairmanPlayerId: number;
  debt: number;
  remainingVotesRequired: number;
}

class ChairmanDebtConsent implements State {
  private static instance: ChairmanDebtConsent;
  private args: OnEnteringChairmanDebtConsentArgs;

  constructor(private game: GameAlias) {}

  public static create(game: JohnCompany) {
    ChairmanDebtConsent.instance = new ChairmanDebtConsent(game);
  }

  public static getInstance() {
    return ChairmanDebtConsent.instance;
  }

  onEnteringState(args: OnEnteringChairmanDebtConsentArgs) {
    debug('Entering ChairmanDebtConsent state');
    this.args = args;

    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving ChairmanDebtConsent state');
  }

  setDescription(
    activePlayerIds: number,
    args: OnEnteringChairmanDebtConsentArgs
  ) {
    this.args = args;
    updatePageTitle(
      _('Other players may give consent to increase Company Debt to ${value}'),
      {
        value: this.args.debt,
      }
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
        '${tkn_playerName} asks for your consent to increase Company Debt to ${value} (${required} more ${tkn_icon} required)'
      ),
      {
        value: this.args.debt,
        tkn_playerName: getPlayerName(this.args.chairmanPlayerId),
        required: this.args.remainingVotesRequired,
        tkn_icon: SHARE,
      }
    );
    setSelected(
      Board.getInstance().selectBoxes[`companyDebt_${this.args.debt}`]
    );
    addPrimaryActionButton({
      id: 'yay_btn',
      text: 'Yay',
      callback: () => this.performAction(true),
    });
    addDangerActionButton({
      id: 'nay_btn',
      text: 'Nay',
      callback: () => this.performAction(false),
    });
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private performAction(yay: boolean) {
    performAction('actChairmanDebtConsent', {
      consent: yay,
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
