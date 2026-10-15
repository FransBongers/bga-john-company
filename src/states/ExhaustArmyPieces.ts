import { addDangerActionButton, onClick, setSelected } from '../boilerplate';
import { StaticData } from '../static-data';
import { GameAlias, JocoArmyPieceBase, JocoFamilyMember } from '../types';

export class ExhaustArmyPieces<T> {
  protected game: GameAlias;
  protected selectedPieces: {
    officers: string[];
    armyPieces: string[];
  };
  protected presidencyId: string;
  protected armyPieces: Record<string, JocoArmyPieceBase>;
  protected officers?: Record<string, JocoFamilyMember>;

  constructor(game: GameAlias) {
    this.game = game;
  }

  onEnteringState(args: T) {
    this.selectedPieces = {
      officers: [],
      armyPieces: [],
    };
  }

  onLeavingState() {
    this.officers = undefined;
    this.armyPieces = {};
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  protected setSelectablePieces(callback: () => void) {
    Object.entries(this.armyPieces).forEach(([pieceId, piece]) => {
      onClick(pieceId, async () => {
        if (this.selectedPieces.armyPieces.includes(pieceId)) {
          this.selectedPieces.armyPieces =
            this.selectedPieces.armyPieces.filter((id) => id !== pieceId);
          await this.movePiece(pieceId, 'ready');
        } else {
          this.selectedPieces.armyPieces.push(pieceId);
          await this.movePiece(pieceId, 'exhausted');
        }
        callback();
      });
    });

    if (!this.officers) {
      return;
    }

    Object.entries(this.officers).forEach(([pieceId, piece]) => {
      onClick(pieceId, async () => {
        if (this.selectedPieces.officers.includes(pieceId)) {
          this.selectedPieces.officers = this.selectedPieces.officers.filter(
            (id) => id !== pieceId,
          );
          await this.movePiece(pieceId, 'ready');
        } else {
          this.selectedPieces.officers.push(pieceId);
          await this.movePiece(pieceId, 'exhausted');
        }
        callback();
      });
    });
  }

  protected setSelectedPieces() {
    [
      ...this.selectedPieces.armyPieces,
      ...this.selectedPieces.officers,
    ].forEach((pieceId) => {
      setSelected(pieceId);
    });
  }

  protected async movePiece(pieceId: string, targetId: 'ready' | 'exhausted') {
    const targetElement = document.getElementById(
      `army_${this.presidencyId}_${targetId}`,
    ) as HTMLElement;
    await this.game.animationManager.slideAndAttach(
      document.getElementById(pieceId) as HTMLElement,
      targetElement,
    );
  }

  protected getTotalStrength() {
    let strength = this.selectedPieces.officers.length;
    const staticData = StaticData.get();
    this.selectedPieces.armyPieces.forEach((pieceId) => {
      strength += staticData.armyPiece(pieceId).strength;
    });
    return strength;
  }

  protected async returnPieces() {
    const ids = [
      ...this.selectedPieces.armyPieces,
      ...this.selectedPieces.officers,
    ];
    await Promise.all(ids.map((pieceId) => this.movePiece(pieceId, 'ready')));
  }

  protected addCancelButton() {
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
