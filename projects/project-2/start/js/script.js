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
	marsBkg = loadAni('assets/images/msprite_1.png', 9);
	//scaled using width and height 
	marsBkg.scale.x = width/1280;
	marsBkg.scale.y = height/720;
	marsBkg.noLoop(); // so the animation won't loop
	marsBkg.stop(); // pause when script begins
}

/**
 * all the animations and inputs
*/
function draw() {
	background(0);

	//setting rectangle mode here
	rectMode(CENTER);

	//drawing the sprite animation
	animation(marsBkg,width/2,height/2);
	
	//drawing the title and first instruction
	fill(255,titleFade);
	noStroke();
	textSize(200);
	textAlign(CENTER,CENTER);
	text('2024',width/2,height/3-200);
	text('billionaire simulator',width/2,height/3);
	textSize(80);
	text('press space to begin',width/2,height/3*2);
	
	// starts sprite animation with spacebar pressed
	if (marsBkg.frame < 2 && kb.presses('space')) {
			marsBkg.play();
		}
	// alpha value of the title is mapped by the animation frames
	titleFade = map(marsBkg.frame,1,8,255,0);
	
	// controls the fade of the title
	if (titleFade === 0) {
		instFade += 10;
	}
	
	// draws the instructions with text and rectangles
	stroke(255,instFade);
	strokeWeight(10);
	fill(255,0);
	rect(width/2,height/2+300,900,150);
	rect(width/2,height/2,200,200);
	rect(width/2,height/2-300,200,200);
	rect(width/2-300,height/2,200,200);
	rect(width/2+300,height/2,200,200);
	fill(255,instFade);
	strokeWeight(0);
	textSize(80);
	text('controls',width/2,height/2-500);
	text('next stage',width/2,height/2+290);
	strokeWeight(8);
	textFont('roboto'); // font only used for symbols
	text('↑',width/2,height/2-300);
	text('↓',width/2,height/2);
	strokeWeight(4);
	text('↺',width/2-300,height/2);
	text('↻',width/2+300,height/2);
	
	//making sure the font will keep affecting all other texts
	textFont(spaceFont);
	// opens the page of the next phase
	if (marsBkg.frame > 5 && kb.presses('space')) {
		location.href = "https://dreneder.github.io/cart253-2023/projects/project-2/bill-sim/launch";
	}
  }