import { Bar } from '../bar';
import {
  debug,
  updatePageTitle,
  getPlayerName,
  addPrimaryActionButton,
  addSecondaryActionButton,
  addCancelButton,
  addConfirmButton,
  addPassButton,
  clearPossible,
  performAction,
  formatStringRecursive,
  DISABLED,
  CommonStateArgs,
} from '../boilerplate';
import { GameState } from '../boilerplate';
import { COMPANY_TAB } from '../constants';
import { GameAlias } from '../types';

interface OnEnteringDirectorOfTradeSpecialEnvoyArgs extends CommonStateArgs {
  treasury: number;
  proposal: number | null;
}

export class DirectorOfTradeSpecialEnvoy implements GameState<OnEnteringDirectorOfTradeSpecialEnvoyArgs> {
  private static instance: DirectorOfTradeSpecialEnvoy;
  private args: OnEnteringDirectorOfTradeSpecialEnvoyArgs;
  private spend: number;

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    DirectorOfTradeSpecialEnvoy.instance = new DirectorOfTradeSpecialEnvoy(
      game,
    );
  }

  public static getInstance() {
    return DirectorOfTradeSpecialEnvoy.instance;
  }

  onEnteringState(args: OnEnteringDirectorOfTradeSpecialEnvoyArgs) {
    debug('Entering DirectorOfTradeSpecialEnvoy state');
    this.args = args;
    this.spend = args.proposal || 0;
    const bar = Bar.getInstance();
    bar.setAttention(COMPANY_TAB);
    this.updateInterfaceInitialStep();
    bar.goTo(COMPANY_TAB);
  }

  onLeavingState() {
    Bar.getInstance().clearAttention();
    debug('Leaving DirectorOfTradeSpecialEnvoy state');
  }

  setDescription(
    activePlayerIds: number,
    args: OnEnteringDirectorOfTradeSpecialEnvoyArgs,
  ) {
    if (args.proposal > 0) {
      updatePageTitle(
        _(
          'Director of Trade: ${player_name} proposes to spend £${amount} to make a check',
        ),
        {
          player_name: getPlayerName(activePlayerIds[0]),
          amount: args.proposal,
          tkn_pound: 'pound',
        },
      );
    } else if (args.proposal === 0) {
      updatePageTitle(
        _('Director of Trade: ${player_name} proposes not to make a check'),
        {
          player_name: getPlayerName(activePlayerIds[0]),
        },
      );
    } else {
      updatePageTitle(
        _('Director of Trade: ${player_name} may make a check'),
        {
          player_name: getPlayerName(activePlayerIds[0]),
        },
      );
    }
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

    const available = this.args.treasury - this.spend;

    updatePageTitle(
      _('Director of Trade: ${you} may spend £1 per die to make a check'),
      {
        available,
      },
    );

    addSecondaryActionButton({
      id: 'minus_btn',
      text: '-',
      callback: () => {
        this.spend--;
        this.updateInterfaceInitialStep();
      },
      extraClasses: this.spend === 0 ? DISABLED : '',
    });

    addPrimaryActionButton({
      id: 'make_check_btn',
      text: formatStringRecursive(_('Roll ${number} dice'), {
        number: this.spend,
      }),
      callback: () => this.updateInterfaceConfirm(),
      extraClasses: this.spend === 0 ? DISABLED : '',
    });

    addSecondaryActionButton({
      id: 'plus_btn',
      text: '+',
      callback: () => {
        this.spend++;
        this.updateInterfaceInitialStep();
      },
      extraClasses: available === 0 ? DISABLED : '',
    });

    // addPrimaryActionButton({
    //   id: 'propose_btn',
    //   text: _('Propose'),
    //   callback: () => this.performAction(false),
    // });
    // addCancelButton();
    addPassButton(this.args.optionalAction);
  }

  private updateInterfaceConfirm() {
    clearPossible();

    updatePageTitle(_('Director of Trade: make a check with ${number} dice?'), {
      number: this.spend,
    });

    addConfirmButton(() => this.performAction(true));
    addCancelButton();
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private performAction(makeCheck: boolean = false) {
    performAction('actDirectorOfTradeSpecialEnvoy', {
      spend: this.spend,
      makeCheck,
    });
  }

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
