class Board {
  private static instance: Board;
  private game: GameAlias;

  private ui: {
    board: HTMLElement;
    orders: HTMLElement;
    pawns: {
      balance?: HTMLElement;
      standing?: HTMLElement;
      debt?: HTMLElement;
      turn?: HTMLElement;
      phase?: HTMLElement;
    }
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
      pawns: {}
    };

    this.ui.board.insertAdjacentHTML('afterbegin', familyMember);
    this.setupOrders(gamedatas);
    this.setupPawns(gamedatas)
  }

  setupOrders(gamedatas: GamedatasAlias) {
    Object.keys(gamedatas.orders).forEach((orderId) => {
      const elt = (this.orders[orderId] = document.createElement('div'));
      // elt.id = orderId;
      elt.classList.add('joco_order');
    });
    this.updateOrders(gamedatas);
  }

  setupPawns(gamedatas: GamedatasAlias) {
    ['balance', 'standing', 'debt', 'turn', 'phase'].forEach((pawn) => {
      const elt = (this.ui.pawns[pawn] = document.createElement('div'));
      elt.id = pawn;
      elt.classList.add('joco_pawn');
      elt.setAttribute('data-color', pawn === 'turn' ? 'black' : pawn === 'phase' ? 'silver' : 'red');
      this.ui.board.appendChild(elt);
    })
    
    this.updatePawns(gamedatas);
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
      setAbsolutePosition(this.orders[orderId], BOARD_SCALE, ORDERS_CONFIG[orderId]);
      // this.orders[orderId].style.top = `calc(var(--boardScale) * ${ORDERS_CONFIG[orderId].top}px)`
      // this.orders[orderId].style.left = `calc(var(--boardScale) * ${ORDERS_CONFIG[orderId].left}px)`
      this.orders[orderId].setAttribute('data-status', order.status);
      this.ui.orders.appendChild(this.orders[orderId]);
    });
  }

  updatePawns(gamedatas: GamedatasAlias) {
    const {balance, debt, standing} = gamedatas.company;
    setAbsolutePosition(this.ui.pawns.balance, BOARD_SCALE, getCompanyBalanceConfig(balance));
    setAbsolutePosition(this.ui.pawns.debt, BOARD_SCALE, getCompanyDebtConfig(debt));
    setAbsolutePosition(this.ui.pawns.standing, BOARD_SCALE, getCompanyStandingConfig(standing));
    setAbsolutePosition(this.ui.pawns.phase, BOARD_SCALE, PHASE_CONFIG[gamedatas.phase]);
    setAbsolutePosition(this.ui.pawns.turn, BOARD_SCALE, TURN_CONFIG[gamedatas.turn]);
  }
}
