import {
  addCancelButton,
  addConfirmButton,
  clearPossible,
  onClick,
  performAction,
  setSelected,
  updatePageTitle,
} from '../boilerplate';
import {
  GameAlias,
  JocoLondonSeasonCardBase,
  JocoPromiseCardBase,
} from '../types';
import { getCardPrefix, getCardText } from '../utility';

export class AnytimeActions {
  private static instance: AnytimeActions;
  private game: GameAlias;

  constructor(game: GameAlias) {
    this.game = game;
  }

  public static create(game: GameAlias) {
    AnytimeActions.instance = new AnytimeActions(game);
  }

  public static getInstance() {
    return AnytimeActions.instance;
  }

  public setup(
    stateName: string,
    anytimeActions:
      | Array<{
          cardId: string;
          cardType: string;
          playerId: number;
          card: JocoPromiseCardBase | JocoLondonSeasonCardBase;
        }>
      | undefined,
  ) {
    if (this.game.isSpectator || !anytimeActions) {
      return;
    }

    anytimeActions.forEach((option) => {
      const { card } = option;
      onClick(`${getCardPrefix(card.id)}${card.id}`, () => {
        this.updateInterfaceConfirm(option);
      });
    });

    // const playerId = this.game.getPlayerId();
    // const players = PlayerManager.getInstance();
    // const player = players.getPlayer(playerId);
    // const playerArea = player && players.getPlayerArea(playerId);
    // if (!playerArea) return;

    // const promiseCards = playerArea.getPromiseCards();
    // const blackmailCards = playerArea.stocks[`londonSeasonCards_${player.familyId}`].getCards();
    // const occupiedOffices = Object.keys(this.game.gamedatas.offices).filter((officeId) =>
    //   document.getElementById(`OfficeCard_${officeId}`) &&
    //   document.getElementById(officeId)?.querySelector('.joco-family-member'),
    // );
    // const cashByPlayer = Object.fromEntries(players.getPlayerIds().map((id) => [
    //   id, players.getPlayer(id).counters[CASH_COUNTER]?.getValue() ?? 0,
    // ]));
    // const eligibleIds = getAnytimeCardIds({
    //   playerId,
    //   phase: PhaseTracker.getInstance().getPhase(),
    //   promiseCards,
    //   blackmailCards,
    //   cashByPlayer,
    //   occupiedOffices,
    // });
    // const timingCardIds = stateName === 'TimingWindowAct'
    //   ? (args?._private ?? []).map((option: { cardId: string }) => option.cardId)
    //   : [];

    // promiseCards.forEach((card) => {
    //   if (eligibleIds.includes(card.id) && !timingCardIds.includes(card.id)) {
    //     this.makeSelectable(PromiseCardsManager.getInstance().getCardElement(card), card.title);
    //   }
    // });
    // blackmailCards.forEach((card) => {
    //   if (eligibleIds.includes(card.id) && !timingCardIds.includes(card.hiddenId)) {
    //     this.makeSelectable(LondonSeasonCardsManager.getInstance().getCardElement(card), card.title);
    //   }
    // });
  }

  private updateInterfaceConfirm(option: {
    cardId: string;
    cardType: string;
    playerId: number;
    card: JocoPromiseCardBase | JocoLondonSeasonCardBase;
  }) {
    clearPossible();

    updatePageTitle(_('Play ${cardText} ?'), {
      cardText: getCardText(option.card),
    });
    setSelected(`${getCardPrefix(option.card.id)}${option.card.id}`);

    addConfirmButton(() => {
      this.game.bga.actions.performAction(
        'actAnytimeAction',
        {
          cardId: option.cardId,
        },
        { checkAction: false, checkPossibleActions: false },
      );
    });
    addCancelButton();
  }
}
