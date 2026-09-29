import { Bar } from '../bar';
import {
  addCancelButton,
  addConfirmButton,
  addDangerActionButton,
  addPassButton,
  addPrimaryActionButton,
  clearPossible,
  CommonStateArgs,
  debug,
  DISABLED,
  GameState,
  getPlayerName,
  onClick,
  performAction,
  setSelected,
  updatePageTitle,
} from '../boilerplate';
import { StaticData } from '../static-data';
import { GameAlias, JocoArmyPieceBase, JocoFamilyMember } from '../types';
import { getRegionName } from '../utility';

interface OnEnteringCommanderDeployArgs extends CommonStateArgs {
  options: Record<string, number>; // regionId => minimum strength required to deploy there
  armyPieces: Record<string, JocoArmyPieceBase>;
  officers: Record<string, JocoFamilyMember>;
  presidencyId: string;
  regionId: string;
}

export class CommanderDeploy implements GameState<OnEnteringCommanderDeployArgs> {
  private static instance: CommanderDeploy;
  private args: OnEnteringCommanderDeployArgs;
  private targetId: string;
  private selectedPieces: {
    officers: string[];
    armyPieces: string[];
  };

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    CommanderDeploy.instance = new CommanderDeploy(game);
  }

  public static getInstance() {
    return CommanderDeploy.instance;
  }

  onEnteringState(args: OnEnteringCommanderDeployArgs) {
    debug('Entering CommanderDeploy state');
    this.args = args;
    this.selectedPieces = {
      officers: [],
      armyPieces: [],
    };
    this.updateInterfaceInitialStep();
    Bar.getInstance().goTo('joco-india');
  }

  onLeavingState() {
    debug('Leaving CommanderDeploy state');
  }

  setDescription(activePlayerIds: number, args: OnEnteringCommanderDeployArgs) {
    updatePageTitle(_('${tkn_playerName} may deploy'), {
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
    clearPossible();
    updatePageTitle(_('Deploy: ${you} may choose a target'), {});

    Object.entries(this.args.options).forEach(
      ([regionId, requiredStrength]) => {
        addPrimaryActionButton({
          id: `deploy-${regionId}`,
          text: getRegionName(regionId),
          callback: () => {
            this.targetId = regionId;
            this.updateInterfaceSelectArmyPieces();
          },
        });
      },
    );

    addPassButton(this.args.optionalAction, _('Do not deploy'));
  }

  updateInterfaceSelectArmyPieces() {
    clearPossible();

    updatePageTitle(_('Deploy: ${you} must exhaust ready pieces'), {});

    Object.entries(this.args.armyPieces).forEach(([pieceId, piece]) => {
      onClick(pieceId, async () => {
        if (this.selectedPieces.armyPieces.includes(pieceId)) {
          this.selectedPieces.armyPieces =
            this.selectedPieces.armyPieces.filter((id) => id !== pieceId);
          await this.movePiece(pieceId, 'ready');
        } else {
          this.selectedPieces.armyPieces.push(pieceId);
          await this.movePiece(pieceId, 'exhausted');
        }
        this.updateInterfaceSelectArmyPieces();
      });
    });

    Object.entries(this.args.officers).forEach(([pieceId, piece]) => {
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
        this.updateInterfaceSelectArmyPieces();
      });
    });

    this.setSelectedPieces();

    addPrimaryActionButton({
      id: 'done-btb',
      text: _('Done'),
      callback: () => {
        this.updateInterfaceConfirm();
      },
      extraClasses:
        this.getTotalStrength() <= this.args.options[this.targetId]
          ? DISABLED
          : undefined,
    });
    this.addCancelButton();
  }

  updateInterfaceConfirm() {
    clearPossible();

    const numberOfDice =
      this.getTotalStrength() - this.args.options[this.targetId];

    updatePageTitle(
      numberOfDice === 1
        ? _('Deploy to ${regionName} and make a check with ${number} die?')
        : _('Deploy to ${regionName} and make a check with ${number} dice?'),
      {
        regionName: getRegionName(this.targetId),
        number: numberOfDice,
      },
    );
    this.setSelectedPieces();

    addConfirmButton(() =>
      performAction('actCommanderDeploy', {
        regionId: this.targetId,
        armyPieces: this.selectedPieces.armyPieces,
        officers: this.selectedPieces.officers,
      }),
    );
    this.addCancelButton();
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private setSelectedPieces() {
    [
      ...this.selectedPieces.armyPieces,
      ...this.selectedPieces.officers,
    ].forEach((pieceId) => {
      setSelected(pieceId);
    });
  }

  private async movePiece(pieceId: string, targetId: 'ready' | 'exhausted') {
    const targetElement = document.getElementById(
      `army_${this.args.presidencyId}_${targetId}`,
    ) as HTMLElement;
    await this.game.animationManager.slideAndAttach(
      document.getElementById(pieceId) as HTMLElement,
      targetElement,
    );
  }

  private getTotalStrength() {
    let strength = this.selectedPieces.officers.length;
    const staticData = StaticData.get();
    this.selectedPieces.armyPieces.forEach((pieceId) => {
      strength += staticData.armyPiece(pieceId).strength;
    });
    return strength;
  }

  private async returnPieces() {
    const ids = [
      ...this.selectedPieces.armyPieces,
      ...this.selectedPieces.officers,
    ];
    await Promise.all(ids.map((pieceId) => this.movePiece(pieceId, 'ready')));
  }

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
