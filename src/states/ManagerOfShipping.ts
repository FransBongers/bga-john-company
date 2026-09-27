import { Bar } from '../bar';
import {
  addConfirmButton,
  addDangerActionButton,
  addPlayerButton,
  addPrimaryActionButton,
  addSecondaryActionButton,
  clearPossible,
  CommonStateArgs,
  debug,
  formatStringRecursive,
  GameState,
  getPlayerName,
  onClick,
  performAction,
  updatePageTitle,
} from '../boilerplate';
import { EnterpriseCardsManager } from '../cards/enterprise-cards';
import { Company } from '../company';
import {
  EXTRA_SHIP,
  COMPANY_SHIP,
  SEA_ZONES,
  SHIPS_COUNTER,
  MANAGER_OF_SHIPPING,
  FULL,
} from '../constants';
import { India } from '../india';
import { tknShipValue } from '../logs/templates';
import { PlayerManager } from '../player-manager';
import { JocoShipBase, GameAlias } from '../types';
import { getSeaName } from '../utility';

interface OnEnteringManagerOfShippingArgs extends CommonStateArgs {
  playerShips: JocoShipBase[];
  otherShips: JocoShipBase[];
  treasury: number;
}

export class ManagerOfShipping implements GameState<OnEnteringManagerOfShippingArgs> {
  private static instance: ManagerOfShipping;
  private args: OnEnteringManagerOfShippingArgs;
  private placedCompanyShips: Record<
    string,
    {
      ship: JocoShipBase;
      seaZone: string;
    }
  >;
  private placedExtraShips: Record<
    string,
    {
      ship: JocoShipBase;
      seaZone: string;
    }
  >;
  private placedPlayerShips: Record<
    string,
    {
      ship: JocoShipBase;
      seaZone: string;
    }
  >;
  private treasury: number;

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    ManagerOfShipping.instance = new ManagerOfShipping(game);
  }

  public static getInstance() {
    return ManagerOfShipping.instance;
  }

  onEnteringState(args: OnEnteringManagerOfShippingArgs) {
    debug('Entering ManagerOfShipping state');
    this.args = args;
    this.placedCompanyShips = {};
    this.placedExtraShips = {};
    this.placedPlayerShips = {};
    this.treasury = this.args.treasury;
    Bar.getInstance().goTo('joco-india');
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving ManagerOfShipping state');
  }

  setDescription(
    activePlayerIds: number,
    args: OnEnteringManagerOfShippingArgs,
  ) {
    updatePageTitle(
      _('${tkn_playerName} may fit, buy and lease ships'),
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
    this.game.clearPossible();

    if (this.treasury < 2) {
      this.updateInterfaceConfirm();
      return;
    }

    updatePageTitle(
      _('${you} may fit, buy and lease ships (£${amount} remaining)'),
      { amount: this.treasury },
    );

    let playerShipsAvailable = false;

    this.args.playerShips.forEach((ship) => {
      const { id, type, name, owner: playerId } = ship;
      if (this.placedPlayerShips[ship.id] || this.treasury < 3) {
        return;
      }
      playerShipsAvailable = true;
      addPlayerButton({
        id: `${ship.id}_btn`,
        text: formatStringRecursive(_('Fit ${tkn_ship}'), {
          tkn_ship: tknShipValue({ side: FULL, name }),
        }),
        playerId,
        callback: () => {
          this.updateInterfaceSelectSeaZone(ship, playerId);
        },
      });
    });
    if (this.treasury >= 2) {
      addSecondaryActionButton({
        id: 'extraShip_btn',
        text: formatStringRecursive(_('Lease ${tkn_ship}'), {
          tkn_ship: tknShipValue({
            side: EXTRA_SHIP,
            name: _('Extra Ship'),
          }),
        }),
        callback: () => {
          const ship = this.args.otherShips.pop();
          ship.type = EXTRA_SHIP;
          this.updateInterfaceSelectSeaZone(ship);
        },
      });
    }
    if (!playerShipsAvailable && this.treasury >= 5) {
      addSecondaryActionButton({
        id: 'companyShip_btn',
        text: formatStringRecursive(_('Buy ${tkn_ship}'), {
          tkn_ship: tknShipValue({
            side: COMPANY_SHIP,
            name: _('Company Ship'),
          }),
        }),
        callback: () => {
          const ship = this.args.otherShips.pop();
          ship.type = COMPANY_SHIP;
          this.updateInterfaceSelectSeaZone(ship);
        },
      });
    }

    if (this.treasury === 2) {
      addPrimaryActionButton({
        id: 'done_btn',
        text: _('Done'),
        callback: () => this.updateInterfaceConfirm(),
      });
    }
    if (
      Object.keys(this.placedPlayerShips).length > 0 ||
      Object.keys(this.placedExtraShips).length > 0 ||
      Object.keys(this.placedCompanyShips).length > 0
    ) {
      this.addCancelButton();
    }
  }

  private updateInterfaceSelectSeaZone(ship: JocoShipBase, playerId?: number) {
    clearPossible();

    updatePageTitle(_('${you} must select a sea zone'));

    SEA_ZONES.forEach((seaZone) => {
      addPrimaryActionButton({
        id: `select_${seaZone}_btn`,
        text: getSeaName(seaZone),
        callback: () => this.onSeaZoneClick(seaZone, ship, playerId),
      });
      // onClick(board.ui.selectBoxes[seaZone], async () => {
      //   ship.location = seaZone;
      //   let fromElt = undefined;
      //   clearPossible();
      //   if (playerId) {
      //     // Player Ship
      //     this.placedPlayerShips[ship.id] = seaZone;
      //     const player = PlayerManager.getInstance().getPlayer(playerId);
      //     player.counters[SHIPS_COUNTER].incValue(-1);
      //     fromElt = player.ui[SHIPS_COUNTER];
      //     this.pay(3);
      //   } else if (ship.type === EXTRA_SHIP) {
      //     ship = board.updateOtherShip(ship, EXTRA_SHIP);
      //     this.placedExtraShips[ship.id] = seaZone;
      //     this.pay(2);
      //   } else {
      //     // Company ship
      //     ship = board.updateOtherShip(ship, COMPANY_SHIP);
      //     this.placedCompanyShips[ship.id] = seaZone;
      //     this.pay(5);
      //   }

      //   await board.placeShip(ship, fromElt);
      //   this.updateInterfaceInitialStep();
      // });
    });

    this.addCancelButton();
  }

  private async onSeaZoneClick(
    seaZone: string,
    ship: JocoShipBase,
    playerId?: number,
  ) {
    ship.location = seaZone;
    let fromElt = undefined;
    clearPossible();
    if (playerId) {
      // Player Ship
      this.placedPlayerShips[ship.id] = { ship, seaZone };
      // const player = PlayerManager.getInstance().getPlayer(playerId);
      // player.counters[SHIPS_COUNTER].incValue(-1);
      // fromElt = player.ui[SHIPS_COUNTER];
      this.pay(3);
    } else if (ship.type === EXTRA_SHIP) {
      // ship = board.updateOtherShip(ship, EXTRA_SHIP);
      ship.side = EXTRA_SHIP;
      this.placedExtraShips[ship.id] = { ship, seaZone };
      this.pay(2);
    } else {
      // Company ship
      // ship = board.updateOtherShip(ship, COMPANY_SHIP);
      ship.side = COMPANY_SHIP;
      this.placedCompanyShips[ship.id] = { ship, seaZone };
      this.pay(5);
    }

    await India.getInstance().getSeaZone(seaZone).addShip(ship);
    this.updateInterfaceInitialStep();
  }

  private updateInterfaceConfirm() {
    clearPossible();

    updatePageTitle(_('Confirm ship placement'));

    addConfirmButton(() => {
      performAction('actManagerOfShipping', {
        playerShips: this.getActionData(this.placedPlayerShips),
        extraShips: this.getActionData(this.placedExtraShips),
        companyShips: this.getActionData(this.placedCompanyShips),
      });
    });
    this.addCancelButton();
  }

  private getActionData(
    input: Record<string, { ship: JocoShipBase; seaZone: string }>,
  ) {
    const result = {};
    Object.entries(input).forEach(([shipId, { ship, seaZone }]) => {
      result[shipId] = seaZone;
    });
    return result;
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private async returnPieces() {
    // const board = Board.getInstance();
    Company.getInstance().treasuries[MANAGER_OF_SHIPPING].toValue(
      this.args.treasury,
    );
    const india = India.getInstance();
    const enterpriseCardsManager = EnterpriseCardsManager.getInstance();

    [this.placedCompanyShips, this.placedExtraShips].forEach((category) => {
      Object.entries(category).forEach(([shipId, { ship, seaZone }]) => {
        india.getSeaZone(seaZone).removeShip(ship);
        // board.removeShip(shipId, seaZone);
      });
    });
    for (const shipId in this.placedPlayerShips) {
      const { ship, seaZone } = this.placedPlayerShips[shipId];
      const stock = enterpriseCardsManager.shipStocks[ship.id];
      await stock.addCard(ship);
      india.getSeaZone(seaZone).updateCount();
    }
  }

  private async pay(amount: number) {
    this.treasury -= amount;
    Company.getInstance().treasuries[MANAGER_OF_SHIPPING].incValue(-amount);
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

  private addCancelButton() {
    addDangerActionButton({
      id: 'cancel_btn',
      text: _('Cancel'),
      callback: async () => {
        await this.returnPieces();
        this.game.onCancel();
      },
    });
  }
}
