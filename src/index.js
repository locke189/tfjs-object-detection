
// import another component
import main from './js/main';
import { initialize } from './js/camera';
import detection from './js/detection';


window.addEventListener('load', () => {
  main();
  initialize();
  detection();
})
