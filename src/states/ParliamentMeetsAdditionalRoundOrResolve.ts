import { Bar } from '../bar';
import {
  addCancelButton,
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
import { PlayerManager } from '../player-manager';
import { GameAlias } from '../types';

interface OnEnteringParliamentMeetsAdditionalRoundOrResolveArgs extends CommonStateArgs {}

export class ParliamentMeetsAdditionalRoundOrResolve implements GameState<OnEnteringParliamentMeetsAdditionalRoundOrResolveArgs> {
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

  onEnteringState(args: OnEnteringParliamentMeetsAdditionalRoundOrResolveArgs) {
    debug('Entering ParliamentMeetsAdditionalRoundOrResolve state');
    this.args = args;
    this.updateInterfaceInitialStep();
    Bar.getInstance().goTo('joco-parliament');
  }

  onLeavingState() {
    debug('Leaving ParliamentMeetsAdditionalRoundOrResolve state');
  }

  setDescription(
    activePlayerIds: number[],
    args: OnEnteringParliamentMeetsAdditionalRoundOrResolveArgs,
  ) {
    updatePageTitle(
      _(
        '${tkn_playerName} can decide to initiate an additional round of voting or can stop and resolve the vote',
      ),
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
      _(
        '${you} can decide to initiate an additional round of voting or stop and resolve the vote',
      ),
      {},
    );

    addPrimaryActionButton({
      id: 'add-additional-round-btn',
      text: _('Initiate additional round'),
      callback: () => {
        this.updateInterfaceConfirm(false);
      },
    });
    addPrimaryActionButton({
      id: 'stop-and-resolve-btn',
      text: _('Stop and resolve'),
      callback: () => {
        this.updateInterfaceConfirm(true);
      },
    });
  }

  private updateInterfaceConfirm(stop: boolean) {
    clearPossible();

    updatePageTitle(
      stop ? _('Stop and resolve?') : _('Initiate additional round?'),
      {},
    );

    addConfirmButton(() => {
      performAction('actParliamentMeetsAdditionalRoundOrResolve', { stop });
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
