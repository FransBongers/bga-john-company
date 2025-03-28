interface OnEnteringPresidencyTradeFillOrdersArgs extends CommonStateArgs {

}

class PresidencyTradeFillOrders implements State {
  private static instance: PresidencyTradeFillOrders;
  private args: OnEnteringPresidencyTradeFillOrdersArgs;
  private spend: number;
  private selectedRegionIds: string[];

  constructor(private game: GameAlias) {}

  public static create(game: JohnCompany) {
    PresidencyTradeFillOrders.instance = new PresidencyTradeFillOrders(game);
  }

  public static getInstance() {
    return PresidencyTradeFillOrders.instance;
  }

  onEnteringState(args: OnEnteringPresidencyTradeFillOrdersArgs) {
    debug('Entering PresidencyTradeFillOrders state');
    this.args = args;
    // this.spend = args.proposal || 0;
    // this.selectedRegionIds = [this.args.options.homeRegionId];
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving PresidencyTradeFillOrders state');
  }

  setDescription(activePlayerIds: number, args: OnEnteringPresidencyTradeFillOrdersArgs) {
    updatePageTitle(
      _(
        '${tkn_playerName} must fill orders'
      ),
      {
        tkn_playerName: getPlayerName(activePlayerIds[0]),
      },
      true
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


    updatePageTitle(_('${you} must fill orders'));


  }



  private updateIntefaceConfirm() {
    clearPossible();

    updatePageTitle(_('Make a check with ${number} dice to trade in ${tradeLog}?'), {
      number: this.spend,
      tradeLog: this.getTradeLog()
    });

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
      log.push(['${',key,'}'].join(''));
      args[key] = _(staticData.region(regionId).name);
    })

    return {
      log: log.join(', '),
      args,
    }
  }

  private performAction(makeCheck: boolean = false) {
    performAction('actPresidencyTradeFillOrders', {
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
        // Board.getInstance().treasuries[this.args.officeId].toValue(this.args.treasury),
        this.game.onCancel();
      },
    });
  }
}
