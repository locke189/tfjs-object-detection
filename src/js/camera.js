// import a CSS module
import classes from '../styles/camera';

function getVideoAspectRatio(videoElement) {
  return videoElement.videoWidth / videoElement.videoHeight;
}

function calculateCanvasDimensions({canvasElement, aspectRatio}) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  if(width > height) {
    canvasElement.style.height = height;
    canvasElement.style.width = height * aspectRatio;
    canvasElement.style.left = (width - (height * aspectRatio))/2
  } else {
    canvasElement.style.height = width / aspectRatio;
    canvasElement.style.width = width;
    canvasElement.style.top = (height - (width / aspectRatio))/2
  }
}

function hashCode(str) { // java String#hashCode
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function intToRGB(i){
  var c = (i & 0x00FFFFFF)
    .toString(16)
    .toUpperCase();
  return "00000".substring(0, 6 - c.length) + c;
}


function drawPredictions(predictions, canvasElement) {
  const ctx = canvasElement.getContext("2d");
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  const font = "24px helvetica";
  ctx.font = font;
  ctx.textBaseline = "top";

  predictions.forEach(prediction => {
    const x = prediction.bbox[0];
    const y = prediction.bbox[1];
    const width = prediction.bbox[2];
    const height = prediction.bbox[3];
    const color = `#${intToRGB(hashCode(prediction.class))}`;

    // Draw the bounding box.
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, width, height);
    // Draw the label background.
    ctx.fillStyle = color;
    const textWidth = ctx.measureText(prediction.class).width;
    const textHeight = parseInt(font, 10);
    // draw top left rectangle
    ctx.fillRect(x, y, textWidth + 10, textHeight + 10);
    // draw bottom left rectangle
    ctx.fillRect(x, y + height - textHeight, textWidth + 15, textHeight + 10);

    // Draw the text last to ensure it's on top.
    ctx.fillStyle = "#000000";
    ctx.fillText(prediction.class, x, y);
    ctx.fillText(prediction.score.toFixed(2), x, y + height - textHeight);
  })
}

function initialize() {
  console.log(classes);
  var videoElement = document.querySelector("#videoElement");


  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function (stream) {
        videoElement.srcObject = stream;
        console.log('camera ready!');
      })
      .catch(function (error) {
        console.log("Something went wrong!");
      });
  }

  videoElement.addEventListener('loadeddata', (event) => {
    const videoElement = event.currentTarget;
    console.log(videoElement);
    const canvas = document.querySelector(".webcam-stream__canvas");
    const aspectRatio = getVideoAspectRatio(videoElement);
    console.log(aspectRatio);
    calculateCanvasDimensions({canvasElement: canvas, aspectRatio});
  });
}

export {
  initialize,
  drawPredictions
};
