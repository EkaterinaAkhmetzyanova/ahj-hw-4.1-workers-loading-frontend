/* eslint-disable no-console */
import Widget from './widget';

const widget = new Widget();
widget.init();

if (navigator.serviceWorker) {
  window.addEventListener('load', async () => {
    try {
      if (navigator.serviceWorker) {
        await navigator.serviceWorker.register(
          './service-worker.js',
        );
        console.log('sw registered');
      }
    } catch (e) {
      console.log(e);
    }
  });
}
