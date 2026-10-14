import { Bar } from '../bar';
import {
  addCancelButton,
  addConfirmButton,
  addPlayerButton,
  addSecondaryActionButton,
  clearPossible,
  CommonStateArgs,
  debug,
  GameState,
  getCurrentPlayerId,
  getPlayerName,
  performAction,
  updatePageTitle,
} from '../boilerplate';
import { GameAlias } from '../types';

interface OnEnteringHiringChairmanArgs extends CommonStateArgs {
  options: Record<number, number>;
  sharesRequired: number;
}

export class HiringChairman implements GameState<OnEnteringHiringChairmanArgs> {
  private static instance: HiringChairman;
  private args: OnEnteringHiringChairmanArgs;

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    HiringChairman.instance = new HiringChairman(game);
  }

  public static getInstance() {
    return HiringChairman.instance;
  }

  onEnteringState(args: OnEnteringHiringChairmanArgs) {
    debug('Entering HiringChairman state');
    this.args = args;
    this.updateInterface();
    Bar.getInstance().goTo('joco-company');
  }

  onLeavingState() {
    debug('Leaving HiringChairman state');
  }

  setDescription(
    activePlayerIds: number[],
    args: OnEnteringHiringChairmanArgs,
  ) {
    updatePageTitle(
      _('Other players can support eligible candidates for Chairman'),
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

  private updateInterface() {
    clearPossible();

    const currentPlayerId = getCurrentPlayerId();

    updatePageTitle(
      _(
        'Hiring: ${you} may support an eligible candidate for Chairman with ${number} shares',
      ),
      {
        number: this.args.options[currentPlayerId],
      },
    );

    Object.keys(this.args.options).forEach((option) => {
      const playerId = parseInt(option, 10);
      addPlayerButton({
        id: `player-${option}-btn`,
        playerId,
        callback: () => this.updateInterfaceConfirm(playerId),
      });
    });
  }

  private updateInterfaceConfirm(playerId: number) {
    clearPossible();
    updatePageTitle(
      _(
        'Hiring: support ${tkn_playerName} for Chairman with ${number} shares?',
      ),
      {
        tkn_playerName: getPlayerName(playerId),
        number: this.args.options[getCurrentPlayerId()],
      },
    );

    addConfirmButton(() => {
      performAction('actHiringChairman', {
        support: playerId,
      });
    });
    addCancelButton();
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...
}
