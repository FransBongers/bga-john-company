// Array with top, left coords for each order
const ORDERS_CONFIG = {
  [ORDER_PUNJAB_1]: [25, 935],
  [ORDER_DELHI_1]: [17, 1071],
  [ORDER_DELHI_2]: [49, 1160],
  [ORDER_DELHI_3]: [64, 1040],
  [ORDER_BENGAL_1]: [115, 1278],
  [ORDER_BENGAL_2]: [173, 1375],
  [ORDER_BOMBAY_1]: [92, 957],
  [ORDER_BOMBAY_2]: [175, 999],
  [ORDER_BOMBAY_3]: [235, 943],
  [ORDER_MARATHA_1]: [111, 1173],
  [ORDER_MARATHA_2]: [179, 1074],
  [ORDER_MARATHA_3]: [221, 1224],
  [ORDER_HYDERABAD_1]: [302, 1135],
  [ORDER_MYSORE_1]: [346, 1020],
  [ORDER_MYSORE_2]: [402, 1057],
  [ORDER_MADRAS_1]: [400, 1151],
  [ORDER_MADRAS_2]: [450, 1120],
};

class Board {
  private static instance: Board;
  private game: GameAlias;

  private ui: {
    board: HTMLElement;
    orders: HTMLElement;
  };
  private orders: Record<string, HTMLElement> = {};

  constructor(game: GameAlias) {
    this.game = game;
    this.setup(game.gamedatas);
  }

  public static create(game: GameAlias) {
    Board.instance = new Board(game);
  }

  public static getInstance() {
    return Board.instance;
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
      .insertAdjacentHTML('afterbegin', tplBoard(gamedatas));

    this.ui = {
      board: document.getElementById('joco_board'),
      orders: document.getElementById('joco_orders'),
    };

    this.ui.board.insertAdjacentHTML('afterbegin', familyMember);
    this.setupOrders(gamedatas);
  }

  setupOrders(gamedatas: GamedatasAlias) {
    Object.keys(gamedatas.orders).forEach((orderId) => {
      const elt = (this.orders[orderId] = document.createElement('div'));
      // elt.id = orderId;
      elt.classList.add('joco_order');
    });
    this.updateOrders(gamedatas);
  }

  // .##.....##.########..########.....###....########.########....##.....##.####
  // .##.....##.##.....##.##.....##...##.##......##....##..........##.....##..##.
  // .##.....##.##.....##.##.....##..##...##.....##....##..........##.....##..##.
  // .##.....##.########..##.....##.##.....##....##....######......##.....##..##.
  // .##.....##.##........##.....##.#########....##....##..........##.....##..##.
  // .##.....##.##........##.....##.##.....##....##....##..........##.....##..##.
  // ..#######..##........########..##.....##....##....########.....#######..####

  updateOrders(gamedatas: GamedatasAlias) {
    this.ui.orders.replaceChildren();
    Object.entries(gamedatas.orders).forEach(([orderId, order]) => {
      this.orders[orderId].style.top = `calc(var(--boardScale) * ${ORDERS_CONFIG[orderId][0]}px)`
      this.orders[orderId].style.left = `calc(var(--boardScale) * ${ORDERS_CONFIG[orderId][1]}px)`
      this.orders[orderId].setAttribute('data-status', order.status);
      this.ui.orders.appendChild(this.orders[orderId]);
    });
  }
}
