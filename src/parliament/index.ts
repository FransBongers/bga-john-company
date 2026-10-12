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
import { PlayerManager } from '../player-manager';
import { formatStringRecursive, getPlayerName } from '../boilerplate';
import { tplLeaderOfTheOpposition } from './templates';

const tplParliament = () => `
  <div id="joco-parliament" class="joco-tab">
    <div id="joco-parliament-revealed-laws-container" class="joco-container hidden">
      <div class="joco-header"><span class="fb-font-baskerville fb-font-16 fb-font-bold">${_('Revealed Laws').toLocaleUpperCase()}</span></div>
      <div id="joco-parliament-revealed-laws">
          
      </div>
    </div>
    <div class="joco-container">
      <div class="joco-header"><span class="fb-font-baskerville fb-font-16 fb-font-bold">${_('Voting').toLocaleUpperCase()}</span></div>
      <div class="joco-row" style="margin-bottom: 12px;">
        <div class="joco-column joco-support-container">
          <span class="fb-font-baskerville fb-font-12 fb-font-bold">${_('Support').toLocaleUpperCase()}</span>
          <span id="joco-support-counter" class="fb-font-baskerville fb-font-20 fb-font-bold"></span>
        </div>
        <div class="joco-column joco-opposition-container">
          <span class="fb-font-baskerville fb-font-12">${_('Opposition').toLocaleUpperCase()}</span>
          <div id="joco-parliament-opposition"></div>
          
        </div>
      </div>
      <div class="joco-voting">
        <div class="joco-column">
          <div id="joco-parliament-selected-policy"></div>
          <span class="fb-font-baskerville fb-font-12">${_('Policy').toLocaleUpperCase()}</span>
        </div>
        <div class="joco-column" style="flex-grow: 1;">
          <div id="joco-parliament-selected-law"></div>
          <span class="fb-font-baskerville fb-font-12">${_('Law').toLocaleUpperCase()}</span>
        </div>
      </div>

    </div>

  </div>
`;

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

  getPrimeMinisterDial(): PrimeMinisterDial {
    return this.primeMinisterDial;
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
      this.tplOppositionContent(opposition),
    );
  }

  private tplOppositionContent = (
    opposition: GamedatasAlias['parliament']['opposition'],
  ) => {
    const order = Object.entries(opposition.votes)
      .map(([playerId, votes]) => ({
        playerId: parseInt(playerId, 10),
        playerName: getPlayerName(parseInt(playerId, 10)),
        votes,
      }))
      .sort((a, b) => {
        if (a.playerId === opposition.leader) {
          return -1;
        }
        if (b.playerId === opposition.leader) {
          return 1;
        }
        const difference = b.votes - a.votes;
        return difference;
      });

    let playerLog = '';
    let playerArgs = {};
    order.forEach(({ playerName, votes }, index) => {
      playerLog +=
        `\${tkn_playerName_${index}}: \${tkn_boldText_votes_${index}} vote(s)` +
        (index === order.length - 1 ? '' : ', ');
      playerArgs['tkn_playerName_' + index] = playerName;
      playerArgs['tkn_boldText_votes_' + index] = '' + votes;
    });

    return `
        ${
          opposition.leader !== null
            ? tplLeaderOfTheOpposition(getPlayerName(opposition.leader))
            : ''
        }
        <span class="fb-font-baskerville fb-font-16">
          ${formatStringRecursive('${playerLog}', {
            playerLog: {
              log: playerLog,
              args: playerArgs,
            },
          })}
        </span>
      `;
  };
}
