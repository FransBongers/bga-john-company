class Hand {
  private static instance: Hand;
  private game: GameAlias;
  private HandElement: HTMLElement;

  constructor(game: GameAlias) {
    this.game = game;
    this.setup(game.gamedatas);
  }

  public static create(game: GameAlias) {
    Hand.instance = new Hand(game);
  }

  public static getInstance() {
    return Hand.instance;
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
      .getElementById('play_area_container')
      .insertAdjacentHTML('afterbegin', tplHand());

      Object.values(gamedatas.players).forEach((player) => {
        const cards = player.hand.map(({id}) => `<div id="${id}" class="joco_setup_card"></div>`);
        if (cards.length > 0) {
          document.getElementById('joco_hand').insertAdjacentHTML('afterbegin', cards.join(''));
        }
      })
  }
}
