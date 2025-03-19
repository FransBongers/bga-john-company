interface OnEnteringDirectorOfTradeSpecialEnvoySuccessArgs
  extends CommonStateArgs {
  treasury: number;
  proposal: number | null;
}

class DirectorOfTradeSpecialEnvoySuccess implements State {
  private static instance: DirectorOfTradeSpecialEnvoySuccess;
  private args: OnEnteringDirectorOfTradeSpecialEnvoySuccessArgs;
  private spend: number;

  constructor(private game: GameAlias) {}

  public static create(game: JohnCompany) {
    DirectorOfTradeSpecialEnvoySuccess.instance =
      new DirectorOfTradeSpecialEnvoySuccess(game);
  }

  public static getInstance() {
    return DirectorOfTradeSpecialEnvoySuccess.instance;
  }

  onEnteringState(args: OnEnteringDirectorOfTradeSpecialEnvoySuccessArgs) {
    debug('Entering DirectorOfTradeSpecialEnvoySuccess state');
    this.args = args;
    this.spend = args.proposal || 0;
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving DirectorOfTradeSpecialEnvoySuccess state');
  }

  setDescription(
    activePlayerIds: number,
    args: OnEnteringDirectorOfTradeSpecialEnvoyArgs
  ) {
    updatePageTitle(
      _(
        '${tkn_playerName} may open trade with China or may open a closed order'
      ),
      {
        tkn_playerName: getPlayerName(activePlayerIds[0]),
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

    const available = this.args.treasury - this.spend;

    updatePageTitle(
      _('${you} may open trade with China or may open a closed order'),
      {}
    );

    // addCancelButton();
  }

  private updateIntefaceConfirm() {
    clearPossible();

    updatePageTitle(_('Special Envoy: make a check with ${number} dice?'), {
      number: this.spend,
    });

    addConfirmButton(() => this.performAction(true));
    addCancelButton();
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private performAction(makeCheck: boolean = false) {
    performAction('actDirectorOfTradeSpecialEnvoySuccess', {
      spend: this.spend,
      makeCheck,
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
