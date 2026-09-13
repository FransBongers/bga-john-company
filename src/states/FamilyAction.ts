import {
  debug,
  updatePageTitle,
  clearPossible,
  performAction,
  addCancelButton,
  addSecondaryActionButton,
  formatStringRecursive,
} from '../boilerplate';
import {
  ENLIST_WRITER,
  WRITER,
  ENLIST_OFFICER,
  OFFICER_IN_TRAINING,
  PURCHASE_LUXURY,
  LUXURY,
  PURCHASE_SHIPYARD,
  SHIPYARD,
  PURCHASE_WORKSHOP,
  WORKSHOP,
  SEEK_SHARE,
  SHARE,
} from '../constants';
import { CommonStateArgs, GameState, GameAlias } from '../types';

interface OnEnteringFamilyActionArgs extends CommonStateArgs {
  options: Record<string, boolean>;
}

export class FamilyAction implements GameState<OnEnteringFamilyActionArgs> {
  private static instance: FamilyAction;
  private args: OnEnteringFamilyActionArgs;

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
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

  setDescription(activePlayerIds: number[], args: OnEnteringFamilyActionArgs) {
    updatePageTitle(
      _('${actplayer} must perform a family action'),
      {
        // tkn_playerName: PlayerManager.getInstance()
        //   .getPlayer(activePlayerIds[0])
        //   .getName(),
      },
      true,
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

    updatePageTitle(_('${you} must select a family action'));

    this.addButton(ENLIST_WRITER, WRITER, _('Enlist ${tkn_icon}'));
    this.addButton(
      ENLIST_OFFICER,
      OFFICER_IN_TRAINING,
      _('Enlist ${tkn_icon}'),
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
