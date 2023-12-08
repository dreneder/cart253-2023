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


let state = `title`;

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

let fadeOn = true;
let fadeTransition = 255;


/**
 * loading fonts and sounds and images for the sprites
*/
function preload() {

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

	textFont(spaceFont);
	
	marsBkg = loadAni('assets/images/msprite_1.png', 9);
	marsBkg.scale.x = width/1280;
	marsBkg.scale.y = height/720;
	marsBkg.noLoop();
	marsBkg.stop();
}


function draw() {
	background(0);
	
	//time can be relative, but here I need it counted to trigger some actions
	if (frameCount % 60 == 0) {
		timeControl++;
	}

	
	transitions();
	
	
}

function transitions() {
	push();
	tint(255,fadeTransition);

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

	else if (state === 'transition') {
		fadeOn = true;
		push();
		fill(250, 101, 52,fadeTransition);
		textSize(150);
		text('Destination: mars',width/2,height/2);
		pop();
	}

	else if (state === 'failed') {
		fadeOn = true;
		push();
		fill(245, 37, 37,fadeTransition);
		rect(width/2,height/2,width,height);
		fill(0,fadeTransition);
		textSize(150);
		text('mission failed',width/2,height/2);
		pop();

	}

	pop();

  }

  function titleScreen() {
	rectMode(CENTER);
	
	animation(marsBkg,width/2,height/2);
	
	fill(255,titleFade);
	noStroke();
	textSize(200);
	textAlign(CENTER,CENTER);
	text('2024',width/2,height/3-200);
	text('billionaire simulator',width/2,height/3);
	textSize(80);
	text('press space to begin',width/2,height/3*2);
	
	if (marsBkg.frame < 2 && kb.presses('space')) {
			marsBkg.play();
		}
	titleFade = map(marsBkg.frame,1,8,255,0);

	if (titleFade === 0) {
		instFade += 10;
	}
	
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
	textFont('roboto');
	text('↑',width/2,height/2-300);
	text('↓',width/2,height/2);
	strokeWeight(4);
	text('↺',width/2-300,height/2);
	text('↻',width/2+300,height/2);
	
	textFont(spaceFont);
	if (marsBkg.frame > 5 && kb.presses('space')) {
		location.href = "google.com";
	}

  }
