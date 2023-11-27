/**
 * smoke experiment
 * André Neder
 * 
 * 
 * 
 */

"use strict";


let smoke = []; // array for the smoke

let ground = {
  x: 0,
  y: 0
};

let rocket = { // rocket variable
  x: 0,
  y: 0,
  speed: 0
};

let stage1 = {
  x: 0,
  y: 0
};

let stage2 = {
  x: 0,
  y: 0
};

let rocketSprite;
let groundSprite;

let stageCounter = 0; // variable to keep each action separate

function setup() {
  createCanvas(windowWidth, windowHeight);
  rocket.x = width/2; // initial rocket y position on the ground
  rocket.y = height/4*3; // initial rocket y position on the ground
  ground.x = width/2;
  ground.y = height/16*15;

  
  
}

function draw() {
  background(183, 226, 247);


  translate(width/2-rocket.x,height/2-rocket.y);
  // drawing a ground at the bottom
  noStroke();
  fill(0,200,0);
  rectMode(CENTER);
  rect(ground.x,ground.y,width,height-height/8*7);
  
  
  launch(); // function to enable the stageCounter

  // rocket.x = width/2; // defining rocket x position (won't change)
  // if (stageCounter >= 1) { // once stages advance
  for (let i=0; i<5; i++){
    let p = new Particle(1, 1, rocket.x, rocket.y); // loop creates particles
    smoke.push(p);
    smoke[i].liftOff();
  }
// }
  
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
    rect(rocket.x,rocket.y,60,400);

    // console.log(stageCounter);
    
  camera.y = rocket.y;

    }

function launch() { // controls the stages
  if (keyIsDown(UP_ARROW)) {
    rocket.y -= 10;
  }
}

    
