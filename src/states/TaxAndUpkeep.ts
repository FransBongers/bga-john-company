import { Bar } from '../bar';
import {
  addCancelButton,
  addPrimaryActionButton,
  debug,
  DISABLED,
  onClick,
  performAction,
  setSelected,
  updatePageTitle,
} from '../boilerplate';
import { LUXURY, SHARE, SHIPYARD, TAX, UPKEEP, WINDOW_TAX, WORKSHOP } from '../constants';
import { CommonStateArgs, GameAlias, GameState } from '../types';
import { getIdWithPrefix } from '../utility';

interface OnEnteringTaxAndUpkeepArgs extends CommonStateArgs {
  type: string;
  target?: string;
  _private?: {
    amount: number;
    targets: Record<string, number>;
    treasury: number;
  };
}

export class TaxAndUpkeep implements GameState<OnEnteringTaxAndUpkeepArgs> {
  private static instance: TaxAndUpkeep;
  private args: OnEnteringTaxAndUpkeepArgs;
  private selectedTargets: string[] = [];

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    TaxAndUpkeep.instance = new TaxAndUpkeep(game);
  }

  public static getInstance() {
    return TaxAndUpkeep.instance;
  }

  onEnteringState(args: OnEnteringTaxAndUpkeepArgs) {
    debug('Entering TaxAndUpkeep state');
    this.args = args;
    this.selectedTargets = [];
    this.updateInterfaceInitialStep();
    const bar = Bar.getInstance();
    switch(this.args.type) {
      case TAX:
        bar.goTo('joco-player-areas');
        break;
      case UPKEEP:
      case WINDOW_TAX:
        bar.goTo('joco-london');
        break;
      default:
        break;
    }
  }

  onLeavingState() {
    debug('Leaving TaxAndUpkeep state');
  }

  setDescription(activePlayerIds: number[], args: OnEnteringTaxAndUpkeepArgs) {
    this.args = args;
    this.updatePageTitle(false);
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
    this.game.clearPossible();
    const privateArgs = this.args._private;
    if (!privateArgs) {
      this.updatePageTitle(false);
      return;
    }

    const amount = this.selectedTargets.reduce(
      (remaining, targetId) => remaining - privateArgs.targets[targetId],
      privateArgs.amount,
    );
    const canPay = amount <= privateArgs.treasury;
    this.updatePageTitle(true, amount, privateArgs.treasury);

    Object.keys(privateArgs.targets).forEach((targetId) => {
      const selected = this.selectedTargets.includes(targetId);
      const elementId = getIdWithPrefix(targetId);
      if (selected) {
        setSelected(elementId);
      }
      if (!selected && canPay) {
        return;
      }
      onClick(elementId, () => {
        this.selectedTargets = selected
          ? this.selectedTargets.filter((id) => id !== targetId)
          : [...this.selectedTargets, targetId];
        this.updateInterfaceInitialStep();
      });
    });

    addPrimaryActionButton({
      id: 'confirm_btn',
      text: _('Confirm'),
      extraClasses: canPay ? undefined : DISABLED,
      callback: () => {
        if (canPay) {
          performAction('actTaxAndUpkeep', {
            selectedTargets: this.selectedTargets,
          });
        }
      },
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

  private updatePageTitle(activePlayer = true, amount = 0, treasury = 0) {
    const shortfall = Math.max(0, amount - treasury);
    switch (this.args.type) {
      case UPKEEP:
        updatePageTitle(
          activePlayer
            ? _('Upkeep: ${you} must return family members (short £${shortfall})')
            : _(
                'Upkeep: other players must return family members they cannot pay for',
              ),
          { shortfall },
        );
        break;
      case TAX:
        updatePageTitle(
          activePlayer
            ? _('Tax on ${tkn_icon}: ${you} must discard items (short £${shortfall})')
            : _('Tax on ${tkn_icon}: other players must discard items they cannot pay for'),
          { tkn_icon: this.args.target, shortfall },
        );
        break;
      case WINDOW_TAX:
        updatePageTitle(
          activePlayer
            ? _('Window Tax: ${you} must discard or return items (short £${shortfall})')
            : _('Window Tax: other players must discard or return items they cannot pay for'),
          { shortfall },
        );
        break;
    }
  }

  private getTargetText() {
    switch (this.args.target) {
      case SHARE:
        return _('shares');
      case SHIPYARD:
        return _('shipyards');
      case WORKSHOP:
        return _('workshops');
      case LUXURY:
        return _('luxuries');
      default:
        return this.args.target ?? '';
    }
  }
}
