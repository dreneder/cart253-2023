
"use strict";


let screen = `title`; // sets first screen

// variables for classes 
let earth; 

let rocket;
let rockets = []; // array for the class

let ship;

let moon;

let dEarth;

// variables for images
let earthImg;

let rocketImg;

// variables to be used globaly
let liftoff = false;

let rocketAngle = undefined;


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

	moon = new Moon (width/2+500,height/2-500,10,10,50);

	rocket = new SpaceShip (width/2+300, height/2 -300, 3, 3,50,0);

}


function draw() {
	background(0);
	

	
	earth.display();
	moon.gravity();
	moon.orbit(earth);
	moon.display();
	
	rocket.gravity();
	rocket.handleInput();
	rocket.orbit(moon);
	rocket.orbit(earth);
	rocket.display();
	
	// console.log(rocket.pos.x);

}