interface OnEnteringDirectorOfTradeSpecialEnvoyArgs extends CommonStateArgs {
  treasury: number;
  proposal: number | null;
}

class DirectorOfTradeSpecialEnvoy implements State {
  private static instance: DirectorOfTradeSpecialEnvoy;
  private args: OnEnteringDirectorOfTradeSpecialEnvoyArgs;
  private spend: number;

  constructor(private game: GameAlias) {}

  public static create(game: JohnCompany) {
    DirectorOfTradeSpecialEnvoy.instance = new DirectorOfTradeSpecialEnvoy(
      game
    );
  }

  public static getInstance() {
    return DirectorOfTradeSpecialEnvoy.instance;
  }

  onEnteringState(args: OnEnteringDirectorOfTradeSpecialEnvoyArgs) {
    debug('Entering DirectorOfTradeSpecialEnvoy state');
    this.args = args;
    this.spend = args.proposal || 0;
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving DirectorOfTradeSpecialEnvoy state');
  }

  setDescription(
    activePlayerIds: number,
    args: OnEnteringDirectorOfTradeSpecialEnvoyArgs
  ) {
    if (args.proposal > 0) {
      updatePageTitle(
        _(
          'Special Envoy: ${tkn_playerName} proposes to spend ${amount} ${tkn_pound} to make a check'
        ),
        {
          tkn_playerName: getPlayerName(activePlayerIds[0]),
          amount: args.proposal,
          tkn_pound: 'pound',
        },
        true
      );
    } else if (args.proposal === 0) {
      updatePageTitle(
        _('Special Envoy: ${tkn_playerName} proposes not to make a check'),
        {
          tkn_playerName: getPlayerName(activePlayerIds[0]),
        },
        true
      );
    } else {
      updatePageTitle(
        _('Special Envoy: ${tkn_playerName} may make a check'),
        {
          tkn_playerName: getPlayerName(activePlayerIds[0]),
        },
        true
      );
    }
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
      _('Special Envoy: ${you} may spend 1 ${tkn_pound} per die'),
      {
        available,
        tkn_pound: 'pound',
      }
    );

    addSecondaryActionButton({
      id: 'minus_btn',
      text: '-',
      callback: () => {
        this.spend--;
        this.updateInterfaceInitialStep();
      },
      extraClasses: this.spend === 0 ? DISABLED : '',
    });

    addPrimaryActionButton({
      id: 'make_check_btn',
      text: formatStringRecursive(_('Roll ${number} dice'), {
        number: this.spend,
      }),
      callback: () => this.updateIntefaceConfirm(),
    });

    addSecondaryActionButton({
      id: 'plus_btn',
      text: '+',
      callback: () => {
        this.spend++;
        this.updateInterfaceInitialStep();
      },
      extraClasses: available === 0 ? DISABLED : '',
    });

    addPrimaryActionButton({
      id: 'propose_btn',
      text: _('Propose'),
      callback: () => this.performAction(false),
    });
    // addCancelButton();
    addPassButton(this.args.optionalAction);
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
    performAction('actDirectorOfTradeSpecialEnvoy', {
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
