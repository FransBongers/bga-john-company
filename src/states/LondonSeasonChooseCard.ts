import { Bar } from '../bar';
import {
  addCancelButton,
  addPrimaryActionButton,
  addSecondaryActionButton,
  clearPossible,
  CommonStateArgs,
  debug,
  GameState,
  onClick,
  performAction,
  setSelected,
  updatePageTitle,
} from '../boilerplate';
import { LondonSeasonCardsManager } from '../cards/london-season-cards';
import { BLACKMAIL } from '../constants';
import { GameAlias, JocoLondonSeasonCardBase } from '../types';
import { getLondonSeasonCard } from '../utility';

interface OnEnteringLondonSeasonChooseCardArgs extends CommonStateArgs {
  prestigeCards: JocoLondonSeasonCardBase[];
  _private: JocoLondonSeasonCardBase[];
}

export class LondonSeasonChooseCard implements GameState<OnEnteringLondonSeasonChooseCardArgs> {
  private static instance: LondonSeasonChooseCard;
  private args: OnEnteringLondonSeasonChooseCardArgs;
  private selectedCard: string | null = null;

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    LondonSeasonChooseCard.instance = new LondonSeasonChooseCard(game);
  }

  public static getInstance() {
    return LondonSeasonChooseCard.instance;
  }

  onEnteringState(args: OnEnteringLondonSeasonChooseCardArgs) {
    debug('Entering LondonSeasonChooseCard state');
    this.args = args;
    this.selectedCard = null;

    if (this.args._private) {
      this.args._private.forEach((cardBase) => {
        const card = getLondonSeasonCard(cardBase);
        LondonSeasonCardsManager.getInstance().updateCardInformations(card);
      });
    }
    this.updateInterfaceInitialStep();
    Bar.getInstance().goTo('joco-london');
  }

  onLeavingState() {
    debug('Leaving LondonSeasonChooseCard state');
    if (this.args?._private) {
      this.args._private.forEach((cardBase) => {
        if (cardBase.id === this.selectedCard) {
          return;
        }
        cardBase.hiddenId = undefined;
        const card = getLondonSeasonCard(cardBase);
        LondonSeasonCardsManager.getInstance().updateCardInformations(card);
      });
    }
  }

  setDescription(
    activePlayerIds: number[],
    args: OnEnteringLondonSeasonChooseCardArgs,
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
    updatePageTitle(
      _(
        '${you} must choose a card from the London Season Display to take or discard',
      ),
    );

    this.args.prestigeCards.forEach((card) =>
      onClick(`game-card-${card.id}`, () => this.updateInterfaceConfirm(card)),
    );
    this.args._private.forEach((card) =>
      onClick(`game-card-${card.id}`, () => this.updateInterfaceConfirm(card)),
    );
  }

  private updateInterfaceConfirm(card: JocoLondonSeasonCardBase) {
    this.selectedCard = card.id;
    clearPossible();

    const data = getLondonSeasonCard(card);

    setSelected(`game-card-${card.id}`);
    updatePageTitle(_('Take or discard "${cardTitle}"?'), {
      cardTitle: data.title,
    });

    addPrimaryActionButton({
      id: 'take-btn',
      text: _('Take'),
      callback: () =>
        performAction('actLondonSeasonChooseCard', {
          cardId: card.type === BLACKMAIL ? card.hiddenId : card.id,
          take: true,
        }),
    });
    addSecondaryActionButton({
      id: 'discard-btn',
      text: _('Discard'),
      callback: () =>
        performAction('actLondonSeasonChooseCard', {
          cardId: card.type === BLACKMAIL ? card.hiddenId : card.id,
          take: false,
        }),
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
