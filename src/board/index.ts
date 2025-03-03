class Board {
  private static instance: Board;
  private game: GameAlias;

  private ui: {
    board: HTMLElement;
    orders: HTMLElement;
    familyMembers: HTMLElement;
    regiments: HTMLElement;
    pawns: {
      balance?: HTMLElement;
      standing?: HTMLElement;
      debt?: HTMLElement;
      turn?: HTMLElement;
      phase?: HTMLElement;
    };
    powerTokens: HTMLElement;
    selectBoxes: HTMLElement;
    ships: HTMLElement;
    treasuries: HTMLElement;
  };
  private familyMembers: Record<string, HTMLElement> = {};
  private armyPieces: Record<string, HTMLElement> = {};
  private ships: Record<string, HTMLElement> = {};
  public selectBoxes: Record<string, HTMLElement> = {};

  private courtOfDirectors: JocoFamilyMember[] = [];
  private orders: Record<string, HTMLElement> = {};
  private regions: Record<string, Region> = {};
  private armies: {
    regiments: {
      BengalPresidency: JocoArmyPieceBase[];
      BombayPresidency: JocoArmyPieceBase[];
      MadrasPresidency: JocoArmyPieceBase[];
    };
  } = {
    regiments: {
      [BENGAL_PRESIDENCY]: [],
      [BOMBAY_PRESIDENCY]: [],
      [MADRAS_PRESIDENCY]: [],
    },
  };
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
  private powerTokens: Record<string, HTMLElement> = {};
  private seas: {
    westIndian: JocoShipBase[];
    eastIndian: JocoShipBase[];
    southIndian: JocoShipBase[];
  } = {
    [WEST_INDIAN]: [],
    [SOUTH_INDIAN]: [],
    [EAST_INDIAN]: [],
  };
  private treasuries: Record<string, Counter> = {};

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
      .getElementById('joco')
      .insertAdjacentHTML('afterbegin', tplBoard(gamedatas));

    this.ui = {
      board: document.getElementById('joco-board'),
      familyMembers: document.getElementById('joco_family_members'),
      orders: document.getElementById('joco_orders'),
      regiments: document.getElementById('joco-regiments'),
      pawns: {},
      powerTokens: document.getElementById('joco-power-tokens'),
      selectBoxes: document.getElementById('joco-select-boxes'),
      ships: document.getElementById('joco_ships'),
      treasuries: document.getElementById('joco_treasuries'),
    };

    // this.ui.board.insertAdjacentHTML('afterbegin', familyMember);
    this.setupArmyPieces(gamedatas);
    this.setupOrders(gamedatas);
    this.setupRegions(gamedatas);
    this.setupPawns(gamedatas);
    this.setupPowerTokens(gamedatas);
    this.setupFamilyMembers(gamedatas);
    this.setupSelectBoxes();
    this.setupShips(gamedatas);
    this.setupTreasuries(gamedatas);
  }

  private setupArmyPieces(gamedatas: GamedatasAlias) {
    Object.entries(gamedatas.armyPieces).forEach(([id, piece]) => {
      if (id.startsWith('Regiment')) {
        const elt = (this.armyPieces[id] = document.createElement('div'));
        elt.classList.add('joco-regiment');
      }
    });
    this.updateArmyPieces(Object.values(gamedatas.armyPieces));
  }

  private setupFamilyMembers(gamedatas: GamedatasAlias) {
    Object.values(gamedatas.familyMembers).forEach(({ id, familyId }) => {
      this.familyMembers[id] = createFamilyMember(
        familyId === CROWN
          ? COLOR_FAMILY_MAP[
              HEX_COLOR_COLOR_MAP[
                PlayerManager.getInstance()
                  .getPlayer(CROWN_PLAYER_ID)
                  .getColor()
              ]
            ]
          : familyId,
        id
      );
      // const elt = (this.familyMembers[familyMember.id] =
      //   document.createElement('div'));
      // const familyMemberNumber = `${
      //   Number(familyMember.id.split('_')[2]) % 18
      // }`;
      // elt.classList.add('joco_family_member');
      // elt.insertAdjacentHTML(
      //   'afterbegin',
      //   familyMemberSvgs[familyMemberNumber] ?? familyMemberSvgs[1]
      // );
      // let familyId = familyMember.familyId;
      // if (familyId === CROWN) {
      //   const crownColor = PlayerManager.getInstance()
      //     .getPlayer(CROWN_PLAYER_ID)
      //     .getColor();
      //   familyId = COLOR_FAMILY_MAP[HEX_COLOR_COLOR_MAP[crownColor]];
      // }
      // elt.setAttribute('data-family', familyId);
      // elt.setAttribute('data-number', familyMemberNumber);
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

  private setupPowerTokens(gamedatas) {
    POWER_TOKENS.forEach((token) => {
      const elt = (this.ui.powerTokens[token] = document.createElement('div'));
      elt.classList.add('joco-power-token');
      elt.setAttribute('data-type', token);
      const iconElt = document.createElement('div');
      iconElt.classList.add('joco-icon');
      iconElt.setAttribute('data-icon', POWER_TOKEN_ICON_MAP[token]);
      elt.appendChild(iconElt);
      this.ui.powerTokens.appendChild(elt);
    });
    this.updatePowerTokens(gamedatas);
  }

  private setupSelectBoxes() {
    [BENGAL, BOMBAY, MADRAS].forEach((region) => {
      const elt = (this.selectBoxes[`${region}_${WRITER}`] =
        document.createElement('div'));
      elt.classList.add('joco-select-box');
      elt.classList.add('joco-select-writer');
      elt.setAttribute('data-region', region);
      this.ui.selectBoxes.appendChild(elt);
    });
    STOCK_EXCHANGE_POSITIONS.forEach((position) => {
      const elt = (this.selectBoxes[position] = document.createElement('div'));
      elt.classList.add('joco-select-box');
      elt.classList.add('joco-seek-share');
      elt.setAttribute('data-position', position);
      this.ui.selectBoxes.appendChild(elt);
    });
  }

  private setupShips(gamedatas: GamedatasAlias) {
    Object.values(gamedatas.ships).forEach(({ id, type, fatigued }) => {
      const elt = (this.ships[id] = document.createElement('div'));

      elt.classList.add('joco-ship');

      elt.setAttribute('data-type', type);
      elt.setAttribute('data-fatigued', fatigued ? 'true' : 'false');
    });
    this.updateShips(Object.values(gamedatas.ships));
  }

  private setupTreasuries(gamedatas: GamedatasAlias) {
    Object.entries(TREASURY_POSITIONS).forEach(([office, position]) => {
      this.ui.treasuries.insertAdjacentHTML(
        'afterbegin',
        tplTreasury(office, position)
      );
      this.treasuries[office] = new ebg.counter();
      this.treasuries[office].create(`joco_${office}_treasury`);
      this.treasuries[office].setValue(gamedatas.offices[office].treasury);
    });
  }

  // .##.....##.########..########.....###....########.########....##.....##.####
  // .##.....##.##.....##.##.....##...##.##......##....##..........##.....##..##.
  // .##.....##.##.....##.##.....##..##...##.....##....##..........##.....##..##.
  // .##.....##.########..##.....##.##.....##....##....######......##.....##..##.
  // .##.....##.##........##.....##.#########....##....##..........##.....##..##.
  // .##.....##.##........##.....##.##.....##....##....##..........##.....##..##.
  // ..#######..##........########..##.....##....##....########.....#######..####

  updateArmyPieces(pieces: JocoArmyPieceBase[]) {
    this.ui.regiments.replaceChildren();
    pieces.forEach((piece) => {
      if (piece.location.startsWith('supply')) {
        return;
      }
      if (piece.id.startsWith('Regiment')) {
        const elt = this.armyPieces[piece.id];
        this.ui.regiments.appendChild(elt);
        setAbsolutePosition(
          elt,
          BOARD_SCALE,
          getRegimentPosition(
            piece.location,
            this.armies.regiments[piece.location].length,
            piece.exhausted
          )
        );
        this.armies.regiments[piece.location].push(elt);
      }
    });
  }

  updateFamilyMembers(familyMembers: JocoFamilyMember[]) {
    familyMembers.forEach((familyMember) => {
      const { location, id } = familyMember;
      if (location.startsWith('supply')) {
        return;
      }
      if (!this.familyMembers[id].parentElement) {
        this.ui.familyMembers.appendChild(this.familyMembers[id]);
      }

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
      } else if (location.startsWith('StockExchange')) {
        position = getStockExchangePosition(location);
      } else {
        position = FAMILY_MEMBER_OFFICE_CONFIG[location];
      }
      setAbsolutePosition(this.familyMembers[id], BOARD_SCALE, position);
    });
  }

  public async moveFamilyMember(
    familyMember: JocoFamilyMember,
    index: number = 0
  ) {
    await Interaction.use().wait(index * 200);
    const fromRect =
      this.familyMembers[familyMember.id].getBoundingClientRect();
    this.updateFamilyMembers([familyMember]);
    await this.game.animationManager.play(
      new BgaSlideAnimation({
        element: this.familyMembers[familyMember.id],
        transitionTimingFunction: 'ease-in-out',
        fromRect,
      })
    );
  }

  async placeFamilyMembers(
    familyMembers: JocoFamilyMember[],
    fromElement: HTMLElement
  ) {
    const fromRect = fromElement.getBoundingClientRect();
    const promises = familyMembers.map(async (familyMember, index) => {
      const { id } = familyMember;
      const player = PlayerManager.getInstance().getPlayerForFamily(
        familyMember.familyId
      );
      await this.game.framework().wait(index * 200);
      player.counters[FAMILY_MEMBERS_COUNTER].incValue(-1);
      this.updateFamilyMembers([familyMember]);
      await this.game.animationManager.play(
        new BgaSlideAnimation({
          element: this.familyMembers[id],
          transitionTimingFunction: 'ease-in-out',
          fromRect,
        })
      );
      if (
        familyMember.location === COURT_OF_DIRECTORS ||
        familyMember.location === CHAIRMAN
      ) {
        player.counters[SHARES_COUNTER].incValue(1);
      }
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

  private updatePowerTokens(gamedatas: GamedatasAlias) {
    gamedatas.powerTokens.forEach((token, index) => {
      setAbsolutePosition(
        this.ui.powerTokens[token],
        BOARD_SCALE,
        POWER_TOKEN_POSITIONS[index]
      );
    });
  }

  async movePawn(type: keyof typeof this.ui.pawns, value: string | number) {
    const fromRect = this.ui.pawns[type].getBoundingClientRect();
    this.updatePawn(type, value);
    await this.game.animationManager.play(
      new BgaSlideAnimation({
        element: this.ui.pawns[type],
        transitionTimingFunction: 'ease-in-out',
        fromRect,
      })
    );
  }

  updatePawn(type: keyof typeof this.ui.pawns, value: string | number) {
    let position: AbsolutePosition;
    switch (type) {
      case 'balance':
        position = getCompanyBalanceConfig(value as number);
        break;
      case 'debt':
        position = getCompanyDebtConfig(value as number);
        break;
      case 'phase':
        position = PHASE_CONFIG[value];
        break;
      case 'standing':
        position = getCompanyStandingConfig(value as number);
        break;
      case 'turn':
        position = TURN_CONFIG[value as string];
        break;
    }
    setAbsolutePosition(this.ui.pawns[type], BOARD_SCALE, position);
  }

  updatePawns(gamedatas: GamedatasAlias) {
    const { balance, debt, standing } = gamedatas.company;
    this.updatePawn('balance', balance);
    this.updatePawn('debt', debt);
    this.updatePawn('standing', standing);
    this.updatePawn('phase', gamedatas.phase);
    this.updatePawn('turn', gamedatas.turn);
  }

  public async placeShip(ship: JocoShipBase, fromElement?: HTMLElement) {
    const { id, location } = ship;
    if ([SOUTH_INDIAN, WEST_INDIAN, EAST_INDIAN].includes(location)) {
      this.ui.ships.appendChild(this.ships[id]);
      const position = getShipPosition(location, this.seas[location].length);
      this.seas[location].push(ship);
      setAbsolutePosition(this.ships[id], BOARD_SCALE, position);
      if (fromElement) {
        await this.game.animationManager.play(
          new BgaSlideAnimation({
            element: this.ships[id],
            transitionTimingFunction: 'ease-in-out',
            fromRect: fromElement.getBoundingClientRect(),
          })
        );
      }
    }
    // TODO:
    // Unfitted ships
  }

  private updateShips(ships: JocoShipBase[]) {
    ships.forEach((ship) => {
      this.placeShip(ship);
    });
  }
}
