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

interface OnEnteringLondonSeasonChooseCardArgs extends CommonStateArgs {}

export class LondonSeasonChooseCard
  implements GameState<OnEnteringLondonSeasonChooseCardArgs>
{
  private static instance: LondonSeasonChooseCard;
  private args: OnEnteringLondonSeasonChooseCardArgs;

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    LondonSeasonChooseCard.instance = new LondonSeasonChooseCard(game);
  }

  public static getInstance() {
    return LondonSeasonChooseCard.instance;
  }

  onEnteringState(args: OnEnteringLondonSeasonChooseCardArgs) {
    debug('Entering LondonSeasonChooseCard state');
    this.args = args;
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving LondonSeasonChooseCard state');
  }

  setDescription(
    activePlayerIds: number[],
    args: OnEnteringLondonSeasonChooseCardArgs,
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
    updatePageTitle(_('${you} must choose a card'), {});

    addConfirmButton(() => {
      performAction('actLondonSeasonChooseCard', {});
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