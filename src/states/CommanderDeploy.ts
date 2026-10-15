import { Bar } from '../bar';
import {
  addConfirmButton,
  addPassButton,
  addPrimaryActionButton,
  clearPossible,
  CommonStateArgs,
  debug,
  DISABLED,
  GameState,
  getPlayerName,
  performAction,
  updatePageTitle,
} from '../boilerplate';
import { GameAlias, JocoArmyPieceBase, JocoFamilyMember } from '../types';
import { getRegionName } from '../utility';
import { ExhaustArmyPieces } from './ExhaustArmyPieces';

interface OnEnteringCommanderDeployArgs extends CommonStateArgs {
  options: Record<string, number>; // regionId => minimum strength required to deploy there
  armyPieces: Record<string, JocoArmyPieceBase>;
  officers: Record<string, JocoFamilyMember>;
  presidencyId: string;
  regionId: string;
}

export class CommanderDeploy
  extends ExhaustArmyPieces<OnEnteringCommanderDeployArgs>
  implements GameState<OnEnteringCommanderDeployArgs>
{
  private static instance: CommanderDeploy;
  private args: OnEnteringCommanderDeployArgs;
  private targetId: string;

  constructor(game: GameAlias) {
    super(game);
  }

  public static create(game: GameAlias) {
    CommanderDeploy.instance = new CommanderDeploy(game);
  }

  public static getInstance() {
    return CommanderDeploy.instance;
  }

  onEnteringState(args: OnEnteringCommanderDeployArgs) {
    debug('Entering CommanderDeploy state');
    this.args = args;
    this.presidencyId = this.args.presidencyId;
    super.onEnteringState(args);

    this.updateInterfaceInitialStep();
    Bar.getInstance().goTo('joco-india');
  }

  onLeavingState() {
    super.onLeavingState();
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

    this.setSelectablePieces(() => this.updateInterfaceConfirm());

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
}
