import {
  addConfirmButton,
  addPrimaryActionButton,
  addSecondaryActionButton,
  clearPossible,
  debug,
  formatStringRecursive,
  performAction,
  updatePageTitle,
} from '../boilerplate';
import { BUY_COMPANY_SHIP, COMPANY_SHIP, DO_NOT_BUY_COMPANY_SHIP, BUY_AS_MANY_SHIPS_AS_YOU_WISH } from '../constants';
import { tknPromiseCubes, tknShipValue } from '../logs/templates';
import { PlayerManager } from '../player-manager';
import { GameAlias, GameState } from '../types';
import { CommonStateArgs, JocoShipBase } from '../types';
import { getCrownPlayerName } from '../utility';

interface CrownManagerOfShippingBuyCompanyShipsPlayerOption {
  option:
    | 'BUY_COMPANY_SHIP'
    | 'DO_NOT_BUY_COMPANY_SHIP'
    | 'BUY_AS_MANY_SHIPS_AS_YOU_WISH';
  promiseCubeCost: number;
}

interface OnEnteringCrownManagerOfShippingBuyCompanyShipsArgs extends CommonStateArgs {
  shipsCrownWillBuy: JocoShipBase[];
  playerOptions: Record<
    number,
    CrownManagerOfShippingBuyCompanyShipsPlayerOption
  >;
}

export class CrownManagerOfShippingBuyCompanyShips implements GameState<OnEnteringCrownManagerOfShippingBuyCompanyShipsArgs> {
  private static instance: CrownManagerOfShippingBuyCompanyShips;
  private args: OnEnteringCrownManagerOfShippingBuyCompanyShipsArgs;

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    CrownManagerOfShippingBuyCompanyShips.instance =
      new CrownManagerOfShippingBuyCompanyShips(game);
  }

  public static getInstance() {
    return CrownManagerOfShippingBuyCompanyShips.instance;
  }

  onEnteringState(args: OnEnteringCrownManagerOfShippingBuyCompanyShipsArgs) {
    debug('Entering CrownManagerOfShippingBuyCompanyShips state');
    this.args = args;

    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving CrownManagerOfShippingBuyCompanyShips state');
  }

  setDescription(
    activePlayerIds: number,
    args: OnEnteringCrownManagerOfShippingBuyCompanyShipsArgs,
  ) {
    updatePageTitle(
      _('${tkn_playerName} may buy  Company ships'),
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

    this.updatePageTitle();

    const playerId = PlayerManager.getInstance().getCurrentPlayerId();
    const option = this.args.playerOptions[playerId];
    if (option) {
      switch (option.option) {
        case BUY_COMPANY_SHIP:
          addSecondaryActionButton({
            id: 'buy_ship_btn',
            text: formatStringRecursive(
              _(
                'Pay ${tkn_playerName_crown} ${amount} ${tkn_promiseCube} to buy ${tkn_ship}',
              ),
              {
                amount: option.promiseCubeCost,
                tkn_playerName_crown: getCrownPlayerName(),
                tkn_promiseCube: tknPromiseCubes(),
                tkn_ship: tknShipValue({
                  name: _('Company Ship'),
                  type: COMPANY_SHIP,
                  fatigued: 0,
                }),
              },
            ),
            callback: () =>
              performAction('actCrownManagerOfShippingBuyCompanyShips', {
                option: BUY_COMPANY_SHIP,
              }),
          });
          break;
        case DO_NOT_BUY_COMPANY_SHIP:
          addSecondaryActionButton({
            id: 'do_not_buy_ship_btn',
            text: formatStringRecursive(
              _(
                'Pay ${tkn_playerName_crown} ${amount} ${tkn_promiseCube} to not buy ${tkn_ship}',
              ),
              {
                amount: option.promiseCubeCost,
                tkn_playerName_crown: getCrownPlayerName(),
                tkn_promiseCube: tknPromiseCubes(),
                tkn_ship: tknShipValue({
                  name: _('Company Ship'),
                  type: COMPANY_SHIP,
                  fatigued: 0,
                }),
              },
            ),
            callback: () =>
              performAction('actCrownManagerOfShippingBuyCompanyShips', {
                option: DO_NOT_BUY_COMPANY_SHIP,
              }),
          });
          break;
        case BUY_AS_MANY_SHIPS_AS_YOU_WISH:
          // TODO
          break;
      }
    }

    addPrimaryActionButton({
      id: 'continue_btn',
      text: _('Continue'),
      callback: () =>
        performAction('actCrownManagerOfShippingBuyCompanyShips', {
          continue: true,
        }),
    });
  }

  private updateInterfaceConfirm() {
    clearPossible();

    updatePageTitle(_('Confirm ship placement'));

    addConfirmButton(() => {
      performAction('actCrownManagerOfShippingBuyCompanyShips', {});
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

    const shipsLog = {
      log: '',
      args: {},
    };

    // this.args.playerPromiseCubeCost[currentPlayerId] = 2;

    this.args.shipsCrownWillBuy.forEach((ship, index) => {
      const key = `tkn_ship_${index}`;
      ship.type = COMPANY_SHIP;
      shipsLog.log += `\${${key}}`;
      shipsLog.args[key] = tknShipValue(ship);
    });

    text = _('${tkn_playerName_crown} wants to buy ${ships_log}');

    if (this.args.shipsCrownWillBuy.length === 0) {
      text = _('${tkn_playerName_crown} will not buy Company ships');
    }

    // const type = this.args.phase === UNFITTED ? this.args.ship.type : this.args.phase;
    updatePageTitle(text, {
      tkn_playerName_crown: getCrownPlayerName(),
      ships_log: shipsLog,
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
