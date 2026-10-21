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

interface OnEnteringPlayBlackmailOrPromiseCardArgs extends CommonStateArgs {}

export class PlayBlackmailOrPromiseCard
  implements GameState<OnEnteringPlayBlackmailOrPromiseCardArgs>
{
  private static instance: PlayBlackmailOrPromiseCard;
  private args: OnEnteringPlayBlackmailOrPromiseCardArgs;

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    PlayBlackmailOrPromiseCard.instance = new PlayBlackmailOrPromiseCard(game);
  }

  public static getInstance() {
    return PlayBlackmailOrPromiseCard.instance;
  }

  onEnteringState(args: OnEnteringPlayBlackmailOrPromiseCardArgs) {
    debug('Entering PlayBlackmailOrPromiseCard state');
    this.args = args;
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving PlayBlackmailOrPromiseCard state');
  }

  setDescription(
    activePlayerIds: number,
    args: OnEnteringPlayBlackmailOrPromiseCardArgs,
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
      performAction('actPlayBlackmailOrPromiseCard', {});
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