import { Bar } from '../bar';
import {
  addCancelButton,
  addConfirmButton,
  addDangerActionButton,
  addPrimaryActionButton,
  addSecondaryActionButton,
  clearPossible,
  CommonStateArgs,
  debug,
  formatStringRecursive,
  GameState,
  getCurrentPlayerId,
  getPlayerName,
  onClick,
  performAction,
  setSelected,
  updatePageTitle,
} from '../boilerplate';
import { Log } from '../boilerplate/notification-manager/types';
import { tknFamilyMember } from '../logs/templates';
import {
  GameAlias,
  JocoFamilyMember,
  JocoOffice,
  JocoPromiseCardBase,
} from '../types';
import { getOffice } from '../utility';

interface OnEnteringHiringGiveConsentForNepotismArgs extends CommonStateArgs {
  // office: JocoOffice | null;
  appointingCommander: boolean;
  title: string | Log;
  officeId: string;
  hiringPlayerId: number;
  familyMember: JocoFamilyMember;
  currentPosition: string;
  promiseCards: JocoPromiseCardBase[];
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
    if (getCurrentPlayerId() === this.args.hiringPlayerId) {
      this.updateInterfacePlayPromiseCards();
      Bar.getInstance().goTo('joco-player-areas');
    } else {
      this.updateInterfaceInitialStep();
    }
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

  private updateInterfacePlayPromiseCards() {
    clearPossible();
    updatePageTitle(_('Consent for nepotism: ${you} may play Promise Card(s)'));

    this.args.promiseCards.forEach((card) => {
      onClick(`promise-card-${card.id}`, () =>
        this.updateInterfaceConfirmPromiseCard(card.id),
      );
    });

    addSecondaryActionButton({
      id: 'do_not_play_btn',
      text: _('Do not play Promise Card(s)'),
      callback: () => this.updateInterfaceConfirmPromiseCard(null),
    });
  }

  private updateInterfaceConfirmPromiseCard(promiseCardId: string | null) {
    clearPossible();
    updatePageTitle(
      promiseCardId
        ? _('Play selected Promise Card?')
        : _('Do not play any Promise Card(s)?'),
    );
    if (promiseCardId) {
      setSelected(`promise-card-${promiseCardId}`);
    }
    addConfirmButton(() =>
      performAction('actHiringGiveConsentForNepotism', {
        isHiringPlayer: true,
        promiseCardId,
      }),
    );
    addCancelButton();
  }

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
