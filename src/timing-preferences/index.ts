import { DECK } from '../boilerplate';
import {
  AFTER_OFFICE_FINISHED_ACTING, BEFORE_OFFICE_ACTS, BLACKMAIL, CHAIRMAN, DIRECTOR_OF_TRADE,
  END_OF_PHASE, GOVERNOR_GENERAL, GOVERNOR_OF_BENGAL, GOVERNOR_OF_BOMBAY,
  GOVERNOR_OF_DELHI, GOVERNOR_OF_HYDERABAD, GOVERNOR_OF_MADRAS,
  GOVERNOR_OF_MARATHA, GOVERNOR_OF_MYSORE, GOVERNOR_OF_PUNJAB,
  MANAGER_OF_SHIPPING, MILITARY_AFFAIRS, PRESIDENT_OF_BENGAL, PRESIDENT_OF_BOMBAY,
  PRESIDENT_OF_MADRAS, START_OF_PHASE, SUPERINTENDENT_OF_TRADE_IN_CHINA,
} from '../constants';
import { GameAlias, JocoLawCardBase, JocoLondonSeasonCardBase, JocoPromiseCardBase } from '../types';

const phases: Array<[string, string]> = [
  ['londonSeason', 'London Season'], ['family', 'Family'],
  ['firms', 'Firms'], ['hiring', 'Hiring'],
  ['companyOperations', 'Company Operations'], ['revenue', 'Revenue'],
  ['eventsInIndia', 'Events in India'], ['ParliamentMeets', 'Parliament Meets'],
  ['upkeepAndRefresh', 'Upkeep & Refresh'],
];

const otherWindows: Array<[string, string]> = [
  ['duringHiringIfYouAreACandidate', 'During hiring'],
  ['afterPresidentOrFirmCheck', 'After a trade check'],
  ['afterCommanderDeployCheck', 'After a deploy check'],
  ['immediatelyAfterMilitaryAffairsActs', 'After Military Affairs acts'],
  ['beforeBombayPresidencyOperations', 'Before Bombay Presidency operations'],
  ['startOfLondonSeasonChooseCard', 'Before choosing a London Season card'],
  ['whenRetiring', 'When retiring'],
  ['beforeAnyVotesAreCast', 'Before votes are cast'],
  ['anyTimeAfterRevenuePhase', 'After Revenue'],
];

const officeIds = new Set([
  CHAIRMAN, DIRECTOR_OF_TRADE, GOVERNOR_GENERAL, MANAGER_OF_SHIPPING,
  MILITARY_AFFAIRS, SUPERINTENDENT_OF_TRADE_IN_CHINA,
  PRESIDENT_OF_BOMBAY, PRESIDENT_OF_MADRAS, PRESIDENT_OF_BENGAL,
  GOVERNOR_OF_BOMBAY, GOVERNOR_OF_MADRAS, GOVERNOR_OF_BENGAL,
  GOVERNOR_OF_PUNJAB, GOVERNOR_OF_DELHI, GOVERNOR_OF_MARATHA,
  GOVERNOR_OF_HYDERABAD, GOVERNOR_OF_MYSORE,
]);

const kinds: Array<{ id: string; label: string; items?: 'phase' | 'office' }> = [
  { id: START_OF_PHASE, label: 'Start of a phase', items: 'phase' },
  { id: END_OF_PHASE, label: 'End of a phase', items: 'phase' },
  { id: BEFORE_OFFICE_ACTS, label: 'Before an office acts', items: 'office' },
  { id: AFTER_OFFICE_FINISHED_ACTING, label: 'After an office acts', items: 'office' },
  // ...otherWindows.map(([id, label]) => ({ id, label })),
];

export class TimingPreferences {
  private static instance: TimingPreferences;
  private preferences: { window: Record<string, boolean>; card: Record<string, boolean> };
  private officeLocations: Record<string, string>;
  private promiseCards: Record<string, JocoPromiseCardBase>;
  private blackmailCards: Record<string, JocoLondonSeasonCardBase> = {};
  private passedLaws: Record<string, JocoLawCardBase>;
  private primeMinisterId: number | null;
  private kindSelect: HTMLSelectElement;
  private itemSelect: HTMLSelectElement;
  private itemField: HTMLElement;
  private addButton: HTMLButtonElement;
  private list: HTMLElement;
  private error: HTMLElement;
  private pending = false;

