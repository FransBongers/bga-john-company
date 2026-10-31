import {
  addDangerActionButton,
  addPrimaryActionButton,
  addSecondaryActionButton,
  clearPossible,
  CommonStateArgs,
  debug,
  formatStringRecursive,
  GameState,
  getPlayerName,
  performAction,
  updatePageTitle,
} from '../boilerplate';
import { Log } from '../boilerplate/notification-manager/types';
import { tknFamilyMember } from '../logs/templates';
import { GameAlias, JocoFamilyMember, JocoOffice } from '../types';
import { getOffice } from '../utility';

interface OnEnteringHiringGiveConsentForNepotismArgs extends CommonStateArgs {
  // office: JocoOffice | null;
  appointingCommander: boolean;
  title: string | Log;
  officeId: string;
  hiringPlayerId: number;
  familyMember: JocoFamilyMember;
  currentPosition: string;
}

export class HiringGiveConsentForNepotism implements GameState<OnEnteringHiringGiveConsentForNepotismArgs> {
  private static instance: HiringGiveConsentForNepotism;
  private args: OnEnteringHiringGiveConsentForNepotismArgs;

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    HiringGiveConsentForNepotism.instance = new HiringGiveConsentForNepotism(
      game,
    );
  }

  public static getInstance() {
    return HiringGiveConsentForNepotism.instance;
  }

  onEnteringState(args: OnEnteringHiringGiveConsentForNepotismArgs) {
    debug('Entering HiringGiveConsentForNepotism state');
    this.args = args;
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving HiringGiveConsentForNepotism state');
  }

  setDescription(
    activePlayerIds: number[],
    args: OnEnteringHiringGiveConsentForNepotismArgs,
  ) {
    this.args = args;
    updatePageTitle(
      args.appointingCommander
        ? _(
            'Consent for nepotism: ${tkn_playerName} wants to appoint ${tkn_familyMember} as ${officeTitle}',
          )
        : _(
            'Consent for nepotism: ${tkn_playerName} wants to hire ${tkn_familyMember} as ${officeTitle}',
          ),
      {
        tkn_playerName: getPlayerName(args.hiringPlayerId),
        tkn_familyMember: tknFamilyMember(args.familyMember),
        officeTitle: this.getTitle(),
      },
    );
  }

  //  .####.##....##.########.########.########..########....###.....######..########
  //  ..##..###...##....##....##.......##.....##.##.........##.##...##....##.##......
  //  ..##..####..##....##....##.......##.....##.##........##...##..##.......##......
  //  ..##..##.##.##....##....######...########..######...##.....##.##.......######..
  //  ..##..##..####....##....##.......##...##...##.......#########.##.......##......
  //  ..##..##...###....##....##.......##....##..##.......##.....##.##....##.##......
  //  .####.##....##.########.##.....##.##.......##.....##..######..########

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
            'Consent for nepotism: ${tkn_playerName} wants to appoint ${tkn_familyMember} as ${officeTitle}',
          )
        : _(
            'Consent for nepotism: ${tkn_playerName} wants to hire ${tkn_familyMember} as ${officeTitle} (currently ${currentPosition})',
          ),
      {
        tkn_playerName: getPlayerName(this.args.hiringPlayerId),
        tkn_familyMember: tknFamilyMember(this.args.familyMember),
        officeTitle: this.getTitle(),
        currentPosition: _(this.args.currentPosition),
      },
    );

    addPrimaryActionButton({
      id: 'consent-yes',
      text: _('Give consent'),
      callback: () => this.performAction(true),
    });
    addSecondaryActionButton({
      id: 'consent-no',
      text: _('Do not give consent'),
      callback: () => this.performAction(false),
    });
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

  private performAction(consent: boolean) {
    performAction('actHiringGiveConsentForNepotism', { consent });
  }
}
