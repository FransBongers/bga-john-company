import { Bar } from '../bar';
import {
  addCancelButton,
  addConfirmButton,
  addPrimaryActionButton,
  clearPossible,
  CommonStateArgs,
  debug,
  GameState,
  performAction,
  setSelected,
  updatePageTitle,
} from '../boilerplate';
import { BLACKMAIL, SHARE, SHIPYARD, WORKSHOP } from '../constants';
import { GameAlias, JocoFamilyMember } from '../types';

interface OnEnteringTradeOrDiscardItemsArgs extends CommonStateArgs {
  source: string;
  type: 'Share';
  _private?: {
    Share?: JocoFamilyMember[];
  };
}

export class TradeOrDiscardItems implements GameState<OnEnteringTradeOrDiscardItemsArgs> {
  private static instance: TradeOrDiscardItems;
  private args: OnEnteringTradeOrDiscardItemsArgs;

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    TradeOrDiscardItems.instance = new TradeOrDiscardItems(game);
  }

  public static getInstance() {
    return TradeOrDiscardItems.instance;
  }

  onEnteringState(args: OnEnteringTradeOrDiscardItemsArgs) {
    debug('Entering TradeOrDiscardItems state');
    this.args = args;
    this.updateInterfaceInitialStep();
    const bar = Bar.getInstance();
    if (this.args.type === SHARE) {
      bar.goTo('joco-company');
    }
  }

  onLeavingState() {
    debug('Leaving TradeOrDiscardItems state');
  }

  setDescription(
    activePlayerIds: number,
    args: OnEnteringTradeOrDiscardItemsArgs,
  ) {
    updatePageTitle(
      args.type === SHARE
        ? _(
            '${source}: ${actplayer} must trade or remove their ${type}',
          )
        : _('${source}: ${actplayer} must trade or discard their ${type}'),
      {
        type: this.getTypeText(args.type),
        source: _(args.source),
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
    clearPossible();

    this.args._private[this.args.type].forEach((item) => {
      setSelected(item.id);
    });

    updatePageTitle(
      this.args.type === SHARE
        ? _('${source}: ${you} must trade or remove your ${type}')
        : _('${source}: ${you} must trade or discard your ${type}'),
      {
        type: this.getTypeText(this.args.type),
        source: _(this.args.source),
      },
    );

    addPrimaryActionButton({
      id: 'done-btn',
      text: _('Done'),
      callback: () => {
        this.updateInterfaceConfirm();
      },
    });
  }

  private updateInterfaceConfirm() {
    clearPossible();
    const remainingItems = this.args._private[this.args.type].length;
    if (remainingItems === 0) {
      performAction('actTradeOrDiscardItems', {});
      return;
    }

    updatePageTitle(
      this.args.type === SHARE
        ? _('Remove remaining ${number} Company share(s)?')
        : _('Discard remaining ${number} ${type}?'),
      {
        type: this.getTypeText(this.args.type),
        number: remainingItems,
      },
    );

    addConfirmButton(() => {
      performAction('actTradeOrDiscardItems', {});
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

  private getTypeText(type: string): string {
    switch (type) {
      case SHARE:
        return _('Company share(s)');
      case BLACKMAIL:
        return _('Blackmail card(s)');
      case WORKSHOP:
        return _('workshop(s)');
      case SHIPYARD:
        return _('shipyard(s)');
      default:
        return type;
    }
  }
}
