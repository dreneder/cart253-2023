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



let spaceShip;
let stage2;
let rocket;


let ground;

let groundDetail;

let stageCounter = 0; // variable to keep each action separate

function preload() {
  spaceShipImg = loadImage('assets/images/starship.png')
  stage2Img = loadImage('assets/images/stage2.png')
  rocketImg = loadImage('assets/images/rocket.png')
}


function setup() {
  createCanvas(windowWidth, windowHeight);

  rocket = new Sprite(width/2,height/4*3);
  ground = new Sprite(width/2,height/16*15,width,height-height/8*7,'static');
  
  ground.color = '#00bd3f';


  for (let i = 0; i < 500; i++) {
  groundDetail = new Sprite(random(0,width),
                            random(height,ground.y-height/16),
                            1,1, 'static')
}

  rocket.img = spaceShipImg;
  rocket.scale = 0.5;

  
  
  // rocket.visible = false;
  // ground.visible = false;
}

function draw() {
  background(183, 226, 247);

  launch(); // function to enable the stageCounter

  
  
  camera.zoomTo(0.5);
  if (rocket.position.y <= height/2) {
    camera.y = rocket.y;
  }
  
  
  push();
  translate(camera.position.x,camera.position.y);
  
  
  
  
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
  
  
  console.log(rocket.position.y);
  
  pop();
  
}

function launch() { // controls the stages
  if (keyIsDown(UP_ARROW)) {
    rocket.vel.y = -10;
  }
}

    
