import { Bar } from '../bar';
import { Board } from '../board';
import {
  addCancelButton,
  addConfirmButton,
  addPassButton,
  addPrimaryActionButton,
  clearPossible,
  debug,
  GameState,
  onClick,
  performAction,
  setSelected,
  updatePageTitle,
} from '../boilerplate';
import {
  WRITER,
  PRESIDENCY_REGION_MAP,
  FAMILY_ACTION,
  OPPORTUNITY_MARKER,
  VACANT_OFFICES,
} from '../constants';
import { PlayerManager } from '../player-manager';
import { StaticData } from '../static-data';
import { CommonStateArgs, GameAlias } from '../types';
import { getRegionName } from '../utility';

interface OnEnteringEnlistWriterArgs extends CommonStateArgs {
  options: string[];
  source: string;
}

export class EnlistWriter implements GameState<OnEnteringEnlistWriterArgs> {
  private static instance: EnlistWriter;
  private args: OnEnteringEnlistWriterArgs;

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    EnlistWriter.instance = new EnlistWriter(game);
  }

  public static getInstance() {
    return EnlistWriter.instance;
  }

  onEnteringState(args: OnEnteringEnlistWriterArgs) {
    debug('Entering EnlistWriter state');
    this.args = args;
    this.updateInterfaceInitialStep();
    Bar.getInstance().goTo('joco-india');
  }

  onLeavingState() {
    debug('Leaving EnlistWriter state');
  }

  setDescription(activePlayerIds: number[], args: OnEnteringEnlistWriterArgs) {
    updatePageTitle(
      args.source === FAMILY_ACTION
        ? _('${tkn_playerName} must select a Presidency to place their writer')
        : _(
            '${tkn_playerName} may select another Presidency to place a writer (${source})',
          ),
      {
        tkn_playerName: PlayerManager.getInstance()
          .getPlayer(activePlayerIds[0])
          .getName(),
        source: this.getSourceName(args.source).toLocaleLowerCase(),
      },
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
      this.args.source === FAMILY_ACTION
        ? _('${you} must select a Presidency to place your ${tkn_icon}')
        : _(
            '${you} may select another Presidency to place a writer (${source})',
          ),
      {
        tkn_icon: WRITER,
        source: this.getSourceName(this.args.source).toLocaleLowerCase(),
      },
    );

    this.args.options.forEach((presidencyId) => {
      onClick(presidencyId, () => this.updateInterfaceConfirm(presidencyId));
    });
    addPassButton(this.args.optionalAction);
  }

  private updateInterfaceConfirm(presidencyId: string) {
    clearPossible();

    setSelected(presidencyId);

    updatePageTitle(_('Enlist ${tkn_icon} in ${regionName}?'), {
      tkn_icon: WRITER,
      regionName: _(
        StaticData.get().region(PRESIDENCY_REGION_MAP[presidencyId]).name,
      ),
    });

    const callback = () =>
      performAction('actEnlistWriter', {
        presidencyId,
      });

    addConfirmButton(callback);

    // callback();

    addCancelButton();
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private getSourceName(source) {
    switch (source) {
      case FAMILY_ACTION:
        return _('Family Action');
      case OPPORTUNITY_MARKER:
        return _('Opportunity Marker');
      case VACANT_OFFICES:
        return _('Vacant Offices');
      default:
        return _('Unknown Source');
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
