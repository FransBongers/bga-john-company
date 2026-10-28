import {
  AbsolutePosition,
  addCancelButton,
  addConfirmButton,
  addPrimaryActionButton,
  clearPossible,
  debug,
  getPlayerName,
  onClick,
  performAction,
  setSelected,
  updatePageTitle,
} from '../boilerplate';
import {
  BENGAL,
  BENGAL_DELHI_BORDER,
  BENGAL_MARATHA_BORDER,
  BOMBAY,
  BOMBAY_DELHI_BORDER,
  BOMBAY_HYDERABAD_BORDER,
  BOMBAY_MARATHA_BORDER,
  BOMBAY_MYSORE_BORDER,
  BOMBAY_PUNJAB_BORDER,
  BORDERS,
  DELHI,
  DELHI_MARATHA_BORDER,
  DELHI_PUNJAB_BORDER,
  HYDERABAD,
  HYDERABAD_MADRAS_BORDER,
  HYDERABAD_MARATHA_BORDER,
  HYDERABAD_MYSORE_BORDER,
  MADRAS,
  MADRAS_MYSORE_BORDER,
  MARATHA,
  MYSORE,
  PUNJAB,
} from '../constants';
import { CommonStateArgs, GameAlias, GameState } from '../types';
import { getRegionName } from '../utility';

const config: Record<string, AbsolutePosition> = {
  [BENGAL]: { top: 119, left: 773 },
  [BOMBAY]: { top: 252, left: 171 },
  [DELHI]: { top: 58, left: 340 },
  [HYDERABAD]: { top: 428, left: 468 },
  [MADRAS]: { top: 608, left: 495 },
  [MARATHA]: { top: 276, left: 567 },
  [MYSORE]: { top: 700, left: 386 },
  [PUNJAB]: { top: 4, left: 142 },
  [BENGAL_DELHI_BORDER]: { top: 79, left: 696 },
  [BENGAL_MARATHA_BORDER]: { top: 237, left: 682 },
  [BOMBAY_DELHI_BORDER]: { top: 116, left: 297 },
  [BOMBAY_HYDERABAD_BORDER]: { top: 378, left: 316 },
  [BOMBAY_MARATHA_BORDER]: { top: 231, left: 339 },
  [BOMBAY_MYSORE_BORDER]: { top: 523, left: 305 },
  [BOMBAY_PUNJAB_BORDER]: { top: 134, left: 174 },
  [DELHI_MARATHA_BORDER]: { top: 125, left: 528 },
  [DELHI_PUNJAB_BORDER]: { top: 22, left: 282 },
  [HYDERABAD_MADRAS_BORDER]: { top: 546, left: 482 },
  [HYDERABAD_MARATHA_BORDER]: { top: 364, left: 506 },
  [HYDERABAD_MYSORE_BORDER]: { top: 530, left: 395 },
  [MADRAS_MYSORE_BORDER]: { top: 736, left: 442 },
};

interface OnEnteringMoveElephantArgs extends CommonStateArgs {
  options: Record<string, string[]>;
}

export class MoveElephant implements GameState<OnEnteringMoveElephantArgs> {
  private static instance: MoveElephant;
  private args: OnEnteringMoveElephantArgs;

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    MoveElephant.instance = new MoveElephant(game);
  }

  public static getInstance() {
    return MoveElephant.instance;
  }

  onEnteringState(args: OnEnteringMoveElephantArgs) {
    debug('Entering MoveElephant state');
    this.args = args;
    this.createSelectBoxes();
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    this.removeSelectBoxes();
    debug('Leaving MoveElephant state');
  }

  setDescription(activePlayerIds: number[], args: OnEnteringMoveElephantArgs) {
    updatePageTitle(
      _('${tkn_playerName} must move the ${tkn_elephant}'),
      {
        tkn_playerName: getPlayerName(activePlayerIds[0]),
        tkn_elephant: '',
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
    updatePageTitle(
      _('${you} must select a position to move ${tkn_elephant} to'),
      {
        tkn_elephant: '',
      },
    );

    Object.entries(this.args.options).forEach(([key, values]) => {
      onClick(`move-elephant-${key}`, () => {
        if (BORDERS.includes(key)) {
          this.updateInterfaceSelectFacing(key, values);
        } else {
          this.updateInterfaceConfirm(key);
        }
      });
    });
  }

  private updateInterfaceSelectFacing(key: string, facing: string[]) {
    if (facing.length === 1) {
      this.updateInterfaceConfirm(key, facing[0]);
      return;
    }
    clearPossible();
    setSelected(`move-elephant-${key}`);
    updatePageTitle(
      _('${you} must select the region the ${tkn_elephant} will point towards'),
      {
        tkn_elephant: '',
      },
    );

    facing.forEach((regionId) => {
      console.log('facing', regionId);
      addPrimaryActionButton({
        id: `${regionId}-btn`,
        text: getRegionName(regionId),
        callback: () => {
          this.updateInterfaceConfirm(key, regionId);
        },
      });
    });

    addCancelButton();
  }

  private updateInterfaceConfirm(key: string, facing?: string) {
    clearPossible();
    setSelected(`move-elephant-${key}`);
    this.updateConfirmPageTitle(key, facing);

    addConfirmButton(() => {
      performAction('actMoveElephant', {
        locationId: key,
        facing: facing ?? null
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

  private updateConfirmPageTitle(key: string, facing?: string) {
    if (!BORDERS.includes(key)) {
      updatePageTitle(_('Move the ${tkn_elephant} to ${regionName}'), {
        tkn_elephant: '',
        regionName: getRegionName(key),
      });
      return;
    }
    const [regionAId, regionBId] = key.split('_');
    updatePageTitle(
      _(
        'Move the ${tkn_elephant} to the border between ${region1} and ${region2} pointing towards ${region3}?',
      ),
      {
        tkn_elephant: '',
        region1: getRegionName(regionAId),
        region2: getRegionName(regionBId),
        region3: getRegionName(facing ?? ''),
      },
    );
  }

  private createSelectBoxes() {
    const mapElt = document.getElementById('joco-india-map');
    Object.entries(config).forEach(([key, value]) => {
      mapElt.insertAdjacentHTML(
        'beforeend',
        `<div id="move-elephant-${key}" class="joco-move-elephant-select" style="top:${value.top}px; left:${value.left}px;">
          
        </div>`,
      );
    });
  }

  private removeSelectBoxes() {
    Object.keys(config).forEach((key) => {
      const selectBox = document.getElementById(`move-elephant-${key}`);
      if (selectBox) {
        selectBox.remove();
      }
    });
  }
}
