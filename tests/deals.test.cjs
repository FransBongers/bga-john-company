const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');
const vm = require('node:vm');
const typescript = require('typescript');

function loadModule(path, dependencies) {
  const source = fs.readFileSync(path, 'utf8');
  const script = typescript.transpileModule(source, {
    compilerOptions: { module: typescript.ModuleKind.CommonJS },
  }).outputText;
  const context = {
    exports: {},
    require: (name) => dependencies[name] ?? {},
    _: (text) => text,
  };
  vm.runInNewContext(script, context);
  return context.exports;
}

const players = {
  101: { getName: () => 'Recipient', getFamilyId: () => 'family-a' },
  202: { getName: () => 'Sender', getFamilyId: () => 'family-b' },
};
const templates = loadModule('src/deals/templates.ts', {
  '../boilerplate': { formatStringRecursive: (text) => text },
  '../player-manager': { PlayerManager: { getInstance: () => ({ getPlayer: (id) => players[id] }) } },
  '../utility': { getFamilyName: (id) => id, getFamilyNameForPlayerId: (id) => players[id].getFamilyId() },
  './labels': { getAssetLabels: () => [], getStaticCardLabel: () => '' },
});
const { Deals } = loadModule('src/deals/index.ts', { './templates': templates });

function renderDeal(deal, playerId, isSpectator = false) {
  let html = '';
  const deals = Object.create(Deals.prototype);
  deals.game = { getPlayerId: () => playerId, isSpectator };
  deals.ui = {
    offers: { insertAdjacentHTML: (_position, content) => { html = content; } },
    agreements: { insertAdjacentHTML: (_position, content) => { html = content; } },
  };
  deals.updateAttention = () => {};
  deals.addDeal(deal);
  return html;
}

const offer = {
  id: '1',
  playerId: '101',
  offeredByPlayerId: '202',
  description: 'An offer',
  assets: {},
  status: 'offer',
};

test('offer controls match the current player with string participant IDs', () => {
  const recipient = renderDeal(offer, 101);
  assert.match(recipient, /data-deal-action="accept"/);
  assert.match(recipient, /data-deal-action="reject"/);
  assert.doesNotMatch(recipient, />Cancel</);

  const sender = renderDeal(offer, 202);
  assert.match(sender, />Cancel</);
  assert.doesNotMatch(sender, /data-deal-action="accept"/);

  assert.doesNotMatch(renderDeal(offer, 303), /data-deal-action=/);
  assert.doesNotMatch(renderDeal(offer, 101, true), /data-deal-action=/);
});

test('agreement reporting is available only to participants who have not reported', () => {
  const agreement = { ...offer, status: 'agreement', reports: { 101: 'fulfilled' } };
  assert.doesNotMatch(renderDeal(agreement, 101), /data-deal-action=/);
  assert.match(renderDeal(agreement, 202), /data-deal-action="fulfilled"/);
  assert.match(renderDeal(agreement, 202), /data-deal-action="violated"/);
  assert.doesNotMatch(renderDeal(agreement, 303), /data-deal-action=/);
  assert.doesNotMatch(renderDeal(agreement, 202, true), /data-deal-action=/);
});

test('deal updates apply provided transfers regardless of status', async () => {
  const updated = [];
  const transferred = [];
  const { NotificationManager } = loadModule('src/boilerplate/notification-manager/index.ts', {
    '../../deals': { Deals: { getInstance: () => ({ updateDeal: (deal) => updated.push(deal) }) } },
  });
  const manager = Object.create(NotificationManager.prototype);
  manager.transferAssets = async (assets) => transferred.push(assets);
  const first = { id: 'first' };
  const second = { id: 'second' };
  const agreement = { ...offer, status: 'agreement' };
  const closed = { ...offer, status: 'closed' };

  await manager.notif_dealUpdated({ deal: agreement, transferredAssets: { 101: first, 202: second } });
  await manager.notif_dealUpdated({ deal: closed, transferredAssets: { 101: first } });
  await manager.notif_dealUpdated({ deal: closed, transferredAssets: [] });

  assert.deepEqual(updated, [agreement, closed, closed]);
  assert.deepEqual(transferred, [first, second, first]);
});