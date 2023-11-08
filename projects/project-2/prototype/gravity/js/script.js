/**
 * Space prototype
 * André Neder
 * 
 * This is my attempt to write some of the code for my final project in which the user should
 * be able to control the rocket using the booster but still suffer the effects from gravity and eventually
 * use it to increase its' speed.
 * 
 * I stated this code from the object oriented programming activity and 
 * based gravity code and calculations on a project by Michael Ruppe: https://github.com/michaelruppe/art/tree/master/solar-system-p5
 * 
 */

"use strict";




let earth;

let rocket;

let moon;

let gravity = 1;

let destabilise = 0.2;

let rocketAngle = 0;

// declaring these variables here in attempt to change them
let r;
let theta;
let moonPos;
let rocketPos;

let moonVel
let rocketVel;

function setup() {
createCanvas(windowWidth,windowHeight);

// rocketAngle = -HALF_PI;

//creates earth at the middle of the canvas
// as defined in class: size (or mass), position, velocity
earth = new Earth(300, createVector(0,0), createVector(0,0));



// assings a random distance for object in orbit
r = random(earth.r, min(windowWidth/2, windowHeight/2));
theta = random(TWO_PI); // assingns a random angle
moonPos = createVector(r*cos(theta), r*sin(theta)); // defines orbit position acording to angle
rocketPos = createVector(earth.r*cos(0), earth.r*sin(0)); // defines orbit position acording to angle

// defines the velocity of object in orbit
moonVel = moonPos.copy(); // copies the vector of the moon position
rocketVel = rocketPos.copy(); // copies the vector of the moon position
moonVel.rotate(HALF_PI); // sets direction to 90 degrees clockwise (-HALF_PI for the other direction)
rocketVel.rotate(HALF_PI); // sets direction to 90 degrees clockwise (-HALF_PI for the other direction)
// sets the magnetude which makes the object fall into orbit instead of just falling to earth according te formula here: https://en.wikipedia.org/wiki/Orbital_speed
moonVel.setMag(sqrt(gravity * earth.mass/moonPos.mag()));
rocketVel.setMag(sqrt(gravity * earth.mass/rocketPos.mag()));
rocketVel = createVector(0,0);
// moonVel.mult(random(1 - destabilise, 1 + destabilise));
// rocketVel.mult(random(1 - destabilise, 1 + destabilise));
moon = new Earth (70, moonPos, moonVel); // places the object just like the earth
rocket = new Rocket (10, rocketPos, rocketVel, rocketAngle); // places the object just like the earth

}


function draw() {
    background(0);

    translate(width/2,height/2);
    earth.attract(moon);
    earth.attract(rocket);
    rocket.move();
    moon.update();
    rocket.update();
    rocket.handleInput();
    moon.display();
    rocket.display();
    earth.display();

console.log(`rocket x`+round(rocket.pos.x)+` y `+round(rocket.pos.y));

}

