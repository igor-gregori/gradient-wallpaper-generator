import "./style.css";
import { playWaterDrip } from "./sound";

let stops = [];

const app = document.querySelector("#background-div");

const generateRandomBtn = document.getElementById("generate-random-btn");
generateRandomBtn.addEventListener("click", randomizeStops);

const addStopBtn = document.getElementById("add-stop-btn");
addStopBtn.addEventListener("click", addStop);

const stopsDiv = document.getElementById("stops-div-cell");

for (let i = 0; i < 2; i++) {
  const newStop = generateRandomStop();
  stops.push(newStop);
}
renderAllStops();
renderBackground();

function renderBackground() {
  app.style.backgroundImage = `linear-gradient(to right, ${stops.join(",")})`;
}

function generateRandomStop() {
  return "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
}

function renderAllStops() {
  stopsDiv.innerHTML = "";

  for (let i = 0; i < stops.length; i++) {
    const stop = stops[i];

    const stopColorPicker = document.createElement("input");
    stopColorPicker.type = "color";
    stopColorPicker.value = stop;
    stopColorPicker.addEventListener("input", (e) => changeStopColor(i, e.target.value));

    const stopSpan = document.createElement("span");
    stopSpan.id = `s${i}`;
    stopSpan.className = "monospaced";
    stopSpan.innerText = stop.toUpperCase();

    const removeStopBtn = document.createElement("button");
    removeStopBtn.innerText = "X";
    removeStopBtn.addEventListener("click", () => removeStop(stop));

    const stopsSubDiv = document.createElement("div");
    stopsSubDiv.className = "stops-sub-div";

    stopsSubDiv.appendChild(stopColorPicker);
    stopsSubDiv.appendChild(stopSpan);
    stopsSubDiv.appendChild(removeStopBtn);

    stopsDiv.appendChild(stopsSubDiv);
  }
}

function addStop() {
  const newStop = generateRandomStop();
  stops.push(newStop);

  renderAllStops();
  renderBackground();

  playWaterDrip();
}

function randomizeStops() {
  const newStops = [];
  for (let i = 0; i < stops.length; i++) {
    newStops.push(generateRandomStop());
  }
  stops = newStops;

  renderAllStops();
  renderBackground();

  playWaterDrip();
}

function removeStop(stop) {
  if (stops.length === 1) {
    alert("You need at least one stop!");
    return;
  }

  const newStops = stops.filter((i) => i != stop);
  stops = newStops;

  renderAllStops();
  renderBackground();

  playWaterDrip();
}

function changeStopColor(oldStopsIdx, newStop) {
  stops[oldStopsIdx] = newStop;

  const stopSpan = document.getElementById(`s${oldStopsIdx}`);
  stopSpan.id = `s${oldStopsIdx}`;
  stopSpan.innerText = newStop.toUpperCase();

  renderBackground();
}
