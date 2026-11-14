const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');
const vm = require('node:vm');
const typescript = require('typescript');

function load(file, dependencies = {}, globals = {}) {
  const source = fs.readFileSync(file, 'utf8');
  const script = typescript.transpileModule(source, {
    compilerOptions: { module: typescript.ModuleKind.CommonJS },
  }).outputText;
  const context = { exports: {}, require: (name) => dependencies[name], ...globals };
  vm.runInNewContext(script, context);
  return context.exports;
}

const constants = load('src/constants.ts');
const { getAnytimeCardIds } = load(
  'src/anytime-cards/eligibility.ts', { '../constants': constants },
);
const card = (hiddenId) => ({ id: `public-${hiddenId}`, type: 'Blackmail', hiddenId });
const data = (overrides = {}) => ({
  playerId: 1, phase: constants.LONDON_SEASON,
  promiseCards: [], blackmailCards: [], cashByPlayer: {}, occupiedOffices: [],
  ...overrides,
});
const ids = (input) => Array.from(getAnytimeCardIds(input));

test('promise eligibility requires a different owner with positive cash', () => {
  const promiseCards = [
    { id: 'PC_1_TakeTwoOrLessFromMe' }, { id: 'PC_2_TakeTwoOrLessFromMe' },
    { id: 'PC_3_TakeTwoOrLessFromMe' }, { id: 'PC_2_Other' },
  ];
  assert.deepEqual(ids(data({ promiseCards, cashByPlayer: { 1: 5, 2: 1, 3: 0 } })), ['PC_2_TakeTwoOrLessFromMe']);
  assert.deepEqual(ids(data({ promiseCards, cashByPlayer: { 2: 1 }, phase: 'setup' })), []);
});

test('blackmail cards follow phase and target boundaries', () => {
  const blackmailCards = ['EnvoyToTheMughals', 'ThePrimeMinistersEar', 'ScandalInIndia', 'ScandalOnLeadenhallStreet'].map(card);
  const input = { blackmailCards, occupiedOffices: ['PresidentOfBombay', 'Chairman'] };
  assert.deepEqual(ids(data(input)), ['public-EnvoyToTheMughals', 'public-ThePrimeMinistersEar']);
  assert.deepEqual(ids(data({ ...input, phase: constants.FAMILY })), ['public-EnvoyToTheMughals']);
  assert.deepEqual(ids(data({ ...input, phase: constants.REVENUE })), ['public-EnvoyToTheMughals']);
  assert.deepEqual(ids(data({ ...input, phase: constants.EVENTS_IN_INDIA })), ['public-ScandalInIndia', 'public-ScandalOnLeadenhallStreet']);
  assert.deepEqual(ids(data({ ...input, phase: constants.EVENTS_IN_INDIA, occupiedOffices: [] })), []);
  assert.deepEqual(ids(data({ ...input, phase: constants.FINAL_SCORING })), []);
  assert.deepEqual(ids(data({ blackmailCards: [{ id: 'hidden', type: 'Blackmail' }] })), []);
});

test('card handlers coexist with state selection and are cleaned up on re-entry', () => {
  const classes = new Set();
  const listeners = new Set();
  const element = {
    classList: {
      add: (value) => classes.add(value),
      remove: (value) => classes.delete(value),
      contains: (value) => classes.has(value),
    },
    addEventListener: (type, handler, capture) => { assert.equal(capture, true); listeners.add(handler); },
    removeEventListener: (type, handler, capture) => { assert.equal(capture, true); listeners.delete(handler); },
  };
  const currentPlayer = { familyId: 'Hastings', counters: { cash: { getValue: () => 0 } } };
  const owner = { familyId: 'Walsh', counters: { cash: { getValue: () => 2 } } };
  const players = { getPlayer: (id) => id === 1 ? currentPlayer : owner, getPlayerIds: () => [1, 2] };
  const promiseCard = { id: 'PC_2_TakeTwoOrLessFromMe', title: 'Take cash' };
  const family = { getPromiseCards: () => [promiseCard], stocks: { londonSeasonCards_Hastings: { getCards: () => [] } } };
  const stateCalls = [];
  const buttonCalls = [];
  const game = {
    isSpectator: false, _helpMode: false, getPlayerId: () => 1,
    gamedatas: { offices: {}, regions: {} }, clearPossible() {},
    bga: {
      actions: { game: { isInterfaceLocked: () => false } },
      states: { setClientState: (...args) => stateCalls.push(args) },
      statusBar: { setTitle() {}, addActionButton: (...args) => buttonCalls.push(args) },
    },
  };
  const dependencies = {
    '../boilerplate': { SELECTABLE: 'selectable', SELECTED: 'selected', Interaction: { use: () => ({ addCancelButton() {} }) } },
    '../cards/london-season-cards': {},
    '../cards/promise-cards': { PromiseCardsManager: { getInstance: () => ({ getCardElement: () => element }) } },
    '../constants': constants,
    '../families': { Families: { getInstance: () => ({ getFamily: () => family }) } },
    '../phase-tracker': { PhaseTracker: { getInstance: () => ({ getPhase: () => constants.LONDON_SEASON }) } },
    '../player-manager': { PlayerManager: { getInstance: () => players } },
    './eligibility': { getAnytimeCardIds },
  };
  const { AnytimeCards } = load('src/anytime-cards/index.ts', dependencies, {
    _: (text) => text,
    document: { getElementById: () => null },
  });
  const manager = new AnytimeCards(game);
  manager.setup('FamilyAction', {});
  manager.setup('FamilyAction', {});
  assert.equal(listeners.size, 1);
  assert.equal(classes.has('anytime-selectable'), true);
  const click = () => [...listeners][0]({ stopPropagation() {} });
  classes.add('selectable');
  click();
  assert.equal(stateCalls.length, 0);
  classes.delete('selectable');
  click();
  assert.equal(stateCalls[0][0], 'clientConfirmAnytimeCard');
  manager.showConfirmation();
  assert.equal(listeners.size, 0);
  assert.equal(buttonCalls[0][2].disabled, true);
  manager.setup('TimingWindowAct', { _private: [{ cardId: promiseCard.id }] });
  assert.equal(listeners.size, 0);
  game.isSpectator = true;
  manager.setup('FamilyAction', {});
  assert.equal(listeners.size, 0);
});