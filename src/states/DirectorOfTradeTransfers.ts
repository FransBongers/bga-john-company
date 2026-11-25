// import { Board } from '../board';
import { Bar } from '../bar';
import {
  debug,
  updatePageTitle,
  getPlayerName,
  onClick,
  addPrimaryActionButton,
  addPassButton,
  clearPossible,
  setSelected,
  addConfirmButton,
  performAction,
  addDangerActionButton,
} from '../boilerplate';
import { INDIA_TAB } from '../constants';
import { India } from '../india';
import {
  CommonStateArgs,
  GameAlias,
  GameState,
  JocoFamilyMember,
  JocoShipBase,
} from '../types';
import { getSeaName } from '../utility';

interface OnEnteringDirectorOfTradeTransfersArgs extends CommonStateArgs {
  options: {
    ships: Record<
      string,
      {
        ship: JocoShipBase;
        locations: string[];
      }
    >;
    writers: Record<
      string,
      {
        familyMember: JocoFamilyMember;
        locations: string[];
      }
    >;
  };
  transfers: {
    ships: Record<string, { ship: JocoShipBase; from: string; to: string }>;
    writers: Record<
      string,
      { writer: JocoFamilyMember; from: string; to: string }
    >;
  } | null;
}

export class DirectorOfTradeTransfers implements GameState<OnEnteringDirectorOfTradeTransfersArgs> {
  private static instance: DirectorOfTradeTransfers;
  private args: OnEnteringDirectorOfTradeTransfersArgs;
  private transfers: {
    ships: Record<string, { ship: JocoShipBase; from: string; to: string }>;
    writers: Record<
      string,
      { writer: JocoFamilyMember; from: string; to: string }
    >;
  };

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    DirectorOfTradeTransfers.instance = new DirectorOfTradeTransfers(game);
  }

  public static getInstance() {
    return DirectorOfTradeTransfers.instance;
  }

  onEnteringState(args: OnEnteringDirectorOfTradeTransfersArgs) {
    debug('Entering DirectorOfTradeTransfers state');
    this.args = args;
    this.transfers = args.transfers ?? {
      ships: {},
      writers: {},
    };

    const bar = Bar.getInstance();
    bar.setAttention(INDIA_TAB);
    this.updateInterfaceInitialStep();
    bar.goTo(INDIA_TAB);
  }

  onLeavingState() {
    Bar.getInstance().clearAttention();
    debug('Leaving DirectorOfTradeTransfers state');
  }

  setDescription(
    activePlayerIds: number,
    args: OnEnteringDirectorOfTradeTransfersArgs,
  ) {
    updatePageTitle(
      _('Director of Trade: ${player_name} may transfer writers or ships'),
      {
        player_name: getPlayerName(activePlayerIds[0]),
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

    const transferCount = this.getTransferCount();
    if (transferCount === 2) {
      this.updateInterfaceConfirm();
      return;
    }

    updatePageTitle(
      _(
        'Director of Trade: ${you} may transfer up to two writers or ships (${number} remaining)',
      ),
      {
        number: 2 - this.getTransferCount(),
      },
    );
    // const board = Board.getInstance();
    Object.entries(this.args.options.writers).forEach(([id, data]) =>
      onClick(id, () => this.updateInterfaceSelectPresidency(data)),
    );

    Object.entries(this.args.options.ships).forEach(([id, data]) =>
      onClick(`ship-${id}`, () => this.updateInterfaceSelectSeaZone(data)),
    );

    if (this.getTransferCount() > 0) {
      addPrimaryActionButton({
        id: 'done_btn',
        text: _('Done'),
        callback: () => this.updateInterfaceConfirm(),
      });
      this.addCancelButton();
    } else {
      addPassButton(this.args.optionalAction, _('Do not make any transfers'));
    }
  }

  private updateInterfaceSelectPresidency({
    familyMember: writer,
    locations,
  }: {
    familyMember: JocoFamilyMember;
    locations: string[];
  }) {
    clearPossible();
    // const board = Board.getInstance();
    const writerElt = document.getElementById(writer.id)!;
    setSelected(writerElt);

    updatePageTitle(_('Director of Trade: ${you} must select a Presidency'));

    locations.forEach((newLocation) => {
      const presidencyId = newLocation.split('_')[1];

      onClick(presidencyId, async () => {
        clearPossible();
        this.transfers.writers[writer.id] = {
          writer,
          from: writer.location,
          to: newLocation,
        };
        await this.game.animationManager.slideAndAttach(
          writerElt,
          document.getElementById(newLocation),
        );
        this.updateInterfaceInitialStep();
      });
    });

    this.addCancelButton();
  }

  private updateInterfaceSelectSeaZone({
    ship,
    locations,
  }: {
    ship: JocoShipBase;
    locations: string[];
  }) {
    clearPossible();

    updatePageTitle(_('Director of Trade: ${you} must select a sea zone'));
    setSelected(`ship-${ship.id}`);
    const india = India.getInstance();

    locations.forEach((seaZone) => {
      addPrimaryActionButton({
        id: `${seaZone}-btn`,
        text: getSeaName(seaZone),
        callback: async () => {
          clearPossible();
          const from = ship.location;
          ship.location = seaZone;
          this.transfers.ships[ship.id] = {
            from,
            to: seaZone,
            ship,
          };
          await india.getSeaZone(seaZone).addShip(ship, from);
          this.updateInterfaceInitialStep();
        },
      });
      // onClick(seaZone, async () => {
      //   clearPossible();
      //   const from = ship.location;
      //   ship.location = seaZone;
      //   this.transfers.ships[ship.id] = {
      //     from,
      //     to: seaZone,
      //     ship,
      //   };
      //   await india.getSeaZone(seaZone).addShip(ship);
      //   this.updateInterfaceInitialStep();
      // });
    });
    this.addCancelButton();
  }

  private updateInterfaceConfirm() {
    clearPossible();
    updatePageTitle(_('Director of Trade: confirm transfers?'));

    addConfirmButton(() => {
      performAction('actDirectorOfTradeTransfers', {
        transfers: this.transfers,
      });
    });
    this.addCancelButton();
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private getTransferCount() {
    return (
      Object.keys(this.transfers.ships).length +
      Object.keys(this.transfers.writers).length
    );
  }

  private async returnPieces() {
    // const board = Board.getInstance();
    const india = India.getInstance();
    for (let data of Object.values(this.transfers.ships)) {
      data.ship.location = data.from;
      await india.getSeaZone(data.from).addShip(data.ship, data.to);
    }
    for (let data of Object.values(this.transfers.writers)) {
      await this.game.animationManager.slideAndAttach(
        document.getElementById(data.writer.id),
        document.getElementById(data.from),
      );
    }
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
