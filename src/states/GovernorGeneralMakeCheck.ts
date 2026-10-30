import {
  addCancelButton,
  addConfirmButton,
  addPassButton,
  addPrimaryActionButton,
  addSecondaryActionButton,
  clearPossible,
  CommonStateArgs,
  debug,
  DISABLED,
  formatStringRecursive,
  GameState,
  getPlayerName,
  performAction,
  updatePageTitle,
} from '../boilerplate';
import { GameAlias } from '../types';

interface OnEnteringGovernorGeneralMakeCheckArgs extends CommonStateArgs {
  treasury: number;
}

export class GovernorGeneralMakeCheck implements GameState<OnEnteringGovernorGeneralMakeCheckArgs> {
  private static instance: GovernorGeneralMakeCheck;
  private args: OnEnteringGovernorGeneralMakeCheckArgs;
  private spend: number;

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    GovernorGeneralMakeCheck.instance = new GovernorGeneralMakeCheck(game);
  }

  public static getInstance() {
    return GovernorGeneralMakeCheck.instance;
  }

  onEnteringState(args: OnEnteringGovernorGeneralMakeCheckArgs) {
    debug('Entering GovernorGeneralMakeCheck state');
    this.args = args;

    this.spend = 0;
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving GovernorGeneralMakeCheck state');
  }

  setDescription(
    activePlayerIds: number[],
    args: OnEnteringGovernorGeneralMakeCheckArgs,
  ) {
    updatePageTitle(_('Governor General: ${tkn_playerName} may make a check'), {
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

    const available = this.args.treasury - this.spend;

    updatePageTitle(_('Governor General: ${you} may spend £1 per die'), {
      available,
    });

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

    updatePageTitle(_('Governor General: make a check with ${number} dice?'), {
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
    performAction('actGovernorGeneralMakeCheck', {
      spend: this.spend,
      makeCheck,
    });
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...
}
