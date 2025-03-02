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

    if (this.args.options[ENLIST_WRITER]) {
      addSecondaryActionButton({
        id: 'writer_btn',
        text: formatStringRecursive(_('Enlist ${tkn_icon}'), {
          tkn_icon: 'Writer',
        }),
        callback: () => this.updateInterfaceConfirm(ENLIST_WRITER),
      });
    }
    if (this.args.options[ENLIST_OFFICER]) {
      addSecondaryActionButton({
        id: 'officer_btn',
        text: formatStringRecursive(_('Enlist ${tkn_icon}'), {
          tkn_icon: OFFICER_IN_TRAINING,
        }),
        callback: () => this.updateInterfaceConfirm(ENLIST_OFFICER),
      });
    }
    if (this.args.options[PURCHASE_LUXURY]) {
      addSecondaryActionButton({
        id: 'luxury_btn',
        text: formatStringRecursive(_('Purchase ${tkn_icon}'), {
          tkn_icon: LUXURY,
        }),
        callback: () => this.updateInterfaceConfirm(PURCHASE_LUXURY),
      });
    }
    if (this.args.options[PURCHASE_SHIPYARD]) {
      addSecondaryActionButton({
        id: 'shipyard_btn',
        text: formatStringRecursive(_('Purchase ${tkn_icon}'), {
          tkn_icon: SHIPYARD,
        }),
        callback: () => this.updateInterfaceConfirm(PURCHASE_SHIPYARD),
      });
    }
    if (this.args.options[PURCHASE_WORKSHOP]) {
      addSecondaryActionButton({
        id: 'workshop_btn',
        text: formatStringRecursive(_('Purchase ${tkn_icon}'), {
          tkn_icon: WORKSHOP,
        }),
        callback: () => this.updateInterfaceConfirm(PURCHASE_WORKSHOP),
      });
    }


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
