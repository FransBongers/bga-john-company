import {
  addCancelButton,
  addConfirmButton,
  addPrimaryActionButton,
  addSecondaryActionButton,
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
import {
  BLACKMAIL,
  BLACKMAIL_CARD,
  ITEM_ID,
  LAW_CARD,
  PROMISE_CARD,
  TIMING_WINDOW,
} from '../constants';
import { StaticData } from '../static-data';
import {
  GameAlias,
  JocoLawCardBase,
  JocoLondonSeasonCardBase,
  JocoPromiseCardBase,
} from '../types';
import {
  getCardPrefix,
  // getCardTypeText,
  getTimingWindowText,
} from '../utility';

interface OnEnteringTimingWindowActArgs extends CommonStateArgs {
  _private?: Array<{
    playerId: number;
    cardId: string;
    cardType: string;
    resolved?: boolean;
    card: JocoLondonSeasonCardBase | JocoLawCardBase | JocoPromiseCardBase;
    // Add other properties as needed
  }>;
  timingWindow: string;
  itemId: string | number | null;
}

export class TimingWindowAct implements GameState<OnEnteringTimingWindowActArgs> {
  private static instance: TimingWindowAct;
  private args: OnEnteringTimingWindowActArgs;

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    TimingWindowAct.instance = new TimingWindowAct(game);
  }

  public static getInstance() {
    return TimingWindowAct.instance;
  }

  onEnteringState(args: OnEnteringTimingWindowActArgs) {
    debug('Entering TimingWindowAct state');
    this.args = args;
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving TimingWindowAct state');
  }

  setDescription(activePlayerIds: number, args: OnEnteringTimingWindowActArgs) {
    this.args = args;
    this.updatePageTitle();
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
    this.updatePageTitle();

    (this.args._private ?? []).forEach(
      ({ card, resolved }, index) => {
        if (!resolved) {
          onClick(`${getCardPrefix(card.id)}${card.id}`, () => {
            this.updateInterfaceConfirm(true, index);
          });
        }
      },
    );
    if (Object.values(this.args._private ?? {}).length > 0) {
      addSecondaryActionButton({
        id: 'do_not_use_card',
        text: _('Pass Timing Window'),
        callback: () => {
          this.updateInterfaceConfirm(false);
        },
      });
    } else {
      addPrimaryActionButton({
        id: 'do_not_use_card',
        text: _('Pass Timing Window'),
        callback: () => {
          this.updateInterfaceConfirm(false);
        },
      });
    }
  }

  private updateInterfaceConfirm(use: boolean, index?: number) {
    clearPossible();
    if (use && index !== undefined) {
      const option = this.args._private?.[index];

      updatePageTitle(
        option.cardType === LAW_CARD
          ? _('Use ${cardText} ?')
          : _('Play ${cardText} ?'),
        {
          cardText: this.getCardText(option.card),
        },
      );
      setSelected(`${getCardPrefix(option.cardId)}${option.cardId}`);
    } else {
      updatePageTitle(_('Pass Timing Window?'), {});
    }

    addConfirmButton(() => {
      performAction('actTimingWindowAct', {
        use,
        index,
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

  private updatePageTitle() {
    updatePageTitle(_('Timing Window: ${timingWindow}'), {
      timingWindow: getTimingWindowText(
        this.args[TIMING_WINDOW],
        this.args[ITEM_ID],
      ),
    });
  }

  private getCardText(
    card: JocoLondonSeasonCardBase | JocoLawCardBase | JocoPromiseCardBase,
  ) {
    const text = '"${cardTitle}"';

    const cardId =
      card['type'] === BLACKMAIL && 'hiddenId' in card
        ? card.hiddenId
        : card.id;
    return formatStringRecursive(text, {
      cardTitle: _(StaticData.get().cardTitle(cardId)),
    });
  }

  // private addButton(cardId: string, cardType: string, index: number) {
  //   const text = this.getCardText(cardId, cardType);

  //   const title = StaticData.get().cardTitle(cardId);
  //   addPrimaryActionButton({
  //     id: `use_card_${index}`,
  //     text: formatStringRecursive(text, { cardTitle: title }),
  //     callback: () => {
  //       this.updateInterfaceConfirm(true, index);
  //     },
  //   });
  // }
}
