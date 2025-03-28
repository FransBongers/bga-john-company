interface OnEnteringPresidencyDecideOrderArgs extends CommonStateArgs {
  trade: boolean;
  Commander: boolean;
  governors: Record<string, boolean>;
}

class PresidencyDecideOrder implements State {
  private static instance: PresidencyDecideOrder;
  private args: OnEnteringPresidencyDecideOrderArgs;

  constructor(private game: GameAlias) {}

  public static create(game: JohnCompany) {
    PresidencyDecideOrder.instance = new PresidencyDecideOrder(game);
  }

  public static getInstance() {
    return PresidencyDecideOrder.instance;
  }

  onEnteringState(args: OnEnteringPresidencyDecideOrderArgs) {
    debug('Entering PresidencyDecideOrder state');
    this.args = args;

    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving PresidencyDecideOrder state');
  }

  setDescription(
    activePlayerIds: number,
    args: OnEnteringPresidencyDecideOrderArgs
  ) {
    updatePageTitle(
      _('${tkn_playerName} must choose which is next to act'),
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

    updatePageTitle(_('${you} must choose which is next to act'));
    const board = Board.getInstance();
    if (this.args.trade) {
      addPrimaryActionButton({id: 'trade_btn', text: _('Trade'), callback: () => this.updateInterfaceConfirm(TRADE)})
    }

  }


  private updateInterfaceConfirm(next: string) {
    clearPossible();

    switch(next) {
      case TRADE:
        updatePageTitle(_('Perform the Trade action?'));
        break;
      default:    
    }
    

    addConfirmButton(() => {
      performAction('actPresidencyDecideOrder', {
        next
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
