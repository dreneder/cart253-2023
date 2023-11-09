/**
 * smoke experiment
 * André Neder
 * 
 * 
 * 
 */

"use strict";


let smoke = []; // array for the smoke

let rocket = { // rocket variable
  x: 0,
  y: 0,
  speed: 0
};

let stageCounter = 0; // variable to keep each action separate

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  rocket.y = height/8*7; // initial rocket y position on the ground
  
}

function draw() {
  background(255);

  // drawing a ground at the bottom
  noStroke();
  fill(0,200,0);
  rect(0,height/8*7,width,height-height/8*7);
  
  launch(); // function to enable the stageCounter

  rocket.x = width/2; // defining rocket x position (won't change)
  if (stageCounter >= 1) { // once stages advance
  for (let i=0; i<5; i++){
    let p = new Particle(1, 1, rocket.x, rocket.y); // loop creates particles
    smoke.push(p);
    smoke[i].liftOff();
  }
}
  
  for (let i = smoke.length-1; i >= 0; i--) { // loop moves the particles 
    smoke[i].move();
    smoke[i].display();
    
    if(smoke[i].finished()) { // splice when alpha reaches 0
      smoke.splice(i, 1);
    }
  } 
    // draws a state of the art rocket
    strokeWeight(5);
    stroke(40);
    fill(250);
    rect(rocket.x-30,rocket.y,60,-200);


    noStroke();
    fill(0);
    textSize(20);
    text(`Press ANY KEY to start booster and CLICK for liftoff`,40,40);

    console.log(stageCounter);
    
    }

function launch() { // controls the stages
  if (keyIsPressed && stageCounter < 1) {
    stageCounter = 1;
  }
  if (mouseIsPressed && stageCounter === 1) {
    stageCounter = 2;
  }
   if (stageCounter === 2 ) {
    rocket.speed += 0.01;
    rocket.y -= rocket.speed;
  }
}

    
