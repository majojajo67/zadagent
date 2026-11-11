const display = document.getElementById("display");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");

let running = false;
let startTime = 0;
let elapsed = 0;
let tickId = 0;

function formatTime(ms) {
  const totalCs = Math.floor(ms / 10);
  const cs = totalCs % 100;
  const totalSeconds = Math.floor(totalCs / 100);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  const pad = (value) => String(value).padStart(2, "0");
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(cs)}`;
}

function render() {
  const now = running ? Date.now() - startTime + elapsed : elapsed;
  display.textContent = formatTime(now);
}

function tick() {
  render();
  tickId = requestAnimationFrame(tick);
}

function start() {
  if (running) {
    return;
  }

  running = true;
  startTime = Date.now();
  startButton.disabled = true;
  stopButton.disabled = false;
  tick();
}

function stop() {
  if (!running) {
    return;
  }

  running = false;
  elapsed += Date.now() - startTime;
  cancelAnimationFrame(tickId);
  startButton.disabled = false;
  stopButton.disabled = true;
  render();
}

startButton.addEventListener("click", start);
stopButton.addEventListener("click", stop);
render();
