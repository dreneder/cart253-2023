/**
 * 2023 Roomba Simulator
 * André Neder
 * 
 * Folowing the success of Farming, Euro Truck and Surgeon Simulator, I'm glad to bring another mundane task to
 * the enterteinment of people which is: cleaning the house! In the 2023 Roomba Simulator you get to experience in
 * a bird's eye view, how it is to be a robot vacuum cleaner in service of lazy human beings.
 * In this simulation, you start at a charging base and you have to clean as many rooms as you can before you
 * battery runs off completely. After cleaning a room you get back to base for a little more charge.
 * If you run over an object like a sock or a toy, your suction motor's torque increases, so you consume more battery.
 *
 * You need to clean as many rooms as you can before your battery runs out, but if you don't clean the room enough it
 * doesn't count.
 * Don't raise your expectations too high, the objective of this game is literally to suck.
 * 
 */

"use strict";



// /**
//  * Description of setup
// */



// /**
//  * Description of draw()
// */


let roomba = {
  x: 0,
  y: 0,
  size: 120,
  angle: 0, // Facing right as default but the same as base at start
  speed: 0, // Start out not moving
  maxSpeed: 5, // Moving at 5 pixels per frame
  acceleration: 0.1, // How much velocity is gained when accelerating
  brake: -1 // instead of draging for long it stops the device almost imediately
};




let base = {
  x: undefined,
  y: undefined,
  sx: 10,
  sy: 50,
  angle: 0
};


let charger = {
  x: undefined,
  y: undefined,
  sx: 10,
  sy: 40,
  angle: 0
}

let lightAlpha = 0;

let dirtStart = false;

let hitBottom = false;
let hitBottomAlt = false;

let roombaOnBase = false;

let battery = 100;

let batteryColor = {
  r: 52,
  g: 206,
  b: 237
}

let batteryBar = undefined;

let batteryLevel = undefined;

let clear = undefined;

const DIRT_AMOUNT = 5000;
let dirts = [];

let hitFurn = false;

let catImage = [];

let catSound = [];

let numMedia = 6;

let storeImage;

let storeSound;


/**
 * Importing images and sounds into the program
*/
function preload() {
  for (let i = 0; i < numMedia; i++) {
    let loadedCatImg = loadImage(`assets/images/cat${i}.png`);
  catImage.push(loadedCatImg);
  }

}


/**
 * sets a few initial parameters of the simulation
 */
function setup() {
  createCanvas(windowWidth,windowHeight);
  basePosition();
  startPosition();
  
  
  startDirt();
  
  
  
    

  }
  
function draw() {
    background(138, 69, 4);
    
    handleInput();
    move();
    wrap();
    baseLimit();
    batteryCharge();
    onBase();
    cleared();
    display();
    
  }
  
function handleInput() {
    if (keyIsDown(LEFT_ARROW)) {
      // Turn LEFT if the LEFT arrow is pressed
      roomba.angle -= 0.05;
    }
    else if (keyIsDown(RIGHT_ARROW)) {
      // Turn RIGHT if the RIGHT arrow is pressed
      roomba.angle += 0.05;
    }
  
    if (keyIsDown(UP_ARROW)) {
      // Thrusts the roomba forward when UP ARROW is pressed
      roomba.speed += roomba.acceleration;
      roomba.speed = constrain(roomba.speed, 0, roomba.maxSpeed);
    }
    // reverses when down arrow is pressed
    else if (keyIsDown(DOWN_ARROW)) {
      roomba.speed -= roomba.acceleration;
      roomba.speed = constrain(roomba.speed, -roomba.maxSpeed/4, 0);
    }
    else {
      // reduces the device speed and stops it
      roomba.speed += roomba.brake;
      roomba.speed = constrain(roomba.speed, 0, roomba.maxSpeed);
    }
    if (keyIsDown(32)) {
      // spacebar to finish the level
      
    }
   
  }
  
function move() {
    // function unchanged from polar coordinates tutorial
    // The magical formula!
    let vx = roomba.speed * cos(roomba.angle);
    let vy = roomba.speed * sin(roomba.angle);
  
    // Move the roomba with the calculated velocities
    roomba.x += vx;
    roomba.y += vy;

    }
  
  // function modified to limit the roomba's position within the canvas
