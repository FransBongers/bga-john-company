import {
  GameAlias,
  JohnCompanyGamedatas,
  JoCoOrderStatic,
  JocoOfficeStatic,
  JocoSetupCardStatic,
  JocoLondonSeasonCardStatic,
  JocoLawCardStatic,
  JocoEnterpriseCardStatic,
  JocoShipBase,
} from '../types';

export class StaticData {
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

  public enterpriseCard(id: string): JocoEnterpriseCardStatic {
    const card =
      this.staticData.enterpriseCards[id] ?? ({} as JocoEnterpriseCardStatic);
    if (!card) {
      throw new Error('STATIC_DATA_ERROR_001');
    }
    return card;
  }

  public lawCard(id: string): JocoLawCardStatic {
    const card = this.staticData.lawCards[id] ?? ({} as JocoLawCardStatic);
    if (!card) {
      throw new Error('STATIC_DATA_ERROR_001');
    }
    return card;
  }

  public londonSeasonCard(id: string): JocoLondonSeasonCardStatic {
    const card =
      this.staticData.londonSeasonCards[id] ??
      ({} as JocoLondonSeasonCardStatic);
    if (!card) {
      throw new Error('STATIC_DATA_ERROR_002');
    }
    return card;
  }

  public order(id: string): JoCoOrderStatic {
    const order = this.staticData.orders[id];
    if (!order) {
      throw new Error('STATIC_DATA_ERROR_003');
    }
    return order;
  }

  public office(id: string): JocoOfficeStatic {
    const office = this.staticData.offices[id];
    if (!office) {
      throw new Error('STATIC_DATA_ERROR_004');
    }
    return office;
  }

  public region(id: string) {
    const region = this.staticData.regions[id];
    if (!region) {
      throw new Error('STATIC_DATA_ERROR_005');
    }
    return region;
  }

  public setupCard(id: string): JocoSetupCardStatic {
    const setupCard = this.staticData.setupCards[id];
    if (!setupCard) {
      throw new Error('STATIC_DATA_ERROR_006');
    }
    return setupCard;
  }

  public setupCards(): JocoSetupCardStatic[] {
    return Object.values(this.staticData.setupCards);
  }

  public ship(id: string): JocoShipBase {
    console.log('getting ship data for id:', id);
    return this.game.gamedatas.ships[id];
  }
}
