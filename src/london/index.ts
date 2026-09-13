import { LondonSeasonCardsManager } from '../cards/london-season-cards';
import { BgaCards } from '../libs';
import { GameAlias, GamedatasAlias, JocoLondonSeasonCard } from '../types';
import { getLondonSeasonCard } from '../utility';

const tplLondon = () => `
  <div id="joco-london" class="joco-tab">
    London Season Display
    <div id="joco-london-season-display">
      
    </div>
    <div id="joco-pensioners">
      Pensioners
    </div>
    <div id="joco-prizes">
      Prizes
    </div>
  </div>
`;

export class London {
  private static instance: London;
  public seasonDisplay: InstanceType<
    typeof BgaCards.LineStock<JocoLondonSeasonCard>
  >;

  constructor(private game: GameAlias) {
    this.game = game;
    this.setup(game.gamedatas);
  }

  public static create(game: GameAlias) {
    London.instance = new London(game);
  }

  public static getInstance() {
    return London.instance;
  }

  // ..######..########.########.##.....##.########.
  // .##....##.##..........##....##.....##.##.....##
  // .##.......##..........##....##.....##.##.....##
  // ..######..######......##....##.....##.########.
  // .......##.##..........##....##.....##.##.......
  // .##....##.##..........##....##.....##.##.......
  // ..######..########....##.....#######..##.......

  private setupLondonSeasonDisplay(gamedatas: GamedatasAlias) {
    this.seasonDisplay = new BgaCards.LineStock<JocoLondonSeasonCard>(
      LondonSeasonCardsManager.getInstance(),
      document.getElementById('joco-london-season-display')!,
    );

    this.updateLondonSeasonDisplay(gamedatas);
  }

  setup(gamedatas: GamedatasAlias) {
    document
      .getElementById('joco')
      .insertAdjacentHTML('afterbegin', tplLondon());

    this.setupLondonSeasonDisplay(gamedatas);
  }

  // .##.....##.########..########.....###....########.########....##.....##.####
  // .##.....##.##.....##.##.....##...##.##......##....##..........##.....##..##.
  // .##.....##.##.....##.##.....##..##...##.....##....##..........##.....##..##.
  // .##.....##.########..##.....##.##.....##....##....######......##.....##..##.
  // .##.....##.##........##.....##.#########....##....##..........##.....##..##.
  // .##.....##.##........##.....##.##.....##....##....##..........##.....##..##.
  // ..#######..##........########..##.....##....##....########.....#######..####

  updateLondonSeasonDisplay(gamedatas: GamedatasAlias) {
    const cards = gamedatas.londonSeasonDisplay.map(getLondonSeasonCard);
    // console.log('Updating London Season Display with cards:', cards);
    // cards.forEach((card) => this.seasonDisplay.addCard(card));
    this.seasonDisplay.addCards(cards);//.then(() => {
    //   console.log('London Season Display updated successfully.');
    // });
  }
}
