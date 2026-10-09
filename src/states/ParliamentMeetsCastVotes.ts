import {
  addDangerActionButton,
  addPassButton,
  addPrimaryActionButton,
  addSecondaryActionButton,
  clearPossible,
  CommonStateArgs,
  debug,
  DISABLED,
  formatStringRecursive,
  GameState,
  onClick,
  performAction,
  setSelected,
  updatePageTitle,
} from '../boilerplate';
import { AGAINST, CASH_COUNTER, IN_FAVOR } from '../constants';
import { PlayerManager } from '../player-manager';
import { GameAlias } from '../types';

interface OnEnteringParliamentMeetsCastVotesArgs extends CommonStateArgs {
  votes: {
    money: number;
    enterprises: { id: string; votes: number }[];
    londonSeasonCards: { id: string; votes: number }[];
  };
  options: string[];
}

export class ParliamentMeetsCastVotes implements GameState<OnEnteringParliamentMeetsCastVotesArgs> {
  private static instance: ParliamentMeetsCastVotes;
  private args: OnEnteringParliamentMeetsCastVotesArgs;
  private spend: number = 0;
  private treasury: number = 0;
  private selectedEnterpriseCardIds: string[] = [];
  private selectedLondonSeasonCardIds: string[] = [];

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    ParliamentMeetsCastVotes.instance = new ParliamentMeetsCastVotes(game);
  }

  public static getInstance() {
    return ParliamentMeetsCastVotes.instance;
  }

  onEnteringState(args: OnEnteringParliamentMeetsCastVotesArgs) {
    debug('Entering ParliamentMeetsCastVotes state');
    this.args = args;
    this.spend = 0;
    this.treasury = this.args.votes.money;
    this.selectedEnterpriseCardIds = [];
    this.selectedLondonSeasonCardIds = [];
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving ParliamentMeetsCastVotes state');
  }

  setDescription(
    activePlayerIds: number[],
    args: OnEnteringParliamentMeetsCastVotesArgs,
  ) {}

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
    updatePageTitle(_('${you} may spend £ and enterprises to cast votes'), {});

    // Add vote from enterprises, money and london season cards
    const enterpriseVotes = this.args.votes.enterprises
      .filter((card) => this.selectedEnterpriseCardIds.includes(card.id))
      .reduce((total, card) => total + card.votes, 0);
    const londonSeasonVotes = this.args.votes.londonSeasonCards
      .filter((card) => this.selectedLondonSeasonCardIds.includes(card.id))
      .reduce((total, card) => total + card.votes, 0);
    const totalVotes = this.spend + enterpriseVotes + londonSeasonVotes;

    this.args.votes.enterprises.forEach((card) => {
      onClick(`enterprise-card-${card.id}`, () =>
        this.handleCardClick(card.id, 'enterprise'),
      );
    });

    this.args.votes.londonSeasonCards.forEach((card) => {
      onClick(`game-card-${card.id}`, () =>
        this.handleCardClick(card.id, 'london-season'),
      );
    });
    this.setSelected();

    addSecondaryActionButton({
      id: 'minus_btn',
      text: '-',
      callback: () => {
        this.spend--;
        this.treasury++;
        this.getCashCounter().incValue(1);
        this.updateInterfaceInitialStep();
      },
      extraClasses: this.spend === 0 ? DISABLED : '',
    });

    if (this.args.options.includes(IN_FAVOR)) {
      addPrimaryActionButton({
        id: 'vote_in_favor_btn',
        text: formatStringRecursive(_('Cast ${number} vote(s) in favor'), {
          number: totalVotes,
        }),
        callback: () => this.updateInterfaceConfirm(IN_FAVOR),
        extraClasses: totalVotes <= 0 ? DISABLED : '',
      });
    }
    if (this.args.options.includes(AGAINST)) {
      addDangerActionButton({
        id: 'vote_against_btn',
        text: formatStringRecursive(_('Cast ${number} vote(s) against'), {
          number: totalVotes,
        }),
        callback: () => this.updateInterfaceConfirm(AGAINST),
        extraClasses: totalVotes <= 0 ? DISABLED : '',
      });
    }

    addSecondaryActionButton({
      id: 'plus_btn',
      text: '+',
      callback: () => {
        this.spend++;
        this.treasury--;
        this.getCashCounter().incValue(-1);
        this.updateInterfaceInitialStep();
      },
      extraClasses: this.treasury === 0 ? DISABLED : '',
    });

    if (totalVotes <= 0) {
      addPassButton(this.args.optionalAction, _('Do not cast any votes'));
    } else {
      this.addCancelButton();
    }
  }

  private updateInterfaceConfirm(option: string) {
    clearPossible();
    updatePageTitle(_('${you} are about to cast votes'), {});
    this.setSelected();

    addPrimaryActionButton({
      id: 'confirm_btn',
      text: _('Confirm'),
      callback: () => {
        performAction('actParliamentMeetsCastVotes', {
          option,
          spend: this.spend,
          enterpriseCardIds: this.selectedEnterpriseCardIds,
          londonSeasonCardIds: this.selectedLondonSeasonCardIds,
        });
      },
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

  private setSelected() {
    this.selectedEnterpriseCardIds.forEach((cardId) =>
      setSelected(`enterprise-card-${cardId}`),
    );
    this.selectedLondonSeasonCardIds.forEach((cardId) =>
      setSelected(`game-card-${cardId}`),
    );
  }

  private getCashCounter() {
    return PlayerManager.getInstance().getCurrentPlayer().counters[
      CASH_COUNTER
    ];
  }

  private handleCardClick(
    cardId: string,
    type: 'enterprise' | 'london-season',
  ) {
    if (type === 'enterprise') {
      if (this.selectedEnterpriseCardIds.includes(cardId)) {
        this.selectedEnterpriseCardIds = this.selectedEnterpriseCardIds.filter(
          (id) => id !== cardId,
        );
      } else {
        this.selectedEnterpriseCardIds.push(cardId);
      }
    } else if (type === 'london-season') {
      if (this.selectedLondonSeasonCardIds.includes(cardId)) {
        this.selectedLondonSeasonCardIds =
          this.selectedLondonSeasonCardIds.filter((id) => id !== cardId);
      } else {
        this.selectedLondonSeasonCardIds.push(cardId);
      }
    }
    this.updateInterfaceInitialStep();
  }

  private addCancelButton() {
    addDangerActionButton({
      id: 'cancel_btn',
      text: _('Cancel'),
      callback: async () => {
        this.getCashCounter().incValue(this.spend);
        this.spend = 0;
        this.treasury = this.args.votes.money;
        this.selectedEnterpriseCardIds = [];
        this.selectedLondonSeasonCardIds = [];

        this.game.onCancel();
      },
    });
  }
}
