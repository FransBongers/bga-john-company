import {
  debug,
  updatePageTitle,
  getPlayerName,
  onClick,
  clearPossible,
  setSelected,
  addConfirmButton,
  performAction,
  addDangerActionButton,
} from '../boilerplate';
import { OFFICER_IN_TRAINING } from '../constants';
import { India } from '../india';
import {
  CommonStateArgs,
  JocoFamilyMember,
  GameState,
  GameAlias,
} from '../types';

interface OnEnteringMilitaryAffairsAssignArgs extends CommonStateArgs {
  armies: string[];
  officersInTraining: Record<string, JocoFamilyMember>;
}

export class MilitaryAffairsAssign implements GameState<OnEnteringMilitaryAffairsAssignArgs> {
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

  public static create(game: GameAlias) {
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
    args: OnEnteringMilitaryAffairsAssignArgs,
  ) {
    updatePageTitle(
      _('${tkn_playerName} must assign officers-in-training'),
      {
        tkn_playerName: getPlayerName(activePlayerIds[0]),
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
    this.game.clearPossible();

    if (
      Object.keys(this.assignedOfficers).length ===
      Object.keys(this.args.officersInTraining).length
    ) {
      this.updateInterfaceConfirm();
      return;
    }

    updatePageTitle(_('${you} must assign all officers-in-training'));
    
    Object.entries(this.args.officersInTraining).forEach(
      ([officerId, officer]) => {
        if (this.assignedOfficers[officerId]) {
          return;
        }

        onClick(officerId, () =>
          this.updateInterfaceSelectArmy(officer),
        );
      },
    );

    if (Object.keys(this.assignedOfficers).length > 0) {
      this.addCancelButton();
    }
  }

  private updateInterfaceSelectArmy(officer: JocoFamilyMember) {
    clearPossible();

    setSelected(officer.id);

    this.args.armies.forEach((to) => {
      const regionId = to.split('_')[1];
      onClick(`ArmyOf${regionId}`, async () => {
        
        clearPossible();
        await India.getInstance().getArmy(regionId).addPiece(officer.id);
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
          ({ officer, to }) => ({ familyMemberId: officer.id, to }),
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

    for (const { officer, to } of Object.values(this.assignedOfficers)) {
      await this.game.animationManager.slideAndAttach(
        document.getElementById(officer.id)!,
        document.getElementById(OFFICER_IN_TRAINING)!,
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
