import { Bar } from '../bar';
import {
  addCancelButton,
  addConfirmButton,
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
import { tknFamilyMember } from '../logs/templates';
import { GameAlias, JocoFamilyMember } from '../types';
import { getArmyNameForPresidency } from '../utility';

interface OnEnteringMilitaryAffairsAssignCommanderArgs extends CommonStateArgs {
  presidencyId: string;
  options: JocoFamilyMember[];
}

export class MilitaryAffairsAssignCommander implements GameState<OnEnteringMilitaryAffairsAssignCommanderArgs> {
  private static instance: MilitaryAffairsAssignCommander;
  private args: OnEnteringMilitaryAffairsAssignCommanderArgs;

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    MilitaryAffairsAssignCommander.instance =
      new MilitaryAffairsAssignCommander(game);
  }

  public static getInstance() {
    return MilitaryAffairsAssignCommander.instance;
  }

  onEnteringState(args: OnEnteringMilitaryAffairsAssignCommanderArgs) {
    debug('Entering MilitaryAffairsAssignCommander state');
    this.args = args;
    this.updateInterfaceInitialStep();
    Bar.getInstance().goTo('joco-india');
  }

  onLeavingState() {
    debug('Leaving MilitaryAffairsAssignCommander state');
  }

  setDescription(
    activePlayerIds: number,
    args: OnEnteringMilitaryAffairsAssignCommanderArgs,
  ) {
    updatePageTitle(
      _('${tkn_playerName} must appoint the Commander of the ${army}'),
      {
        tkn_playerName: getPlayerName(activePlayerIds[0]),
        army: getArmyNameForPresidency(args.presidencyId),
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
        '${you} must choose a family member to appoint as Commander of the ${army}',
      ),
      {
        army: getArmyNameForPresidency(this.args.presidencyId),
      },
    );

    this.args.options.forEach((option) => {
      onClick(option.id, () => this.updateInterfaceConfirm(option));
    });
  }

  private updateInterfaceConfirm(option: JocoFamilyMember) {
    clearPossible();

    setSelected(option.id);

    updatePageTitle(
      _('Appoint ${tkn_familyMember} as Commander of the ${army}?'),
      {
        tkn_familyMember: tknFamilyMember(option),
        army: getArmyNameForPresidency(this.args.presidencyId),
      },
    );

    addConfirmButton(() => {
      performAction('actMilitaryAffairsAssignCommander', {
        familyMemberId: option.id,
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
