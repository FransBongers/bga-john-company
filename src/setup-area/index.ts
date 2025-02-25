class SetupArea {
  private static instance: SetupArea;
  private game: GameAlias;
  private ui: {
    setupArea: HTMLElement;
    chosenCards: HTMLElement;
    draft: HTMLElement;
  };
  private playerId: number;

  private cards: Record<string, HTMLElement> = {};

  constructor(game: GameAlias) {
    this.game = game;
    this.playerId = game.getPlayerId();
    this.setup(game.gamedatas);
  }

  public static create(game: GameAlias) {
    SetupArea.instance = new SetupArea(game);
  }

  public static getInstance() {
    return SetupArea.instance;
  }

  // ..######..########.########.##.....##.########.
  // .##....##.##..........##....##.....##.##.....##
  // .##.......##..........##....##.....##.##.....##
  // ..######..######......##....##.....##.########.
  // .......##.##..........##....##.....##.##.......
  // .##....##.##..........##....##.....##.##.......
  // ..######..########....##.....#######..##.......

  // Setup functions
  setup(gamedatas: GamedatasAlias) {
    document
      .getElementById('game_play_area')
      .insertAdjacentHTML('afterbegin', tplSetupArea());

    this.ui = {
      setupArea: document.getElementById('joco_setup_area'),
      chosenCards: document.getElementById('joco_chosen_cards'),
      draft: document.getElementById('joco_draft_cards'),
    };

    StaticData.get()
      .setupCards()
      .forEach((card) => {
        const elt = (this.cards[card.id] = document.createElement('div'));
        elt.id = card.id;
        elt.classList.add('joco-setup-card');
        elt.setAttribute('data-card-id', card.id);
      });

    const players = gamedatas.players;

    gamedatas.players[this.playerId].draft.forEach(({ id }) => {
      this.ui.draft.appendChild(this.cards[id]);
    });

    gamedatas.players[this.playerId].setupCards.forEach(({ id }) => {
      this.ui.chosenCards.appendChild(this.cards[id]);
    });

  }

  public newCards(cardIds: string[], lastCard: boolean) {
    this.ui.draft.replaceChildren();
    cardIds.forEach((cardId) => {
      if (lastCard) {
        this.ui.chosenCards.appendChild(this.cards[cardId]);
      } else {
        this.ui.draft.appendChild(this.cards[cardId]);
      }
    });
  }

  public hide() {
    this.ui.setupArea.style.display = 'none';
  }
}
