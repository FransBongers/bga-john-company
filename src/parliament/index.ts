import { LawCardsManager } from '../cards/law-cards';
import { BgaCards } from '../libs';
import { PrimeMinisterDial } from './prime-minister-dial';
import {
  GameAlias,
  GamedatasAlias,
  JocoLawCard,
  JocoLawCardBase,
} from '../types';
import { getLawCard } from '../utility';
import { tplOppositionContent, tplParliament } from './templates';
import { PowerMarkers } from './power-markers';

export class Parliament {
  private static instance: Parliament;
  private primeMinisterDial: PrimeMinisterDial;
  public revealedLaws: InstanceType<typeof BgaCards.LineStock<JocoLawCard>>;
  public selectedLaw: InstanceType<typeof BgaCards.LineStock<JocoLawCard>>;
  private supportCounter: Counter;
  private ui: {
    revealedLawsContainer: HTMLElement;
    oppositionContainer: HTMLElement;
  };
  private discard: InstanceType<typeof BgaCards.VoidStock<JocoLawCard>>;
  private powerMarkers: PowerMarkers;

  constructor(private game: GameAlias) {
    this.game = game;
    this.setup(game.gamedatas);
  }

  public static create(game: GameAlias) {
    Parliament.instance = new Parliament(game);
  }

  public static getInstance() {
    return Parliament.instance;
  }

  // ..######..########.########.##.....##.########.
  // .##....##.##..........##....##.....##.##.....##
  // .##.......##..........##....##.....##.##.....##
  // ..######..######......##....##.....##.########.
  // .......##.##..........##....##.....##.##.......
  // .##....##.##..........##....##.....##.##.......
  // ..######..########....##.....#######..##.......

  private setupSupportCounter(gamedatas: GamedatasAlias) {
    this.supportCounter = new ebg.counter();
    this.supportCounter.create('joco-support-counter');

    this.supportToValue(gamedatas.parliament.support);
  }

  private setupStocks(gamedatas: GamedatasAlias) {
    this.revealedLaws = new BgaCards.LineStock<JocoLawCard>(
      LawCardsManager.getInstance(),
      document.getElementById('joco-parliament-revealed-laws')!,
      {
        gap: '12px',
      },
    );

    const cards = gamedatas.parliament.revealedLaws.map(getLawCard);

    this.revealedLaws.addCards(cards);

    this.selectedLaw = new BgaCards.LineStock<JocoLawCard>(
      LawCardsManager.getInstance(),
      document.getElementById('joco-parliament-selected-law')!,
      {
        gap: '12px',
      },
    );
    const selectedLawCard = gamedatas.parliament.selectedLaw;
    if (selectedLawCard) {
      this.selectedLaw.addCard(getLawCard(selectedLawCard));
    }

    const elt = document.getElementById('joco-discard')!;
    this.discard = new BgaCards.VoidStock(LawCardsManager.getInstance(), elt);
  }

  private setupPowerMarkers(gamedatas: GamedatasAlias) {
    this.powerMarkers = new PowerMarkers({
      parentElement: document.getElementById('joco-power-markers-container')!,
      game: this.game,
    });
  }

  setup(gamedatas: GamedatasAlias) {
    document
      .getElementById('joco')
      .insertAdjacentHTML('afterbegin', tplParliament());

    this.primeMinisterDial = new PrimeMinisterDial({
      parent: document.getElementById('joco-parliament-selected-policy')!,
      gamedatas,
    });

    this.ui = {
      revealedLawsContainer: document.getElementById(
        'joco-parliament-revealed-laws-container',
      )!,
      oppositionContainer: document.getElementById(
        'joco-parliament-opposition',
      )!,
    };

    this.setupStocks(gamedatas);
    this.setupSupportCounter(gamedatas);
    this.setupPowerMarkers(gamedatas);
    this.showRevealedLaws(gamedatas.parliament.selectingLaw);
    this.updateOpposition(gamedatas.parliament.opposition);
  }

  // .##.....##.########..########.....###....########.########....##.....##.####
  // .##.....##.##.....##.##.....##...##.##......##....##..........##.....##..##.
  // .##.....##.##.....##.##.....##..##...##.....##....##..........##.....##..##.
  // .##.....##.########..##.....##.##.....##....##....######......##.....##..##.
  // .##.....##.##........##.....##.#########....##....##..........##.....##..##.
  // .##.....##.##........##.....##.##.....##....##....##..........##.....##..##.
  // ..#######..##........########..##.....##....##....########.....#######..####

  public async revealLaw(law: JocoLawCardBase) {
    await this.revealedLaws.addCard(getLawCard(law));
  }

  public async selectLaw(law: JocoLawCardBase) {
    const lawCard = getLawCard(law);
    await this.selectedLaw.addCard(lawCard);
    this.supportToValue(lawCard.initialSupport);
    await this.revealedLaws.removeAll();
    this.showRevealedLaws(false);
  }

  public getPrimeMinisterDial(): PrimeMinisterDial {
    return this.primeMinisterDial;
  }

  public getPowerMarkers(): PowerMarkers {
    return this.powerMarkers;
  }

  public supportToValue(support: number) {
    this.supportCounter.toValue(support);
  }

  public async showRevealedLaws(show: boolean) {
    if (show) {
      this.ui.revealedLawsContainer.classList.remove('hidden');
    } else {
      this.ui.revealedLawsContainer.classList.add('hidden');
    }
  }

  public updateOpposition(
    opposition: GamedatasAlias['parliament']['opposition'],
  ) {
    this.ui.oppositionContainer.replaceChildren();
    this.ui.oppositionContainer.insertAdjacentHTML(
      'beforeend',
      tplOppositionContent(opposition),
    );
  }

  public async discardCard(card: JocoLawCard) {
    await this.discard.addCard(card);
  }

  public reset(data: GamedatasAlias['parliament']) {
    this.updateOpposition(data.opposition);
    this.showRevealedLaws(data.selectingLaw);
    this.supportToValue(data.support);
  }
}
