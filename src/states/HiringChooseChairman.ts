import {
  addCancelButton,
  addConfirmButton,
  addPlayerButton,
  clearPossible,
  CommonStateArgs,
  debug,
  GameState,
  getPlayerName,
  performAction,
  updatePageTitle,
} from '../boilerplate';
import { GameAlias } from '../types';

interface OnEnteringHiringChooseChairmanArgs extends CommonStateArgs {
  options: number[];
}

export class HiringChooseChairman implements GameState<OnEnteringHiringChooseChairmanArgs> {
  private static instance: HiringChooseChairman;
  private args: OnEnteringHiringChooseChairmanArgs;

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    HiringChooseChairman.instance = new HiringChooseChairman(game);
  }

  public static getInstance() {
    return HiringChooseChairman.instance;
  }

  onEnteringState(args: OnEnteringHiringChooseChairmanArgs) {
    debug('Entering HiringChooseChairman state');
    this.args = args;
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving HiringChooseChairman state');
  }

  setDescription(
    activePlayerIds: number[],
    args: OnEnteringHiringChooseChairmanArgs,
  ) {
    updatePageTitle(
      _('Hiring: ${tkn_playerName} must choose a player to become the new Chairman'),
      {
        tkn_playerName: getPlayerName(activePlayerIds[0]),
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
    clearPossible();
    updatePageTitle(
      _('Hiring: ${you} must choose a player to become the new Chairman'),
      {},
    );

    this.args.options.forEach((playerId) =>
      addPlayerButton({
        id: `player-${playerId}-button`,
        callback: () => this.updateInterfaceConfirm(playerId),
        playerId,
      }),
    );
  }

  private updateInterfaceConfirm(playerId: number) {
    clearPossible();
    addConfirmButton(() => {
      performAction('actHiringChooseChairman', {
        chosenPlayerId: playerId,
      });
    });
    addCancelButton();
  }
}
