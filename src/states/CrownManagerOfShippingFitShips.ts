import {
  addConfirmButton,
  addPrimaryActionButton,
  clearPossible,
  debug,
  GameState,
  performAction,
  updatePageTitle,
} from '../boilerplate';
import { tknPromiseCubes } from '../logs/templates';
import { PlayerManager } from '../player-manager';
import { CommonStateArgs, GameAlias, JocoShipBase } from '../types';
import { getCrownPlayerName, getShipsLog } from '../utility';

interface OnEnteringCrownManagerOfShippingFitShipsArgs extends CommonStateArgs {
  shipsThatWillBeFitted: JocoShipBase[];
  shipsThatWillNotBeFitted: JocoShipBase[];
  playerPromiseCubeCost: Record<number, number>;
}

export class CrownManagerOfShippingFitShips implements GameState<OnEnteringCrownManagerOfShippingFitShipsArgs> {
  private static instance: CrownManagerOfShippingFitShips;
  private args: OnEnteringCrownManagerOfShippingFitShipsArgs;

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    CrownManagerOfShippingFitShips.instance =
      new CrownManagerOfShippingFitShips(game);
  }

  public static getInstance() {
    return CrownManagerOfShippingFitShips.instance;
  }

  onEnteringState(args: OnEnteringCrownManagerOfShippingFitShipsArgs) {
    debug('Entering CrownManagerOfShippingFitShips state');
    this.args = args;

    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving CrownManagerOfShippingFitShips state');
  }

  setDescription(
    activePlayerIds: number,
    args: OnEnteringCrownManagerOfShippingFitShipsArgs,
  ) {
    updatePageTitle(
      _('${tkn_playerName} may fit ships'),
      {
        tkn_playerName: getCrownPlayerName(),
      },
      true,
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
    this.game.clearPossible();
    console.log('');

    this.updatePageTitle();

    // if (
    //   this.args.ship.id === this.ship.id &&
    //   this.args.options.ships.length > 0
    // ) {
    //   addPrimaryActionButton({
    //     id: 'fit_ship_btn',
    //     text: _('Pay to fit a ship'),
    //     callback: () => this.updateInterfaceSelectShip(),
    //   });
    // }

    addPrimaryActionButton({
      id: 'continue_btn',
      text: _('Continue'),
      callback: () =>
        performAction('actCrownManagerOfShippingFitShips', {
          continue: true,
        }),
    });
  }

  private updateInterfaceConfirm() {
    clearPossible();

    updatePageTitle(_('Confirm ship placement'));

    addConfirmButton(() => {
      performAction('actCrownManagerOfShippingFitShips', {});
    });
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private updatePageTitle() {
    let text = '';

    const currentPlayerId = PlayerManager.getInstance().getCurrentPlayerId();

    text = _('${tkn_playerName_crown} wants to fit ${ships_log}');

    if (this.args.playerPromiseCubeCost[currentPlayerId]) {
      text = _(
        '${tkn_playerName_crown} wants to fit ${ships_log}. ${you} must pay ${amount} ${tkn_promiseCube}',
      );
    }

    updatePageTitle(text, {
      tkn_playerName_crown: getCrownPlayerName(),
      tkn_promiseCube: tknPromiseCubes(),
      amount: this.args.playerPromiseCubeCost[currentPlayerId] ?? 0,
      ships_log: getShipsLog(this.args.shipsThatWillBeFitted),
    });
  }

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
