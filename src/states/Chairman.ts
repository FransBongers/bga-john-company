interface OnEnteringChairmanArgs extends CommonStateArgs {
  debtOptions: {
    currentDebt: number;
    vote: number[];
    noVote: number[];
    requiredShareCount: number;
  };
  companyBalance: number;
  initialTreasuries: Record<string, number>;
}

class Chairman implements State {
  private static instance: Chairman;
  private args: OnEnteringChairmanArgs;
  private companyBalance: number;
  private currentDebt: number;

  constructor(private game: GameAlias) {}

  public static create(game: JohnCompany) {
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
  }

  onLeavingState() {
    debug('Leaving Chairman state');
    this.deactivateTreasuries();
  }

  setDescription(activePlayerIds: number[], args: OnEnteringChairmanArgs) {
    console.log('setDescription Chairman')
    updatePageTitle(
      _(
        '${tkn_playerName} may increase Company Debt and must allocate the Company Balance'
      ),
      {
        tkn_playerName: getPlayerName(activePlayerIds[0]),
      },
      true
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

    const board = Board.getInstance();
    const interaction = Interaction.use();

    this.args.debtOptions.noVote.forEach((value) => {
      if (value <= this.currentDebt) {
        return;
      }
      const elt = board.selectBoxes[`companyDebt_${value}`];
      interaction.onClick(elt, () => this.handleDebtClick(value, false));
      elt.setAttribute('data-vote', 'false');
    });
    this.args.debtOptions.vote.forEach((value) => {
      if (value <= this.currentDebt) {
        return;
      }
      const elt = board.selectBoxes[`companyDebt_${value}`];
      interaction.onClick(elt, () => this.handleDebtClick(value, true));
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
    setSelected(Board.getInstance().selectBoxes[`companyDebt_${value}`]);

    updatePageTitle(
      _(
        'Ask Court of Directors for consent to increase Company Debt to ${value}?'
      ),
      {
        value,
      }
    );

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
          '${you} may increase Company Debt and must allocate the Company Balance'
        )
      );
    }
  }

  private performAction(propose: boolean, debtVote?: number) {
    const treasuries = {};
    Object.entries(Board.getInstance().treasuries).forEach(
      ([office, treasury]) => {
        treasuries[office] = treasury.getValue();
      }
    );

    performAction('actChairman', {
      companyDebt: this.currentDebt,
      debtVote: debtVote ?? null,
      treasuries,
      propose,
    });
  }

  private deactivateTreasuries() {
    Object.entries(Board.getInstance().treasuries).forEach(
      ([office, treasury]) => {
        treasury.setInactive();
      }
    );
  }

  private setupTreasuries() {
    const interaction = Interaction.use();
    this.checkPlusDisabled();
    Object.entries(Board.getInstance().treasuries).forEach(
      ([office, treasury]) => {
        treasury.setActive();
        this.checkMinusDisabled(office);
        [PLUS, MINUS].forEach((type: 'plus' | 'minus') => {
          interaction.onClick(treasury.getButtonElement(type), () =>
            this.handleClick(type, office)
          );
        });
      }
    );
  }

  private checkMinusDisabled(office: string) {
    const treasury = Board.getInstance().treasuries[office];
    if (treasury.getValue() === this.args.initialTreasuries[office]) {
      treasury.disableButton('minus');
    }
  }

  private checkPlusDisabled() {
    const treasuries = Object.values(Board.getInstance().treasuries);
    if (this.companyBalance > 0) {
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
    const board = Board.getInstance();
    const increase = value - this.currentDebt;
    clearPossible();
    this.currentDebt = value;
    this.companyBalance += increase * 5;
    await Promise.all([
      board.movePawn('debt', value),
      board.movePawn('balance', this.companyBalance),
    ]);
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
    const board = Board.getInstance();
    const treasury = board.treasuries[office];
    if (type === 'plus' && this.companyBalance > 0) {
      this.companyBalance--;
      treasury.plus();
      treasury.enableButton('minus');
      this.checkPlusDisabled();
      board.movePawn('balance', this.companyBalance);
    } else if (
      type === 'minus' &&
      treasury.getValue() > this.args.initialTreasuries[office]
    ) {
      treasury.minus();
      this.checkMinusDisabled(office);
      this.companyBalance++;

      this.checkPlusDisabled();
      board.movePawn('balance', this.companyBalance);
    }
    this.updateInterfaceInitialStep();
  }
}
