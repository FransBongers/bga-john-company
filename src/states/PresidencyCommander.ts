import {
  addConfirmButton,
  clearPossible,
  CommonStateArgs,
  debug,
  GameState,
  performAction,
  updatePageTitle,
} from '../boilerplate';
import { GameAlias } from '../types';

interface OnEnteringPresidencyCommanderArgs extends CommonStateArgs {}

export class PresidencyCommander
  implements GameState<OnEnteringPresidencyCommanderArgs>
{
  private static instance: PresidencyCommander;
  private args: OnEnteringPresidencyCommanderArgs;

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    PresidencyCommander.instance = new PresidencyCommander(game);
  }

  public static getInstance() {
    return PresidencyCommander.instance;
  }

  onEnteringState(args: OnEnteringPresidencyCommanderArgs) {
    debug('Entering PresidencyCommander state');
    this.args = args;
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving PresidencyCommander state');
  }

  setDescription(
    activePlayerIds: number,
    args: OnEnteringPresidencyCommanderArgs,
  ) {}

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
    clearPossible();
    updatePageTitle(_('${you} may perform an action'), {});

    addConfirmButton(() => {
      performAction('actPresidencyCommander', {});
    });
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...
}
