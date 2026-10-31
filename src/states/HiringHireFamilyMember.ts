import { Bar } from '../bar';
import {
  addCancelButton,
  addConfirmButton,
  clearPossible,
  CommonStateArgs,
  debug,
  formatStringRecursive,
  GameState,
  onClick,
  performAction,
  setSelected,
  updatePageTitle,
} from '../boilerplate';
import { Log } from '../boilerplate/notification-manager/types';
import { DIRECTOR_OF_TRADE, GOVERNOR_GENERAL } from '../constants';
import { tknFamilyMember } from '../logs/templates';
import { PlayerManager } from '../player-manager';
import { GameAlias, JocoFamilyMember, JocoOfficeBase } from '../types';

interface OnEnteringHiringHireFamilyMemberArgs extends CommonStateArgs {
  office: JocoOfficeBase | null;
  title: string | Log;
  options: JocoFamilyMember[];
  hiringFamilyId: string;
  hiringPlayerId: number;
  consentForNepotismRequired: boolean;
  appointingCommander: boolean;
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
    this.args = args;
    updatePageTitle(
      args.appointingCommander
        ? _('${tkn_playerName} must appoint the ${officeTitle}')
        : _('${tkn_playerName} must hire the ${officeTitle}'),
      {
        officeTitle: this.getTitle(),
        tkn_playerName: PlayerManager.getInstance()
          .getPlayer(args.hiringPlayerId)
          .getName(),
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
      this.args.appointingCommander
        ? _(
            '${you} must appoint a family member as ${officeTitle} (${number} candidate(s))',
          )
        : _(
            '${you} must choose a family member to hire as ${officeTitle} (${number} candidate(s))',
          ),
      {
        number: this.args.options.length,
        officeTitle: this.getTitle(),
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
      this.args.consentForNepotismRequired &&
      option.familyId === this.args.hiringFamilyId
    ) {
      updatePageTitle(
        this.args.appointingCommander
          ? _(
              'Ask consent for nepotism to appoint ${tkn_familyMember} as ${officeTitle}?',
            )
          : _(
              'Ask consent for nepotism to hire ${tkn_familyMember} as ${officeTitle}?',
            ),
        {
          tkn_familyMember: tknFamilyMember(option),
          officeTitle: this.getTitle(),
        },
      );
    } else {
      updatePageTitle(
        this.args.appointingCommander
          ? _('Appoint ${tkn_familyMember} as ${officeTitle}?')
          : _('Hire ${tkn_familyMember} as ${officeTitle}?'),
        {
          tkn_familyMember: tknFamilyMember(option),
          officeTitle: this.getTitle(),
        },
      );
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

  private getTitle(): string {
    if (typeof this.args.title === 'string') {
      return _(this.args.title);
    } else {
      return formatStringRecursive(
        _(this.args.title.log),
        this.args.title.args,
      );
    }
  }

  private goToTab() {
    const bar = Bar.getInstance();
    switch (this.args.office?.id) {
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
