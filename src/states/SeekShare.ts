interface OnEnteringSeekShareArgs extends CommonStateArgs {
  options: Record<string, number>;
}

class SeekShare implements State {
  private static instance: SeekShare;
  private args: OnEnteringSeekShareArgs;

  constructor(private game: GameAlias) {}

  public static create(game: JohnCompany) {
    SeekShare.instance = new SeekShare(game);
  }

  public static getInstance() {
    return SeekShare.instance;
  }

  onEnteringState(args: OnEnteringSeekShareArgs) {
    debug('Entering SeekShare state');
    this.args = args;
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving SeekShare state');
  }

  setDescription(activePlayerId: number, args: OnEnteringSeekShareArgs) {
    updatePageTitle(
      _(
        '${tkn_playerName} must place a family member on the Stock Exchange track'
      ),
      {
        tkn_playerName: PlayerManager.getInstance()
          .getPlayer(activePlayerId)
          .getName(),
      }
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
    this.game.clearPossible();

    updatePageTitle(
      _('${you} must select a place on the Stock Exchange track'),
      {
        tkn_icon: WRITER,
      }
    );

    Object.entries(this.args.options).forEach(([position, price]) => {
      const box = Board.getInstance().selectBoxes[position];
      onClick(box, () => this.updateInterfaceConfirm(position, price));
    });
  }

  private updateInterfaceConfirm(position: string, price: number) {
    clearPossible();

    setSelected(Board.getInstance().selectBoxes[position]);

    updatePageTitle(_('Pay ${amount} ${tkn_pound} to seek a ${tkn_icon}?'), {
      amount: price,
      tkn_pound: _('Pounds'),
      tkn_icon: SHARE
    });

    const callback = () =>
      performAction('actSeekShare', {
        position,
      });

    addConfirmButton(callback);

    // callback();

    addCancelButton();
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

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
}
