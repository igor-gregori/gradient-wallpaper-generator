import "./style.css";
import { playWaterDrip } from "./sound";
import html2canvas from "html2canvas";

let stops = [];
let option = "linear";
let linearDegree = 90;

const backgroundDiv = document.getElementById("background-div");
const controlPanel = document.getElementById("control-panel");

const generateRandomBtn = document.getElementById("generate-random-btn");
generateRandomBtn.addEventListener("click", randomizeStops);

const downloadBtn = document.getElementById("download-btn");
downloadBtn.addEventListener("click", download);

const addStopBtn = document.getElementById("add-stop-btn");
addStopBtn.addEventListener("click", addStop);

const linearRadioInput = document.getElementById("linear-radio-input");
linearRadioInput.addEventListener("click", changeRadioOption);

const radialRadioInput = document.getElementById("radial-radio-input");
radialRadioInput.addEventListener("click", changeRadioOption);

const linearValueInput = document.getElementById("linear-value-input");
linearValueInput.addEventListener("wheel", changeLinearValueWheel);
linearValueInput.addEventListener("input", changeLinearValue);

const stopsDiv = document.getElementById("stops-div-cell");

for (let i = 0; i < 2; i++) {
  const newStop = generateRandomStop();
  stops.push(newStop);
}
renderAllStops();
renderBackground();

function renderBackground() {
  if (option === "linear") {
    backgroundDiv.style.backgroundImage = `linear-gradient(${linearDegree}deg, ${stops.join(",")})`;
  } else {
    backgroundDiv.style.backgroundImage = `radial-gradient(circle, ${stops.join(",")})`;
  }
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

function changeRadioOption(event) {
  const actualOption = event.target.value;

  if (actualOption === "linear") {
    option = "linear";
    linearValueInput.style.color = "#FFFFFF";
    linearValueInput.style.backgroundColor = "#4E4E4E";
    linearValueInput.style.cursor = "n-resize";
    linearValueInput.disabled = false;
  } else {
    option = "radial";
    linearValueInput.style.color = "#888888";
    linearValueInput.style.backgroundColor = "#2E2E2E";
    linearValueInput.style.cursor = "not-allowed";
    linearValueInput.disabled = true;
  }

  renderBackground();
}

function changeLinearValueWheel(event) {
  if (option === "radial") return;
  if (event.deltaY < 0 && linearValueInput.valueAsNumber < 365) {
    linearValueInput.valueAsNumber += 5;
  } else if (event.deltaY > 0 && linearValueInput.valueAsNumber > 0) {
    linearValueInput.valueAsNumber -= 5;
  }
  linearDegree = linearValueInput.valueAsNumber;
  renderBackground();
}

function changeLinearValue(event) {
  if (linearValueInput.valueAsNumber > 0 && linearValueInput.valueAsNumber < 365) {
    linearDegree = linearValueInput.valueAsNumber;
    renderBackground();
  }
}

function download() {
  hideBeforeDownload();
  html2canvas(document.getElementById("background-div")).then(function (canvas) {
    const link = document.createElement("a");
    link.download = "gradient-wallpaper.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
  showAfterDownload();
  playWaterDrip();
}

function hideBeforeDownload() {
  controlPanel.style.display = "none";
  backgroundDiv.style.borderRadius = "0px";
}

function showAfterDownload() {
  controlPanel.style.display = "flex";
  backgroundDiv.style.borderRadius = "10px";
}
