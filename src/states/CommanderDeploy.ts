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
import { getCommanderTitleForPresidency, getRegionName } from '../utility';
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
    this.armyPieces = this.args.armyPieces;
    this.officers = this.args.officers;
    super.onEnteringState(args);

    this.updateInterfaceInitialStep();
    Bar.getInstance().goTo('joco-india');
  }

  onLeavingState() {
    super.onLeavingState();
    debug('Leaving CommanderDeploy state');
  }

  setDescription(activePlayerIds: number, args: OnEnteringCommanderDeployArgs) {
    updatePageTitle(_('${commander}: ${player_name} may deploy'), {
      commander: getCommanderTitleForPresidency(this.args.presidencyId),
      player_name: getPlayerName(activePlayerIds[0]),
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
    updatePageTitle(_('${commander}: ${you} may choose a target to deploy to'), {
      commander: getCommanderTitleForPresidency(this.args.presidencyId),
    });

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

    updatePageTitle(_('${commander}: ${you} must exhaust ready pieces'), {
      commander: getCommanderTitleForPresidency(this.args.presidencyId),
    });

    this.setSelectablePieces(() => this.updateInterfaceSelectArmyPieces());

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
        ? _('${commander}: deploy to ${regionName} and make a check with ${number} die?')
        : _('${commander}: deploy to ${regionName} and make a check with ${number} dice?'),
      {
        commander: getCommanderTitleForPresidency(this.args.presidencyId),
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
