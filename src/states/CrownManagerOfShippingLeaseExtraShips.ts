import {
  addConfirmButton,
  addPrimaryActionButton,
  addSecondaryActionButton,
  clearPossible,
  debug,
  formatStringRecursive,
  GameState,
  performAction,
  updatePageTitle,
} from '../boilerplate';
import { EXTRA_SHIP, BUY_COMPANY_SHIP } from '../constants';
import { tknShipValue, tknPromiseCubes, tknPound } from '../logs/templates';
import { PlayerManager } from '../player-manager';
import { CommonStateArgs, GameAlias } from '../types';
import { getCrownPlayerName } from '../utility';

interface OnEnteringCrownManagerOfShippingLeaseExtraShipsArgs extends CommonStateArgs {
  numberOfShipsCrownWillLease: number;
  optionToLeaveTwoUnspent: Record<number, boolean>;
}

export class CrownManagerOfShippingLeaseExtraShips implements GameState<OnEnteringCrownManagerOfShippingLeaseExtraShipsArgs> {
  private static instance: CrownManagerOfShippingLeaseExtraShips;
  private args: OnEnteringCrownManagerOfShippingLeaseExtraShipsArgs;

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    CrownManagerOfShippingLeaseExtraShips.instance =
      new CrownManagerOfShippingLeaseExtraShips(game);
  }

  public static getInstance() {
    return CrownManagerOfShippingLeaseExtraShips.instance;
  }

  onEnteringState(args: OnEnteringCrownManagerOfShippingLeaseExtraShipsArgs) {
    debug('Entering CrownManagerOfShippingLeaseExtraShips state');
    this.args = args;

    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving CrownManagerOfShippingLeaseExtraShips state');
  }

  setDescription(
    activePlayerIds: number,
    args: OnEnteringCrownManagerOfShippingLeaseExtraShipsArgs,
  ) {
    updatePageTitle(
      _('${tkn_playerName} may lease extra ships'),
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

    updatePageTitle(
      _('${tkn_playerName_crown} wants to lease ${count} ${tkn_ship}'),
      {
        count: this.args.numberOfShipsCrownWillLease,
        tkn_playerName_crown: getCrownPlayerName(),
        tkn_ship: tknShipValue({
          name: 'Extra Ship',
          type: EXTRA_SHIP,
          fatigued: 0,
        }),
      },
    );

    const playerId = PlayerManager.getInstance().getCurrentPlayerId();
    const optionToLeaveTwoUnspent = this.args.optionToLeaveTwoUnspent[playerId];

    if (optionToLeaveTwoUnspent) {
      addSecondaryActionButton({
        id: 'buy_ship_btn',
        text: formatStringRecursive(
          _(
            'Pay ${tkn_playerName_crown} ${amount} ${tkn_promiseCube} to leave 2 ${tkn_pound} unspent',
          ),
          {
            amount: 1,
            tkn_playerName_crown: getCrownPlayerName(),
            tkn_promiseCube: tknPromiseCubes(),
            tkn_pound: tknPound(),
          },
        ),
        callback: () =>
          performAction('actCrownManagerOfShippingBuyCompanyShips', {
            option: BUY_COMPANY_SHIP,
          }),
      });
    }

    addPrimaryActionButton({
      id: 'continue_btn',
      text: _('Continue'),
      callback: () =>
        performAction('actCrownManagerOfShippingLeaseExtraShips', {
          continue: true,
        }),
    });
  }

  private updateInterfaceConfirm() {
    clearPossible();

    updatePageTitle(_('Confirm ship placement'));

    addConfirmButton(() => {
      performAction('actCrownManagerOfShippingLeaseExtraShips', {});
    });
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
