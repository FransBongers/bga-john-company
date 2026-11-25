import { Bar } from '../bar';
import {
  addCancelButton,
  addConfirmButton,
  addPassButton,
  clearPossible,
  CommonStateArgs,
  debug,
  GameState,
  getPlayerName,
  onClick,
  performAction,
  setSelected,
  updatePageTitle,
} from '../boilerplate';
import { StaticData } from '../static-data';
import { GameAlias, JocoArmyPieceBase } from '../types';
import { getCommanderTitleForPresidency } from '../utility';

interface OnEnteringCommanderPurchaseLocalAllianceArgs extends CommonStateArgs {
  options: JocoArmyPieceBase[];
  commanderIsPresident: boolean;
  presidencyId: string;
}

export class CommanderPurchaseLocalAlliance implements GameState<OnEnteringCommanderPurchaseLocalAllianceArgs> {
  private static instance: CommanderPurchaseLocalAlliance;
  private args: OnEnteringCommanderPurchaseLocalAllianceArgs;

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    CommanderPurchaseLocalAlliance.instance =
      new CommanderPurchaseLocalAlliance(game);
  }

  public static getInstance() {
    return CommanderPurchaseLocalAlliance.instance;
  }

  onEnteringState(args: OnEnteringCommanderPurchaseLocalAllianceArgs) {
    debug('Entering CommanderPurchaseLocalAlliance state');
    this.args = args;
    this.updateInterfaceInitialStep();
    Bar.getInstance().goTo('joco-india');
  }

  onLeavingState() {
    debug('Leaving CommanderPurchaseLocalAlliance state');
  }

  setDescription(
    activePlayerIds: number,
    args: OnEnteringCommanderPurchaseLocalAllianceArgs,
  ) {
    updatePageTitle(_('${commander}: ${player_name} may purchase a local alliance'), {
      commander: getCommanderTitleForPresidency(this.args.presidencyId),
      player_name: getPlayerName(activePlayerIds[0]),
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
    clearPossible();
    updatePageTitle(_('${commander}: ${you} may purchase a local alliance'), {
      commander: getCommanderTitleForPresidency(this.args.presidencyId),
    });

    this.args.options.forEach((option) =>
      onClick(option.id, () => this.updateInterfaceConfirm(option)),
    );

    addPassButton(this.args.optionalAction, _('Do not purchase a local alliance'));
  }

  private updateInterfaceConfirm(localAlliance: JocoArmyPieceBase) {
    clearPossible();
    setSelected(localAlliance.id);

    updatePageTitle(
      this.args.commanderIsPresident
        ? _('${commander}: purchase an alliance with ${tkn_localAlliance}?')
        : _(
            '${commander}: requests funds to purchase an alliance with ${tkn_localAlliance}?',
          ),
      {
        commander: getCommanderTitleForPresidency(this.args.presidencyId),
        name: _(StaticData.get().armyPiece(localAlliance.id).name),
        tkn_localAlliance: localAlliance.id,
      },
    );

    addConfirmButton(() => {
      performAction('actCommanderPurchaseLocalAlliance', {
        localAllianceId: localAlliance.id,
      });
    });
    addCancelButton();
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...
}
