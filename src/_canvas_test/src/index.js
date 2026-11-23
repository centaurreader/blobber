import "./index.css";

document.querySelector("#root").innerHTML = `
<canvas style="width: 100%; height: 100%;" id="canvas" />
`;

const canvas = document.getElementById("canvas");

function getImageData(imageUrl, cb) {
  const image = new Image();
  image.src = imageUrl;
  image.onload = () => {
    cb(image);
  };
}

getImageData("/tree.jpeg", (imgElement) => {
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;
  ctx.scale(0.25, 0.125);
  ctx.drawImage(imgElement, 0, 0, imgElement.width, imgElement.height);
  const imageData = ctx.getImageData(0, 0, imgElement.width, imgElement.height);
  imageData.data.set(
    imageData.data.map((brightness, i) => {
      let adjustedIndex = i;
      if (i % 3 === 0) {
        adjustedIndex += 1;
      } else if (i % 3 === 1) {
        adjustedIndex -= 1;
      } else if (i % 3 === 2) {
        adjustedIndex -= 2;
      }
      return imageData.data[adjustedIndex] > 128 ? 0 : 255;
    }),
  );
  ctx.putImageData(imageData, 0, 0);
});

// getImageData("/gtkekaDHpknr4beyGmbtCo-1200-80.png", (imgElement) => {
//   const ctx = canvas.getContext("2d");
//   ctx.imageSmoothingEnabled = false;
//   ctx.drawImage(imgElement, 0, 0, imgElement.width / 5, imgElement.height / 5);
//   const imageData = ctx.getImageData(
//     0,
//     0,
//     imgElement.width / 5,
//     imgElement.height / 5,
//   );
//   imageData.data.set(
//     imageData.data.map((brightness, i) => {
//       let adjustedIndex = i;
//       if (i % 3 === 0) {
//         adjustedIndex += 1;
//       } else if (i % 3 === 1) {
//         adjustedIndex -= 1;
//       } else if (i % 3 === 2) {
//         adjustedIndex -= 2;
//       }
//       return imageData.data[adjustedIndex] > 128 ? 0 : 255;
//     }),
//   );
//   ctx.putImageData(imageData, 0, 0);
// });
