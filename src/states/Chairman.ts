interface OnEnteringChairmanArgs extends CommonStateArgs {
  options: Record<string, boolean>;
}

class Chairman implements State {
  private static instance: Chairman;
  private args: OnEnteringChairmanArgs;

  constructor(private game: GameAlias) {}

  public static create(game: JohnCompany) {
    Chairman.instance = new Chairman(game);
  }

  public static getInstance() {
    return Chairman.instance;
  }

  onEnteringState(args: OnEnteringChairmanArgs) {
    debug('Entering Chairman state');
    this.args = args;
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving Chairman state');
  }

  setDescription(activePlayerId: number, args: OnEnteringChairmanArgs) {
    updatePageTitle(_('${tkn_playerName} may advance the Company Debt marker'), {
      tkn_playerName: PlayerManager.getInstance()
        .getPlayer(activePlayerId)
        .getName(),
    });
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

    updatePageTitle(_('${you} may advance the Company Debt marker'));

 
  }

  private updateInterfaceConfirm(Chairman: string) {
    clearPossible();

    // let text: string;
    // const args: Record<string, string> = {};

    // switch (Chairman) {
    //   case ENLIST_WRITER:
    //     text = _('Enlist Writer ${tkn_icon}?');
    //     args['tkn_icon'] = 'Writer';
    // }

    // updatePageTitle(text, args);

    const callback = () =>
      performAction('actChairman', {
        Chairman,
      });

    // addConfirmButton(callback);

    callback();

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
