interface OnEnteringFamilyActionArgs extends CommonStateArgs {
  options: Record<string, boolean>;
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

  setDescription(activePlayerIds: number[] , args: OnEnteringFamilyActionArgs) {
    updatePageTitle(_('${tkn_playerName} must perform a family action'), {
      tkn_playerName: PlayerManager.getInstance()
        .getPlayer(activePlayerIds[0])
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

    this.addButton(ENLIST_WRITER, WRITER, _('Enlist ${tkn_icon}'));
    this.addButton(
      ENLIST_OFFICER,
      OFFICER_IN_TRAINING,
      _('Enlist ${tkn_icon}')
    );
    this.addButton(PURCHASE_LUXURY, LUXURY, _('Purchase ${tkn_icon}'));
    this.addButton(PURCHASE_SHIPYARD, SHIPYARD, _('Purchase ${tkn_icon}'));
    this.addButton(PURCHASE_WORKSHOP, WORKSHOP, _('Purchase ${tkn_icon}'));
    this.addButton(SEEK_SHARE, SHARE, _('Seek ${tkn_icon}'));
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

    const callback = () =>
      performAction('actFamilyAction', {
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

  private addButton(action: string, icon: string, text: string) {
    if (this.args.options[action]) {
      addSecondaryActionButton({
        id: `${action}_btn`,
        text: formatStringRecursive(text, {
          tkn_icon: icon,
        }),
        callback: () => this.updateInterfaceConfirm(action),
      });
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
