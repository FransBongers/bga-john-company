// Array with top, left coords for each order
const ORDERS_CONFIG = {
  [ORDER_PUNJAB_1]: [22.5, 933],
  [ORDER_DELHI_1]: [15, 1069],
  [ORDER_DELHI_2]: [47, 1158.5],
  [ORDER_DELHI_3]: [62, 1038],
  [ORDER_BENGAL_1]: [113, 1276],
  [ORDER_BENGAL_2]: [171, 1373],
  [ORDER_BOMBAY_1]: [89.5, 955],
  [ORDER_BOMBAY_2]: [173, 996.5],
  [ORDER_BOMBAY_3]: [233, 941],
  [ORDER_MARATHA_1]: [109.5, 1171],
  [ORDER_MARATHA_2]: [176.5, 1072.5],
  [ORDER_MARATHA_3]: [219.5, 1222],
  [ORDER_HYDERABAD_1]: [300.5, 1133],
  [ORDER_MYSORE_1]: [344, 1017.5],
  [ORDER_MYSORE_2]: [400.5, 1055],
  [ORDER_MADRAS_1]: [398, 1148.5],
  [ORDER_MADRAS_2]: [447.5, 1118.5],
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
