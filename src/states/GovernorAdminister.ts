import { Bar } from '../bar';
import {
  addConfirmButton,
  addPassButton,
  addPrimaryActionButton,
  clearPossible,
  CommonStateArgs,
  debug,
  formatStringRecursive,
  GameState,
  getPlayerName,
  performAction,
  updatePageTitle,
} from '../boilerplate';
import { GameAlias, JocoOfficeBase } from '../types';
import { getOffice } from '../utility';

interface OnEnteringGovernorAdministerArgs extends CommonStateArgs {
  dicePool: number;
  governor: JocoOfficeBase;
}

export class GovernorAdminister implements GameState<OnEnteringGovernorAdministerArgs> {
  private static instance: GovernorAdminister;
  private args: OnEnteringGovernorAdministerArgs;

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    GovernorAdminister.instance = new GovernorAdminister(game);
  }

  public static getInstance() {
    return GovernorAdminister.instance;
  }

  onEnteringState(args: OnEnteringGovernorAdministerArgs) {
    debug('Entering GovernorAdminister state');
    this.args = args;
    this.updateInterfaceInitialStep();
    Bar.getInstance().goTo('joco-india');
  }

  onLeavingState() {
    debug('Leaving GovernorAdminister state');
  }

  setDescription(
    activePlayerIds: number[],
    args: OnEnteringGovernorAdministerArgs,
  ) {
    updatePageTitle(
      _(
        '${tkn_playerName} may take an Administer action with the ${governorTitle}',
      ),
      {
        tkn_playerName: getPlayerName(activePlayerIds[0]),
        governorTitle: _(getOffice(args.governor).title),
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
    clearPossible();
    updatePageTitle(
      _('${you} may take an Administer action with the ${governorTitle}'),
      {
        governorTitle: _(getOffice(this.args.governor).title),
      },
    );

    addPrimaryActionButton({
      id: 'administer-btn',
      text: formatStringRecursive(
        this.args.dicePool === 1
          ? _('Make a check with 1 die')
          : _('Make a check with ${dicePool} dice'),
        {
          dicePool: this.args.dicePool,
        },
      ),
      callback: () => {
        performAction('actGovernorAdminister', {});
      },
    });
    addPassButton(this.args.optionalAction);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...
}
