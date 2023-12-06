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

//array for mission control sounds
let missionSound = [];

let travel;


// ONLY LAUNCH VARIABLES BELOW

//variables for sprites
let ground;
let launchShip;
let stage2;
let rocket;
let base;


let lifted = false;

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

let dock1;
let dock2;

let stage = 0; // variable to keep each action separate

//for the countdown
let countdown = 13;


/**
 * loading fonts and sounds and images for the sprites
*/
function preload() {
	launchShipImg = loadImage('assets/images/starship.png');
	stage2Img = loadImage('assets/images/stage2.png');
	rocketImg = loadImage('assets/images/rocket.png');
	baseImg = loadImage('assets/images/base.png');

	earthImg = loadImage('assets/images/earth.png');
	moonImg = loadImage('assets/images/moon.png');
	marsImg = loadImage('assets/images/mars.png');
	spaceShipImg = loadImage('assets/images/starship.png');
	

	spaceFont = loadFont('assets/fonts/BebasNeue-Regular.ttf');

	for (let i = 0; i < 29; i++) {
		let radioSound = loadSound(`assets/sounds/mission_${i}.wav`);
	  missionSound.push(radioSound);
	  }
}


/**
 * inserting all sprites and dclaring a few parameters
*/
function setup() {
	createCanvas(windowWidth,windowHeight);
	// travel class
	// travel = new Travel();
	// travel.setup();
	
	world.gravity.y = 10;
  
	//for the boost class
	rocketBoost = new Boost();
	rocketBoost.setRocket();
	stage2Boost = new Boost();
	stage2Boost.setStage2();
	shipBoost = new Boost();
	shipBoost.setShip();
  
	ground = new Sprite(width/2,height-75,width*4,150,'static');
	base = new Sprite(width/2+150,height-420,'none');
	stage2 = new Sprite(width/2,height-384);
	launchShip = new Sprite(width/2,height-505);
	rocket = new Sprite(width/2,height-225);
	
	ground.color = '#00bd3f';
	
	launchShip.img = launchShipImg;
	stage2.img = stage2Img;
	rocket.img = rocketImg;
	base.img = baseImg;
	
	rocket.scale = 0.2;
	launchShip.scale = 0.2;
	stage2.scale = 0.2;
	base.scale = 0.2;
	
	dock1 = new GlueJoint(rocket,stage2);
	dock2 = new GlueJoint(stage2,launchShip);	

}


function draw() {
	// travel.draw();


	clear();
	background(0);
	
	fill(183,226,247,map(altitude,40,60,255,0,true));
	rect(0,0,width,height);
	
	camera.on();
	handleInput();
	
	  if (stage === 0) {
		camera.x = stage2.x;
		camera.zoom = 1;
		if (stage2.y <= height/2) {
		  camera.y = stage2.y;
		}
	  }
	else if (stage === 1) {
		camera.x = launchShip.x;
		camera.zoomTo(1.2);
		if (launchShip.y+100 <= height/2) {
		  camera.y = launchShip.y+100;
		}
	  }
	  else if (stage === 2) {
		camera.x = launchShip.x;
		camera.zoomTo(1.5);
		 if (launchShip.y <= height/2) {
			camera.y = launchShip.y;
			}
	}
	
	if (camera.y < 0-width/2) {
	  ground.x = launchShip.x;
	}
  
	ground.draw();
	base.draw();
	stage2Boost.drawStage2(stage2.x,stage2.y,stage2.rotation);
	rocketBoost.drawRocket(rocket.x,rocket.y,rocket.rotation);
	shipBoost.drawShip(launchShip.x,launchShip.y,launchShip.rotation);
	rocket.draw();
	stage2.draw();
	launchShip.draw();
  
  
	dock1.visible = false;
	dock2.visible = false;
	
	stageCounter(); // function to enable the stage
  
	  
	calcAltSpeed();
	
	camera.off();
	fill(map(altitude,40,60,0,255));
	noStroke();
	textAlign(LEFT,CENTER);
	textSize(35);
	text('Altitude '+altitude+'km',30,50);
	// text('Speed '+speed+'km/h',30,90);
   
  
  }
  
  
  function stageCounter() { // controls the stages
	if (kb.presses('spacebar')) {
	  if (stage === 0 && lifted === false) {
		lifted = true;
	  }
	  else if (stage === 0 && lifted === true && altitude > 100) {
		dock1.remove();
		stage = 1;
	  }
	  else if (stage === 1 && altitude > 150) {
		dock2.remove();
		stage = 2;
	  }
	  else if (stage === 2 && altitude > 200) {
		state = 'travel';
	  }
	}
  }
  
  function handleInput() {
	
  
	if (stage === 1 && countdown <= 0) {
	  if (kb.pressing('left')) {
	  rocket.rotation -= 0.1;
	  }
	  else if (kb.pressing('right')) {
	  rocket.rotation += 0.1;
	  }
	  if (kb.pressing('up')) {
		let xForce = cos(rocket.rotation-90) * 10000;
	  let yForce = sin(rocket.rotation-90) * 10000;
	  rocket.bearing = -90;
		rocket.applyForce(createVector(xForce, yForce))
		}
	  }
	else if (stage === 2) {
	  if (kb.pressing('left')) {
	  stage2.rotation -= 0.1;
	  }
	  else if (kb.pressing('right')) {
	  stage2.rotation += 0.1;
	  }
	  if (kb.pressing('up')) {
		let xForce = cos(stage2.rotation-90) * 10000;
	  let yForce = sin(stage2.rotation-90) * 10000;
	  stage2.bearing = -90;
		stage2.applyForce(createVector(xForce, yForce));
		}
	  }
	else if (stage === 3) {
	  if (kb.pressing('left')) {
	  launchShip.rotation -= 0.2;
	  }
	  else if (kb.pressing('right')) {
	  launchShip.rotation += 0.2;
	  }
	  if (kb.pressing('up')) {
		let xForce = cos(launchShip.rotation-90) * 500;
	  let yForce = sin(launchShip.rotation-90) * 500;
	  launchShip.bearing = -90;
		launchShip.applyForce(createVector(xForce, yForce));
		}
	  }
	
  }
  
  function calcAltSpeed() {
	
	alt = map(launchShip.y,1000,-10000,0,200);
	altitude = round(alt);
  }
  
  function countDown() {
	// timer based on frame rate
	if (stage === 1 && frameCount % 60 == 0) {
	  countdown--;
	}
	if (countdown >= 10 && countdown >= 0) {
		
	}
  
  }








