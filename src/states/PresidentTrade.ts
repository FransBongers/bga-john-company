import { Bar } from '../bar';
import {
  addCancelButton,
  addConfirmButton,
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
  getPlayerName,
  performAction,
  updatePageTitle,
} from '../boilerplate';
import { Company } from '../company';
import { StaticData } from '../static-data';
import { JoCoOrderBase, JocoRegionBase, GameAlias } from '../types';

interface OnEnteringPresidentTradeArgs extends CommonStateArgs {
  treasury: number;
  proposal: number | null;
  officeId: string;
  options: {
    homePortOrderId: string;
    homeRegionId: string;
    orders: Record<string, JoCoOrderBase>;
    regions: Record<string, JocoRegionBase>;
  };
}

export class PresidentTrade implements GameState<OnEnteringPresidentTradeArgs> {
  private static instance: PresidentTrade;
  private args: OnEnteringPresidentTradeArgs;
  private spend: number;
  private selectedRegionIds: string[];

  constructor(private game: GameAlias) {}

  public static create(game: GameAlias) {
    PresidentTrade.instance = new PresidentTrade(game);
  }

  public static getInstance() {
    return PresidentTrade.instance;
  }

  onEnteringState(args: OnEnteringPresidentTradeArgs) {
    debug('Entering PresidentTrade state');
    this.args = args;
    this.spend = args.proposal || 0;
    this.selectedRegionIds = [this.args.options.homeRegionId];
    this.updateInterfaceInitialStep();
    Bar.getInstance().goTo('joco-india');
  }

  onLeavingState() {
    debug('Leaving PresidentTrade state');
  }

  setDescription(activePlayerIds: number, args: OnEnteringPresidentTradeArgs) {
    updatePageTitle(
      _(
        '${tkn_playerName} may Trade',
      ),
      {
        tkn_playerName: getPlayerName(activePlayerIds[0]),
        amount: args.proposal,
      },
    );
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

    if (
      this.selectedRegionIds.length ===
      Object.keys(this.args.options.regions).length
    ) {
      // All regions selected
      this.setMinSpendAmount();
      return;
    }

    updatePageTitle(
      _(
        'Trade check: ${you} must select the regions in which you wish to trade',
      ),
    );

    const staticData = StaticData.get();

    Object.entries(this.args.options.regions).forEach(([regionId, region]) => {
      if (this.selectedRegionIds.includes(regionId)) {
        return;
      }
      addPrimaryActionButton({
        id: `${regionId}_btn`,
        text: _(staticData.region(regionId).name),
        callback: () => {
          this.selectedRegionIds.push(regionId);
          this.updateInterfaceInitialStep();
        },
      });
    });

    addPrimaryActionButton({
      id: 'done_btn',
      text: _('Done'),
      callback: () => this.setMinSpendAmount(),
    });
    // >1 because home region is already selected.
    if (this.selectedRegionIds.length > 1) {
      addCancelButton();
    } else {
      addPassButton(this.args.optionalAction);
    }
  }

  private setMinSpendAmount() {
    this.spend = this.selectedRegionIds.length;
    Company.getInstance().treasuries[this.args.officeId].incValue(
      -this.selectedRegionIds.length,
    );
    this.updateInterfaceMakeCheck();
  }

  private updateInterfaceMakeCheck() {
    clearPossible();

    // Equal to selected regions because we need to roll at least one die
    // but home port region does not give penalty
    const penalty = this.selectedRegionIds.length - 1;
    const available = this.args.treasury - this.spend;
    const minSpend = this.selectedRegionIds.length;

    updatePageTitle(_('Trade: ${you} may spend 1 ${tkn_pound} per die'), {
      available,
      tkn_pound: 'pound',
    });

    const treasury = Company.getInstance().treasuries[this.args.officeId];

    addSecondaryActionButton({
      id: 'minus_btn',
      text: '-',
      callback: () => {
        this.spend--;
        treasury.incValue(1);
        this.updateInterfaceMakeCheck();
      },
      extraClasses: this.spend <= minSpend ? DISABLED : '',
    });

    addPrimaryActionButton({
      id: 'make_check_btn',
      text: formatStringRecursive(_('Roll ${number} dice'), {
        number: Math.max(this.spend - penalty, 0),
      }),
      callback: () => this.updateInterfaceConfirm(),
      extraClasses: this.spend <= penalty ? DISABLED : '',
    });

    addSecondaryActionButton({
      id: 'plus_btn',
      text: '+',
      callback: () => {
        this.spend++;
        treasury.incValue(-1);
        this.updateInterfaceMakeCheck();
      },
      extraClasses: available === 0 ? DISABLED : '',
    });

    // addPrimaryActionButton({
    //   id: 'propose_btn',
    //   text: _('Propose'),
    //   callback: () => this.performAction(false),
    // });

    this.addCancelButton();
  }

  private updateInterfaceConfirm() {
    clearPossible();

    updatePageTitle(
      _('Make a check with ${number} dice to trade in ${tradeLog}?'),
      {
        number: this.spend,
        tradeLog: this.getTradeLog(),
      },
    );

    addConfirmButton(() => this.performAction(true));
    this.addCancelButton();
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private getTradeLog() {
    let log: string[] = [];
    const args = {};

    const staticData = StaticData.get();

    this.selectedRegionIds.forEach((regionId, index) => {
      const key = `key_${index}`;
      log.push(['${', key, '}'].join(''));
      args[key] = _(staticData.region(regionId).name);
    });

    return {
      log: log.join(', '),
      args,
    };
  }

  private performAction(makeCheck: boolean = false) {
    performAction('actPresidentTrade', {
      selectedRegionIds: this.selectedRegionIds,
      spend: this.spend,
      makeCheck,
    });
  }

  //  ..######..##.......####..######..##....##
  //  .##....##.##........##..##....##.##...##.
  //  .##.......##........##..##.......##..##..
  //  .##.......##........##..##.......#####...
  //  .##.......##........##..##.......##..##..
  //  .##....##.##........##..##....##.##...##.
  //  ..######..########.####..######..##....##

  // .##.....##....###....##....##.########..##.......########..######.
  // .##.....##...##.##...###...##.##.....##.##.......##.......##....##
  // .##.....##..##...##..####..##.##.....##.##.......##.......##......
  // .#########.##.....##.##.##.##.##.....##.##.......######....######.
  // .##.....##.#########.##..####.##.....##.##.......##.............##
  // .##.....##.##.....##.##...###.##.....##.##.......##.......##....##
  // .##.....##.##.....##.##....##.########..########.########..######.

  private addCancelButton() {
    addDangerActionButton({
      id: 'cancel_btn',
      text: _('Cancel'),
      callback: async () => {
        (Company.getInstance().treasuries[this.args.officeId].toValue(
          this.args.treasury,
        ),
          this.game.onCancel());
      },
    });
  }
}
