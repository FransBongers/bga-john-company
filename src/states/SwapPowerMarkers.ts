import {
  addConfirmButton,
  debug,
  performAction,
  updatePageTitle,
} from '../boilerplate';
import { CommonStateArgs, GameAlias, GameState } from '../types';

interface OnEnteringSwapPowerMarkersArgs extends CommonStateArgs {}

export class SwapPowerMarkers
  implements GameState<OnEnteringSwapPowerMarkersArgs>
{
  private static instance: SwapPowerMarkers;
  private args: OnEnteringSwapPowerMarkersArgs;

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    SwapPowerMarkers.instance = new SwapPowerMarkers(game);
  }

  public static getInstance() {
    return SwapPowerMarkers.instance;
  }

  onEnteringState(args: OnEnteringSwapPowerMarkersArgs) {
    debug('Entering SwapPowerMarkers state');
    this.args = args;
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving SwapPowerMarkers state');
  }

  setDescription(activePlayerIds: number[], args: OnEnteringSwapPowerMarkersArgs) {}

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
    updatePageTitle(_('${you} may perform an action'), {});

    addConfirmButton(() => {
      performAction('actSwapPowerMarkers', {});
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