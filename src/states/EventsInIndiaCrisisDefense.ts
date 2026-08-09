import { Board } from '../board';
import {
  clearPossible,
  debug,
  getPlayerName,
  updatePageTitle,
} from '../boilerplate/utility';
import { GameState } from '../types';
import { CommonStateArgs, GameAlias } from '../types';

interface OnEnteringEventsInIndiaCrisisDefenseArgs extends CommonStateArgs {}

export class EventsInIndiaCrisisDefense implements GameState<OnEnteringEventsInIndiaCrisisDefenseArgs> {
  private static instance: EventsInIndiaCrisisDefense;
  private args: OnEnteringEventsInIndiaCrisisDefenseArgs;

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
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

  setDescription(
    activePlayerIds: number,
    args: OnEnteringEventsInIndiaCrisisDefenseArgs,
  ) {
    updatePageTitle(
      _('${tkn_playerName} may exhaust defenders'),
      {
        tkn_playerName: getPlayerName(activePlayerIds[0]),
      },
      true,
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
