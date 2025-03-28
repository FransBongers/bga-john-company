interface OnEnteringMilitaryAffairsAssignArgs extends CommonStateArgs {
  armies: string[];
  officersInTraining: Record<string, JocoFamilyMember>;
}

class MilitaryAffairsAssign implements State {
  private static instance: MilitaryAffairsAssign;
  private args: OnEnteringMilitaryAffairsAssignArgs;
  private assignedOfficers: Record<
    string,
    {
      officer: JocoFamilyMember;
      to: string;
    }
  >;

  constructor(private game: GameAlias) {}

  public static create(game: JohnCompany) {
    MilitaryAffairsAssign.instance = new MilitaryAffairsAssign(game);
  }

  public static getInstance() {
    return MilitaryAffairsAssign.instance;
  }

  onEnteringState(args: OnEnteringMilitaryAffairsAssignArgs) {
    debug('Entering MilitaryAffairsAssign state');
    this.args = args;
    this.assignedOfficers = {};

    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving MilitaryAffairsAssign state');
  }

  setDescription(
    activePlayerIds: number,
    args: OnEnteringMilitaryAffairsAssignArgs
  ) {
    updatePageTitle(
      _('${tkn_playerName} must assign officers-in-training'),
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

    if (
      Object.keys(this.assignedOfficers).length ===
      Object.keys(this.args.officersInTraining).length
    ) {
      this.updateInterfaceConfirm();
      return;
    }

    updatePageTitle(_('${you} must assign all officers-in-training'));
    const board = Board.getInstance();

    Object.entries(this.args.officersInTraining).forEach(
      ([officerId, officer]) => {
        if (this.assignedOfficers[officerId]) {
          return;
        }

        onClick(board.ui.familyMembers[officerId], () =>
          this.updateInterfaceSelectArmy(officer)
        );
      }
    );
  }

  private updateInterfaceSelectArmy(officer: JocoFamilyMember) {
    clearPossible();
    const board = Board.getInstance();

    setSelected(board.ui.familyMembers[officer.id]);

    this.args.armies.forEach((to) => {
      onClick(board.ui.selectBoxes[to], async () => {
        clearPossible();
        await board.moveFamilyMemberBetweenLocations(officer, to);
        this.assignedOfficers[officer.id] = { officer, to };
        this.updateInterfaceInitialStep();
      });
    });

    this.addCancelButton();
  }

  private updateInterfaceConfirm() {
    clearPossible();

    updatePageTitle(_('Assign officers?'));

    addConfirmButton(() => {
      performAction('actMilitaryAffairsAssign', {
        assignedOfficers: Object.values(this.assignedOfficers).map(
          ({ officer, to }) => ({ familyMemberId: officer.id, to })
        ),
      });
    });
    this.addCancelButton();
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private async returnPieces() {
    const board = Board.getInstance();

    for (const { officer, to } of Object.values(this.assignedOfficers)) {
      await board.moveFamilyMemberBetweenLocations(
        officer,
        OFFICER_IN_TRAINING
      );
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

  private addCancelButton() {
    addDangerActionButton({
      id: 'cancel_btn',
      text: _('Cancel'),
      callback: async () => {
        await this.returnPieces();
        this.game.onCancel();
      },
    });
  }
}
