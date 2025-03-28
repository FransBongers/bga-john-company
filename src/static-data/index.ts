class StaticData {
  private static instance: StaticData;
  private game: GameAlias;
  private staticData: JohnCompanyGamedatas['staticData'];

  constructor(game: GameAlias) {
    this.game = game;
    this.staticData = game.gamedatas.staticData;
  }

  public static create(game: GameAlias) {
    StaticData.instance = new StaticData(game);
  }

  public static get() {
    return StaticData.instance;
  }

  // ..######..########.########.##.....##.########.
  // .##....##.##..........##....##.....##.##.....##
  // .##.......##..........##....##.....##.##.....##
  // ..######..######......##....##.....##.########.
  // .......##.##..........##....##.....##.##.......
  // .##....##.##..........##....##.....##.##.......
  // ..######..########....##.....#######..##.......

  public order(id: string): JoCoOrderStatic {
    const order = this.staticData.orders[id];
    if (!order) {
      throw new Error('FE_ERROR_001');
    }
    return order;
  }

  public region(id: string) {
    return this.staticData.regions[id];
  }

  public setupCard(id: string): JocoSetupCardStatic {
    return this.staticData.setupCards[id];
  }

  public setupCards(): JocoSetupCardStatic[] {
    return Object.values(this.staticData.setupCards);
  }
}