  private constructor(private game: GameAlias) {
    this.preferences = game.gamedatas.timingPreferences;
    this.officeLocations = Object.fromEntries(Object.entries(game.gamedatas.offices).map(([id, office]) => [id, office.location]));
    this.promiseCards = { ...game.gamedatas.promiseCards };
    this.passedLaws = Object.fromEntries(game.gamedatas.passedLaws.map((card) => [card.id, card]));
    this.primeMinisterId = game.gamedatas.parliament.primeMinister.playerId;
    const player = game.gamedatas.players[game.getPlayerId()];
    player?.londonSeasonCards.forEach((card) => {
      if (card.type === BLACKMAIL && card.hiddenId) this.blackmailCards[card.id] = card;
    });
  }

  public static create(game: GameAlias) {
    TimingPreferences.instance = new TimingPreferences(game);
  }

  public static get() {
    return TimingPreferences.instance;
  }

  public setup() {
    if (this.game.isSpectator) return;
    const tab = document.createElement('div');
    tab.id = 'joco-timing-preferences';
    tab.className = 'joco-tab';
    const content = document.createElement('div');
    content.className = 'joco-timing-content joco-container';
    const title = document.createElement('h2');
    title.textContent = _('Alerts');
    const form = document.createElement('form');
    form.className = 'joco-timing-form';
    const kindField = document.createElement('label');
    kindField.textContent = _('Timing window');
    this.kindSelect = document.createElement('select');
    kindField.appendChild(this.kindSelect);
    this.itemField = document.createElement('label');
    this.itemSelect = document.createElement('select');
    this.addButton = document.createElement('button');
    this.addButton.type = 'submit';
    this.addButton.className = 'bgabutton bgabutton_blue';
    this.addButton.textContent = _('Add');
    form.append(kindField, this.itemField, this.addButton);
    this.error = document.createElement('p');
    this.error.className = 'joco-timing-error';
    this.error.setAttribute('role', 'alert');
    const listTitle = document.createElement('h3');
    listTitle.textContent = _('Active Alerts');
    this.list = document.createElement('div');
    this.list.className = 'joco-timing-list';
    content.append(title, form, this.error, listTitle, this.list);
    tab.appendChild(content);
    document.getElementById('joco').appendChild(tab);
    this.kindSelect.addEventListener('change', () => this.render());
    this.itemSelect.addEventListener('change', () => this.updateAddButton());
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const kind = kinds.find((entry) => entry.id === this.kindSelect.value);
      if (!kind || this.addButton.disabled) return;
      const key = kind.items ? `${kind.id}:${this.itemSelect.value}` : kind.id;
      void this.updateWindow(key, true);
    });
    this.render();
  }

  public updateOffice(id: string, location: string) {
    this.officeLocations[id] = location;
    if (location === DECK) {
      delete this.preferences.window[`${BEFORE_OFFICE_ACTS}:${id}`];
      delete this.preferences.window[`${AFTER_OFFICE_FINISHED_ACTING}:${id}`];
    }
    if (!this.game.isSpectator && this.list) this.render();
  }

  public updatePromiseCard(card: JocoPromiseCardBase) {
    this.promiseCards[card.id] = card;
    if (!this.game.isSpectator && this.list) this.render();
  }

  public updateLondonSeasonCard(card: JocoLondonSeasonCardBase) {
    if (card.type !== BLACKMAIL) return;
    if (card.location === `londonSeasonCards_${this.game.getPlayerId()}` && card.hiddenId) {
      this.blackmailCards[card.id] = card;
    } else {
      delete this.blackmailCards[card.id];
    }
    if (!this.game.isSpectator && this.list) this.render();
  }

  public removeLondonSeasonCard(card: JocoLondonSeasonCardBase) {
    delete this.blackmailCards[card.id];
    if (!this.game.isSpectator && this.list) this.render();
  }

  public updateLawCard(card: JocoLawCardBase) {
    if (card.location === 'PassedLaws') this.passedLaws[card.id] = card;
    else delete this.passedLaws[card.id];
    if (!this.game.isSpectator && this.list) this.render();
  }

  public updatePrimeMinister(playerId: number) {
    this.primeMinisterId = Number(playerId);
    if (!this.game.isSpectator && this.list) this.render();
  }

  public addCardButton(container: HTMLElement, cardId: string) {
    if (this.game.isSpectator || !cardId || container.querySelector('.joco-card-timing-button')) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'joco-card-timing-button';
    button.dataset.cardId = cardId;
    this.updateCardButton(button);
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      void this.updateCard(cardId, !(this.preferences.card[cardId] ?? true));
    });
    container.appendChild(button);
  }

  private updateCardButton(button: HTMLButtonElement) {
    const enabled = this.preferences.card[button.dataset.cardId] ?? true;
    button.title = enabled ? _('Card prompts enabled') : _('Card prompts disabled');
    button.setAttribute('aria-label', button.title);
    button.setAttribute('aria-pressed', String(enabled));
    button.innerHTML = `<i class="fa fa-${enabled ? 'bell' : 'bell-slash'}" aria-hidden="true"></i>`;
    button.disabled = this.pending;
  }

  private activeCards(): Array<{ id: string; label: string }> {
    const playerId = this.game.getPlayerId();
    const cards: Array<{ id: string; title: string; timingWindows: string[] }> = [];
    Object.values(this.promiseCards).forEach((card) => {
      const data = this.game.gamedatas.staticData.promiseCards[card.id];
      if (card.location === String(playerId) && card.ownerPlayerId !== playerId && data) {
        cards.push({ id: card.id, ...data });
      }
    });
    Object.values(this.blackmailCards).forEach((card) => {
      const data = this.game.gamedatas.staticData.londonSeasonCards[card.hiddenId];
      if (data) cards.push({ id: card.hiddenId, ...data });
    });
    if (Number(this.primeMinisterId) === playerId) {
      Object.values(this.passedLaws).forEach((card) => {
        const data = this.game.gamedatas.staticData.lawCards[card.id];
        if (data) cards.push({ id: card.id, ...data });
      });
    }
    return cards
      .filter((card) => card.timingWindows.length > 0 && (this.preferences.card[card.id] ?? true))
      .map((card) => ({ id: card.id, label: _('If I can play / use ${cardName}').replace('${cardName}', _(card.title)) }));
  }

  private items(kind: typeof kinds[number]): Array<[string, string]> {
    if (kind.items === 'phase') return phases.map(([id, label]): [string, string] => [id, _(label)]);
    if (kind.items === 'office') {
      return Object.entries(this.game.gamedatas.staticData.offices)
        .filter(([id]) => officeIds.has(id) && this.officeLocations[id] !== undefined && this.officeLocations[id] !== DECK)
        .map(([id, office]) => [id, _(office.title)]);
    }
    return [];
  }

  private label(key: string): string {
    const [kindId, itemId] = key.split(':');
    const kind = kinds.find((entry) => entry.id === kindId);
    if (!kind) return key;
    if (!kind.items) return _(kind.label);
    const item = kind.items === 'phase'
      ? phases.find(([id]) => id === itemId)?.[1]
      : this.game.gamedatas.staticData.offices[itemId]?.title;
    const name = item ? _(item) : itemId;
    const template = kindId === START_OF_PHASE ? _('Start of phase: ${name}')
      : kindId === END_OF_PHASE ? _('End of phase: ${name}')
      : kindId === BEFORE_OFFICE_ACTS ? _('Before an office acts: ${name}')
      : _('After an office acts: ${name}');
    return template.replace('${name}', name);
  }

  private render() {
    const selectedKind = this.kindSelect.value;
    const selectedItem = this.itemSelect.value;
    this.kindSelect.replaceChildren(new Option(_('Select a timing window'), ''));
    kinds.forEach((kind) => {
      const available = kind.items
        ? this.items(kind).some(([id]) => !this.preferences.window[`${kind.id}:${id}`])
        : !this.preferences.window[kind.id];
      if (available) this.kindSelect.add(new Option(_(kind.label), kind.id));
    });
    this.kindSelect.value = selectedKind;
    if (this.kindSelect.selectedIndex < 0) this.kindSelect.value = '';
    const kind = kinds.find((entry) => entry.id === this.kindSelect.value);
    this.itemField.hidden = !kind?.items;
    this.itemField.replaceChildren(document.createTextNode(kind?.items === 'phase' ? _('Phase') : _('Office')), this.itemSelect);
    this.itemSelect.replaceChildren(new Option(_('Select an item'), ''));
    if (kind?.items) {
      this.items(kind)
        .filter(([id]) => !this.preferences.window[`${kind.id}:${id}`])
        .sort((left, right) => left[1].localeCompare(right[1]))
        .forEach(([id, label]) => this.itemSelect.add(new Option(label, id)));
      this.itemSelect.value = selectedItem;
      if (this.itemSelect.selectedIndex < 0) this.itemSelect.value = '';
    }
    this.kindSelect.disabled = this.pending;
    this.itemSelect.disabled = this.pending;
    this.updateAddButton();
    document.querySelectorAll<HTMLButtonElement>('.joco-card-timing-button').forEach((button) => this.updateCardButton(button));
    this.list.replaceChildren();
    const saved: Array<{ kind: 'window' | 'card'; id: string; label: string }> = [
      ...Object.keys(this.preferences.window).filter((key) => this.preferences.window[key])
        .map((key) => ({ kind: 'window' as const, id: key, label: this.label(key) })),
      ...this.activeCards().map((card) => ({ kind: 'card' as const, ...card })),
    ].sort((left, right) => left.label.localeCompare(right.label));
    if (!saved.length) {
      const empty = document.createElement('p');
      empty.textContent = _('No active alerts');
      this.list.appendChild(empty);
    }
    saved.forEach((entry) => {
      const row = document.createElement('div');
      row.className = 'joco-timing-row';
      const text = document.createElement('span');
      text.textContent = entry.label;
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'joco-timing-remove';
      remove.title = _('Remove alert');
      remove.setAttribute('aria-label', `${remove.title}: ${text.textContent}`);
      remove.innerHTML = '<i class="fa fa-close" aria-hidden="true"></i>';
      remove.disabled = this.pending;
      remove.addEventListener('click', () => {
        if (entry.kind === 'card') void this.updateCard(entry.id, false);
        else void this.updateWindow(entry.id, false);
      });
      row.append(text, remove);
      this.list.appendChild(row);
    });
  }

  private updateAddButton() {
    const kind = kinds.find((entry) => entry.id === this.kindSelect.value);
    this.addButton.disabled = this.pending || !kind || (!!kind.items && !this.itemSelect.value);
  }

  private async updateCard(cardId: string, enabled: boolean) {
    if (this.pending) return;
    this.pending = true;
    this.error.textContent = '';
    this.render();
    try {
      await this.set('card', cardId, enabled);
    } catch (error) {
      this.error.textContent = _('Unable to update timing preference');
      console.error('Unable to update timing preference', error);
    } finally {
      this.pending = false;
      this.render();
    }
  }

  private async updateWindow(key: string, enabled: boolean) {
    this.pending = true;
    this.error.textContent = '';
    this.render();
    try {
      await this.set('window', key, enabled);
      const [kind, officeId] = key.split(':');
      if ((kind === BEFORE_OFFICE_ACTS || kind === AFTER_OFFICE_FINISHED_ACTING) && this.officeLocations[officeId] === DECK) {
        delete this.preferences.window[key];
      }
      if (enabled) {
        this.kindSelect.value = '';
        this.itemSelect.value = '';
      }
    } catch (error) {
      this.error.textContent = _('Unable to update timing preference');
      console.error('Unable to update timing preference', error);
    } finally {
      this.pending = false;
      this.render();
    }
  }

  private async set(kind: 'window' | 'card', itemId: string, enabled: boolean) {
    const request = this.game.bga.actions.performAction('actSetTimingPreference', { kind, itemId, enabled: enabled ? 1 : 0 },
      { lock: false, checkAction: false, checkPossibleActions: false });
    if (!request) throw new Error('Timing preference action unavailable');
    await request;
    this.preferences[kind][itemId] = enabled;
  }
}