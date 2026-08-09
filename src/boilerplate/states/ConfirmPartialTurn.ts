import { GameAlias } from '../../types';
import { CommonStateArgs, GameState } from '../types';
import {
  debug,
  addConfirmButton,
  addUndoButtons,
  updatePageTitle,
  performAction,
} from '../utility';

interface OnEnteringConfirmPartialTurnArgs extends CommonStateArgs {}

export class ConfirmPartialTurn implements GameState<OnEnteringConfirmPartialTurnArgs> {
  private static instance: ConfirmPartialTurn;
  private args!: OnEnteringConfirmPartialTurnArgs;

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    ConfirmPartialTurn.instance = new ConfirmPartialTurn(game);
  }

  public static getInstance() {
    return ConfirmPartialTurn.instance;
  }

  onEnteringState(args: OnEnteringConfirmPartialTurnArgs) {
    this.args = args;
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving ConfirmTurnState');
  }

  setDescription(
    activePlayerId: number | number[],
    args: OnEnteringConfirmPartialTurnArgs,
  ) {
    // this.game.clientUpdatePageTitle({
    //   text: _("${player_name} must confirm the switch of player"),
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

    updatePageTitle(
      _('${you} must confirm your moves. You will not be able to undo'),
    );

    addConfirmButton(() => this.game.bga.actions.performAction('actConfirmPartialTurn'));
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
