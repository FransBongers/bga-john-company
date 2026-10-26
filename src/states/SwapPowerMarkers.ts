import { Bar } from '../bar';
import {
  addCancelButton,
  addConfirmButton,
  debug,
  getPlayerName,
  onClick,
  performAction,
  setSelected,
  updatePageTitle,
} from '../boilerplate';
import { CommonStateArgs, GameAlias, GameState } from '../types';

interface OnEnteringSwapPowerMarkersArgs extends CommonStateArgs {
  options: Record<string, string[]>;
}

export class SwapPowerMarkers implements GameState<OnEnteringSwapPowerMarkersArgs> {
  private static instance: SwapPowerMarkers;
  private args: OnEnteringSwapPowerMarkersArgs;
  private selected = [];

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    SwapPowerMarkers.instance = new SwapPowerMarkers(game);
  }

  public static getInstance() {
    return SwapPowerMarkers.instance;
  }

  onEnteringState(args: OnEnteringSwapPowerMarkersArgs) {
    debug('Entering SwapPowerMarkers state');
    this.args = args;
    this.selected = [];
    this.updateInterfaceInitialStep();
    Bar.getInstance().goTo('joco-parliament');
  }

  onLeavingState() {
    debug('Leaving SwapPowerMarkers state');
  }

  setDescription(
    activePlayerIds: number[],
    args: OnEnteringSwapPowerMarkersArgs,
  ) {
    updatePageTitle(_('${tkn_playerName} must swap Power markers'), {
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
    updatePageTitle(_('${you} must choose two Power markers to swap'), {});

    this.selected.forEach((marker) => {
      setSelected(`joco-power-marker-${marker}`);
    });

    const selectable =
      this.selected.length === 1
        ? [this.selected[0], ...(this.args.options[this.selected[0]] ?? [])]
        : Object.keys(this.args.options);

    selectable.forEach((marker) => {
      onClick(`joco-power-marker-${marker}`, () => {
        if (this.selected.includes(marker)) {
          this.selected = this.selected.filter((m) => m !== marker);
        } else {
          this.selected.push(marker);
        }
        if (this.selected.length === 2) {
          this.updateInterfaceConfirm();
        } else {
          this.updateInterfaceInitialStep();
        }
      });
    });
  }

  private updateInterfaceConfirm() {
    this.game.clearPossible();
    updatePageTitle(_('Swap ${tkn_powerMarker} and ${tkn_powerMarker_2}?'), {
      tkn_powerMarker: this.selected[0],
      tkn_powerMarker_2: this.selected[1],
    });

    this.selected.forEach((marker) => {
      setSelected(`joco-power-marker-${marker}`);
    });

    addConfirmButton(() => {
      performAction('actSwapPowerMarkers', {
        selectedPowerMarkers: this.selected,
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
