/**
 * Space, the only frontier
 * André Neder
 * 
 * This is my attempt to write some of the code for my final project while doing the
 * object oriented programming exercise.
 * It consists of launching and object into space and completing orbits around earth.
 * Once 3 orbits are complete you win.
 * I based my code on a gravity prototype from Miachel Ruppe: https://github.com/michaelruppe/art/tree/master/solar-system-p5
 * 
 */

"use strict";


let screen = `title`; // sets first screen

// variables for classes 
let earth; 

let rocket;
let rockets = []; // array for the class

let launcher;

// variables for images
let earthImg;

let rocketImg;

// variables to be used globaly
let liftoff = false;

let rocketAngle = undefined;

// ****STARS****
let stars = [];

let orbitCounter = {
	x:0,
	y:0
};

/**
 * loading images for the earth and rocket
*/
function preload() {
	earthImg = loadImage("assets/images/earth.png");
	rocketImg = loadImage("assets/images/rocket.png");
}


/**
 * inserting the earth and launcher classes as well as the stars
*/
function setup() {
	createCanvas(windowWidth,windowHeight);
	
	let milkyway = 5000;
    for (let i = 0; i < milkyway; i++) {
        let x = random(0, width);
        let y = random(0, height);
        stars.push(createVector(x, y)); // Store star positions in the array
    }

	//creates earth at the middle of the canvas
	// as defined in class: size (or mass), position, velocity
	earth = new Earth (width/2,height/2, 300);
	
	launcher = new Launcher ();
	
	
}


function draw() {
	background(0);
	displayStars(); // stars are always present
	
	// defining states / classes for the stages
	if (screen === `title`) {
		title();
	  }
	  else if (screen === `launch`) {
		launch();
	  }
	  else if (screen === `crashed`) {
		crashed();
	  }
	  else if (screen === `lost`) {
		lost();
	  }
	  else if (screen === `mission complete`) {
		missionComplete();
	  }


}

// I tried every possible way but this was the only way I could initially place a rocket
function initialRocket() {

rocketAngle = atan2(mouseY -height/2+150, mouseX - width/2);

push();
translate(width/2,height/2-150,);
rotate(rocketAngle);
imageMode(CENTER);
image(rocketImg,0,0,120,40);
pop();
}

// keeping it simple for the stars
function displayStars() {
    stroke(255);
    for (let i = 0; i < stars.length; i++) {
		stroke(random(250,255));
        point(stars[i].x, stars[i].y);
    }
}

function launch() {
	earth.display();
	
	launcher.update();
	launcher.display();
   // shoots the rocket
	for (let i = 0; i < rockets.length ; i++) {
		rocket = rockets[i];
		rocket.orbit(earth);
		rocket.gravity();
		rocket.display();
		rocket.bounds();
		rocket.recordOrbits();
		}
// hides the first rocket
	if (liftoff === false) { 
		initialRocket();
		if (mouseIsPressed) {
			orbitCounter.x = mouseX;
			orbitCounter.y = mouseY;
		   }
		   noStroke();
		   fill(255);
		   textFont('Courier');
		   textAlign(CENTER,CENTER);
		   textSize(30);
		   text(`click / hold to determine orbit`,width/2,100);
		 }
}

function title() {
	noStroke();
    fill(255);
    textFont('Courier');
    textAlign(CENTER,CENTER);
	rectMode(CENTER);
    textSize(80);
    text(`SPACE, THE ONLY FRONTIER`,width/2,height/4);
    textSize(50);
    text(`decide the telemetry your rocket will be launched, to complete the mission you must conclude 3 orbits around earth`,width/2,height/3,width/2);
   textSize(40);
    text(`press any key to begin`,width/2,height/4*3)
    if (keyIsPressed === true) {
		screen = `launch`;
	   }
	 
    
  
}
function missionComplete() {
	noStroke();
    fill(255);
    textFont('Courier');
    textAlign(CENTER,CENTER);
    textSize(80);
    text(`MISSION COMPLETE`,width/2,height/4);
    textSize(80);
    text(`GOOD JOB, you completed 3 orbits around earth!`,width/2,height/2,width/2);
	// noLoop();
    
}
function crashed() {
	noStroke();
    fill(255);
    textFont('Courier');
    textAlign(CENTER,CENTER);
    textSize(80);
    text(`MISSION FAILLED`,width/2,height/4);
    textSize(60);
    text(`you CRASHED back on earth and waisted billions of dollars!`,width/2,height/2,width/2);
	// noLoop();
    
}
function lost() {
	noStroke();
    fill(255);
    textFont('Courier');
    textAlign(CENTER,CENTER);
    textSize(80);
    text(`MISSION FAILLED`,width/2,height/4);
    textSize(60);
    text(`you launched the rocket into deep space billions of dollars!`,width/2,height/2,width/2);
	// noLoop();
    
}