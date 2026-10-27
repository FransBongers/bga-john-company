import {
  addCancelButton,
  addConfirmButton,
  clearPossible,
  CommonStateArgs,
  debug,
  GameState,
  onClick,
  performAction,
  setSelected,
  updatePageTitle,
} from '../boilerplate';
import {
  GameAlias,
  JocoArmyPieceBase,
  JocoFamilyMember,
  JocoShipBase,
} from '../types';

interface OnEnteringWarAgainstFranceArgs extends CommonStateArgs {
  regiments: JocoArmyPieceBase[];
  officers: JocoFamilyMember[];
  ships: JocoShipBase[];
  requiredShips: number;
  requiredOfficersAndRegiments: number;
}

export class WarAgainstFrance implements GameState<OnEnteringWarAgainstFranceArgs> {
  private static instance: WarAgainstFrance;
  private args: OnEnteringWarAgainstFranceArgs;
  private selectedOfficersAndRegiments: string[] = [];
  private selectedShips: string[] = [];

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    WarAgainstFrance.instance = new WarAgainstFrance(game);
  }

  public static getInstance() {
    return WarAgainstFrance.instance;
  }

  onEnteringState(args: OnEnteringWarAgainstFranceArgs) {
    debug('Entering WarAgainstFrance state');
    this.args = args;
    this.selectedOfficersAndRegiments = [];
    this.selectedShips = [];
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving WarAgainstFrance state');
  }

  setDescription(
    activePlayerIds: number,
    args: OnEnteringWarAgainstFranceArgs,
  ) {}

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

    const { requiredOfficersAndRegiments } = this.args;
    if (
      this.selectedOfficersAndRegiments.length === requiredOfficersAndRegiments
    ) {
      this.updateInterfaceSelectShips();
      return;
    }

    updatePageTitle(
      _(
        '${you} must select officers/regiments to return to the supply (${remaining} remaining)',
      ),
      {
        remaining:
          requiredOfficersAndRegiments -
          this.selectedOfficersAndRegiments.length,
      },
    );

    this.setSelectable(
      [...this.args.regiments, ...this.args.officers],
      this.selectedOfficersAndRegiments,
      requiredOfficersAndRegiments,
      '',
      () => this.updateInterfaceInitialStep(),
    );
    this.setSelectedElements();
    addCancelButton();
  }

  private updateInterfaceSelectShips() {
    clearPossible();

    const { requiredShips } = this.args;
    if (this.selectedShips.length === requiredShips) {
      this.updateInterfaceConfirm();
      return;
    }

    updatePageTitle(
      _(
        '${you} must select ships to return to the supply (${remaining} remaining)',
      ),
      {
        remaining: requiredShips - this.selectedShips.length,
      },
    );

    this.setSelectable(
      this.args.ships,
      this.selectedShips,
      requiredShips,
      'ship-',
      () => this.updateInterfaceSelectShips(),
    );
    this.setSelectedElements();
    addCancelButton();
  }

  private setSelectedElements() {
    this.selectedOfficersAndRegiments.forEach((id) => setSelected(id));
    this.selectedShips.forEach((id) => setSelected(`ship-${id}`));
  }

  private setSelectable(
    pieces: { id: string }[],
    selected: string[],
    required: number,
    prefix: string,
    callback: () => void,
  ) {
    pieces.forEach(({ id }) => {
      const isSelected = selected.includes(id);
      if (!isSelected && selected.length >= required) {
        return;
      }
      onClick(`${prefix}${id}`, () => {
        if (isSelected) {
          selected.splice(selected.indexOf(id), 1);
        } else {
          selected.push(id);
        }
        callback();
      });
    });
  }

  private updateInterfaceConfirm() {
    clearPossible();
    updatePageTitle(_('Return selected pieces to the supply?'), {});
    this.setSelectedElements();
    addConfirmButton(() => {
      performAction('actWarAgainstFrance', {
        officersAndRegiments: this.selectedOfficersAndRegiments,
        ships: this.selectedShips,
      });
    });
    addCancelButton();
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...
}
