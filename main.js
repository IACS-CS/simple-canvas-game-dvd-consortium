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
let dvdPosX = 100; // initial X position of DVD logo
let dvdPosY = 100; // initial Y position of DVD logo
/* Drawing Functions */
// define DVD logo image
/* used AI to help generate this code, however it still doesnt work so thanks AI */
const dvdImg = new Image();
dvdImg.src = '/DVD.png';
dvdImg.onload = () => {};

/* Example drawing function: you can add multiple drawing functions
that will be called in sequence each frame. It's a good idea to do 
one function per each object you are putting on screen, and you
may then want to break your drawing function down into sub-functions
to make it easier to read/follow */
gi.addDrawing(function ({ ctx, width, height, elapsed, stepTime, canvas }) {
  if (!dvdImg.complete) return;
  ctx.drawImage(dvdImg, dvdPosX, dvdPoxY);
});

/* Input Handlers */

/* Example: Mouse click handler (you can change to handle 
any type of event -- keydown, mousemove, etc) */

gi.addEventListener("click", function ({ event, x, y }) {
  //we'll work on this later
});

/* Run the game */
gi.run();
