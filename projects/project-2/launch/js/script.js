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

// variable for time
let timeControl = 0;

//variables for stars
let stars = [];
let border = 100;
let starVelX = 0;
let starVelY = 0;

// font for the game
let spaceFont;

//variables and array to control sounds
let missionSound = [];
let booster;

//variables for sprites
let ground;
let launchShip;
let stage2;
let rocket;
let base;

//for the boost animation of each stage
let rocketBoost;
let stage2Boost;
let shipBoost;
let boost1;
let boost2;
let boost3;

// for sprite images
let launchShipImg;
let stage2Img;
let rocketImg;
let baseImg;

//variables for speed and altitude
let speed = 0;
let altitude = 0;
let alt = 0;

//alert variables
let boosterAlert = false;
let stageAlert = false;
let boosterEnabled = false;
let stageEnabled = false;

//variables for sprite joints that keep the stage together
let dock1;
let dock2;

let stage = 0; // variable to keep each action separate

//for the countdown
let countdown = 13;

//for the class
let launch;

//for the endings
let launchFailled = false;
let launchComplete = false;

//for the transitions
let titleFade = 255;
let instFade = 0;
let fadeOn = false;
let fadeTransition = 0;


/**
 * loading fonts and sounds and images for the sprites
*/
function preload() {
	//images
	launchShipImg = loadImage('assets/images/starship.png');
	stage2Img = loadImage('assets/images/stage2.png');
	rocketImg = loadImage('assets/images/rocket.png');
	baseImg = loadImage('assets/images/base.png');
	spaceShipImg = loadImage('assets/images/starship.png');
	//font
	spaceFont = loadFont('assets/fonts/BebasNeue-Regular.ttf');
	//sounds
	for (let i = 0; i < 31; i++) {
		let radioSound = loadSound(`assets/sounds/mission_${i}.wav`);
		missionSound.push(radioSound);
	}
	booster = loadSound(`assets/sounds/booster.wav`);
}

/**
 * inserting all sprites and dclaring a few parameters
*/
function setup() {
	createCanvas(windowWidth,windowHeight);
	//drawing stars
	for (let i = 0; i < 2000; i++) {
		stars.push(new Star());
	}
	//using font globaly
	textFont(spaceFont);

	// launch class
	launch = new Launch();
	launch.setup();
}

/**
 * calling methods and functions
*/
function draw() {
	background(0);
	//time can be relative, but here I need it counted to trigger some actions
	if (frameCount % 60 == 0) {
		timeControl++;
	}
	
	//calls the draw method of the class
		launch.draw();

		//endings
		if (launchComplete === true && fadeTransition === 255) {
			location.href = "https://dreneder.github.io/cart253-2023/projects/project-2/travel"; //goes to next stage
		  }
		if (launchFailled === true && fadeTransition === 255 && kb.presses('space')) { //reloads the page on spacebar
			location.reload();
		  }

		  //calling the functions
	transition();
}

function transition(){
//fade control
if (fadeOn === true) {
	fadeTransition += 2;
}
else if (fadeOn === false) {
	fadeTransition -= 2;
}
if (fadeTransition >= 255) {
	fadeTransition = 255;
}
else if (fadeTransition <= 0) {
	fadeTransition = 0;
}

//drawing stage completion text
if (launchComplete === true) {
	push();
	fadeOn = true;
	fill(0,fadeTransition);
	rectMode(CENTER);
	rect(width/2,height/2,width,height);
	fill(250, 101, 52,fadeTransition);
	textSize(150);
	text('Destination: mars',width/2,height/2);
	pop();
}
//drawing "game over" text
else if (launchFailled === true) {
	push();
	fadeOn = true;
	rectMode(CENTER);
	fill(245, 37, 37,fadeTransition);
	rect(width/2,height/2,width,height);
	fill(0,fadeTransition);
	textSize(150);
	text('mission failed',width/2,height/2);
	pop();
}
}