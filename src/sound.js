export function playWaterDrip() {
  const waterDripAudio = new Audio("src/sounds/water-drip.mp3");
  waterDripAudio.volume = 0.2;
  waterDripAudio.play();
}
