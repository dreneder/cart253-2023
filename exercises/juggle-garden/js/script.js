/**
 * Sputnik
 * André Neder
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";



let earth;

let earthImg;

let rocket;

let rocketImg;

let rockets = [];

let launcher;

let liftoff = false;

let rocketAngle = 0;

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
earth = new Earth (width/2,height/2);

// rocket = new Rocket (width/2,height/2-150,0,0,10); // places the rocket just above earth

launcher = new Launcher ();

}


function draw() {
    background(0);

 
	earth.display();
	
	launcher.update();

	launcher.display();
   

	for (let i = 0; i < rockets.length ; i++) {
		
		rockets[i].orbit(earth);
		rockets[i].gravity();
		rockets[i].display();
		}
		if (liftoff === true) { 

	}
	else { 
		initialRocket();
	}
   
 

// console.log(`rocket x`+round(rocket.pos.x)+` y `+round(rocket.pos.y));

}

// I tried every possible way but this was the only way I could initially place a rocket
function initialRocket() {

let rocketAngle = atan2(mouseY -height/2+150, mouseX - width/2);

push();
translate(width/2,height/2-150,);
rotate(rocketAngle);
imageMode(CENTER);
image(rocketImg,0,0,120,40);
pop();
}