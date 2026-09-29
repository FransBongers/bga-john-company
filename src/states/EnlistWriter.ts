import { Bar } from '../bar';
import { Board } from '../board';
import {
  addCancelButton,
  addConfirmButton,
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
} from '../constants';
import { PlayerManager } from '../player-manager';
import { StaticData } from '../static-data';
import { CommonStateArgs, GameAlias } from '../types';
import { getRegionName } from '../utility';

interface OnEnteringEnlistWriterArgs extends CommonStateArgs {
  options: string[];
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
      _('${tkn_playerName} must select a Presidency to place their writer'),
      {
        tkn_playerName: PlayerManager.getInstance()
          .getPlayer(activePlayerIds[0])
          .getName(),
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
      _('${you} must select a Presidency to place your ${tkn_icon}'),
      {
        tkn_icon: WRITER,
      },
    );

    this.args.options.forEach((presidencyId) => {
      onClick(presidencyId, () => this.updateInterfaceConfirm(presidencyId));
    });
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
