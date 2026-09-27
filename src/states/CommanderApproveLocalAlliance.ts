import {
  addConfirmButton,
  addDangerActionButton,
  addPrimaryActionButton,
  clearPossible,
  CommonStateArgs,
  debug,
  GameState,
  getPlayerName,
  performAction,
  updatePageTitle,
} from '../boilerplate';
import { StaticData } from '../static-data';
import { GameAlias, JocoArmyPieceBase } from '../types';

interface OnEnteringCommanderApproveLocalAllianceArgs extends CommonStateArgs {
  commanderPlayerId: number;
  localAlliance: JocoArmyPieceBase;
}

export class CommanderApproveLocalAlliance implements GameState<OnEnteringCommanderApproveLocalAllianceArgs> {
  private static instance: CommanderApproveLocalAlliance;
  private args: OnEnteringCommanderApproveLocalAllianceArgs;

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    CommanderApproveLocalAlliance.instance = new CommanderApproveLocalAlliance(
      game,
    );
  }

  public static getInstance() {
    return CommanderApproveLocalAlliance.instance;
  }

  onEnteringState(args: OnEnteringCommanderApproveLocalAllianceArgs) {
    debug('Entering CommanderApproveLocalAlliance state');
    this.args = args;
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving CommanderApproveLocalAlliance state');
  }

  setDescription(
    activePlayerIds: number,
    args: OnEnteringCommanderApproveLocalAllianceArgs,
  ) {
    updatePageTitle(
      _('${player_name} must approve or reject funds for a local alliance'),
      {
        player_name: getPlayerName(activePlayerIds[0]),
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
      _(
        '${player_name} requests £${amount} to purchase a local alliance with ${tkn_localAlliance}',
      ),
      {
        player_name: getPlayerName(this.args.commanderPlayerId),
        amount: StaticData.get().armyPiece(this.args.localAlliance.id).cost,
        tkn_localAlliance: this.args.localAlliance.id,
      },
    );

    addPrimaryActionButton({
      id: 'approve-btn',
      text: _('Approve'),
      callback: () => {
        performAction('actCommanderApproveLocalAlliance', { approve: true });
      },
    });
    addDangerActionButton({
      id: 'reject-btn',
      text: _('Reject'),
      callback: () => {
        performAction('actCommanderApproveLocalAlliance', { approve: false });
      },
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
