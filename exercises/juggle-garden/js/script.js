

"use strict";




let earth;

let rocket;
let rockets = [];

let launcher;



function setup() {
createCanvas(windowWidth,windowHeight);

// rocketAngle = -HALF_PI;

//creates earth at the middle of the canvas
// as defined in class: size (or mass), position, velocity
earth = new Earth (width/2,height/2);

// rocket = new Rocket (width/2,height/2-150,0,0,70); // places the rocket just above earth

launcher = new Launcher ();

}


function draw() {
    background(0);

 

	for (let i = 0; i < rockets.length ; i++) {
		
		rockets[i].orbit(earth);
		rockets[i].newton();
		rockets[i].display();
	}


	launcher.update();
	launcher.display();
   
   
 
    earth.display();

// console.log(`rocket x`+round(rocket.pos.x)+` y `+round(rocket.pos.y));

}

