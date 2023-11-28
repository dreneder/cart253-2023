/**
 * smoke experiment
 * André Neder
 * 
 * 
 * 
 */

"use strict";


let smoke = []; // array for the smoke


let spaceShipImg;
let stage2Img;
let rocketImg;

let cameraPan;

let spaceShip;
let stage2;
let rocket;


let ground;

let groundDetail;

let dock1;
let dock2;

let testSprite;

let stageCounter = 0; // variable to keep each action separate

function preload() {
  spaceShipImg = loadImage('assets/images/starship.png')
  stage2Img = loadImage('assets/images/stage2.png')
  rocketImg = loadImage('assets/images/rocket.png')
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  
  stage2 = new Sprite(width/2,height-384);
  spaceShip = new Sprite(width/2,height-505);
  rocket = new Sprite(width/2,height-225);
  ground = new Sprite(width/2,height-75,width,150,'static');
  
  ground.color = '#00bd3f';
  
  
  for (let i = 0; i < 500; i++) {
    groundDetail = new Sprite(random(0,width),
    random(height,ground.y-height/16),
    1,1, 'static')
  }
  
  spaceShip.img = spaceShipImg;
  stage2.img = stage2Img;
  rocket.img = rocketImg;
  rocket.scale = 0.2;
  spaceShip.scale = 0.2;
  stage2.scale = 0.2;
  // spaceShipImg.setAlpha(200);
  
  dock1 = new GlueJoint(rocket,stage2);
  dock2 = new GlueJoint(stage2,spaceShip);
  
  let myColor = color(255,0,0,150);
  
  testSprite = createSprite(width/2,height/2);
  testSprite.color = myColor;
 
  
  // rocket.visible = false;
  // ground.visible = false;
}

function draw() {
  clear();
  background(183, 226, 247);
  

  launch(); // function to enable the stageCounter

  
  
  camera.zoomTo(1);
  // if (rocket.position.y <= height/2) {
    camera.y = rocket.y;

  // }
  
  
  push();
  translate(width/2-rocket.position.x,height/2-rocket.position.y+100); 
  
  
  
  
  // rocket.x = width/2; // defining rocket x position (won't change)
  // if (stageCounter >= 1) { // once stages advance
  for (let i=0; i<5; i++){
    let p = new Particle(1, 1, rocket.position.x, rocket.position.y); // loop creates particles
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
  
  
  console.log(rocket.position.y);
  
  pop();
  

  
}

function launch() { // controls the stages
  if (keyIsDown(UP_ARROW)) {
    rocket.vel.y = -10;
  }
}

    
