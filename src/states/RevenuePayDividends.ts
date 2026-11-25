import { Bar } from '../bar';
import {
  debug,
  updatePageTitle,
  getPlayerName,
  addSecondaryActionButton,
  DISABLED,
  addPrimaryActionButton,
  formatStringRecursive,
  addCancelButton,
  clearPossible,
  addConfirmButton,
  performAction,
} from '../boilerplate';
import { COMPANY_TAB } from '../constants';
import { CommonStateArgs, GameState, GameAlias } from '../types';

interface OnEnteringRevenuePayDividendsArgs extends CommonStateArgs {
  costPerDividend: number;
  maxNumberOfDividends: number;
}

export class RevenuePayDividends implements GameState<OnEnteringRevenuePayDividendsArgs> {
  private static instance: RevenuePayDividends;
  private args: OnEnteringRevenuePayDividendsArgs;
  private selectedNumberOfDividends: number;

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    RevenuePayDividends.instance = new RevenuePayDividends(game);
  }

  public static getInstance() {
    return RevenuePayDividends.instance;
  }

  onEnteringState(args: OnEnteringRevenuePayDividendsArgs) {
    debug('Entering RevenuePayDividends state');
    this.args = args;
    this.selectedNumberOfDividends = 0;
    const bar = Bar.getInstance();
    bar.setAttention(COMPANY_TAB);
    this.updateInterfaceInitialStep();
    bar.goTo(COMPANY_TAB);
  }

  onLeavingState() {
    debug('Leaving RevenuePayDividends state');
  }

  setDescription(
    activePlayerIds: number,
    args: OnEnteringRevenuePayDividendsArgs,
  ) {
    updatePageTitle(_('Chairman: ${player_name} may pay dividends'), {
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
    this.game.clearPossible();

    updatePageTitle(
      _(
        'Chairman: ${you} may pay up to ${maxNumber} dividends for £${amount} each',
      ),
      {
        maxNumber: this.args.maxNumberOfDividends,
        amount: this.args.costPerDividend,
      },
    );

    addSecondaryActionButton({
      id: 'minus_btn',
      text: '-',
      callback: () => {
        this.selectedNumberOfDividends--;
        this.updateInterfaceInitialStep();
      },
      extraClasses: this.selectedNumberOfDividends === 0 ? DISABLED : '',
    });

    addSecondaryActionButton({
      id: 'plus_btn',
      text: '+',
      callback: () => {
        this.selectedNumberOfDividends++;
        this.updateInterfaceInitialStep();
      },
      extraClasses:
        this.selectedNumberOfDividends === this.args.maxNumberOfDividends
          ? DISABLED
          : '',
    });

    addPrimaryActionButton({
      id: 'make_check_btn',
      text: formatStringRecursive(_('Pay ${number} dividend(s)'), {
        number: this.selectedNumberOfDividends,
      }),
      callback: () => this.updateInterfaceConfirm(),
    });

    addCancelButton({
      extraClasses: this.selectedNumberOfDividends === 0 ? DISABLED : '',
    });
  }

  private updateInterfaceConfirm() {
    clearPossible();

    if (this.selectedNumberOfDividends === 0) {
      updatePageTitle(_('Do not pay any dividends?'));
    } else {
      updatePageTitle(
        _('Chairman: spend £${amount} to pay ${number} dividend(s)?'),
        {
          number: this.selectedNumberOfDividends,
          amount: this.args.costPerDividend * this.selectedNumberOfDividends,
          tkn_pound: 'pound',
        },
      );
    }

    addConfirmButton(() => {
      performAction('actRevenuePayDividends', {
        numberOfDividends: this.selectedNumberOfDividends,
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
