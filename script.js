const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");
const canvasH = canvas.height;
const canvasW = canvas.width;

const rect = {
  x: 20,
  y: 20,
  w: 20,
  h: 20,
  isDragging: false,
  vericalMotion: {
    g: 9.81,
    c: 0.5,
    t: 0,
  },
  horizontalMotion: {
    prevX: 0,
    a: 0.98,
    c: 0.5,
    t: 1.5,
    v: 0,
  },
};

function drawRect() {
  ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
}
function clearRect() {
  ctx.clearRect(rect.x, rect.y - rect.h, rect.w, rect.h * 2);
}

drawRect(rect.x, rect.y, rect.w, rect.h);

canvas.addEventListener("mousedown", enableDrag);

function enableDrag(e) {
  const mouseX = e.offsetX;
  const mouseY = e.offsetY;

  if (
    mouseX > rect.x &&
    mouseX < rect.x + rect.w &&
    mouseY > rect.y &&
    mouseY < rect.y + rect.h
  ) {
    rect.isDragging = true;
    rect.t = 0;
    rect.horizontalMotion.prevX = 0;
  }
}

canvas.addEventListener("mousemove", dragRect);

function isBottom() {
  return rect.y >= canvasH - 20;
}

function dragRect(e) {
  const mouseX = e.offsetX;
  const mouseY = e.offsetY;
  if (rect.isDragging) {
    rect.vericalMotion.t = 0;
    clearRect();
    rect.x = mouseX - 10;
    rect.y = mouseY - 10;
    drawRect();

    const intervalId = setInterval(() => {
      rect.horizontalMotion.v = (rect.x - rect.horizontalMotion.prevX) * 0.2;
    }, 200);

    setTimeout(() => {
      clearInterval(intervalId);
    }, 5000);
  }
}

canvas.addEventListener("mouseup", releaseRect);

function releaseRect() {
  rect.isDragging = false;
}

function freeFall() {
  setInterval(() => {
    if (!rect.isDragging)
      if (rect.y <= canvasH - 20) {
        clearRect();
        rect.vericalMotion.t = rect.vericalMotion.t + 0.0075;
        rect.y = isBottom()
          ? canvasH - 20
          : rect.y +
            rect.vericalMotion.c *
              rect.vericalMotion.g *
              Math.pow(rect.vericalMotion.t, 2);
        drawRect();
      } else if (rect.y > canvasH - 20) {
        rect.y = canvasH - 20;
      }
  });
}
freeFall();

function horizontalMove() {
  setInterval(() => {
    if (rect.isDragging) {
      clearRect();

      rect.x =
        rect.horizontalMotion.v * rect.horizontalMotion.t +
        rect.horizontalMotion.c *
          rect.horizontalMotion.a *
          Math.pow(rect.horizontalMotion.t, 2);

      drawRect();
    }
  });
}
horizontalMove();
