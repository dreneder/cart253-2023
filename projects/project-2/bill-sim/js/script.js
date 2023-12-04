/**
 * 2024 Billionaire Simulator: Mission to Mars
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

/**
 * loading images for the sprites
*/
function preload() {
	earthImg = loadImage("assets/images/earth.png");
	moonImg = loadImage("assets/images/moon.png");
	marsImg = loadImage("assets/images/mars.png");
	spaceShipImg = loadImage('assets/images/starship.png');

}


/**
 * inserting all sprites and dclaring a few parameters
*/
function setup() {
	createCanvas(windowWidth,windowHeight);


	spaceShip = new Sprite(2500,-2500);
	earth = new Sprite(0,0,1000);
	mars = new Sprite(4000,-4000,2030);
	moon = new Sprite(0,-2000,1300);
	
	earth.img = earthImg;
	earth.collider = 'static';
	earth.scale = 1;
	
	mars.img = marsImg;
	mars.collider = 'static';
	mars.scale = 0.5;
	
	moon.collider = 'dynamic';
	moon.img = moonImg;
	moon.scale = 0.075;
	moon.vel.x = 5;
	
	spaceShip.img = spaceShipImg;
	spaceShip.scale = 0.1;
}


function draw() {
	background(0);

	if (kb.pressing('left')) spaceShip.rotation -= 3;
	else if (kb.pressing('right')) spaceShip.rotation += 3;
	
	
	if (kb.pressing('up')) {
	let xForce = cos(spaceShip.rotation-90) * 500;
    let yForce = sin(spaceShip.rotation-90) * 500;
    spaceShip.applyForce(createVector(xForce, yForce));
	}
	if (kb.pressing('down')) {
	let xForce = cos(spaceShip.rotation+90) * 500;
    let yForce = sin(spaceShip.rotation+90) * 500;
    spaceShip.applyForce(createVector(xForce, yForce));
	}

	// if (spaceShip.colliding(moon)) {
	// 	moon.collider = 'static';
	// 	moon.vel.x = 0;
	// }
	// else {
	// 	moon.collider = 'dynamic';
	// 	moon.vel.x = 5;
	// }

	moon.attractTo(earth,2000);
	

	mars.debug = mouse.pressing();


	camera.zoom = 0.5;
	camera.x = spaceShip.x;
	camera.y = spaceShip.y;

	console.log('X '+spaceShip.x,'Y '+spaceShip.y);
		

}







