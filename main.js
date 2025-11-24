/* Main game file: main.js */
/* Game: DVD Logo Simulator */
/* Authors: Avalynn Annarelli, Chase DeLuca */
/* Description: [Short description of your game here] */
/* Citations: [List any resources, libraries, tutorials, etc you used here] 
/* Note: If you use significant AI help you should cite that here as well */
/* including summaries of prompts and/or interactions you had with the AI */
/* In addition, of course, any AI-generated code should be clearly maked */
/* in comments throughout the code, though of course when using e.g. CoPilot */
/* auto-complete it maye be impractical to mark every line, which is why you */
/* should also include a summary here */

import "./style.css";

import { GameInterface } from "simple-canvas-library";

let gi = new GameInterface();

/* Variables: Top-Level variables defined here are used to hold game state */
let dvdPosX = 1200;
let dvdPosY = 300;
// horizontal velocity in pixels per second (positive = right, negative = left)
let dvdVelX = 60;
// vertical velocity in pixels per second (positive = down, negative = up)
let dvdVelY = 60;
// width (pixels) we'll draw the logo at. Previously code assumed ~300px, keep same default.
const DVD_DRAW_WIDTH = 300;
const DVD_DRAW_HEIGHT = 150;
/* Drawing Functions */
// define DVD logo image
/* used AI to help generate this code, however it still doesnt work so thanks AI
actually upon further review *i* am actually the one that's wrong -Chase */
const dvdImg = new Image();
dvdImg.src = "/DVD.png";
dvdImg.onload = () => {};
// blu-ray logo position
let bluPosX = 100;
let bluPosY = 100;

/* Example drawing function: you can add multiple drawing functions
that will be called in sequence each frame. It's a good idea to do 
one function per each object you are putting on screen, and you
may then want to break your drawing function down into sub-functions
to make it easier to read/follow */
gi.addDrawing(function ({ ctx, width, height, elapsed, stepTime, canvas }) {
  // all this code runs at 60 Hz
  // Hinkle adjusted code...
  drawDvd({ ctx });
  updatePosition({ stepTime, width, height });
  checkCollisions({ width, height, drawWidth: DVD_DRAW_WIDTH, drawHeight: DVD_DRAW_HEIGHT });
});

function drawDvd({ ctx }) {
  const drawWidth = DVD_DRAW_WIDTH;
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(dvdPosX, dvdPosY, 20, 0, 2 * Math.PI);
  ctx.fill();
  return;

  // Begin generated code (AI-assisted)
  // Draw the DVD logo at fixed draw width and move using a velocity value
  
  // If the image has intrinsic dimensions, compute drawHeight to keep aspect ratio;
  // otherwise fall back to the constant DVD_DRAW_HEIGHT.
  const drawHeight = dvdImg.height
    ? drawWidth
    : DVD_DRAW_HEIGHT;
  // Use the simple 5-argument drawImage(image, dx, dy, dWidth, dHeight) overload
  ctx.drawImage(dvdImg, dvdPosX, dvdPosY, drawWidth, drawHeight);
}

function updatePosition({ stepTime, width, height }) {
  // Move by velocity * deltaTime (convert stepTime ms to seconds)
  const dt = stepTime / 1000;
  dvdPosX += dvdVelX * dt;
  dvdPosY += dvdVelY * dt;
}

function checkCollisions({ width, height, drawWidth, drawHeight }) {
  // Check for collisions with left/right edges and reverse velocity smoothly
  if (dvdPosX > (width-20)) {
    // clamp to right edge and reverse direction
    dvdPosX = (width-20);
    dvdVelX *= -1;
  } else if ((dvdPosX-20) < 0) {
    // clamp to left edge and reverse direction
    dvdPosX = 20;
    dvdVelX *= -1;
  }
  // End generated code (AI-assisted)

  if ((dvdPosY+20) > height) {
    // clamp to bottom edge and reverse direction
    dvdPosY = (height-20);
    dvdVelY *= -1;
  } else if ((dvdPosY-20) < 0) {
    // clamp to top edge and reverse direction
    dvdPosY = 20;
    dvdVelY *= -1;
  }
}

/* Input Handlers */

/* Example: Mouse click handler (you can change to handle 
any type of event -- keydown, mousemove, etc) */

/* gi.addHandler("click", function ({ event, x, y }) {
  //we'll work on this later
});
*/

/* Run the game */
gi.run();
