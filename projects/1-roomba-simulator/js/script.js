/**
 * 2023 Roomba Simulator
 * André Neder
 * 
 * Folowing the success of Farming, Euro Truck and Surgeon Simulator, I'm glad to bring another mundane task to
 * the enterteinment of people which is: cleaning the house! In the 2023 Roomba Simulator you get to experience in
 * a bird's eye view, how it is to be a robot vacuum cleaner in service of lazy human beings.
 * In this simulation, you start at a charging base and you have to clean as many rooms as you can before you
 * battery runs off completely. After cleaning a room you get back to base for a little more charge.
 * If a ca catches you he will get a free ride a mount on you, which will make you slower.
 * You need to clean as many rooms as you can before your battery runs out, but if you don't clean the room enough it
 * doesn't count.
 * Don't raise your expectations too high, the objective of this game is literally to suck!
 * 
 */

"use strict";







let screen = `title`;


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
};

let cleanColor = {
  r: 255,
  g: 255,
  b: 255
};

let batteryBar = undefined;

let batteryLevel = undefined;

let charged = 100;

let clear = undefined;

const DIRT_AMOUNT = 5000;
let dirts = [];

let hitFurn = false;

let cats = [];

let catImage = [];

let catSound = [];

let numMedia = 5;

let storeImage;

let storeSound;

let catUber = false;

let catAmount = 0;

let coverCat = undefined;

let endCat = undefined;

let showInstruction = 0;

let meowd = false;

let roomCounter = 0;

let endPhrases = [
  `you suck! which in this case is good! come back soon, it's too little space for so many cats!`,
  `congratulations, little robo-cleaner! you're sucking up dirt and sass in equal measure! keep those wheels turning!`,
  `you're zapping dirt and grime with style. don't forget to leave a smudge here and there, it adds character to the clean`,
  `it's almost endearing how you manage to miss the same spot every time. keep failing spectacularly!`,
  `you missed a spot the size of your circuit board, but hey, who's counting? oh, right, I am. keep trying, robo-buddy`
];

let endPhrase = undefined;

