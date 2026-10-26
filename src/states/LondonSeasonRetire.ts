import { Bar } from '../bar';
import {
  addConfirmButton,
  addDangerActionButton,
  addPassButton,
  addPrimaryActionButton,
  clearPossible,
  CommonStateArgs,
  debug,
  GameState,
  Interaction,
  onClick,
  performAction,
  setSelected,
  updatePageTitle,
} from '../boilerplate';
import { CASH_COUNTER, PRIZES } from '../constants';
import { PlayerManager } from '../player-manager';
import { GameAlias, JocoFamilyMember } from '../types';

interface OnEnteringLondonSeasonRetireArgs extends CommonStateArgs {
  familyMembers: JocoFamilyMember[];
  treasury: number;
  discount: number;
  prizeFilter: string[] | null
}

export class LondonSeasonRetire implements GameState<OnEnteringLondonSeasonRetireArgs> {
  private static instance: LondonSeasonRetire;
  private args: OnEnteringLondonSeasonRetireArgs;
  private totalCost: number;
  private selectedPrizes: Record<string, string>;

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    LondonSeasonRetire.instance = new LondonSeasonRetire(game);
  }

  public static getInstance() {
    return LondonSeasonRetire.instance;
  }

  onEnteringState(args: OnEnteringLondonSeasonRetireArgs) {
    debug('Entering LondonSeasonRetire state');
    this.args = args;
    this.totalCost = 0;
    this.selectedPrizes = {};
    this.updateInterfaceInitialStep();
    Bar.getInstance().goTo('joco-london');
  }

  onLeavingState() {
    debug('Leaving LondonSeasonRetire state');
  }

  setDescription(
    activePlayerIds: number[],
    args: OnEnteringLondonSeasonRetireArgs,
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
    const remainingMoney =
      this.getRemainingMoney() + this.getRemainingDiscount();
    if (
      remainingMoney <= 1 ||
      Object.keys(this.selectedPrizes).length === this.args.familyMembers.length
    ) {
      this.updateInterfaceConfirm();
      return;
    }

    updatePageTitle(_('${you} may choose a family member to retire'));

    this.args.familyMembers.forEach((familyMember) => {
      if (this.selectedPrizes[familyMember.id]) {
        return;
      }
      onClick(familyMember.id, () =>
        this.updateInterfaceSelectPrize(familyMember),
      );
    });

    if (Object.keys(this.selectedPrizes).length > 0) {
      addPrimaryActionButton({
        id: 'done-btn',
        text: _('Done'),
        callback: () => {
          this.updateInterfaceConfirm();
        },
      });
      this.addCancelButton();
    } else {
      addPassButton(
        this.args.optionalAction,
        _('Skip remaining family members'),
      );
    }
  }

  private updateInterfaceSelectPrize(familyMember: JocoFamilyMember) {
    clearPossible();
    const remainingMoney = this.getRemainingMoney();
    const remainingDiscount = this.getRemainingDiscount();
    const remainingMoneyIncludingDiscount = remainingMoney + remainingDiscount;

    updatePageTitle(
      remainingDiscount > 0
        ? _('${you} must choose a prize (£${amount} discount)')
        : _('${you} must choose a prize'),
      {
        amount: remainingDiscount,
      },
    );

    setSelected(familyMember.id);

    Object.values(PRIZES).forEach((prize) => {
      if (this.args.prizeFilter && !this.args.prizeFilter.includes(prize.id)) {
        return;
      }
      if (prize.cost > remainingMoneyIncludingDiscount) {
        return;
      }
      onClick(`${prize.id}-container`, async () => {
        this.selectedPrizes[familyMember.id] = prize.id;
        PlayerManager.getInstance()
          .getCurrentPlayer()
          .counters[CASH_COUNTER].toValue(
            this.args.treasury - this.getTotalCost(),
          );
        await this.game.animationManager.slideAndAttach(
          document.getElementById(familyMember.id),
          document.getElementById(prize.id),
        );
        this.updateInterfaceInitialStep();
      });
    });

    this.addCancelButton();
  }

  private updateInterfaceConfirm() {
    clearPossible();

    Object.keys(this.selectedPrizes).forEach((key) => setSelected(key));
    updatePageTitle(
      Object.keys(this.selectedPrizes).length > 1
        ? _('Retire pensioners to selected prizes?')
        : _('Retire pensioner to selected prize?'),
    );

    addConfirmButton(() => {
      performAction('actLondonSeasonRetire', {
        selectedPrizes: this.selectedPrizes,
      });
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

  private getTotalCostOfSelectedPrizes() {
    const totalPrizeCost = Object.keys(this.selectedPrizes).reduce(
      (total, key) => {
        const prizeId = this.selectedPrizes[key];
        const prize = PRIZES[prizeId];
        return total + (prize?.cost ?? 0);
      },
      0,
    );
    return totalPrizeCost;
  }

  private getRemainingDiscount() {
    const usedDiscount =
      this.getTotalCostOfSelectedPrizes() - this.getTotalCost();
    return this.args.discount - usedDiscount;
  }

  private getTotalCost(modifier = 0) {
    const totalPrizeCost = this.getTotalCostOfSelectedPrizes();
    return Math.max(totalPrizeCost + modifier - this.args.discount, 0);
  }

  private getRemainingMoney() {
    return this.args.treasury - this.getTotalCost();
  }

  private async returnPieces() {
    const interaction = Interaction.use();
    PlayerManager.getInstance()
      .getCurrentPlayer()
      .counters[CASH_COUNTER].toValue(this.args.treasury);
    await Promise.all(
      Object.keys(this.selectedPrizes).map(async (key, index) => {
        interaction.wait(200 * index);
        const pensionersBox = document.getElementById('Pensioners');
        await this.game.animationManager.slideAndAttach(
          document.getElementById(key),
          pensionersBox,
        );
      }),
    );
  }

  private addCancelButton() {
    addDangerActionButton({
      id: 'cancel_btn',
      text: _('Cancel'),
      callback: async () => {
        await this.returnPieces();
        this.game.onCancel();
      },
    });
  }
}
