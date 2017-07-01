/**
 * ReactRAFBatchingStrategy:
 * Based on https://github.com/petehunt/react-raf-batching
 * also triggers `tick` regularly if tab is inactive.
 *
 * https://github.com/petehunt/react-raf-batching/issues/8
 */

let FORCE_TICK_INTERVAL = 1000;

let flush = ReactUpdates.flushBatchedUpdates.bind(ReactUpdates);

import ReactUpdates from 'react/lib/ReactUpdates';

let ReactRAFBatchingStrategy = {
  isBatchingUpdates: true,

  /**
   * Call the provided function in a context within which calls to `setState`
   * and friends are batched such that components aren't updated unnecessarily.
   */
  batchedUpdates: function(callback) {
    // Do we have to do this anymore?
    let args = new Array(arguments.length - 1);
    for (let i = 0; i < args.length; ++i) {
      args[i] = arguments[i + 1];
    }
    callback.apply(null, args);
  },

  inject: function() {
    ReactUpdates.injection.injectBatchingStrategy(ReactRAFBatchingStrategy);
    tick();
  }
};

export default ReactRAFBatchingStrategy