/**
 * Importing images and sounds into the program
*/
function preload() {

  coverCat = loadImage(`assets/images/cover.png`);

  endCat = loadImage(`assets/images/endCover.png`);
  
  for (let i = 0; i < numMedia; i++) {
    let loadedCatImg = loadImage(`assets/images/cat${i}.png`);
  catImage.push(loadedCatImg);
  }
  for (let i = 0; i < numMedia; i++) {
    let loadedCatSnd = loadSound(`assets/sounds/cat${i}.wav`);
  catSound.push(loadedCatSnd);
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
  
  storeImage = random(catImage);// selecting a random cat image and sound
  storeSound = random(catSound);
  
  // creating cats at random
  for (let i = 0; i < numMedia; i++) {
    cats[i] = createCat(random(0, width), random(0, height),[i]);
  }
  endPhrase=random(endPhrases);
    
  }
  
  // /**
//  * inserting most of the code inside simulation but it is divided in states
// */
function draw() {
  
    background(138, 69, 4);
   
    if (screen === `title`) {
      titleScreen();
    }
    else if (screen === `simulation`) {
      simulation();
    }
    else if (screen === `stageUP`) {
      nextStage();
    }
    else if (screen === `ending`) {
      ending();
    }

    // console.log("rooms " + roomCounter);
  }
  function titleScreen() {
    

    noStroke();
    fill(255);
    textFont('Courier');
    textAlign(CENTER,CENTER);
    textSize(20);
    text(`CLICK at the screen for instructions`,width/2,height/6*5-60)
    textSize(50);
    text(`press SPACE to start`,width/2,height/6*5)
    
    
    fill(255);
    strokeWeight(10);
    stroke(255,0,0);
    textFont('Impact');
    textAlign(RIGHT,CENTER);
    textSize(100);
    text(`2023 Roomba Simulator`,width/3,height/3,200)
    
    
    push();
    translate(width/2*1.5,height/2);
    rotate(0.5);
    imageMode(CENTER);
    image(coverCat,0,0,912,600);
    pop();
    
   

    noStroke();
    fill(255, showInstruction);
    rectMode(CENTER);
    rect(width/2,height/2,700,700);
    
    noStroke();
    fill(138, 69, 4, showInstruction);
    textFont('Courier');
    textAlign(CENTER,CENTER);
    textSize(20);
    text(`*WELCOME TO 2023 ROOMBA SIMULATOR*\n\n
ROOMBA CONTROLS\n
UP ARROW - Move forward\n
DOWN ARROW - move backwards\n
LEFT ARROW / RIGHT ARROW - stear\n\n
OBJECTIVES\n
clean as many rooms as you can\n
a room is only considered clean at 70%\n
to move to the next room return to the base and press SPACE\n
if you run out of battery you DIE\n
BEWARE OF THE CATS`
,width/2,height/2-300,650);
}

function nextStage() {
let batteryRound = round(charged);

let batteryShow = batteryLevel + charged;

    noStroke();
    fill(255);
    textFont('Courier');
    textAlign(CENTER,CENTER);
    textSize(150);
    text(`ROOM CLEAR`,width/2,height/4);
    textSize(30);
    text(`your battery will be recharged to `+batteryShow+`% according to how much room you left uncleaned`,width/2-350,height/2,700);
    textSize(40);
    text(`press SPACE to advance to the next room`,width/2,height/4*3)
    
    
  }
  
  
  function ending() {
     
  
    noStroke();
    fill(255);
    textFont('Courier');
    textAlign(CENTER,CENTER);
    textSize(100);
    text(`GAME OVER`,width/2,height/5);
    textSize(30);
    text(`press SPACE to play again`,width/2,height/5*4);
    if (roomCounter === 0) {
      textSize(40);
      text(`you didn't clean ANY room!!!`,width/2,height/4*1.1);
      textSize(25);
      text(`you are a disgrace to the machines and the Skynet will laugh at you if you don't end up in the garbage before!`,width/6,height/3*1.3, 500);
    }
    else if (roomCounter === 1) {
      textSize(40);
      text(`you cleaned `+roomCounter+` room`,width/2,height/4*1.1);
      textSize(25);
      text(endPhrase,width/6,height/3*1.3, 500);
    }
      else {
        textSize(40);
        text(`you cleaned `+roomCounter+` rooms`,width/2,height/4*1.1);
        textSize(25);
        text(endPhrase,width/6,height/3*1.3, 500);
      }
    
  
    
   

    imageMode(CENTER);
    image(endCat,width/3*2,height/2*1.2,800,800);
    
    

}


  function simulation() {

    
    handleInput();
    move();
    wrap();
    baseLimit();
    batteryCharge();
    onBase();
    cleared();
    display();
    getCatAmount();
    meow();

 
    charged = map(clear,70,100,0,80);

    if (battery <= 0) {
      screen = `ending`;
    }
         
     
      
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
      // changes the color of the clean level
    
      if (roombaOnBase === true && clear < 70) { // to red if it's less than 70 and user tries to advance level
        cleanColor.r = 255;
        cleanColor.b = 0;
        cleanColor.g = 0;
      }
    }
    else if (clear >= 70) { // if achieved amount for next level
      cleanColor.r = 0;
      cleanColor.g = 255;
      cleanColor.b = 0;
    }
     else { // white as defaul
        cleanColor.r = 255;
        cleanColor.b = 255;
        cleanColor.g = 255;
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
 else {
  batteryColor.r = 52; 
  batteryColor.g = 206;
  batteryColor.b = 237;
 }
 // roomba stops if battery is over
if (battery <= 0) {
  roomba.maxSpeed = 0;
 }

batteryLevel = round(battery); // battery level is rounded for diplay
batteryBar = map(batteryLevel,0,100,0,90); // reduces the battery bar
}

function onBase() {
  // function to know if the roomba is on base so the suer can move to another level
  
  
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

// console.log("clear "+clear);
}



function createCat(x, y, imageIndex, uber) {
  let cat = {
    x: x,
    y: y,
    size: 150,
    vx: 0,
    vy: 0,
    speed: 0,
    imageIndex: imageIndex,
    uber: 0
  };
  return cat;
}

function moveCat(cat) {
  // I modified the code from the arrays tutorial and added a few more things
    let change = random(0, 1);
  if (change < 0.01) {
    cat.speed = random(0, 5);
    cat.vx = random(-cat.speed, cat.speed);
    cat.vy = random(-cat.speed, cat.speed);
  }

 // moves the cats randomly
  cat.x = cat.x + cat.vx;
  cat.y = cat.y + cat.vy;
  
    // Constrain the cats to the canvas
    cat.x = constrain(cat.x, 0+cat.size/2, width-cat.size/2);
    cat.y = constrain(cat.y, 0+cat.size/2, height-cat.size/2);
  


let catchCat = dist(cat.x,cat.y,roomba.x,roomba.y);
  
if (roombaOnBase === true) {
// if the roomba is at base the cats follow with their normal life because the fun is over
// just repetition of the cat movement
  cat.x = cat.x + cat.vx;
  cat.y = cat.y + cat.vy;
  
    cat.x = constrain(cat.x, 0, width);
    cat.y = constrain(cat.y, 0, height);

   cat.uber = 0;
    
    
}
else if (catchCat < cat.size/2+roomba.size/2) { // this is where the cat follows the roomba
  cat.x = roomba.x;
  cat.y = roomba.y;
  cat.angle = roomba.angle; 
    cat.uber = 1;
    catUber = true; // created this variable just in case
   
  }
  


  

if (batteryLevel > 30) {
    roomba.maxSpeed = map(catAmount,0,5,5,3);
  }


  
}

function displayCat(cat) {
  push();
  let catImg = catImage[cat.imageIndex]; // defining an image for each cat with an array

  translate(cat.x,cat.y)
  rotate(cat.angle);
  imageMode(CENTER);
  image(catImg,0,0,cat.size,cat.size);
  pop();
}

function getCatAmount(catAmount) {
  catAmount = cats.filter(cat => cat.uber === 1).length;
  return catAmount;
}

function meow() { //performs the cat sound when number changes

        let currentCatAmount = getCatAmount(catAmount);
        if (currentCatAmount !== catAmount) {
      // the only way I could get this sound to work more or less how I wanted
      if (catSound.length > 0) {
        let meow = floor(random(catSound.length)); // gets a random number from the array lenght
        let randomSound = catSound[meow]; // selects the corersponding sound according to the random
        randomSound.play(); // MEOW
      }
    catAmount = currentCatAmount;
    }
}
  
function resetDirt() {
  clean = 0;
}

function display() {
  textFont('Helvetica');
   
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
    
    

    for (let i = 0; i < cats.length; i++) {
      moveCat(cats[i]);
      displayCat(cats[i]);
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
    fill(cleanColor.r,cleanColor.g,cleanColor.b);
    text('Clean: '+clear+`%`,width-90,40);
    
  }







  function mousePressed() {
    if (screen === `title`) {
        if (showInstruction === 0) {
          showInstruction = 255;
        }
        else if (showInstruction === 255) {
          showInstruction = 0;
        }
    }

   
  }

  function keyPressed() {
    if (screen === `title`) {
      if (keyCode === 32) {
      screen = `simulation`;
      userStartAudio();
    } 
  }
  else  if (screen === `stageUP`) {
    if (keyCode === 32) {
    screen = `simulation`;
     } 
  }
  else  if (screen === `simulation`) {
    if (keyCode === 32) {
      if (roombaOnBase === true && clear >= 70) {
        screen = `stageUP`
        basePosition();
        startPosition();   
        startDirt();
        dirts.length = 5000;
        roomCounter++;
        battery = battery + charged;
      }
     } 
}
else  if (screen === `ending`) {
  if (keyCode === 32) {
    location.reload();
  } 
}


}

