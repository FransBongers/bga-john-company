interface OnEnteringParliamentMeetsArgs extends CommonStateArgs {}

class ParliamentMeets implements State {
  private static instance: ParliamentMeets;
  private args: OnEnteringParliamentMeetsArgs;

  constructor(private game: GameAlias) {}

  public static create(game: JohnCompany) {
    ParliamentMeets.instance = new ParliamentMeets(game);
  }

  public static getInstance() {
    return ParliamentMeets.instance;
  }

  onEnteringState(args: OnEnteringParliamentMeetsArgs) {
    debug('Entering ParliamentMeets state');
    this.args = args;

    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving ParliamentMeets state');
  }

  setDescription(activePlayerIds: number, args: OnEnteringParliamentMeetsArgs) {
    updatePageTitle(
      _('${tkn_playerName} meets'),
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

    updatePageTitle(_('${you} must meet Parliament'));
    const board = Board.getInstance();
  }

  private updateInterfaceConfirm() {
    clearPossible();

    updatePageTitle(_('Assign officers?'));

    // addConfirmButton(() => {
    //   performAction('actParliamentMeets', {
    //     assignedOfficers: Object.values(this.assignedOfficers).map(
    //       ({ officer, to }) => ({ familyMemberId: officer.id, to })
    //     ),
    //   });
    // });
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
