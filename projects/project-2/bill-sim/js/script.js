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

let distEarth;
let distMoon;
let distMars;

let refEarth;
let refMoon;
let refMars;

let stars = [];
let border = 100;

let starVelX = 0;
let starVelY = 0;

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
	
	for (let i = 0; i < 2000; i++) {
		stars.push(new Star());
	  }
	  
	  
	allSprites.autoCull = false;

	spaceShip = new Sprite(-500,-500);
	earth = new Sprite(0,0,1000);
	mars = new Sprite(20000,-20000,2030);
	moon = new Sprite(-2500,0,1300);
	
	
	earth.img = earthImg;
	earth.collider = 'static';
	earth.scale = 1;
	
	mars.img = marsImg;
	mars.collider = 'static';
	mars.scale = 0.5;
	
	
	moon.collider = 'dynamic';
	moon.img = moonImg;
	moon.scale = 0.075;
	moon.vel.y = -3.2;
	
	spaceShip.img = spaceShipImg;
	spaceShip.scale = 0.05;
	spaceShip.vel.x = 2.5;
	spaceShip.vel.y = -2.5;
	spaceShip.rotation = -30;


	refEarth = new Sprite(0,0,100,15);
	refEarth.visible = false;


}


function draw() {
	background(0);

	starVelX = spaceShip.vel.x;
	starVelY = spaceShip.vel.y;

	for (const star of stars) {
		star.display();
	  }

	camera.on();

	camera.zoom = 1;
	 camera.x = spaceShip.x;
	camera.y = spaceShip.y;

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

	if (kb.pressed('space')) {
		spaceShip.vel.x = 0;
		spaceShip.vel.y = 0;
	}

	// if (spaceShip.colliding(moon)) {
	// 	moon.collider = 'static';
	// 	moon.vel.x = 0;
	// }
	// else {
	// 	moon.collider = 'dynamic';
	// 	moon.vel.x = 5;
	// }
	distEarth = dist(spaceShip.x,spaceShip.y,earth.x,earth.y);
	distMoon = dist(spaceShip.x,spaceShip.y,moon.x,moon.y);
	distMars = dist(spaceShip.x,spaceShip.y,mars.x,mars.y);
	

	spaceShip.attractTo(earth,map(distEarth,500,3000,500,0,true));
	spaceShip.attractTo(mars,map(distMars,500,3000,500,0,true));
	

	moon.attractTo(earth,500);

	
	spaceShip.debug = mouse.pressing();
	
	// console.log('sX '+round(spaceShip.vel.x),'sY '+round(spaceShip.vel.y)+'X '+round(spaceShip.x),'Y '+round(spaceShip.y));
	
	
	


	camera.off();
	refEarth.draw();
	refEarth.x = width/2;
	refEarth.y = height/9*8;
	angleMode(DEGREES);
	let angle = atan2(earth.y-spaceShip.y-refEarth.y/2,earth.x-spaceShip.x-refEarth.x/2);
	refEarth.rotate(angle);
	
	push();
	translate(width/2,height/9*8);

	rectMode(CENTER);
	rotate(angle);
	fill(255);
	rect(0,0,100,15);
	fill(255,0,0)
	ellipse(50,0,20);

	console.log(angle);
	pop();



}







