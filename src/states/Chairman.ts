import { Bar } from '../bar';
import { DISABLED } from '../boilerplate';
import {
  addConfirmButton,
  addDangerActionButton,
  addPrimaryActionButton,
  clearPossible,
  debug,
  getPlayerName,
  onClick,
  performAction,
  setSelected,
  updatePageTitle,
} from '../boilerplate/utility';
import { Company } from '../company';
import { CROWN_PLAYER_ID, PLUS, MINUS } from '../constants';
import { PlayerManager } from '../player-manager';
import { CommonStateArgs, GameAlias, GameState } from '../types';

interface OnEnteringChairmanArgs extends CommonStateArgs {
  debtOptions: {
    currentDebt: number;
    vote: number[];
    noVote: number[];
    requiredShareCount: number;
    promiseCubeCost?: Record<number, number>;
  };
  companyBalance: number;
  initialTreasuries: Record<string, number>;
}

export class Chairman implements GameState<OnEnteringChairmanArgs> {
  private static instance: Chairman;
  private args: OnEnteringChairmanArgs;
  private companyBalance: number;
  private currentDebt: number;
  private crownInGame: boolean;

  constructor(private game: GameAlias) {
    this.crownInGame = this.game.gameOptions.crownEnabled;
  }

  public static create(game: GameAlias) {
    Chairman.instance = new Chairman(game);
  }

  public static getInstance() {
    return Chairman.instance;
  }

  onEnteringState(args: OnEnteringChairmanArgs) {
    debug('Entering Chairman state');
    this.args = args;
    this.companyBalance = args.companyBalance;
    this.currentDebt = args.debtOptions.currentDebt;
    this.updateInterfaceInitialStep();
    Bar.getInstance().goTo('joco-company');
  }

  onLeavingState() {
    debug('Leaving Chairman state');
    this.deactivateTreasuries();
  }

