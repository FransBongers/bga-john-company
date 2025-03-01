interface OnEnteringFamilyActionArgs extends CommonStateArgs {
  _private?: {
    options: JoCoSetupCard[];
    selected: string;
  };
}

class FamilyAction implements State {
  private static instance: FamilyAction;
  private args: OnEnteringFamilyActionArgs;

  constructor(private game: GameAlias) {}

  public static create(game: JohnCompany) {
    FamilyAction.instance = new FamilyAction(game);
  }

  public static getInstance() {
    return FamilyAction.instance;
  }

  onEnteringState(args: OnEnteringFamilyActionArgs) {
    debug('Entering FamilyAction state');
    this.args = args;
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving FamilyAction state');
  }

  setDescription(activePlayerId: number, args: OnEnteringFamilyActionArgs) {
    updatePageTitle(_('${tkn_playerName} must perform a family action'), {
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

    updatePageTitle(_('${you} must select a family action'));

    addSecondaryActionButton({
      id: 'writer_btn',
      text: formatStringRecursive(_('Enlist ${tkn_icon}'), {
        tkn_icon: 'Writer',
      }),
      callback: () => this.updateInterfaceConfirm(ENLIST_WRITER),
    });
  }

  private updateInterfaceConfirm(familyAction: string) {
    clearPossible();

    // let text: string;
    // const args: Record<string, string> = {};

    // switch (familyAction) {
    //   case ENLIST_WRITER:
    //     text = _('Enlist Writer ${tkn_icon}?');
    //     args['tkn_icon'] = 'Writer';
    // }

    // updatePageTitle(text, args);

    const callback = () => performAction('actFamilyAction', {
      familyAction,
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
