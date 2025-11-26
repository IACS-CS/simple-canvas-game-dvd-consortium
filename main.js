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
let bluPosX = 0;
let bluPosY = 0;
let bluDrawTime = -1;
//blu-ray radius value
let bluRadius = 60;
// leaf blower position
let blowerPosX = 100;
let blowerPosY = 100;
// leaf blower rotation (radians) - 0 = facing +X
let blowerRotation = 0;
let isBlowing = false;
//scorecount
let scorecount = 0;
let inCorner = false;

/* this is where the main drawing code is. */
gi.addDrawing(function ({ ctx, width, height, elapsed, stepTime, canvas }) {
  // all this code runs at 60 Hz
  // Hinkle adjusted code...
  drawDvd({ ctx });
  updatePosition({ stepTime, width, height });
  checkCollisions({
    width,
    height,
    drawWidth: DVD_DRAW_WIDTH,
    drawHeight: DVD_DRAW_HEIGHT,
  });
  drawLeafBlower({ ctx, width, height, elapsed, stepTime, canvas });
  drawBluRay({ ctx, stepTime, width, height, elapsed });
  drawScore({ ctx });
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
  const drawHeight = dvdImg.height ? drawWidth : DVD_DRAW_HEIGHT;
  // Use the simple 5-argument drawImage(image, dx, dy, dWidth, dHeight) overload
  ctx.drawImage(dvdImg, dvdPosX, dvdPosY, drawWidth, drawHeight);
}

function drawBluRay({ ctx, stepTime, width, height, elapsed }) {
  // Draw a simple blue circle for the Blu-ray logo
  let drawCount = Math.floor(elapsed / 10000);
  if (drawCount > bluDrawTime) {
    console.log("Moving blu-ray logo");
    bluPosX = Math.random() * (width - 20);
    bluPosY = Math.random() * (height - 20);
    bluDrawTime = drawCount;
  }
  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.arc(bluPosX, bluPosY, bluRadius, 0, 2 * Math.PI);
  ctx.fill();
}

function updatePosition({ stepTime, width, height }) {
  // Move by velocity * deltaTime (convert stepTime ms to seconds)
  const dt = stepTime / 1000;
  dvdPosX += dvdVelX * dt;
  dvdPosY += dvdVelY * dt;
  if (isBlowing) {
    // add dvd velocity away from blower, scaled by distance
    const dx = dvdPosX - blowerPosX;
    const dy = dvdPosY - blowerPosY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 200) {
      // only affect if within 200 pixels
      const force = ((200 - distance) / 200) * 300; // max force of 300 pixels/sec^2
      const angle = Math.atan2(dy, dx);
      dvdVelX += Math.cos(angle) * force * dt;
      dvdVelY += Math.sin(angle) * force * dt;
    }
  }
}

function checkCollisions({ width, height, drawWidth, drawHeight, elapsed }) {
  // Check for collisions with left/right edges and reverse velocity smoothly
  if (dvdPosX > width - 20) {
    // clamp to right edge and reverse direction
    dvdPosX = width - 20;
    dvdVelX *= -1;
  } else if (dvdPosX - 20 < 0) {
    // clamp to left edge and reverse direction
    dvdPosX = 20;
    dvdVelX *= -1;
  }
  // End generated code (AI-assisted)

  if (dvdPosY + 20 > height) {
    // clamp to bottom edge and reverse direction
    dvdPosY = height - 20;
    dvdVelY *= -1;
  } else if (dvdPosY - 20 < 0) {
    // clamp to top edge and reverse direction
    dvdPosY = 20;
    dvdVelY *= -1;
  }
  // check for collision with blu-ray logo, if collision then end game
  const dx = dvdPosX - bluPosX;
  const dy = dvdPosY - bluPosY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  if (distance < 20 + bluRadius) {
    alert("You Lose! What a bum.");
    scorecount = 0;
    bluRadius = 60;
    // reset dvd position and velocity
    dvdPosX = 1200;
    dvdPosY = 300;
    dvdVelX = 60;
    dvdVelY = 60;
  }
  //if dvd position hits corner of canvas, increase scorecount by 1
  //only update score when the score delay is reached
  if (
    (dvdPosX >= width - 50 && dvdPosY >= height - 50) ||
    (dvdPosX <= 50 && dvdPosY <= 50) ||
    (dvdPosX >= width - 50 && dvdPosY <= 50) ||
    (dvdPosX <= 50 && dvdPosY >= height - 50)
  ) {
    // if it is the first time player is in corner, than increment score by 1
    if (!inCorner) {
      scorecount += 1;
      bluRadius +=10
    }
    inCorner = true;
  } else {
    //player has left corner, so player can score again
      inCorner = false 
    }
}

function drawLeafBlower({ ctx, width, height, elapsed, stepTime, canvas }) {
  // compute angle toward the DVD logo and store it on the blower
  // atan2(dy, dx) gives angle from blower -> dvd
  const angle = Math.atan2(dvdPosY - blowerPosY, dvdPosX - blowerPosX);
  blowerRotation = angle;

  // draw the leaf blower using canvas transforms so it points at the DVD
  ctx.save();
  ctx.translate(blowerPosX, blowerPosY);
  ctx.rotate(blowerRotation);

  // nozzle (points to the right at angle 0)
  ctx.fillStyle = "white";
  ctx.fillRect(0, -6, 36, 12);

  // handle behind the nozzle
  ctx.fillStyle = "white";
  ctx.fillRect(-10, -2, 10, 4);

  ctx.restore();
  // end gpt-generated code
}

function drawScore({ ctx }) {
  // draw score at the top of the screen, centered.
  ctx.fillStyle = "white";
  ctx.font = "24px Arial";
  ctx.textAlign = "center";
  ctx.fillText("score" && scorecount, ctx.canvas.width / 2, 30);
}
/* Input Handlers */

// mouse move handler, has leafblower follow mouse position
gi.addHandler("mousemove", function ({ x, y }) {
  //update leaf blower position
  blowerPosX = x;
  blowerPosY = y;
});

// this fucntion tests if the left mouse button is pressed
gi.addHandler("mousedown", function ({ event, x, y }) {
  isBlowing = true;
});

// this function runs if the left mouse button is released
gi.addHandler("mouseup", function ({ event, x, y }) {
  isBlowing = false;
});

/* Run the game */
gi.run();
