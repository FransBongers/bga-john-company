import {
  addConfirmButton,
  debug,
  performAction,
  updatePageTitle,
} from '../boilerplate';
import { CommonStateArgs, GameAlias, GameState } from '../types';

interface OnEnteringTaxAndUpkeepArgs extends CommonStateArgs {}

export class TaxAndUpkeep implements GameState<OnEnteringTaxAndUpkeepArgs> {
  private static instance: TaxAndUpkeep;
  private args: OnEnteringTaxAndUpkeepArgs;

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    TaxAndUpkeep.instance = new TaxAndUpkeep(game);
  }

  public static getInstance() {
    return TaxAndUpkeep.instance;
  }

  onEnteringState(args: OnEnteringTaxAndUpkeepArgs) {
    debug('Entering TaxAndUpkeep state');
    this.args = args;
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving TaxAndUpkeep state');
  }

  setDescription(activePlayerIds: number[], args: OnEnteringTaxAndUpkeepArgs) {}

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
      performAction('actTaxAndUpkeep', {});
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