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

// variables for sprites 
let earth;
let moon;
let mars;
let spaceShip;

// variables for images 
let earthImg;
let marsImg;
let moonImg;
let spaceShipImg;

// variables for distances
let distEarth;
let distMoon;
let distMars;

//variables for UI
let travelUI = {
	x: 0,
	y: 0
};
let earthAngle;
let moonAngle;
let marsAngle;
let shipSpeed = 0;
let displaySpeed = 0;
let warningSpeed = false;
let warningFuel = false;
let warningDistance = false;
let fuel = 98;


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
let travelIntel = false;

//variable for explosion
let explosion;

//speed of the ship
let speed = 0;

//for the countdown
let travel;

// for game endings
let travelFailled = false;
let travelComplete = false;

//for voice commands
let approachMars = false;
let decreaseSpeed = false;

//for transitions
let titleFade = 255;
let instFade = 0;
let fadeOn = true;
let fadeTransition = 255;

/**
 * loading fonts and sounds and images for the sprites
*/
function preload() {
	//images
	earthImg = loadImage('assets/images/earth.png');
	moonImg = loadImage('assets/images/moon.png');
	marsImg = loadImage('assets/images/mars.png');
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
	//calls the stars
	for (let i = 0; i < 2000; i++) {
		stars.push(new Star());
	}
	//declares font for global use
	textFont(spaceFont);

	// travel class
	travel = new Travel();
	travel.setup();
}

/**
 * calling methods and transition function
*/
function draw() {
	background(0);

	//time can be relative, but here I need it counted to trigger some actions
	if (frameCount % 1 == 0) {
		timeControl++;
	}
	//draws travel
	travel.draw();

	//endings
	if (travelComplete === true && fadeTransition === 255) {
		location.href = "https://dreneder.github.io/cart253-2023/projects/project-2/end"; //goes to end screen
	  }
	if (travelFailled === true && fadeTransition === 255 && kb.presses('space')) {
		location.reload(); //reloads the level if failed
	  }
	  // calls the transition
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
//draws the initial text
if (travelFailled === false && travelComplete === false && travelIntel === false) {
	if (kb.presses('space')) {
		fadeOn = false;
	}
	push();
	fill(0,fadeTransition);
	rectMode(CENTER);
	rect(width/2,height/2,width,height);
	fill(250, 101, 52,fadeTransition);
	textAlign(CENTER,CENTER);	
	textSize(150);
	text('Destination: mars',width/2,height/2);
	textSize(60);
	text('press space to continue',width/2,height/2+100);
	pop();
}

//draws the endgame text
if (travelComplete === true) {
	push();
	fadeOn = true;
	fill(0,fadeTransition);
	rectMode(CENTER);
	rect(width/2,height/2,width,height);
	fill(250, 101, 52,fadeTransition);
	textAlign(CENTER,CENTER);
	textSize(150);
	text('mars touchdown',width/2,height/2);
	pop();
}
//draws the "game over" text
else if (travelFailled === true) {
	push();
	fadeOn = true;
	rectMode(CENTER);
	fill(245, 37, 37,fadeTransition);
	rect(width/2,height/2,width,height);
	fill(0,fadeTransition);
	textAlign(CENTER,CENTER);
	textSize(150);
	text('mission failed',width/2,height/2);
	pop();
}
}
	


