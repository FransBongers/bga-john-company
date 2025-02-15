interface OnEnteringDraftCardArgs extends CommonStateArgs {
  _private?: {
    options: JoCoSetupCard[];
    selected: string[];
  };
  numberToSelect: number;
}

class DraftCard implements State {
  private static instance: DraftCard;
  private args: OnEnteringDraftCardArgs;
  private selectedCards: string[];

  constructor(private game: GameAlias) {}

  public static create(game: JohnCompany) {
    DraftCard.instance = new DraftCard(game);
  }

  public static getInstance() {
    return DraftCard.instance;
  }

  onEnteringState(args: OnEnteringDraftCardArgs) {
    debug('Entering DraftCard state');
    this.args = args;
    this.selectedCards = [];
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug('Leaving DraftCard state');
  }

  setDescription(activePlayerId: number, args: OnEnteringDraftCardArgs) {
    if (args._private?.selected) {
      args._private?.selected.forEach((cardId) => setSelected(cardId));
    }
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

    if (this.args.numberToSelect === 1) {
      updatePageTitle(_('${you} must select a card to draft'));
    } else {
      updatePageTitle(
        _('${you} must select a card to draft (${number} remaining)'),
        {
          number: this.args.numberToSelect - this.selectedCards.length,
        }
      );
    }

    this.setSelected();

    this.args._private.options.forEach((option) => {
      const node = document.getElementById(option.id);
      node.classList.add(SELECTABLE);
      onClick(node, () => this.handleClick(option.id));
    });
    if (this.selectedCards.length > 0) {
      addCancelButton();
    }
  }

  private updateInterfaceConfirm() {
    clearPossible();
    if (this.args.numberToSelect === 1) {
      updatePageTitle(_('Draft selected card?'));
    } else {
      updatePageTitle(_('Draft selected cards'));
    }
    this.setSelected();

    addConfirmButton(() => {
      performAction('actDraftCard', {
        cardIds: this.selectedCards,
      });
      // Set selected again because performAction will clean interface
      this.setSelected();
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

  private setSelected() {
    this.selectedCards.forEach((cardId) => setSelected(cardId));
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

  private handleClick(cardId: string) {
    if (this.selectedCards.includes(cardId)) {
      // Unselect if card was already selected
      this.selectedCards = this.selectedCards.filter(
        (selectedCardId) => selectedCardId !== cardId
      );
    } else {
      // Otherwise add to selected cards
      this.selectedCards.push(cardId);
    }

    if (this.selectedCards.length === this.args.numberToSelect) {
      // To confirm step if required number has been selected
      this.updateInterfaceConfirm();
    } else {
      // Otherwise to select step
      this.updateInterfaceInitialStep();
    }
  }
}
