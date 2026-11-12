const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');
const vm = require('node:vm');
const typescript = require('typescript');

const source = fs.readFileSync('src/attention/index.ts', 'utf8');
const script = typescript.transpileModule(source, {
  compilerOptions: { module: typescript.ModuleKind.CommonJS },
}).outputText;

function setup(options = {}) {
  const context = { exports: {}, console: { error() {} }, ...options.globals };
  vm.runInNewContext(script, context);
  const requests = [];
  const game = {
    isSpectator: options.spectator || false,
    gamedatas: { attention: options.entries || [] },
    bga: { actions: { performAction: (...args) => {
      requests.push(args);
      return options.performAction ? options.performAction() : Promise.resolve();
    } } },
  };
  context.exports.AttentionManager.create(game);
  return { manager: context.exports.AttentionManager.getInstance(), requests };
}

const entry = (id, itemId = '1') => ({ id, kind: 'new_offer', itemType: 'deal', itemId });
const current = (manager) => Array.from(manager.getEntries('new_offer', 'deal'), (item) => item.id);

test('acknowledges exact IDs without clearing newer events or duplicating requests', async () => {
  let resolve;
  const { manager, requests } = setup({
    entries: [entry(1)],
    performAction: () => new Promise((done) => { resolve = done; }),
  });
  const first = manager.acknowledge(manager.getEntries('new_offer', 'deal'));
  await manager.acknowledge(manager.getEntries('new_offer', 'deal'));
  manager.add(entry(2));
  assert.equal(requests.length, 1);
  assert.equal(requests[0][1].ids, '[1]');
  resolve();
  await first;
  assert.deepEqual(current(manager), [2]);
});

test('failed and blocked requests retain attention and allow retry', async () => {
  let attempts = 0;
  const { manager } = setup({
    entries: [entry(1)],
    performAction: () => {
      attempts += 1;
      if (attempts === 1) return Promise.reject(new Error('offline'));
      if (attempts === 2) return undefined;
      return Promise.resolve();
    },
  });
  await manager.acknowledge(manager.getEntries('new_offer', 'deal'));
  await manager.acknowledge(manager.getEntries('new_offer', 'deal'));
  assert.deepEqual(current(manager), [1]);
  await manager.acknowledge(manager.getEntries('new_offer', 'deal'));
  assert.deepEqual(current(manager), []);
});

test('spectators, archives and replay views ignore attention', async () => {
  for (const options of [
    { spectator: true },
    { globals: { g_archive_mode: true } },
    { globals: { g_replayFrom: 1 } },
  ]) {
    const { manager, requests } = setup({ ...options, entries: [entry(1)] });
    manager.add(entry(2));
    await manager.acknowledge([entry(1)]);
    assert.deepEqual(current(manager), []);
    assert.equal(requests.length, 0);
  }
});