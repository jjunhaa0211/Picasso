const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const brushSize = document.getElementById("brush-size");
const colorPicker = document.getElementById("color-picker");
const eraserButton = document.getElementById("eraser-button");
const brushSizeDisplay = document.getElementById("brush-size-display");

let drawing = false;
let isErasing = false;
let lastX = 0;
let lastY = 0;

document.addEventListener("mousemove", (e) => {
  const size = brushSize.value;
  brushSizeDisplay.style.left = `${e.clientX - size / 2}px`;
  brushSizeDisplay.style.top = `${e.clientY - size / 2}px`;
  brushSizeDisplay.style.width = `${size}px`;
  brushSizeDisplay.style.height = `${size}px`;
});
canvas.addEventListener("mousedown", (e) => {
  lastX = e.clientX;
  lastY = e.clientY;
  drawing = true;
  draw(e);
});

canvas.addEventListener("mousemove", (e) => {
  if (drawing) {
    draw(e);
  }
});

canvas.addEventListener("mouseup", () => {
  drawing = false;
});

canvas.addEventListener("mouseout", () => {
  drawing = false;
});

function draw(e) {
  if (!drawing) return;
  ctx.lineWidth = brushSize.value;
  ctx.lineCap = "round";
  ctx.strokeStyle = isErasing ? "#ffffff" : colorPicker.value; // 이레이저 색상을 캔버스 배경색과 동일하게

  const offsetX = brushSize.value / 2;
  const offsetY = 30;

  ctx.beginPath();
  ctx.moveTo(lastX - offsetX, lastY - offsetY); // 이전 위치에서 시작 (브러시 크기를 고려하여 보정)
  ctx.lineTo(e.clientX - offsetX, e.clientY - offsetY); // 현재 마우스 위치로 라인 그리기 (브러시 크기를 고려하여 보정)
  ctx.stroke();

  lastX = e.clientX;
  lastY = e.clientY;
}

eraserButton.addEventListener("click", () => {
  isErasing = !isErasing;
  eraserButton.textContent = isErasing ? "Draw" : "Eraser";
  eraserButton.style.backgroundColor = isErasing ? "#ccc" : "";
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
