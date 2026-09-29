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

interface OnEnteringCommanderPurchaseLocalAllianceArgs extends CommonStateArgs {
  options: JocoArmyPieceBase[];
  commanderIsPresident: boolean;
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
    updatePageTitle(_('${tkn_playerName} may purchase a local alliance'), {
      tkn_playerName: getPlayerName(activePlayerIds[0]),
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
    updatePageTitle(_('${you} may purchase a local alliance'), {});

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
        ? _('Purchase an alliance with ${tkn_localAlliance}?')
        : _(
            'Requests funds to purchase an alliance with ${tkn_localAlliance}?',
          ),
      {
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
