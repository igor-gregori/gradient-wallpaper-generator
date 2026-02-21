import "./style.css";
import { waterDrip } from "./sound";

let stops = ["#1a1a1a", "#090047"];

const app = document.querySelector("#background-div");

const generateRandomBtn = document.getElementById("generate-random-btn");
generateRandomBtn.addEventListener("click", generateRandomBackground);

const addSpotBtn = document.getElementById("add-stop-btn");
addSpotBtn.addEventListener("click", addSpot);

const stopsDiv = document.getElementById("stops-div-cell");

for (const stop of stops) {
  stopsDiv.innerHTML += `<div>${stop}</div>`;
}

function generateRandomBackground() {
  const newStops = [];
  for (let i = 0; i < stops.length; i++) {
    const newStop = "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
    newStops.push(newStop);
  }
  stops = newStops;
  app.style.backgroundImage = `linear-gradient(to right, ${stops.join(",")})`;

  waterDrip();

  stopsDiv.innerHTML = "";
  for (const stop of stops) {
    stopsDiv.innerHTML += `<div>${stop}</div>`;
  }
}

function addSpot() {
  stopsDiv.innerHTML += "<div>#XXXXXX</div>";
}
