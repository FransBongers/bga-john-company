import { LawCardsManager } from '../cards/law-cards';
import { LondonSeasonCardsManager } from '../cards/london-season-cards';
import { PENSIONERS, PRIZES, VICTORY_POINTS } from '../constants';
import { BgaCards } from '../libs';
import { createFamilyMember } from '../templates';
import {
  GameAlias,
  GamedatasAlias,
  JocoLawCard,
  JocoLondonSeasonCard,
} from '../types';
import { getLawCard, getLondonSeasonCard } from '../utility';
import { tplLondonSeasonOrder, tplPrize } from './templates';

const tplLondon = () => `
  <div id="joco-london" class="joco-tab">
    <div class="joco-left-column joco-column">
      <div id="joco-pensioners" class="joco-container">
        <div class="joco-header"><span class="fb-font-baskerville fb-font-16 fb-font-bold">${_('Pensioners').toLocaleUpperCase()}</span></div>
        <div id="${PENSIONERS}" class="joco-family-members-stock">
        </div>
      </div>
      ${Object.entries(PRIZES)
        .map(([key, prize]) => tplPrize(prize))
        .join('')}
    </div>
    <div class="joco-right-column joco-column">
      <div class="joco-container">
        <div class="joco-header"><span class="fb-font-baskerville fb-font-16 fb-font-bold">${_('London Season Display').toLocaleUpperCase()}</span></div>
        <div id="joco-london-season-display">
          
        </div>
        <div id="joco-london-season-order">

        </div>
      </div>
      <div class="joco-container">
        <div class="joco-header"><span class="fb-font-baskerville fb-font-16 fb-font-bold">${_('Passed Laws').toLocaleUpperCase()}</span></div>
        <div id="joco-london-laws">
          
        </div>
      </div>
    </div>
  </div>
`;

export class London {
  private static instance: London;
  public seasonDisplay: InstanceType<
    typeof BgaCards.LineStock<JocoLondonSeasonCard>
  >;
  public passedLaws: InstanceType<typeof BgaCards.LineStock<JocoLawCard>>;

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

  private setupPassedLaws(gamedatas: GamedatasAlias) {
    this.passedLaws = new BgaCards.LineStock<JocoLawCard>(
      LawCardsManager.getInstance(),
      document.getElementById('joco-london-laws')!,
    );

    this.updatePassedLaws(gamedatas);
  }

  private setupLondonSeasonDisplay(gamedatas: GamedatasAlias) {
    this.seasonDisplay = new BgaCards.LineStock<JocoLondonSeasonCard>(
      LondonSeasonCardsManager.getInstance(),
      document.getElementById('joco-london-season-display')!,
      {
        gap: '12px',
      },
    );

    this.updateLondonSeasonDisplay(gamedatas);
  }

  setup(gamedatas: GamedatasAlias) {
    document
      .getElementById('joco')
      .insertAdjacentHTML('afterbegin', tplLondon());

    this.setupLondonSeasonDisplay(gamedatas);
    this.setupPassedLaws(gamedatas);
    this.updateFamilyMembers(gamedatas);
    this.updateLondonSeasonOrder(gamedatas.londonSeason);
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
    this.seasonDisplay.addCards(cards); //.then(() => {
    //   console.log('London Season Display updated successfully.');
    // });
  }

  public updateLondonSeasonOrder(data: GamedatasAlias['londonSeason']) {
    const orderContainer = document.getElementById('joco-london-season-order');

    orderContainer.replaceChildren();

    if (!data.order || data.order.length === 0) return;
    orderContainer.insertAdjacentHTML('beforeend', tplLondonSeasonOrder(data));
  }

  updatePassedLaws(gamedatas: GamedatasAlias) {
    const cards = gamedatas.passedLaws.map(getLawCard);

    this.passedLaws.addCards(cards); //.then(() => {
  }

  updateFamilyMembers(gamedatas: GamedatasAlias) {
    const pensionersBox = document.getElementById(PENSIONERS);
    Object.values(gamedatas.familyMembers).forEach((familyMember) => {
      const location = familyMember.location;
      if (location === PENSIONERS) {
        pensionersBox?.appendChild(
          createFamilyMember(familyMember.familyId, familyMember.id),
        );
      } else if (location.startsWith('Prize')) {
        document
          .getElementById(location)
          ?.appendChild(
            createFamilyMember(familyMember.familyId, familyMember.id),
          );
      }
    });
  }
}
