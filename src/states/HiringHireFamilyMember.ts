import { Bar } from '../bar';
import {
  addCancelButton,
  addConfirmButton,
  clearPossible,
  CommonStateArgs,
  debug,
  GameState,
  onClick,
  performAction,
  setSelected,
  updatePageTitle,
} from '../boilerplate';
import { DIRECTOR_OF_TRADE, GOVERNOR_GENERAL } from '../constants';
import { tknFamilyMember } from '../logs/templates';
import { PlayerManager } from '../player-manager';
import { GameAlias, JocoFamilyMember, JocoOfficeBase } from '../types';
import { getOffice } from '../utility';

interface OnEnteringHiringHireFamilyMemberArgs extends CommonStateArgs {
  office: JocoOfficeBase;
  options: JocoFamilyMember[];
  hiringFamilyId: string;
  hiringPlayerId: number;
  constentForNepotismRequired: boolean;
}

export class HiringHireFamilyMember implements GameState<OnEnteringHiringHireFamilyMemberArgs> {
  private static instance: HiringHireFamilyMember;
  private args: OnEnteringHiringHireFamilyMemberArgs;

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    HiringHireFamilyMember.instance = new HiringHireFamilyMember(game);
  }

  public static getInstance() {
    return HiringHireFamilyMember.instance;
  }

  onEnteringState(args: OnEnteringHiringHireFamilyMemberArgs) {
    debug('Entering HiringHireFamilyMember state');
    this.args = args;
    this.updateInterfaceInitialStep();
    this.goToTab();
  }

  onLeavingState() {
    debug('Leaving HiringHireFamilyMember state');
  }

  setDescription(
    activePlayerIds: number[],
    args: OnEnteringHiringHireFamilyMemberArgs,
  ) {
    updatePageTitle(_('${tkn_playerName} must hire the ${officeTitle}'), {
      officeTitle: _(getOffice(args.office).title),
      tkn_playerName: PlayerManager.getInstance()
        .getPlayer(args.hiringPlayerId)
        .getName(),
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
    updatePageTitle(
      _('${you} must choose a family member to hire as ${officeTitle}'),
      {
        officeTitle: _(getOffice(this.args.office).title),
      },
    );

    this.args.options.forEach((option) => {
      onClick(option.id, () => this.updateInterfaceConfirm(option));
    });
  }

  private updateInterfaceConfirm(option: JocoFamilyMember) {
    clearPossible();
    setSelected(option.id);

    if (
      this.args.constentForNepotismRequired &&
      option.familyId === this.args.hiringFamilyId
    ) {
      updatePageTitle(
        _(
          'Ask consent for nepotism to hire ${tkn_familyMember} as ${officeTitle}?',
        ),
        {
          tkn_familyMember: tknFamilyMember(option),
          officeTitle: _(getOffice(this.args.office).title),
        },
      );
    } else {
      updatePageTitle(_('Hire ${tkn_familyMember} as ${officeTitle}?'), {
        tkn_familyMember: tknFamilyMember(option),
        officeTitle: _(getOffice(this.args.office).title),
      });
    }

    addConfirmButton(() => {
      performAction('actHiringHireFamilyMember', {
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

  private goToTab() {
    const bar = Bar.getInstance();
    switch (this.args.office.id) {
      case DIRECTOR_OF_TRADE:
      case GOVERNOR_GENERAL:
        bar.goTo('joco-company');
        break;
      default:
        bar.goTo('joco-india');
        break;
    }
  }
}
