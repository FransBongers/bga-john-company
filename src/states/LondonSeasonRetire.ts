import { Bar } from '../bar';
import {
  addCancelButton,
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
    const remainingMoney = this.getRemainingMoney();
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
      addPassButton(this.args.optionalAction);
    }
  }

  private updateInterfaceSelectPrize(familyMember: JocoFamilyMember) {
    clearPossible();
    const remainingMoney = this.getRemainingMoney();

    updatePageTitle(_('${you} must choose a prize'));

    setSelected(familyMember.id);

    Object.values(PRIZES).forEach((prize) => {
      if (prize.cost > remainingMoney) {
        return;
      }
      onClick(`${prize.id}-container`, async () => {
        this.selectedPrizes[familyMember.id] = prize.id;
        this.totalCost += prize.cost;
        PlayerManager.getInstance()
          .getCurrentPlayer()
          .counters[CASH_COUNTER].incValue(-prize.cost);
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

  private getRemainingMoney() {
    return this.args.treasury - this.totalCost;
  }

  private async returnPieces() {
    const interaction = Interaction.use();
    PlayerManager.getInstance()
      .getCurrentPlayer()
      .counters[CASH_COUNTER].incValue(this.totalCost);
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
