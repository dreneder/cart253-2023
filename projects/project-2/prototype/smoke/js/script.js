/**
 * basically, a frankenstein
 * André Neder
 * 
 * 
 * 
 */

"use strict";

let earth;
let mars;
let earthSprite;
let marsSprite;
let travelShip;
let travelShipSprite;
let earthImg;
let marsImg;

let state = 'launch';

let stars = [];

let smoke = []; // array for the smoke

let spaceShipImg;
let stage2Img;
let rocketImg;

let lifted = false;

let camControl;

let spaceShip;
let stage2;
let rocket;

let speed = 0;

let blackToWhite;

let liftAngle = 0;

let altitude = 0;
let alt = 0;

let ground;

let groundDetail;

let bg = {
  r: 0,
  g: 0,
  b: 0
};

let dock1;
let dock2;

let testSprite;

let stageCounter = 0; // variable to keep each action separate

function preload() {
  spaceShipImg = loadImage('assets/images/starship.png')
  stage2Img = loadImage('assets/images/stage2.png')
  rocketImg = loadImage('assets/images/rocket.png')

  earthImg = loadImage("assets/images/earth.png");
	marsImg = loadImage("assets/images/mars.png");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  
  world.gravity.y = 10;



  
  stage2 = new Sprite(width/2,height-384);
  spaceShip = new Sprite(width/2,height-505);
  rocket = new Sprite(width/2,height-225);
  ground = new Sprite(width/2,height-75,width*4,150,'static');
  
  ground.color = '#00bd3f';
  
  spaceShip.img = spaceShipImg;
  stage2.img = stage2Img;
  rocket.img = rocketImg;
  
  rocket.scale = 0.2;
  spaceShip.scale = 0.2;
  stage2.scale = 0.2;
  // spaceShipImg.setAlpha(200);
  
  
  // ground.visible = false;
  // spaceShip.visible = false;
  // rocket.visible = false;
  // stage2.visible = false;
  dock1 = new GlueJoint(rocket,stage2);
  dock2 = new GlueJoint(stage2,spaceShip);

  let milkyway = 5000;
    for (let i = 0; i < milkyway; i++) {
        let x = random(0, width);
        let y = random(0, height);
        stars.push(createVector(x, y)); // Store star positions in the array
    }
  


	//creates earth at the middle of the canvas
	// as defined in class: size (or mass), position, velocity
	earth = new Mars (40000,-40000, 300);
	earth = new Earth (0,0, 300);
  travelShipSprite = new Sprite(-800,0);
  travelShipSprite.img = spaceShipImg;
  travelShip = new TravelShip(-800, 0, 100,100,50,travelShipSprite.rotation);
  
}


function draw() {
  if (state === 'launch') {
    launchDay();
  }
  else if (state === 'travel') {
    travel();
  }
  
}


function travel() {

 ground.visible = false;
  spaceShip.visible = false;
  rocket.visible = false;
  stage2.visible = false;
  dock1.visible = false;
  dock2.visible = false;

	background(0);
	displayStars(); // stars are always present
	

  earth.display();
	
	launcher.update();
	// launcher.display();
  
		// rocket.display();



	earth.display();
	
	launcher.update();
	launcher.display();
		travelShip.orbit(earth);
		travelShip.gravity();
		travelShip.display();
		travelShip.bounds();
		travelShip.recordOrbits();
		

}



