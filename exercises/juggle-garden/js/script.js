/**
 * Sputnik
 * André Neder
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";


let screen = `title`; // sets first screen

let earth;

let earthImg;

let rocket;

let rocketImg;

let rockets = [];

let launcher;

let liftoff = false;

let rocketAngle = undefined;

let launched = false;

let stars = [];


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
	earth = new Earth (width/2,height/2);
	
	launcher = new Launcher ();
	
	
}


function draw() {
	background(0);
	displayStars(); // stars are always present
	
 
	earth.display();
	
	launcher.update();

	launcher.display();
   

	if (liftoff === true) { 
			for (let i = 0; i < rockets.length ; i++) {
				
				rockets[i].orbit(earth);
				rockets[i].gravity();
				rockets[i].display();
				}
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

// keeping it simple for the stars
function displayStars() {
    stroke(255);
    for (let i = 0; i < stars.length; i++) {
		stroke(random(250,255));
        point(stars[i].x, stars[i].y);
    }
}