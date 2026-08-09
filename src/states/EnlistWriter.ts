import { Board } from '../board';
import {
  addCancelButton,
  addConfirmButton,
  clearPossible,
  debug,
  GameState,
  onClick,
  performAction,
  setSelected,
  updatePageTitle,
} from '../boilerplate';
import { WRITER, BENGAL, BOMBAY, MADRAS } from '../constants';
import { PlayerManager } from '../player-manager';
import { StaticData } from '../static-data';
import { CommonStateArgs, GameAlias } from '../types';

interface OnEnteringEnlistWriterArgs extends CommonStateArgs {}

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
  }

  onLeavingState() {
    debug('Leaving EnlistWriter state');
  }

  setDescription(activePlayerIds: number[], args: OnEnteringEnlistWriterArgs) {
    updatePageTitle(
      _('${tkn_playerName} must select a region to place their writer'),
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

    updatePageTitle(_('${you} must select a region to place ${tkn_icon}'), {
      tkn_icon: WRITER,
    });

    [BENGAL, BOMBAY, MADRAS].forEach((region) => {
      const box = Board.getInstance().ui.selectBoxes[`Writers_${region}`];
      onClick(box, () => this.updateInterfaceConfirm(region));
    });
  }

  private updateInterfaceConfirm(regionId: string) {
    clearPossible();

    setSelected(Board.getInstance().ui.selectBoxes[`Writers_${regionId}`]);

    updatePageTitle(_('Enlist ${tkn_icon} in ${regionName}?'), {
      tkn_icon: WRITER,
      regionName: _(StaticData.get().region(regionId).name),
    });

    const callback = () =>
      performAction('actEnlistWriter', {
        regionId,
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
