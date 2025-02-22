class Board {
  private static instance: Board;
  private game: GameAlias;

  private ui: {
    board: HTMLElement;
    orders: HTMLElement;
    familyMembers: HTMLElement;
    pawns: {
      balance?: HTMLElement;
      standing?: HTMLElement;
      debt?: HTMLElement;
      turn?: HTMLElement;
      phase?: HTMLElement;
    };
    ships: HTMLElement;
    treasuries: HTMLElement;
  };
  private familyMembers: Record<string, HTMLElement> = {};
  private ships: Record<string, HTMLElement> = {};

  private courtOfDirectors: JocoFamilyMember[] = [];
  private orders: Record<string, HTMLElement> = {};
  private regions: Record<string, Region> = {};
  private writers: {
    Bengal: JocoFamilyMember[];
    Bombay: JocoFamilyMember[];
    Madras: JocoFamilyMember[];
  } = {
    [BENGAL]: [],
    [BOMBAY]: [],
    [MADRAS]: [],
  };
  private officersInTraining: JocoFamilyMember[] = [];
  private seas: {
    westIndian: JocoShipBase[];
    eastIndian: JocoShipBase[];
    southIndian: JocoShipBase[];
  } = {
    [WEST_INDIAN]: [],
    [SOUTH_INDIAN]: [],
    [EAST_INDIAN]: [],
  };
  private treasuries: Record<string, Counter> = {}

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
      familyMembers: document.getElementById('joco_family_members'),
      orders: document.getElementById('joco_orders'),
      pawns: {},
      ships: document.getElementById('joco_ships'),
      treasuries: document.getElementById('joco_treasuries'),
    };

    // this.ui.board.insertAdjacentHTML('afterbegin', familyMember);
    this.setupOrders(gamedatas);
    this.setupRegions(gamedatas);
    this.setupPawns(gamedatas);
    this.setupFamilyMembers(gamedatas);
    this.setupShips(gamedatas);
    this.setupTreasuries(gamedatas);
  }

  private setupFamilyMembers(gamedatas: GamedatasAlias) {
    Object.values(gamedatas.familyMembers).forEach((familyMember) => {
      const elt = (this.familyMembers[familyMember.id] =
        document.createElement('div'));
      const familyMemberNumber = `${
        Number(familyMember.id.split('_')[2]) % 18
      }`;
      elt.classList.add('joco_family_member');
      elt.insertAdjacentHTML(
        'afterbegin',
        familyMemberSvgs[familyMemberNumber] ?? familyMemberSvgs[1]
      );
      let familyId = familyMember.familyId;
      if (familyId === CROWN) {
        const crownColor = PlayerManager.getInstance()
          .getPlayer(CROWN_PLAYER_ID)
          .getColor();
        familyId = COLOR_FAMILY_MAP[HEX_COLOR_COLOR_MAP[crownColor]];
      }
      elt.setAttribute('data-family', familyId);
      elt.setAttribute('data-number', familyMemberNumber);
    });
    this.updateFamilyMembers(Object.values(gamedatas.familyMembers));
  }

  private setupOrders(gamedatas: GamedatasAlias) {
    Object.keys(gamedatas.orders).forEach((orderId) => {
      const elt = (this.orders[orderId] = document.createElement('div'));
      // elt.id = orderId;
      elt.classList.add('joco_order');
    });
    this.updateOrders(gamedatas);
  }

  private setupRegions(gamedatas: GamedatasAlias) {
    Object.values(gamedatas.regions).forEach((region: JocoRegionBase) => {
      this.regions[region.id] = new Region(region.id, this.game, region);
    });
  }

  private setupPawns(gamedatas: GamedatasAlias) {
    ['balance', 'standing', 'debt', 'turn', 'phase'].forEach((pawn) => {
      const elt = (this.ui.pawns[pawn] = document.createElement('div'));
      elt.id = pawn;
      elt.classList.add('joco_pawn');
      elt.setAttribute(
        'data-color',
        pawn === 'turn' ? 'black' : pawn === 'phase' ? 'silver' : 'red'
      );
      this.ui.board.appendChild(elt);
    });

    this.updatePawns(gamedatas);
  }

  private setupShips(gamedatas: GamedatasAlias) {
    Object.values(gamedatas.ships).forEach(({ id, type, fatigued }) => {
      const elt = (this.ships[id] = document.createElement('div'));

      elt.classList.add('joco_ship');

      elt.setAttribute('data-type', type);
      elt.setAttribute('data-fatigued', fatigued ? 'true' : 'false');
    });
    this.updateShips(Object.values(gamedatas.ships));
  }

  private setupTreasuries(gamedatas: GamedatasAlias) {
    Object.entries(TREASURY_POSITIONS).forEach(([office, position]) => {
      this.ui.treasuries.insertAdjacentHTML('afterbegin', tplTreasury(office, position));
      this.treasuries[office] = new ebg.counter();
      this.treasuries[office].create(`joco_${office}_treasury`);
      this.treasuries[office].setValue(gamedatas.offices[office].treasury);
    })
  }

  // .##.....##.########..########.....###....########.########....##.....##.####
  // .##.....##.##.....##.##.....##...##.##......##....##..........##.....##..##.
  // .##.....##.##.....##.##.....##..##...##.....##....##..........##.....##..##.
  // .##.....##.########..##.....##.##.....##....##....######......##.....##..##.
  // .##.....##.##........##.....##.#########....##....##..........##.....##..##.
  // .##.....##.##........##.....##.##.....##....##....##..........##.....##..##.
  // ..#######..##........########..##.....##....##....########.....#######..####

  updateFamilyMembers(familyMembers: JocoFamilyMember[]) {
    familyMembers.forEach((familyMember) => {
      const { location, id } = familyMember;
      if (location.startsWith('supply')) {
        return;
      }
      this.ui.familyMembers.appendChild(this.familyMembers[id]);

      let position: AbsolutePosition = { top: 0, left: 0 };

      if (location === COURT_OF_DIRECTORS) {
        position = getCourtOfDirectorsPosition(this.courtOfDirectors.length);
        this.courtOfDirectors.push(familyMember);
      } else if (location === OFFICER_IN_TRAINING) {
        position = getOfficersInTrainingPosition(
          this.officersInTraining.length
        );
        this.officersInTraining.push(familyMember);
      } else if (location.startsWith(WRITER)) {
        const regionId = location.split('_')[1];
        position = getWriterPosition(regionId, this.writers[regionId].length);
        this.writers[regionId].push(familyMember);
      } else if (location.startsWith(OFFICER)) {
      } else {
        position = FAMILY_MEMBER_OFFICE_CONFIG[location];
      }
      setAbsolutePosition(this.familyMembers[id], BOARD_SCALE, position);
    });
  }

  async placeFamilyMembers(
    familyMembers: JocoFamilyMember[],
    fromElement: HTMLElement
  ) {
    const fromRect = fromElement.getBoundingClientRect();
    const promises = familyMembers.map(async (familyMember, index) => {
      const { id } = familyMember;
      await this.game.framework().wait(index * 250);
      this.updateFamilyMembers([familyMember]);
      await this.game.animationManager.play(
        new BgaSlideAnimation({
          element: this.familyMembers[id],
          transitionTimingFunction: 'ease-in-out',
          fromRect,
        })
      );
    });
    await Promise.all(promises);
  }

  updateOrders(gamedatas: GamedatasAlias) {
    this.ui.orders.replaceChildren();
    Object.entries(gamedatas.orders).forEach(([orderId, order]) => {
      setAbsolutePosition(
        this.orders[orderId],
        BOARD_SCALE,
        ORDERS_CONFIG[orderId]
      );
      // this.orders[orderId].style.top = `calc(var(--boardScale) * ${ORDERS_CONFIG[orderId].top}px)`
      // this.orders[orderId].style.left = `calc(var(--boardScale) * ${ORDERS_CONFIG[orderId].left}px)`
      this.orders[orderId].setAttribute('data-status', order.status);
      this.ui.orders.appendChild(this.orders[orderId]);
    });
  }

  movePhasePawn(phase: string) {
    setAbsolutePosition(this.ui.pawns.phase, BOARD_SCALE, PHASE_CONFIG[phase]);
  }

  updatePawns(gamedatas: GamedatasAlias) {
    const { balance, debt, standing } = gamedatas.company;
    setAbsolutePosition(
      this.ui.pawns.balance,
      BOARD_SCALE,
      getCompanyBalanceConfig(balance)
    );
    setAbsolutePosition(
      this.ui.pawns.debt,
      BOARD_SCALE,
      getCompanyDebtConfig(debt)
    );
    setAbsolutePosition(
      this.ui.pawns.standing,
      BOARD_SCALE,
      getCompanyStandingConfig(standing)
    );
    setAbsolutePosition(
      this.ui.pawns.phase,
      BOARD_SCALE,
      PHASE_CONFIG[gamedatas.phase]
    );
    setAbsolutePosition(
      this.ui.pawns.turn,
      BOARD_SCALE,
      TURN_CONFIG[gamedatas.turn]
    );
  }

  private updateShips(ships: JocoShipBase[]) {
    ships.forEach((ship) => {
      const { id, location } = ship;
      if ([SOUTH_INDIAN, WEST_INDIAN, EAST_INDIAN].includes(location)) {
        this.ui.ships.appendChild(this.ships[id]);
        const position = getShipPosition(
          location,
          this.seas[location].length
        );
        this.seas[location].push(ship);
        setAbsolutePosition(this.ships[id], BOARD_SCALE, position);
      }
      // TODO:
      // Unfitted ships
    });
  }
}
