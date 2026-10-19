import {
  addDangerActionButton,
  addPrimaryActionButton,
  addSecondaryActionButton,
  clearPossible,
  CommonStateArgs,
  debug,
  GameState,
  getPlayerName,
  performAction,
  updatePageTitle,
} from '../boilerplate';
import { tknFamilyMember } from '../logs/templates';
import { GameAlias, JocoFamilyMember, JocoOffice } from '../types';
import { getOffice } from '../utility';

interface OnEnteringHiringGiveConsentForNepotismArgs extends CommonStateArgs {
  office: JocoOffice;
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
    updatePageTitle(
      _(
        'Consent for nepotism: ${tkn_playerName} wants to hire ${tkn_familyMember} as ${officeTitle}',
      ),
      {
        tkn_playerName: getPlayerName(args.hiringPlayerId),
        tkn_familyMember: tknFamilyMember(args.familyMember),
        officeTitle: getOffice(args.office).title,
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
      _(
        'Consent for nepotism: ${tkn_playerName} wants to hire ${tkn_familyMember} as ${officeTitle} (currently ${currentPosition})',
      ),
      {
        tkn_playerName: getPlayerName(this.args.hiringPlayerId),
        tkn_familyMember: tknFamilyMember(this.args.familyMember),
        officeTitle: getOffice(this.args.office).title,
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

  private performAction(consent: boolean) {
    performAction('actHiringGiveConsentForNepotism', { consent });
  }
}