function wrap() {
    if (roomba.x >= width + -roomba.size/2) {
      roomba.x = width + -roomba.size/2;
    }
    else if (roomba.x <= 0 + roomba.size/2) {
      roomba.x = 0 + roomba.size/2;
    }
  
    if (roomba.y >= height + -roomba.size/2) {
      roomba.y = height + -roomba.size/2;
    }
    else if (roomba.y <= 0 + roomba.size/2) {
      roomba.y = 0 + roomba.size/2;
    }
  }

  function startPosition() {
      roomba.x = base.x;
      roomba.y = base.y;
      roomba.angle = base.angle-HALF_PI;
  }

function basePosition() { // determines base position randomly
  
  base.x = random(0, width);
  base.y = random(0, height);
  
  

  // the followings assign the position of the base, based on the closest wall
  let distCenterX = dist(base.x,0,width/2,0);
  let distCenterY = dist(0,base.y,0,height/2);
  
  if (distCenterX >= distCenterY) { // determines if that it's close to a X wall
    if (base.x <= width/2) { // determines which X wall is closer 
      base.x = 0 + 35; // attaches it to that wall
      base.angle = PI+HALF_PI; // turns it to the correct angle
      base.y = constrain(base.y,0+roomba.size/2*1.5,height-roomba.size/2*1.5); // limits the Y position so there's is room for the roomba to dock
      charger.x = base.x;
      charger.y = base.y;
      charger.sx = 50;
      charger.sy = 10;
    }
    else {
      base.x = width - 35;
      base.angle = HALF_PI;
      base.y = constrain(base.y,0+roomba.size/2*1.5,height-roomba.size/2*1.5);
      charger.x = base.x - charger.sy;
      charger.y = base.y + charger.sx;
      charger.sx = 50;
      charger.sy = 10;
    }
  }
  else { // does all the same as above but in case it is closer to a Y wall
    if (base.y <= height/2) {
      base.y = 0 + 35;
      base.angle = 0;
      base.x = constrain(base.x, 0+roomba.size/2*1.5,height-roomba.size/2*1.5);
      charger.x = base.x;
      charger.y = base.y;
    }
    else {
      base.y = height - 35;
      base.angle = PI;
      base.x = constrain(base.x, 0+roomba.size/2*1.5,height-roomba.size/2*1.5);
      charger.x = base.x;
      charger.y = base.y - charger.sy;
    }
  }
  // console.log("base.x "+base.x+", base.sx "+base.sx+", base.angle"+base.angle+", base.y "+base.y+", base.sy "+base.sy);
}

function baseLimit() {
// function defined so that the roomba won't hit the whole base and be in the right spot for charging
// variables declared for line detection
hitBottom = collideLineCircle(base.x-30,base.y+5,base.x+40,base.y+5,roomba.x,roomba.y,roomba.size);
hitBottomAlt = collideLineCircle(base.x-30,base.y-5,base.x+40,base.y-5,roomba.x,roomba.y,roomba.size);

// if statement avoids overlapping by stablishing absolute position when roomba tries to pass
if (base.angle === 0 &&  
  hitBottom === true &&
      roomba.y + roomba.size/2 >= base.y+5) {
    roomba.y = base.y+5 + roomba.size/2;
  }
else if (base.angle === HALF_PI &&  // adjusted to all the possible angles
  hitBottom === true &&
    roomba.x + roomba.size/2 >= base.x-5) {
  roomba.x = base.x-5 - roomba.size/2;
}
else if (base.angle === PI &&  
  hitBottomAlt === true &&
    roomba.y + roomba.size/2 >= base.y-5) {
  roomba.y = base.y-5 - roomba.size/2;
}
else if (base.angle === PI+HALF_PI &&  
  hitBottomAlt === true &&
    roomba.x - roomba.size/2 <= base.x+5) {
  roomba.x = base.x+5 + roomba.size/2;
}
}

function startDirt() { //setting up function so that dirt does not overlap roomba or base at start

// pippin's blessings:
for (let i = 0; i < DIRT_AMOUNT; i++) {
  let dirt = {
    x: random(0, width),
    y: random(0, height),
    size: 2
    }
    // and my mad modz
     dirtStart = collideCircleCircle(roomba.x,roomba.y,roomba.size+5,dirt.x,dirt.y,dirt.size+5);

if (dirtStart === true) {
dirt.x = random(0, width);
dirt.y = random(0, height);
}
  dirts.push(dirt);
}

}


