
// import another component
import main from './js/main';
import { initialize } from './js/camera';
import detection from './js/detection';

// parcel hot module replacement
if (module.hot) {
  module.hot.accept();
}
window.addEventListener('load', () => {
  main();
  initialize();
  detection();
})
