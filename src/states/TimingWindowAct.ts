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
  performAction,
  updatePageTitle,
} from '../boilerplate';
import { BLACKMAIL_CARD, LAW_CARD, PROMISE_CARD } from '../constants';
import { StaticData } from '../static-data';
import { GameAlias } from '../types';
import { getCardTypeText } from '../utility';

interface OnEnteringTimingWindowActArgs extends CommonStateArgs {
  _private?: Array<{
    playerId: number;
    cardId: string;
    cardType: string;
    // Add other properties as needed
  }>;
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
    updatePageTitle(_('Other players may use card effects'), {});
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
    updatePageTitle(_('${you} may use card effects'), {});

    (this.args._private ?? []).forEach(
      ({ playerId, cardId, cardType }, index) => {
        this.addButton(cardId, cardType, index);
      },
    );
    addSecondaryActionButton({
      id: 'do_not_use_card',
      text: _('Do not use card effects'),
      callback: () => {
        this.updateInterfaceConfirm(false);
      },
    });
  }

  private updateInterfaceConfirm(use: boolean, index?: number) {
    clearPossible();
    if (use && index !== undefined) {
      const option = this.args._private?.[index];

      updatePageTitle(
        option.cardType === LAW_CARD
          ? _('Use ${cardText}?')
          : _('Play ${cardText}?'),
        {
          cardText: this.getCardText(option.cardId, option.cardType),
        },
      );
    } else {
      updatePageTitle(_('Skip using effect?'), {});
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

  private getCardText(cardId: string, cardType: string) {
    const text = '${cardTitle} (${cardType})';
    return formatStringRecursive(text, {
      cardTitle: _(StaticData.get().cardTitle(cardId)),
      cardType: getCardTypeText(cardType),
    });
  }

  private addButton(cardId: string, cardType: string, index: number) {
    const text = this.getCardText(cardId, cardType);

    const title = StaticData.get().cardTitle(cardId);
    addPrimaryActionButton({
      id: `use_card_${index}`,
      text: formatStringRecursive(text, { cardTitle: title }),
      callback: () => {
        this.updateInterfaceConfirm(true, index);
      },
    });
  }
}
