interface OnEnteringEventsInIndiaCrisisDefenseArgs extends CommonStateArgs {}

class EventsInIndiaCrisisDefense implements State {
  private static instance: EventsInIndiaCrisisDefense;
  private args: OnEnteringEventsInIndiaCrisisDefenseArgs;

  constructor(private game: GameAlias) {}

  public static create(game: JohnCompany) {
    EventsInIndiaCrisisDefense.instance = new EventsInIndiaCrisisDefense(game);
  }

  public static getInstance() {
    return EventsInIndiaCrisisDefense.instance;
  }

  onEnteringState(args: OnEnteringEventsInIndiaCrisisDefenseArgs) {
    debug('Entering EventsInIndiaCrisisDefense state');
    this.args = args;

    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving EventsInIndiaCrisisDefense state');
  }

  setDescription(activePlayerIds: number, args: OnEnteringEventsInIndiaCrisisDefenseArgs) {
    updatePageTitle(
      _('${tkn_playerName} may exhaust defenders'),
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
    //   performAction('actEventsInIndiaCrisisDefense', {
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
