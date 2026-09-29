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

interface OnEnteringLondonSeasonRetireArgs extends CommonStateArgs {}

export class LondonSeasonRetire
  implements GameState<OnEnteringLondonSeasonRetireArgs>
{
  private static instance: LondonSeasonRetire;
  private args: OnEnteringLondonSeasonRetireArgs;

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    LondonSeasonRetire.instance = new LondonSeasonRetire(game);
  }

  public static getInstance() {
    return LondonSeasonRetire.instance;
  }

  onEnteringState(args: OnEnteringLondonSeasonRetireArgs) {
    debug('Entering LondonSeasonRetire state');
    this.args = args;
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving LondonSeasonRetire state');
  }

  setDescription(
    activePlayerIds: number[],
    args: OnEnteringLondonSeasonRetireArgs,
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
    updatePageTitle(_('${you} may retire a family member'), {});

    addConfirmButton(() => {
      performAction('actLondonSeasonRetire', {});
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