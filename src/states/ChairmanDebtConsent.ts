import {
  addDangerActionButton,
  addPrimaryActionButton,
  debug,
  getPlayerName,
  performAction,
  updatePageTitle,
} from '../boilerplate/utility';
import { Bar } from '../bar';
import { COMPANY_TAB } from '../constants';
import { SHARE } from '../constants';
import { CommonStateArgs, GameAlias, GameState } from '../types';

interface OnEnteringChairmanDebtConsentArgs extends CommonStateArgs {
  chairmanPlayerId: number;
  debt: number;
  remainingVotesRequired: number;
}

export class ChairmanDebtConsent implements GameState<OnEnteringChairmanDebtConsentArgs> {
  private static instance: ChairmanDebtConsent;
  private args: OnEnteringChairmanDebtConsentArgs;

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    ChairmanDebtConsent.instance = new ChairmanDebtConsent(game);
  }

  public static getInstance() {
    return ChairmanDebtConsent.instance;
  }

  onEnteringState(args: OnEnteringChairmanDebtConsentArgs) {
    debug('Entering ChairmanDebtConsent state');
    this.args = args;
    const bar = Bar.getInstance();
    bar.setAttention(COMPANY_TAB);
    this.updateInterfaceInitialStep();
    bar.goTo(COMPANY_TAB);
  }

  onLeavingState() {
    Bar.getInstance().clearAttention();
    debug('Leaving ChairmanDebtConsent state');
  }

  setDescription(
    activePlayerIds: number,
    args: OnEnteringChairmanDebtConsentArgs,
  ) {
    this.args = args;
    updatePageTitle(
      _('Other players may give consent to increase Company Debt to ${value}'),
      {
        value: this.args.debt,
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
      _(
        '${tkn_playerName} asks for your consent to increase Company Debt to ${value} (${required} more ${tkn_icon} required)',
      ),
      {
        value: this.args.debt,
        tkn_playerName: getPlayerName(this.args.chairmanPlayerId),
        required: this.args.remainingVotesRequired,
        tkn_icon: SHARE,
      },
    );
    // setSelected(
    //   Board.getInstance().ui.selectBoxes[`companyDebt_${this.args.debt}`],
    // );
    addPrimaryActionButton({
      id: 'consent_btn',
      text: _('Give consent'),
      callback: () => this.performAction(true),
    });
    addDangerActionButton({
      id: 'no_consent_btn',
      text: _('Do not give consent'),
      callback: () => this.performAction(false),
    });
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private performAction(yay: boolean) {
    performAction('actChairmanDebtConsent', {
      consent: yay,
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
