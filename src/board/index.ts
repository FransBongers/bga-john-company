class Board {
  private static instance: Board;
  private game: GameAlias;

  public ui: {
    containers: {
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
    armyPieces: Record<string, HTMLElement>;
    familyMembers: Record<string, HTMLElement>;
    orders: Record<string, HTMLElement>;
    ships: Record<string, HTMLElement>;
    selectBoxes: Record<string, HTMLElement>;
  };
  // Locations with ids for position in location
  public familyMembers: Record<string, JocoFamilyMember[]> = {};

  // private courtOfDirectors: JocoFamilyMember[] = [];

  private regions: Record<string, Region> = {};
  public armies: {
    regiments: {
      Army_Bengal: JocoArmyPieceBase[];
      Army_Bombay: JocoArmyPieceBase[];
      Army_Madras: JocoArmyPieceBase[];
    };
  } = {
    regiments: {
      [BENGAL_ARMY]: [],
      [BOMBAY_ARMY]: [],
      [MADRAS_ARMY]: [],
    },
  };
  // public writers: {
  //   Bengal: JocoFamilyMember[];
  //   Bombay: JocoFamilyMember[];
  //   Madras: JocoFamilyMember[];
  // } = {
  //   [BENGAL]: [],
  //   [BOMBAY]: [],
  //   [MADRAS]: [],
  // };
  private powerTokens: Record<string, HTMLElement> = {};
  public seas: {
    westIndian: Array<JocoShipBase | null>;
    eastIndian: Array<JocoShipBase | null>;
    southIndian: Array<JocoShipBase | null>;
  } = {
    [WEST_INDIAN]: [],
    [SOUTH_INDIAN]: [],
    [EAST_INDIAN]: [],
  };
  public treasuries: Record<string, Treasury> = {};

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
      containers: {
        board: document.getElementById('joco-board'),
        familyMembers: document.getElementById('joco-family-members'),
        orders: document.getElementById('joco-orders'),
        regiments: document.getElementById('joco-regiments'),
        pawns: {},
        powerTokens: document.getElementById('joco-power-tokens'),
        selectBoxes: document.getElementById('joco-select-boxes'),
        ships: document.getElementById('joco_ships'),
        treasuries: document.getElementById('joco_treasuries'),
      },
      armyPieces: {},
      familyMembers: {},
      orders: {},
      selectBoxes: {},
      ships: {},
    };

    // this.ui.containers.board.insertAdjacentHTML('afterbegin', familyMember);
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
        this.ui.armyPieces[id] = createRegiment();
      }
    });
    this.updateArmyPieces(Object.values(gamedatas.armyPieces));
  }

  private setupFamilyMembers(gamedatas: GamedatasAlias) {
    Object.values(gamedatas.familyMembers).forEach(({ id, familyId }) => {
      this.ui.familyMembers[id] = createFamilyMember(
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
      [
        COURT_OF_DIRECTORS,
        OFFICER_IN_TRAINING,
        ...WRITER_LOCATIONS,
        ...ARMIES,
      ].forEach((location) => {
        this.familyMembers[location] = [];
      });

      // const elt = (this.familyMembers[familyMember.id] =
      //   document.createElement('div'));
      // const familyMemberNumber = `${
      //   Number(familyMember.id.split('_')[2]) % 18
      // }`;
      // elt.classList.add('joco-family-member');
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
      const elt = (this.ui.orders[orderId] = document.createElement('div'));
      // elt.id = orderId;
      elt.classList.add('joco-order');
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
      const elt = (this.ui.containers.pawns[pawn] =
        document.createElement('div'));
      elt.id = pawn;
      elt.classList.add('joco_pawn');
      elt.setAttribute(
        'data-color',
        pawn === 'turn' ? 'black' : pawn === 'phase' ? 'silver' : 'red'
      );
      this.ui.containers.board.appendChild(elt);
    });

    this.updatePawns(gamedatas);
  }

  private setupPowerTokens(gamedatas) {
    POWER_TOKENS.forEach((token) => {
      const elt = (this.ui.containers.powerTokens[token] =
        document.createElement('div'));
      elt.classList.add('joco-power-token');
      elt.setAttribute('data-type', token);
      const iconElt = document.createElement('div');
      iconElt.classList.add('joco-icon');
      iconElt.setAttribute('data-icon', POWER_TOKEN_ICON_MAP[token]);
      elt.appendChild(iconElt);
      this.ui.containers.powerTokens.appendChild(elt);
    });
    this.updatePowerTokens(gamedatas);
  }

  private setupSelectBoxes() {
    ARMIES.forEach((army) => {
      const elt = (this.ui.selectBoxes[army] = document.createElement('div'));
      elt.classList.add('joco-select-box');
      elt.classList.add('joco-select-army');
      setAbsolutePosition(elt, BOARD_SCALE, ARMY_SELECT_POSITIONS[army]);
      this.ui.containers.selectBoxes.appendChild(elt);
    });
    [BENGAL, BOMBAY, MADRAS].forEach((region) => {
      const elt = (this.ui.selectBoxes[`Writers_${region}`] =
        document.createElement('div'));
      elt.classList.add('joco-select-box');
      elt.classList.add('joco-select-writer');
      elt.setAttribute('data-region', region);
      this.ui.containers.selectBoxes.appendChild(elt);
    });
    SEA_ZONES.forEach((seaZone) => {
      const elt = (this.ui.selectBoxes[seaZone] =
        document.createElement('div'));
      elt.classList.add('joco-select-box');
      elt.classList.add('joco-select-sea-zone');
      setAbsolutePosition(elt, BOARD_SCALE, SEA_ZONE_SELECT_POSITIONS[seaZone]);
      this.ui.containers.selectBoxes.appendChild(elt);
    });
    STOCK_EXCHANGE_POSITIONS.forEach((position) => {
      const elt = (this.ui.selectBoxes[position] =
        document.createElement('div'));
      elt.classList.add('joco-select-box');
      elt.classList.add('joco-seek-share');
      elt.setAttribute('data-position', position);
      this.ui.containers.selectBoxes.appendChild(elt);
    });
    Array.from(Array(9).keys()).forEach((value) => {
      const elt = (this.ui.selectBoxes[`companyDebt_${value}`] =
        document.createElement('div'));
      elt.classList.add('joco-select-box');
      elt.classList.add('joco-company-debt');
      setAbsolutePosition(
        elt,
        BOARD_SCALE,
        COMPANY_DEBT_SELECT_POSITIONS[value]
      );
      this.ui.containers.selectBoxes.appendChild(elt);
    });
  }

  private setupShips(gamedatas: GamedatasAlias) {
    Object.values(gamedatas.ships).forEach(({ id, name, type, fatigued }) => {
      this.ui.ships[id] = createShip({ name, type, fatigued });
    });
    this.updateShips(Object.values(gamedatas.ships));
  }

  private setupTreasuries(gamedatas: GamedatasAlias) {
    Object.entries(TREASURY_POSITIONS).forEach(([office, position]) => {
      this.treasuries[office] = new Treasury({
        gamedatas,
        office,
        position,
        container: this.ui.containers.treasuries,
      });
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
    // this.ui.containers.regiments.replaceChildren();
    pieces.forEach((piece) => {
      if (piece.location.startsWith('supply')) {
        return;
      }
      if (piece.id.startsWith('Regiment')) {
        const elt = this.ui.armyPieces[piece.id];
        if (!this.ui.armyPieces[piece.id].parentElement) {
          this.ui.containers.regiments.appendChild(elt);
        }

        setAbsolutePosition(
          elt,
          BOARD_SCALE,
          getRegimentPosition(
            piece.location,
            this.armies.regiments[piece.location].length,
            piece.exhausted
          )
        );
        this.armies.regiments[piece.location].push(piece);
      }
    });
  }

  updateFamilyMembers(familyMembers: JocoFamilyMember[]) {
    familyMembers.forEach((familyMember) => {
      const { location, id } = familyMember;
      if (location.startsWith('supply')) {
        return;
      }
      if (!this.ui.familyMembers[id].parentElement) {
        this.ui.containers.familyMembers.appendChild(this.ui.familyMembers[id]);
      }

      let position: AbsolutePosition = { top: 0, left: 0 };

      switch (location) {
        case COURT_OF_DIRECTORS:
          position = getCourtOfDirectorsPosition(
            this.familyMembers[COURT_OF_DIRECTORS].length
          );
          this.familyMembers[COURT_OF_DIRECTORS].push(familyMember);
          break;
        case OFFICER_IN_TRAINING:
          position = getOfficersInTrainingPosition(
            this.familyMembers[OFFICER_IN_TRAINING].length
          );
          this.familyMembers[OFFICER_IN_TRAINING].push(familyMember);
          break;
        case BENGAL_WRITERS:
        case BOMBAY_WRITERS:
        case MADRAS_WRITERS:
          position = getWriterPosition(
            location,
            this.familyMembers[location].length
          );
          this.familyMembers[location].push(familyMember);
          break;
        case BENGAL_ARMY:
        case BOMBAY_ARMY:
        case MADRAS_ARMY:
          position = getOfficerPosition(
            location,
            this.familyMembers[location].length
          );
          this.familyMembers[location].push(familyMember);
          break;
        case STOCK_EXCHANGE_2:
        case STOCK_EXCHANGE_3_LEFT:
        case STOCK_EXCHANGE_3_RIGHT:
        case STOCK_EXCHANGE_4:
        case STOCK_EXCHANGE_5:
          position = getStockExchangePosition(location);
          break;
        default:
          position = FAMILY_MEMBER_OFFICE_CONFIG[location];
          break;
      }

      setAbsolutePosition(this.ui.familyMembers[id], BOARD_SCALE, position);
    });
  }

  public async moveFamilyMember({
    familyMember,
    index = 0,
  }: {
    familyMember: JocoFamilyMember;
    index?: number;
  }) {
    await Interaction.use().wait(index * 200);
    const fromRect =
      this.ui.familyMembers[familyMember.id].getBoundingClientRect();
    this.updateFamilyMembers([familyMember]);
    await this.game.animationManager.play(
      new BgaSlideAnimation({
        element: this.ui.familyMembers[familyMember.id],
        transitionTimingFunction: 'ease-in-out',
        fromRect,
      })
    );
  }

  public async moveFamilyMemberBetweenLocations(
    familyMember: JocoFamilyMember,
    to: string // key of this.familyMember
  ) {

    const from = familyMember.location;
    familyMember.location = to;

    // Skip if family member is already in location, ie player already moved it when performing action
    // and this is triggered by notif.
    if (
      this.familyMembers[familyMember.location].some(
        (memberInLocation: JocoFamilyMember) =>
          memberInLocation.id === familyMember.id
      )
    ) {
      return;
    }

    const remainingFamilyMembers = this.familyMembers[from].filter(
      (member: JocoFamilyMember) => member.id !== familyMember.id
    );

    this.familyMembers[from] = [];
    const promises = remainingFamilyMembers.map((member: JocoFamilyMember) =>
      this.moveFamilyMember({ familyMember: member })
    );
    promises.push(this.moveFamilyMember({ familyMember }));
    await Promise.all(promises);
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
          element: this.ui.familyMembers[id],
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
    this.ui.containers.orders.replaceChildren();
    Object.entries(gamedatas.orders).forEach(([orderId, order]) => {
      setAbsolutePosition(
        this.ui.orders[orderId],
        BOARD_SCALE,
        ORDERS_CONFIG[orderId]
      );
      // this.orders[orderId].style.top = `calc(var(--boardScale) * ${ORDERS_CONFIG[orderId].top}px)`
      // this.orders[orderId].style.left = `calc(var(--boardScale) * ${ORDERS_CONFIG[orderId].left}px)`
      this.ui.orders[orderId].setAttribute('data-status', order.status);
      this.ui.containers.orders.appendChild(this.ui.orders[orderId]);
    });
  }

  private updatePowerTokens(gamedatas: GamedatasAlias) {
    gamedatas.powerTokens.forEach((token, index) => {
      setAbsolutePosition(
        this.ui.containers.powerTokens[token],
        BOARD_SCALE,
        POWER_TOKEN_POSITIONS[index]
      );
    });
  }

  async movePawn(
    type: keyof typeof this.ui.containers.pawns,
    value: string | number
  ) {
    const fromRect = this.ui.containers.pawns[type].getBoundingClientRect();
    this.updatePawn(type, value);
    await this.game.animationManager.play(
      new BgaSlideAnimation({
        element: this.ui.containers.pawns[type],
        transitionTimingFunction: 'ease-in-out',
        fromRect,
      })
    );
  }

  updatePawn(
    type: keyof typeof this.ui.containers.pawns,
    value: string | number
  ) {
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
    setAbsolutePosition(this.ui.containers.pawns[type], BOARD_SCALE, position);
  }

  updatePawns(gamedatas: GamedatasAlias) {
    const { balance, debt, standing } = gamedatas.company;
    this.updatePawn('balance', balance);
    this.updatePawn('debt', debt);
    this.updatePawn('standing', standing);
    this.updatePawn('phase', gamedatas.phase);
    this.updatePawn('turn', gamedatas.turn);
  }

  public async moveRegiment(regiment: JocoArmyPieceBase, index: number = 0) {
    await Interaction.use().wait(index * 200);

    const fromRect = this.ui.armyPieces[regiment.id].getBoundingClientRect();

    this.updateArmyPieces([regiment]);
    await this.game.animationManager.play(
      new BgaSlideAnimation({
        element: this.ui.armyPieces[regiment.id],
        transitionTimingFunction: 'ease-in-out',
        fromRect,
      })
    );
  }

  public async moveRegimentBetweenArmies(
    regiment: JocoArmyPieceBase,
    from: string
  ) {
    // Skip if regiment is already in location, ie player already moved it when performing action
    // and this is triggered by notif.
    if (
      this.armies.regiments[regiment.location].some(
        (regimentInLocation: JocoFamilyMember) =>
          regimentInLocation.id === regiment.id
      )
    ) {
      return;
    }

    const remainingRegiments = this.armies.regiments[from].filter(
      (piece: JocoArmyPieceBase) => piece.id !== regiment.id
    );

    this.armies.regiments[from] = [];
    const promises = remainingRegiments.map((remaining: JocoArmyPieceBase) =>
      this.moveRegiment(remaining)
    );

    promises.push(this.moveRegiment(regiment));
    await Promise.all(promises);
  }

  public async moveShip({
    ship,
    index = 0,
    from,
  }: {
    ship: JocoShipBase;
    from?: string;
    index?: number;
  }) {
    await Interaction.use().wait(index * 200);
    const fromRect = this.ui.ships[ship.id].getBoundingClientRect();
    const fromIndex = this.seas[from].findIndex(
      (shipInOldZone: JocoShipBase | null) => shipInOldZone?.id === ship.id
    );
    this.placeShip(ship);
    if (fromIndex >= 0) {
      this.seas[from][fromIndex] = null;
    }
    await this.game.animationManager.play(
      new BgaSlideAnimation({
        element: this.ui.ships[ship.id],
        transitionTimingFunction: 'ease-in-out',
        fromRect,
      })
    );
  }

  public async removeShip(shipId: string, seaZone: string) {
    this.ui.ships[shipId].remove();
    const fromIndex = this.seas[seaZone].findIndex(
      (shipInOldZone: JocoShipBase | null) => shipInOldZone?.id === shipId
    );
    if (fromIndex >= 0) {
      this.seas[seaZone][fromIndex] = null;
    }
  }

  public updateOtherShip(
    ship: JocoShipBase,
    type: OtherShipType
  ): JocoShipBase {
    this.ui.ships[ship.id].setAttribute('data-type', type);
    ship.type = type;
    ship.name = type === 'ExtraShip' ? _('Extra Ship') : _('Company Ship');
    return ship;
  }

  public shipAlreadyInZone(shipId: string, location: string) {
    return this.seas[location].some(
      (shipInLocation: JocoShipBase | null) => shipInLocation?.id === shipId
    );
  }

  public async placeShip(ship: JocoShipBase, fromElement?: HTMLElement) {
    const { id, location } = ship;
    if ([SOUTH_INDIAN, WEST_INDIAN, EAST_INDIAN].includes(location)) {
      // Skip if ship is already in location, ie player already moved it when performing action
      // and this is triggered by notif.
      if (this.shipAlreadyInZone(id, location)) {
        return;
      }
      if (!this.ui.ships[id].parentElement) {
        this.ui.containers.ships.appendChild(this.ui.ships[id]);
      }
      const nullIndex = (this.seas[location] as JocoShipBase[]).findIndex(
        (pos) => pos === null
      );

      const shipIndex = nullIndex >= 0 ? nullIndex : this.seas[location].length;

      const position = getShipPosition(location, shipIndex);
      this.seas[location][shipIndex] = ship;
      setAbsolutePosition(this.ui.ships[id], BOARD_SCALE, position);
      if (fromElement) {
        await this.game.animationManager.play(
          new BgaSlideAnimation({
            element: this.ui.ships[id],
            transitionTimingFunction: 'ease-in-out',
            fromRect: fromElement.getBoundingClientRect(),
          })
        );
      }
    } else if (location.startsWith(SHIPYARD)) {
      // Unfitted
      // TODO: place on cards in player area
      const enterprise = this.game.gamedatas.enterprises[location];
      const player = PlayerManager.getInstance().getPlayerForFamily(
        enterprise.location
      );
      player.counters[SHIPS_COUNTER].incValue(1);
    }
  }

  private updateShips(ships: JocoShipBase[]) {
    ships.forEach((ship) => {
      this.placeShip(ship);
    });
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...
}
