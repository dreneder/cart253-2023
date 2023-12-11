/**
 * 2024 Billionaire Simulator: Mission to Mars
 * André Neder
 * 
 * The Billionaire Simulator (BS for short) is based based on the current commercial space race and the
 * rich people that take part in it. The game is divided in two parts: the launch and the interplanetary
 * travel to Mars. The code makes a huge use of the p5play library by Quinton Ashley, so all of the
 * objects have been written as sprites, so the camera object could work properly.
 * Initially the codewas based on gravity prototypes by Miachel Ruppe: https://github.com/michaelruppe/art/tree/master/solar-system-p5
 * and Bruno M.: https://github.com/Bruno-M-/gravity
 * Finaly they were all adapted to the mechanics built in p5play.
 * 
 */

"use strict";

// font for the game
let spaceFont;

// variable for the background
let marsBkg;

//variables for the transitions
let titleFade = 255;
let instFade = 0;
let fadeOn = true;
let fadeTransition = 255;

/**
 * loading fonts and sounds and images for the sprites
*/
function preload() {
	spaceFont = loadFont('assets/fonts/BebasNeue-Regular.ttf');
}

/**
 * inserting all sprites and dclaring a few parameters
*/
function setup() {
	createCanvas(windowWidth,windowHeight);
	
	// font will be used globally
	textFont(spaceFont);

	// loaded image sequence using p5play sprite animation
	marsBkg = loadAni('assets/images/endsprite_1.png', 18);
	//scaled using width and height 
	marsBkg.scale.x = width/1280;
	marsBkg.scale.y = height/720;
	marsBkg.noLoop(); // so the animation won't loop
	
}

/**
 * all the animations and inputs
*/
function draw() {
	background(0);
	
	//drawing the sprite animation
	animation(marsBkg,width/2,height/2);
	
	//drawing the text
	fill(255,titleFade);
	noStroke();
	textSize(200);
	textAlign(CENTER,CENTER);
	text('mission complete',width/2,height/2);
	textSize(80);
	text('press space to play again',width/2,height/3*2);
	
	//text fades according to animation progress
	titleFade = map(marsBkg.frame,3,10,0,255);

	// if spacebar is pressed returns to initial screen of the game
	if (marsBkg.frame > 10 && kb.presses('space')) {
		location.href = "https://dreneder.github.io/cart253-2023/projects/project-2/start";
	}
  }