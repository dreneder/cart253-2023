/**
 * 2024 Billionaire Simulator: Mission to Mars
 * André Neder
 * 
 * The Billionaire Simulator (BS for short) is based based on the current commercial space race and the
 * rich people that take part in it. The game is divided in two parts: the launch and the interplanetary
 * travel to Mars. The code makes a huge use of the p5play library by Quinton Ashley, so all of the
 * objects have been written as sprites, so the camera object could work properly.
 * I based my code on a gravity prototype from Miachel Ruppe: https://github.com/michaelruppe/art/tree/master/solar-system-p5
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

let explosion;

// ONLY LAUNCH VARIABLES BELOW

//variables for sprites
let ground;
let launchShip;
let stage2;
let rocket;
let base;

let rocketBoost;
let stage2Boost;
let shipBoost;


let launchShipImg;
let stage2Img;
let rocketImg;
let baseImg;


let speed = 0;

let altitude = 0;
let alt = 0;

let boost1;
let boost2;
let boost3;

let boosterAlert = false;
let stageAlert = false;
let boosterEnabled = false;
let stageEnabled = false;

let dock1;
let dock2;

let stage = 0; // variable to keep each action separate

//for the countdown
let countdown = 13;

let launch;
let travel;

let launchFailled = false;
let launchComplete = false;
let travelFailled = false;
let travelComplete = false;

let marsBkg;

let titleFade = 255;
let instFade = 0;

let fadeOn = false;
let fadeTransition = 0;


/**
 * loading fonts and sounds and images for the sprites
*/
function preload() {
	launchShipImg = loadImage('assets/images/starship.png');
	stage2Img = loadImage('assets/images/stage2.png');
	rocketImg = loadImage('assets/images/rocket.png');
	baseImg = loadImage('assets/images/base.png');

	spaceShipImg = loadImage('assets/images/starship.png');
	

	spaceFont = loadFont('assets/fonts/BebasNeue-Regular.ttf');

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
	for (let i = 0; i < 2000; i++) {
		stars.push(new Star());
	}
	textFont(spaceFont);

	// launch class
	launch = new Launch();
	launch.setup();

}


function draw() {
	background(0);
	
	//time can be relative, but here I need it counted to trigger some actions
	if (frameCount % 60 == 0) {
		timeControl++;
	}
	
		launch.draw();

		if (launchComplete === true && fadeTransition === 255) {
			location.href = "https://dreneder.github.io/cart253-2023/projects/project-2/travel";
		  }
		if (launchFailled === true && fadeTransition === 255 && kb.presses('space')) {
			location.reload();
		  }
	transition();

	
}

function transition(){




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