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

	//creates earth at the middle of the canvas
	// as defined in class: size (or mass), position, velocity
	earth = new Earth (width/2,height/2, 300);
	
	launcher = new Launcher ();
	
	
}


function draw() {
	background(0);
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
		camera.x = rocket.x;
		camera.y = rocket.y;
		}

		

}







