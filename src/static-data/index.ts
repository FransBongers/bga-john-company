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
