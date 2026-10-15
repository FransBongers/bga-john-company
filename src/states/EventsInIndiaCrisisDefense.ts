// import { Board } from '../board';
import {
  addConfirmButton,
  clearPossible,
  debug,
  getPlayerName,
  performAction,
  updatePageTitle,
} from '../boilerplate/utility';
import { ExhaustArmyPieces } from './ExhaustArmyPieces';
import { GameState, JocoArmyPieceBase, JocoFamilyMember } from '../types';
import { CommonStateArgs, GameAlias } from '../types';
import { Bar } from '../bar';

interface OnEnteringEventsInIndiaCrisisDefenseArgs extends CommonStateArgs {
  armyPieces: Record<string, JocoArmyPieceBase>;
  officers: Record<string, JocoFamilyMember>;
  attackerStrength: number;
  presidencyId: string;
}

export class EventsInIndiaCrisisDefense
  extends ExhaustArmyPieces<OnEnteringEventsInIndiaCrisisDefenseArgs>
  implements GameState<OnEnteringEventsInIndiaCrisisDefenseArgs>
{
  private static instance: EventsInIndiaCrisisDefense;
  private args: OnEnteringEventsInIndiaCrisisDefenseArgs;

  constructor(protected game: GameAlias) {
    super(game);
  }

  public static create(game: GameAlias) {
    EventsInIndiaCrisisDefense.instance = new EventsInIndiaCrisisDefense(game);
  }

  public static getInstance() {
    return EventsInIndiaCrisisDefense.instance;
  }

  onEnteringState(args: OnEnteringEventsInIndiaCrisisDefenseArgs) {
    debug('Entering EventsInIndiaCrisisDefense state');
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
    debug('Leaving EventsInIndiaCrisisDefense state');
  }

  setDescription(
    activePlayerIds: number,
    args: OnEnteringEventsInIndiaCrisisDefenseArgs,
  ) {
    updatePageTitle(_('${tkn_playerName} must exhaust defenders'), {
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

    const selectedStrength = this.getTotalStrength();
    const remainingStrength = this.args.attackerStrength - selectedStrength;

    if (remainingStrength <= 0 || this.selectedPieces.armyPieces.length === Object.keys(this.armyPieces).length) {
      this.updateInterfaceConfirm();
      return;
    }

    updatePageTitle(
      _('Mount Defense: ${you} must exhaust defenders (${strength} strength remaining)'),
      {
        strength: remainingStrength,
      },
    );

    this.setSelectablePieces(() => this.updateInterfaceInitialStep());

    this.setSelectedPieces();

    if (selectedStrength > 0) {
      this.addCancelButton();
    }
  }

  private updateInterfaceConfirm() {
    clearPossible();

    this.setSelectedPieces();

    updatePageTitle(_('Mount Defense with selected pieces?'));

    addConfirmButton(() =>
      performAction('actEventsInIndiaCrisisDefense', {
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