  setDescription(activePlayerIds: number[], args: OnEnteringChairmanArgs) {
    updatePageTitle(
      _(
        '${tkn_playerName} may increase Company Debt and must allocate the Company Balance',
      ),
      {
        tkn_playerName: getPlayerName(activePlayerIds[0]),
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

    this.updatePageTitle();
    this.setupTreasuries();

    const company = Company.getInstance();

    this.args.debtOptions.noVote.forEach((value) => {
      if (value <= this.currentDebt) {
        return;
      }
      const elt = company.getDebtElt(value);
      onClick(elt, () => this.handleDebtClick(value, false));
      elt.setAttribute('data-vote', 'false');
    });
    this.args.debtOptions.vote.forEach((value) => {
      if (
        value <= this.currentDebt ||
        // Player needs to be able to pay crown cost if a value requires a vote
        // TODO: check two player game
        (this.crownInGame && !this.args.debtOptions.promiseCubeCost[value])
      ) {
        return;
      }
      const elt = company.getDebtElt(value);
      onClick(elt, () => this.handleDebtClick(value, true));
      elt.setAttribute('data-vote', 'true');
    });
    addPrimaryActionButton({
      id: 'propose_btn',
      text: _('Propose'),
      callback: () => this.performAction(true),
    });
    addPrimaryActionButton({
      id: 'commit_btn',
      text: _('Commit'),
      callback: () => this.performAction(false),
      extraClasses: this.companyBalance > 0 ? DISABLED : '',
    });
  }

  private udpateInterfaceConfirmVote(value: number) {
    this.deactivateTreasuries();
    clearPossible();
    setSelected(`company-debt-${value}`);

    if (this.crownInGame) {
      updatePageTitle(
        _(
          'Ask Court of Directors for consent to increase Company Debt to ${value}? ${you} will need to pay ${number} ${tkn_promiseCube} to ${tkn_playerName_crown}',
        ),
        {
          value,
          number: this.args.debtOptions.promiseCubeCost[value],
          tkn_promiseCube: 'Promise Cube',
          tkn_playerName_crown: PlayerManager.getInstance()
            .getPlayer(CROWN_PLAYER_ID)
            .getName(),
        },
      );
    } else {
      updatePageTitle(
        _(
          'Ask Court of Directors for consent to increase Company Debt to ${value}?',
        ),
        {
          value,
        },
      );
    }

    addConfirmButton(() => this.performAction(true, value));
    addDangerActionButton({
      id: 'cancel_btn',
      text: _('Cancel'),
      callback: () => this.updateInterfaceInitialStep(),
    });
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private updatePageTitle() {
    // TODO: what if there is no options to increase debt?
    if (this.companyBalance === 0) {
      updatePageTitle(_('${you} may increase Company Debt'));
    } else {
      updatePageTitle(
        _(
          '${you} may increase Company Debt and must allocate the Company Balance (£${balance} remaining)',
        ),
        {
          balance: this.companyBalance,
        },
      );
    }
  }

  private performAction(propose: boolean, debtVote?: number) {
    const treasuries = {};
    Object.entries(this.getTreasuries()).forEach(([office, treasury]) => {
      treasuries[office] = treasury.getValue();
    });

    performAction('actChairman', {
      companyDebt: this.currentDebt,
      debtVote: debtVote ?? null,
      treasuries,
      propose,
    });
  }

  private deactivateTreasuries() {
    Object.entries(this.getTreasuries()).forEach(([office, treasury]) => {
      treasury.setInactive();
    });
  }

  private setupTreasuries() {
    // const interaction = Interaction.use();
    this.checkPlusDisabled();

    Object.entries(this.getTreasuries()).forEach(([office, treasury]) => {
      treasury.setActive();
      this.checkMinusDisabled(office);
      [PLUS, MINUS].forEach((type: 'plus' | 'minus') => {
        onClick(treasury.getButtonElement(type), () =>
          this.handleClick(type, office),
        );
      });
    });
  }

  private checkMinusDisabled(office: string) {
    const treasury = this.getTreasuries()[office];
    if (treasury.getValue() === this.args.initialTreasuries[office]) {
      treasury.disableButton('minus');
    }
  }

  private checkPlusDisabled() {
    const companyHasBalance = this.companyBalance > 0;
    const treasuries = Object.values(this.getTreasuries());

    if (companyHasBalance) {
      treasuries.forEach((treasury) => {
        treasury.enableButton(PLUS);
      });
      return;
    } else {
      treasuries.forEach((treasury) => {
        treasury.disableButton(PLUS);
      });
    }
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

  private async updateCompanyBalance(value: number) {
    const company = Company.getInstance();
    const increase = value - this.currentDebt;
    clearPossible();
    this.currentDebt = value;
    this.companyBalance += increase * 5;
    company.updateCompanyDebt(this.currentDebt);
    company.balance.toValue(this.companyBalance);
  }

  private async handleDebtClick(value: number, requiresVote: boolean) {
    if (requiresVote) {
      // update Balance to highest value without votes
      const noVoteOptionCount = this.args.debtOptions.noVote.length;
      const noVoteValue =
        noVoteOptionCount > 0
          ? this.args.debtOptions.noVote[noVoteOptionCount - 1]
          : 0;
      if (noVoteValue > this.currentDebt) {
        await this.updateCompanyBalance(noVoteValue);
      }
      this.udpateInterfaceConfirmVote(value);
    } else {
      await this.updateCompanyBalance(value);
      this.updateInterfaceInitialStep();
    }
  }

  private async handleClick(type: 'plus' | 'minus', office: string) {
    const treasury = this.getTreasuries()[office];
    if (type === 'plus' && this.companyBalance > 0) {
      this.companyBalance--;
      treasury.plus();
      treasury.enableButton('minus');
      this.checkPlusDisabled();
      Company.getInstance().incBalance(-1);
      // board.movePawn('balance', this.companyBalance);
    } else if (
      type === 'minus' &&
      treasury.getValue() > this.args.initialTreasuries[office]
    ) {
      treasury.minus();
      this.checkMinusDisabled(office);
      this.companyBalance++;

      this.checkPlusDisabled();
      Company.getInstance().incBalance(1);
    }
    this.updateInterfaceInitialStep();
  }

  private getTreasuries() {
    const company = Company.getInstance();
    return company.treasuries;
  }
}