function batteryCharge() { // the mechanics of the battery
  // battery goes down according to the speed
 let batteryDown = map(roomba.speed,0,5,0,0.02);
// battery goes down also if speed is reversed
 if (batteryDown < 0) {
  batteryDown = -batteryDown;
 }
if (roomba.speed > 0.1  || roomba.speed < 0) { // battery starts going down at 0.1 speed
  battery = battery - batteryDown;
 }
 // when battery is 30% or less the max speed starts going down accordingly to 1 and changes color to red
if (battery <= 30) { 
  roomba.maxSpeed = map(battery,0,30,1,5);
  batteryColor.r = 217;
  batteryColor.g = 12;
  batteryColor.b = 9;
 }
 // roomba stops if battery is over
if (battery <= 0) {
  roomba.maxSpeed = 0;
 }
 else {
  batteryColor.r = 52;
  batteryColor.g = 206;
  batteryColor.b = 237;
 }

batteryLevel = round(battery); // battery level is rounded for diplay
batteryBar = map(batteryLevel,0,100,0,90); // reduces the battery bar
}

function onBase() {
  // function to know if the roomba is on base so the suer can move to another level
  let roombaOnBase = false;
  
  roombaOnBase = collideRectCircle(charger.x,charger.y,charger.sx,charger.sy,roomba.x,roomba.y,roomba.size);
  if (roombaOnBase === true) {
    lightAlpha = 255; // light stays on when at base
  }
  else {
    lightAlpha = 0;
  }
}


// function to calculate percentage of the room cleaned
function cleared() {
let clean = map(dirts.length,0,DIRT_AMOUNT,100,0); //converts amount of dirt into percentage
clear = round(clean); //rounds the percentage

if (clean <= 1.5) {
  clear = 0; // I really don't know how to name stuff, lol
}

console.log("clear "+clear);
}

  
function display() {

   
    // drawing the base
    push();

    translate(base.x,base.y);
    rotate(base.angle);
    noStroke();
    rectMode(CENTER);
    fill(0);
    rect(5, 30, 50, 70, 0, 0, 15, 15);
    fill(255,50);
    rect(5, 30, 40, 60, 0, 0, 15, 15);
    fill(0);
    rect(5, -15, 70, 40, 0, 0, 15, 15);
    fill(255,100);
    rect(5, -15, 60, 30, 0, 0, 13, 13);
    fill (52, 206, 237, lightAlpha);
    noStroke(); // lightning
    beginShape();
    vertex (-10, -14);
    vertex (3, -15);
    vertex (3, -10);
    vertex (20, -16);
    vertex (7, -15);
    vertex (7, -22);
    endShape(CLOSE);
    pop();
   
    // drawing the roomba
    push();
    noStroke();
    translate(roomba.x, roomba.y); // translated to the roomba's centre
    rotate(roomba.angle);  // rotate by its angle
    fill(50); // Draw the roomba (at 0,0 because we translated)
    ellipse(0, 0, roomba.size);
    // shapes and details on the roomba
    stroke(150,150);
    strokeWeight(10);
    noFill();
    ellipse(0, 0, roomba.size-13);
    strokeWeight(15);
    stroke(64, 255, 236, 180);
    arc(0,0,roomba.size-16,roomba.size-16,-1.5,1.5);
    fill(64, 255, 236);
    noStroke();
    ellipse(-20,-20,5);
    ellipse(20,-20,5);
    ellipse(-20,20,5);
    ellipse(20,20,5);
    textAlign(CENTER,CENTER);
    textSize(20);
    rotate(HALF_PI);
    text('p5',0,0);
    pop();





  
    // drawing the dirt (thanks Pippin)  
    for (let i = 0; i < dirts.length; i++) {
      let dirt = dirts[i];
      let d = dist(roomba.x, roomba.y, dirt.x, dirt.y);
      if (d < dirt.size/2 + roomba.size/2) {
        dirts.splice(i, 1);
      }
    }
    for (let i = 0; i < dirts.length; i++) {
      let dirt = dirts[i];
      noStroke();
      fill(200, 180, 160);
      ellipse(dirt.x, dirt.y, dirt.size);
    }
    
    if (dirts.length === 0) {
      console.log("");
    }
    

    //drawing a battery for level
    noStroke();
    fill(170)
    rectMode(CORNER);
    rect(15,15,100,45);
    rect(115,25,12,25);   
    fill(0);
    rect(20,20,90,35);
    fill(batteryColor.r, batteryColor.g, batteryColor.b); // changes the battery colour
    rect(20,20,batteryBar,35); // battery bar
    textSize(30);
    textAlign(CENTER,CENTER);
    noStroke();
    push();
    blendMode(EXCLUSION);
    fill(255);
    text(batteryLevel+`%`,65,40);
    pop();

    // drawing the clean level
    fill(255);
    text('Clean: '+clear+`%`,width-90,40);
    

   
  }







