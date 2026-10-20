import {
  addConfirmButton,
  addPassButton,
  addPrimaryActionButton,
  clearPossible,
  CommonStateArgs,
  debug,
  formatStringRecursive,
  GameState,
  getPlayerName,
  performAction,
  updatePageTitle,
} from '../boilerplate';
import { GameAlias } from '../types';

interface OnEnteringTradeInChinaArgs extends CommonStateArgs {
  numberOfDice: number;
}

export class TradeInChina implements GameState<OnEnteringTradeInChinaArgs> {
  private static instance: TradeInChina;
  private args: OnEnteringTradeInChinaArgs;

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    TradeInChina.instance = new TradeInChina(game);
  }

  public static getInstance() {
    return TradeInChina.instance;
  }

  onEnteringState(args: OnEnteringTradeInChinaArgs) {
    debug('Entering TradeInChina state');
    this.args = args;
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving TradeInChina state');
  }

  setDescription(
    activePlayerIds: number | number[],
    args: OnEnteringTradeInChinaArgs,
  ) {
    updatePageTitle(_('${tkn_playerName} may trade in China'), {
      tkn_playerName: getPlayerName(activePlayerIds[0]),
    });
  }

  private updateInterfaceInitialStep() {
    clearPossible();
    updatePageTitle(_('Trade in China: ${you} may make a check'), {});

    addPrimaryActionButton({
      id: 'trade-btn',
      text: formatStringRecursive(
        this.args.numberOfDice === 1
          ? _('Make a check with 1 die')
          : _('Make a check with ${number} dice'),
        {
          number: this.args.numberOfDice,
        },
      ),
      callback: () => {
        performAction('actTradeInChina', {});
      },
    });

    addPassButton(this.args.optionalAction, _('Do not trade in China'));
  }
}
