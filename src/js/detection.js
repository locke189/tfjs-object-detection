import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from '@tensorflow/tfjs';
import { drawPredictions } from './camera';

async function predict(element, model) {
    const predictions = await model.detect(element, 5, 0.7)
    return predictions;
}


export default async () => {
  console.log('model loading...');
  const cocoSSDModel = await cocoSsd.load();

  console.log('creating video element..');
  const videoElement = document.querySelector('.webcam-stream__video');
  const canvasElement = document.querySelector('.webcam-stream__canvas');
  // This allows us to create a tensor directly from the video feed.
  // const cam = await tf.data.webcam(videoElement, {
  //   resizeWidth: 224,
  //   resizeHeight: 224
  // });

  await setInterval(async () => {
    // const img = await cam.capture();
    const rawPredictions = await predict(videoElement, cocoSSDModel);
    drawPredictions(Array.from(rawPredictions), canvasElement);
  }, 500)
}
