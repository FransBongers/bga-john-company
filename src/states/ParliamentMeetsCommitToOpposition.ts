import {
  addConfirmButton,
  addPrimaryActionButton,
  clearPossible,
  CommonStateArgs,
  debug,
  GameState,
  getPlayerName,
  performAction,
  updatePageTitle,
} from '../boilerplate';
import { GameAlias } from '../types';

interface OnEnteringParliamentMeetsCommitToOppositionArgs extends CommonStateArgs {}

export class ParliamentMeetsCommitToOpposition implements GameState<OnEnteringParliamentMeetsCommitToOppositionArgs> {
  private static instance: ParliamentMeetsCommitToOpposition;
  private args: OnEnteringParliamentMeetsCommitToOppositionArgs;

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    ParliamentMeetsCommitToOpposition.instance =
      new ParliamentMeetsCommitToOpposition(game);
  }

  public static getInstance() {
    return ParliamentMeetsCommitToOpposition.instance;
  }

  onEnteringState(args: OnEnteringParliamentMeetsCommitToOppositionArgs) {
    debug('Entering ParliamentMeetsCommitToOpposition state');
    this.args = args;
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving ParliamentMeetsCommitToOpposition state');
  }

  setDescription(
    activePlayerIds: number[],
    args: OnEnteringParliamentMeetsCommitToOppositionArgs,
  ) {
    updatePageTitle(
      _('${tkn_playerName} must decide whether to commit to the opposition or not'),
      {
        tkn_playerName: getPlayerName(activePlayerIds[0]),
      },
    );
  }

  //  .####.##....##.########.########.########..########....###.....######..########
  //  ..##..###...##....##....##.......##.....##.##.........##.##...##....##.##......
  //  ..##..####..##....##....##.......##.....##.##........##...##..##.......##......
  //  ..##..##.##.##....##....######...########..######...##.....##.##.......######..
  //  ..##..##..####....##....##....##...##.......#########.##.......##......
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
    updatePageTitle(
      _('${you} must choose whether to commit to the opposition or not'),
      {},
    );

    addPrimaryActionButton({
      id: 'commit-btn',
      text: _('Commit to the opposition'),
      callback: () => {
        this.updateInterfaceConfirm(true);
      },
    });
    addPrimaryActionButton({
      id: 'do-not-commit-btn',
      text: _('Do not commit to the opposition'),
      callback: () => {
        this.updateInterfaceConfirm(false);
      },
    });
  }

  private updateInterfaceConfirm(commit: boolean) {
    clearPossible();
    updatePageTitle(
      commit
        ? _('Commit to the opposition?')
        : _('Do not to commit to the opposition?'),
      {},
    );

    addConfirmButton(() => {
      performAction('actParliamentMeetsCommitToOpposition', { commit });
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