function launchDay() {
  blackToWhite = map(altitude,40,100,0,255);

  // clear();
  if (altitude <= 40) {
    bg.r = 183;
    bg.g = 226;
    bg.b = 247;
  }
  else if (altitude > 40) {
    bg.r = map(altitude,40,100,183,30);
    bg.g = map(altitude,40,100,226,30);
    bg.b = map(altitude,40,100,247,50);
  }
  
  background(bg.r, bg.g, bg.b);
  handleInput();
  displayStars();
  // ground.draw();
  

  if (stageCounter === 0) {
      camera.x = stage2.x;
      camera.zoomTo(1);
      if (stage2.y <= height/2) {
        camera.y = stage2.y;
      }
    }
  else if (stageCounter === 1) {
      camera.x = spaceShip.x;
      camera.zoomTo(1.2);
      if (spaceShip.y+100 <= height/2) {
        camera.y = spaceShip.y+100;
      }
    }
    else if (stageCounter === 2) {
      camera.x = spaceShip.x;
      camera.zoomTo(1.5);
       if (spaceShip.y <= height/2) {
          camera.y = spaceShip.y;
          }
  }
  
  if (camera.y < 0-width/2) {
    ground.x = spaceShip.x;
  }

  dock1.visible = false;
  dock2.visible = false;
  
  launch(); // function to enable the stageCounter

    
  calcAltSpeed();
  
  push();
  translate(width/2-camera.x,height/2-camera.y+100);
  if (lifted === true) {
  // rotate(rocket.rotation);
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
}
pop();
  
  console.log(spaceShip.y);
  
  // spaceShip.draw();
  // stage2.draw();
  // rocket.draw();
  
  fill(blackToWhite);
  noStroke();
  textAlign(LEFT,CENTER);
  textSize(35);
  text('Altitude '+altitude+'km',30,50);
  // text('Speed '+speed+'km/h',30,90);
  if (lifted === false) {
    text('PRESS SPACE to LAUNCH and ARROW KEYS to CONTROL',30,130);
  } 
  if (altitude < 100 && stageCounter === 0) {
    text('Stage 1',30,90);
  }
  else if (altitude >= 100 && stageCounter === 0) {
    text('Stage 1 COMPLETE',30,90);
    text('PRESS SPACE',30,130);
  }
  else if (altitude <= 150 && stageCounter === 1) {
    text('Stage 2',30,90);
  }
  else if (altitude > 150 && stageCounter === 1) {
    text('Stage 2 COMPLETE',30,90);
    text('PRESS SPACE',30,130);
  }
  else if (altitude < 200 && stageCounter === 2) {
    text('Stablishing orbit',30,90);
  }
  else if (altitude >= 200 && stageCounter === 2) {
    text('LAUNCH COMPLETE',30,90);
    text('PRESS SPACE',30,130);
  }

}


function launch() { // controls the stages
  if (kb.presses('spacebar')) {
    if (stageCounter === 0 && lifted === false) {
      lifted = true;
    }
    else if (stageCounter === 0 && lifted === true && altitude > 10) {
      dock1.remove();
      stageCounter = 1;
    }
    else if (stageCounter === 1) {
      dock2.remove();
      stageCounter = 2;
    }
    else if (stageCounter === 2 && altitude > 200) {
      state = 'travel';
    }
  }
}

function handleInput() {
  let axisMax = map(altitude,0,200,0.1,30);

  if (stageCounter === 0) {
    if (kb.pressing('left')) {
    rocket.rotation -= axisMax;
    }
    else if (kb.pressing('right')) {
    rocket.rotation += axisMax;
    }
    if (kb.pressing('up')) {
      rocket.bearing = -90;
      rocket.applyForce(10000);
      }
    }
  else if (stageCounter === 1) {
    if (kb.pressing('left')) {
    stage2.rotation -= axisMax;
    }
    else if (kb.pressing('right')) {
    stage2.rotation += axisMax;
    }
    if (kb.pressing('up')) {
      stage2.bearing = -90;
      stage2.applyForce(10000);
      }
    }
  else if (stageCounter === 2) {
    if (kb.pressing('left')) {
    spaceShip.rotation -= axisMax;
    }
    else if (kb.pressing('right')) {
    spaceShip.rotation += axisMax;
    }
    if (kb.pressing('up')) {
      spaceShip.bearing = -90;
      spaceShip.applyForce(10000);
      }
    }
  
}

function calcAltSpeed() {
  
  alt = map(spaceShip.y,1375,-100000,0,200);
  altitude = round(alt);
}

function displayStars() {
  stroke(255,blackToWhite);
  for (let i = 0; i < stars.length; i++) {
  stroke(random(250,255));
      point(stars[i].x, stars[i].y);
  }
}
