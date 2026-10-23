import test from 'node:test';
import assert from 'node:assert/strict';
import {createFrameQueue} from '../dist/atlas-model.mjs';

function frames() {
  let nextId = 0;
  const pending = new Map(), cancelled = [];
  return {
    request(callback) {const id = nextId++; pending.set(id, callback); return id;},
    cancel(id) {cancelled.push(id); pending.delete(id);},
    flush() {
      const ready = [...pending.values()];
      pending.clear();
      for (const callback of ready) callback();
    },
    get pendingCount() {return pending.size;},
    cancelled,
  };
}

test('rapid slider updates render only the latest year once per animation frame', () => {
  const clock = frames(), rendered = [];
  const queue = createFrameQueue(year => rendered.push(year), clock.request, clock.cancel);
  queue.queue(1200);
  queue.queue(1250);
  queue.queue(1300);
  assert.equal(clock.pendingCount, 1);
  assert.deepEqual(rendered, []);
  clock.flush();
  assert.deepEqual(rendered, [1300]);
  assert.equal(clock.pendingCount, 0);
  queue.queue(1350);
  clock.flush();
  assert.deepEqual(rendered, [1300, 1350]);
});

test('direct navigation can cancel a queued slider year without a stale overwrite', () => {
  const clock = frames();
  let selectedYear = 1200;
  const queue = createFrameQueue(year => {selectedYear = year;}, clock.request, clock.cancel);
  queue.queue(1750);
  queue.cancel();
  selectedYear = 2026;
  clock.flush();
  assert.equal(selectedYear, 2026);
  assert.deepEqual(clock.cancelled, [0], 'a zero-valued frame handle must also be cancellable');
  queue.cancel();
  assert.deepEqual(clock.cancelled, [0], 'cancelling an idle queue is harmless');
  queue.queue(1992);
  clock.flush();
  assert.equal(selectedYear, 1992, 'cancellation does not disable subsequent slider input');
});

test('render-time cancellation and a new queued update do not lose the next frame', () => {
  const clock = frames(), rendered = [];
  let queue;
  queue = createFrameQueue(year => {
    rendered.push(year);
    queue.cancel();
    if (year === 1200) queue.queue(1250);
  }, clock.request, clock.cancel);
  queue.queue(1200);
  clock.flush();
  assert.deepEqual(rendered, [1200]);
  assert.equal(clock.pendingCount, 1);
  clock.flush();
  assert.deepEqual(rendered, [1200, 1250]);
});
