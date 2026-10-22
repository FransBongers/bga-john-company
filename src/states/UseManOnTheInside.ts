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
import { BLACKMAIL_CARD } from '../constants';
import { StaticData } from '../static-data';
import { GameAlias } from '../types';
import { getCardTypeText } from '../utility';

interface OnEnteringUseManOnTheInsideArgs extends CommonStateArgs {
  playedCardId: string;
}

export class UseManOnTheInside implements GameState<OnEnteringUseManOnTheInsideArgs> {
  private static instance: UseManOnTheInside;
  private args: OnEnteringUseManOnTheInsideArgs;

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    UseManOnTheInside.instance = new UseManOnTheInside(game);
  }

  public static getInstance() {
    return UseManOnTheInside.instance;
  }

  onEnteringState(args: OnEnteringUseManOnTheInsideArgs) {
    debug('Entering UseManOnTheInside state');
    this.args = args;
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving UseManOnTheInside state');
  }

  setDescription(
    activePlayerIds: number,
    args: OnEnteringUseManOnTheInsideArgs,
  ) {
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
    updatePageTitle(
      _('${you} may play card ${cardTitle} to cancel ${playedCardTitle}'),
      {
        cardTitle: _(StaticData.get().cardTitle('ManOnTheInside')),
        playedCardTitle: _(StaticData.get().cardTitle(this.args.playedCardId)),
      },
    );

    addPrimaryActionButton({
      id: 'use_card',
      text: formatStringRecursive(_('Play ${cardTitle}'), {
        cardTitle: _(StaticData.get().cardTitle('ManOnTheInside')),
      }),
      callback: () => {
        this.updateInterfaceConfirm(true);
      },
    });
    addSecondaryActionButton({
      id: 'do_not_use_card',
      text: formatStringRecursive(_('Do not play ${cardTitle}'), {
        cardTitle: _(StaticData.get().cardTitle('ManOnTheInside')),
      }),
      callback: () => {
        this.updateInterfaceConfirm(false);
      },
    });
  }

  private getCardText() {
    const cardId = 'ManOnTheInside';
    const cardType = BLACKMAIL_CARD;

    const text = '${cardTitle} (${cardType})';
    return formatStringRecursive(text, {
      cardTitle: _(StaticData.get().cardTitle(cardId)),
      cardType: getCardTypeText(cardType),
    });
  }

  private updateInterfaceConfirm(play: boolean) {
    clearPossible();
    const cardTitle = _(StaticData.get().cardTitle('ManOnTheInside'));
    if (play) {
      updatePageTitle(_('Play ${cardTitle}?'), {
        cardTitle,
      });
    } else {
      updatePageTitle(_('Do not play ${cardTitle}?'), {
        cardTitle,
      });
    }

    addConfirmButton(() => {
      performAction('actUseManOnTheInside', {
        play,
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
}
