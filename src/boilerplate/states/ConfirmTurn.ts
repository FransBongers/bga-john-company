import { GameAlias } from '../../types';
import { CommonStateArgs, GameState } from '../types';
import {
  debug,
  addConfirmButton,
  addUndoButtons,
  updatePageTitle,
  performAction,
} from '../utility';

interface OnEnteringConfirmTurnArgs extends CommonStateArgs {}

export class ConfirmTurn implements GameState<OnEnteringConfirmTurnArgs> {
  private static instance: ConfirmTurn;
  private args!: OnEnteringConfirmTurnArgs;

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    ConfirmTurn.instance = new ConfirmTurn(game);
  }

  public static getInstance() {
    return ConfirmTurn.instance;
  }

  onEnteringState(args: OnEnteringConfirmTurnArgs) {
    this.args = args;
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving ConfirmTurnState');
  }

  setDescription(
    activePlayerId: number | number[],
    args: OnEnteringConfirmTurnArgs,
  ) {
    // this.game.clientUpdatePageTitle({
    //   text: _("${player_name} must confirm or restart their turn"),
    //   args: {
    //     player_name: this.game.playerManager.getPlayer({playerId: activePlayerId}).getName()
    //   },
    //   nonActivePlayers: true,
    // });
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
    this.game.clearPossible();

    updatePageTitle(_('${you} must confirm or restart your turn'));

    addConfirmButton(() => this.game.bga.actions.performAction('actConfirmTurn'));
    addUndoButtons(this.args);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  //  ..######..##.......####..######..##....##
  //  .##....##.##........##..##....##.##...##.
  //  .##.......##........##..##.......##..##..
  //  .##.......##........##..##.......#####...
  //  .##.......##........##..##.......##..##..
  //  .##....##.##........##..##....##.##...##.
  //  ..######..########.####..######..##....##

  // .##.....##....###....##....##.########..##.......########..######.
  // .##.....##...##.##...###...##.##.....##.##.......##.......##....##
  // .##.....##..##...##..####..##.##.....##.##.......##.......##......
  // .#########.##.....##.##.##.##.##.....##.##.......######....######.
  // .##.....##.#########.##..####.##.....##.##.......##.............##
  // .##.....##.##.....##.##...###.##.....##.##.......##.......##....##
  // .##.....##.##.....##.##....##.########..########.########..######.
}
