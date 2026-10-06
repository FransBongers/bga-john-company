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
import { India } from '../india';
import {
  CommonStateArgs,
  GameAlias,
  GameState,
  JocoArmyPieceBase,
  JocoFamilyMember,
} from '../types';

interface OnEnteringMilitaryAffairsTransfersArgs extends CommonStateArgs {
  options: {
    officers: Record<
      string,
      { familyMember: JocoFamilyMember; locations: string[] }
    >;
    regiments: Record<
      string,
      { regiment: JocoArmyPieceBase; locations: string[] }
    >;
  };
  // transfers: {
  //   regiments: Record<
  //     string,
  //     { regiment: JocoArmyPieceBase; from: string; to: string }
  //   >;
  //   officers: Record<
  //     string,
  //     { officer: JocoFamilyMember; from: string; to: string }
  //   >;
  // } | null;
}

export class MilitaryAffairsTransfers implements GameState<OnEnteringMilitaryAffairsTransfersArgs> {
  private static instance: MilitaryAffairsTransfers;
  private args: OnEnteringMilitaryAffairsTransfersArgs;
  private transfers: {
    regiments: Record<
      string,
      { piece: JocoArmyPieceBase; from: string; to: string }
    >;
    officers: Record<
      string,
      { piece: JocoFamilyMember; from: string; to: string }
    >;
  };

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    MilitaryAffairsTransfers.instance = new MilitaryAffairsTransfers(game);
  }

  public static getInstance() {
    return MilitaryAffairsTransfers.instance;
  }

  onEnteringState(args: OnEnteringMilitaryAffairsTransfersArgs) {
    debug('Entering MilitaryAffairsTransfers state');
    this.args = args;
    this.transfers = {
      officers: {},
      regiments: {},
    };
    Bar.getInstance().goTo('joco-india');
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving MilitaryAffairsTransfers state');
  }

  setDescription(
    activePlayerIds: number,
    args: OnEnteringMilitaryAffairsTransfersArgs,
  ) {
    updatePageTitle(_('${tkn_playerName} may make Army transfers'), {
      tkn_playerName: getPlayerName(activePlayerIds[0]),
    });
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
      _('${you} may make up to two Army transfers (${number} remaining)'),
      {
        number: 2 - this.getTransferCount(),
      },
    );

    Object.entries(this.args.options.regiments).forEach(([id, data]) => {
      if (this.transfers.regiments[id]) {
        return;
      }
      onClick(id, () => this.updateInterfaceSelectArmy(data));
    });
    Object.entries(this.args.options.officers).forEach(([id, data]) => {
      if (this.transfers.officers[id]) {
        return;
      }
      onClick(id, () => this.updateInterfaceSelectArmy(data));
    });

    if (this.getTransferCount() > 0) {
      addPrimaryActionButton({
        id: 'done_btn',
        text: _('Done'),
        callback: () => this.updateInterfaceConfirm(),
      });
      this.addCancelButton();
    } else {
      addPassButton(this.args.optionalAction);
    }
  }

  private updateInterfaceSelectArmy({
    familyMember,
    regiment,
    locations,
  }: {
    familyMember?: JocoFamilyMember;
    regiment?: JocoArmyPieceBase;
    locations: string[];
  }) {
    clearPossible();

    setSelected(regiment?.id ?? familyMember.id);
    const id = regiment?.id ?? familyMember.id;
    const type = regiment ? 'regiments' : 'officers';
    const piece = regiment ?? familyMember;

    locations.forEach((to) => {
      const regionId = to.split('_')[2];
      onClick(`ArmyOfPresidency_${regionId}`, async () => {
        const from = regiment ? regiment.location : familyMember.location;
        this.transfers[type][id] = {
          piece,
          from,
          to,
        };
        piece.location = to;
        clearPossible();
        await India.getInstance()
          .getArmy(`Presidency_${regionId}`)
          .addPiece(piece.id);
        this.updateInterfaceInitialStep();
      });
    });

    this.addCancelButton();
  }

  private updateInterfaceConfirm() {
    clearPossible();
    updatePageTitle(_('Confirm transfers'));

    addConfirmButton(() => {
      performAction('actMilitaryAffairsTransfers', {
        transfers: {
          officers: Object.entries(this.transfers.officers).reduce(
            (acc, [id, { to }]) => {
              acc[id] = to;
              return acc;
            },
            {},
          ),
          regiments: Object.entries(this.transfers.regiments).reduce(
            (acc, [id, { to }]) => {
              acc[id] = to;
              return acc;
            },
            {},
          ),
        },
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
      Object.keys(this.transfers.officers).length +
      Object.keys(this.transfers.regiments).length
    );
  }

  private async returnPieces() {
    const india = India.getInstance();

    for (let data of [
      ...Object.values(this.transfers.officers),
      ...Object.values(this.transfers.regiments),
    ]) {
      data.piece.location = data.from;
      await india
        .getArmy(`Presidency_${data.from.split('_')[2]}`)
        .addPiece(data.piece.id);
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
