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

interface OnEnteringParliamentMeetsAdditionalRoundOrResolveArgs
  extends CommonStateArgs {}

export class ParliamentMeetsAdditionalRoundOrResolve
  implements GameState<OnEnteringParliamentMeetsAdditionalRoundOrResolveArgs>
{
  private static instance: ParliamentMeetsAdditionalRoundOrResolve;
  private args: OnEnteringParliamentMeetsAdditionalRoundOrResolveArgs;

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    ParliamentMeetsAdditionalRoundOrResolve.instance =
      new ParliamentMeetsAdditionalRoundOrResolve(game);
  }

  public static getInstance() {
    return ParliamentMeetsAdditionalRoundOrResolve.instance;
  }

  onEnteringState(
    args: OnEnteringParliamentMeetsAdditionalRoundOrResolveArgs,
  ) {
    debug('Entering ParliamentMeetsAdditionalRoundOrResolve state');
    this.args = args;
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving ParliamentMeetsAdditionalRoundOrResolve state');
  }

  setDescription(
    activePlayerIds: number[],
    args: OnEnteringParliamentMeetsAdditionalRoundOrResolveArgs,
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
      performAction('actParliamentMeetsAdditionalRoundOrResolve', {});
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
