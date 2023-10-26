/**
 * The Age of Terrariums
 * André Neder
 * 
 * This is the battle for the anthill! So, the owner of this terrarium wants to see world burn and he just keeps adding
 * predators and too much food for the ants.
 * Using the mouse and mouse button you have to send either a soldier and to the predator or a worker ant to the food.
 * To sitch between soldier and worker press SPACEBAR.
 * If the predator gets to the anthill, he will leash a carnage to the colony.
 * If the food gets to the anthill it will block the entrance and the ants won't be able to leave (stupid I know).
 * 
 * Collide2D library imported.
*/

"use strict";


let originLimit = {
  x: 0,
  y: 0,
  sw: undefined,
  sh: undefined
};

let army = [];

let armySize = 0;

let proletariat = [];

let proleSize = 0;

let meal = [];

let mealSize = 0;

let screen = `terrarium`;

let threatAngle = 0;

let foodImage = [];

let bugImage = [];

let numMedia = 3;

let storeBug;

let storeFood;

let foodOrigin = true;

let bugOrigin = true;

let antType = `worker`;

let antAngle = 0;

/**
 * Importing some images (that I might have not googled from the internet) into the program
*/
function preload() {

  // for (let i = 0; i < numMedia; i++) {
  //   let loadedFoodImg = loadImage(`assets/images/food-${i}.png`);
  // foodImage.push(loadedFoodImg);
  // }
  // for (let i = 0; i < numMedia; i++) {
  //   let loadedBugImg = loadSound(`assets/sounds/bug-${i}.png`);
  // bugImage.push(loadedBugImg);
  // }
}



function setup() {
  createCanvas(windowWidth,windowHeight);
  
  // for (let i = 0; i < schoolSize; i++) { // counts from zero to one number smaller than 4 (3, duh)
  //     let fish = createFish(random(0, width), random(0, height));
  //     school.push(fish);
  //       // Changing the fish to arrays, the information inside the array is an index
  
  //     // school[i] = createFish(random(0, width), random(0, height));
  // }

  // defining the origins of the therats
  originLimit.sw = width+150;
  originLimit.sh = height+150;

  threatAngle = random(0,PI*2);

  
  
}




function threatOrigin() {
  
   if (width >= height) {
    food.y = width + 150;
    bug.y = width + 150;
  }
  else {
    food.y = height + 150;
    bug.y = height + 150;
  }

    foodOrigin = collideRectRect(originLimit.x,originLimit.y,originLimit.sw,originLimit.sh,
                                food.x,food.y,food.size,food.size);
    bugOrigin = collideRectRect(originLimit.x,originLimit.y,originLimit.sw,originLimit.sh,
                                bug.x,bug.y,bug.size,bug.size);


  if (foodOrigin === false) {
    food.speed = 100;
    bug.speed = 100;
  }
  else {
    food.speed = 5
    bug.speed = 5
  }

}







function draw() {
  background(20, 128, 36);

  if (screen === `title`) {
    titleScreen();
  }
  else if (screen === `terrarium`) {
    terrarium();
  }
  else if (screen === `ending`) {
    ending();
  }

  
  
  
   
console.log(antType);
    


  

  

}

function terrarium() {
  // moveAnts();
 

  let home = {
    x: width/2,
    y: height/2,
    size: 60,
  };
   
  fill(107, 43, 11);
  ellipse(home.x,home.y,home.size*9);
  fill(0);
  ellipse(home.x,home.y,home.size);

  
  translate(width/2, height/2);
  angleMode(DEGREES);
  antAngle = atan2(mouseY - height / 2, mouseX - width / 2);
  
  
  rectMode(CENTER);
  // rotate(threatAngle);
  // rect(0,60,10,40);
  rotate(antAngle);
  fill(255,0,0);
  rect(150,0,300,10);
  
  for (let i = 0; i < armySize.length; i++) {
    moveAnts(army[i]);
    drawSoldier(army[i]);
  }
  for (let i = 0; i < proleSize.length; i++) {
    moveAnts(proletariat[i]);
      drawWorker(proletariat[i]);
  }


}


function moveAnts(soldier,worker) {
  
  worker.x = worker.x + worker.speed;
  soldier.x = soldier.x + soldier.speed;

  return worker.x, soldier.x;
}

// displayFish(fish)
// Displays the provided fish on the canvas
function displayFish(fish) {
  push();
  fill(200, 100, 100);
  noStroke();
  ellipse(fish.x, fish.y, fish.size);
  pop();
}


function mousePressed() {

  
  if (antType === `worker`) {
    let worker = createWorker(angle);
    proletariat.push(worker);
  }
  else if (antType === `soldier`) {
    let soldier = createSoldier(angle);
    army.push(soldier);
  }
}
function keyPressed() {
  if (antType === `worker`) {
    if (keyCode === 32) {
      antType = `soldier`;
    }
  }
  else if (antType === `soldier`) {
    if (keyCode === 32) {
      antType = `worker`;
    }
  }
}

function drawWorker(worker) { 
  
  stroke(0,0,255,0);
  rect(worker.x,worker.y,worker.sizeX,worker.sizeY);
  push();
  translate(worker.x,worker.y);
  rectMode(CENTER);
  fill(50);
  noStroke();
  ellipse(-30,0,55,40);
  ellipse(10,0,45,25);
  ellipse(40,0,35);
  stroke(250);
  strokeWeight(4);
  line(15,-10,20,-30);
  line(20,-30,35,-35);
  line(15,10,20,30);
  line(20,30,35,35);
  line(10,-10,5,-30);
  line(5,-30,-10,-35);
  line(10,10,5,30);
  line(5,30,-10,35); 
  line(0,-10,-10,-25);
  line(-10,-25,-35,-35);
  line(0,10,-10,25);
  line(-10,25,-35,35);
  line(55,-5,65,-10);
  line(55,5,65,10);
  noFill();
  pop();

}
function drawSoldier(soldier) { 
  
  stroke(0,0,255,0);
  rect(soldier.x,soldier.y,soldier.sizeX,soldier.sizeY);
  push();
  translate(soldier.x,soldier.y);
  rectMode(CENTER);
  fill(191, 38, 0);
  noStroke();
  ellipse(-30,0,55,40);
  ellipse(10,0,45,25);
  ellipse(40,0,35);
  stroke(191, 38, 0);
  strokeWeight(4);
  line(15,-10,20,-30);
  line(20,-30,35,-35);
  line(15,10,20,30);
  line(20,30,35,35);
  line(10,-10,5,-30);
  line(5,-30,-10,-35);
  line(10,10,5,30);
  line(5,30,-10,35); 
  line(0,-10,-10,-25);
  line(-10,-25,-35,-35);
  line(0,10,-10,25);
  line(-10,25,-35,35);
  line(55,-5,65,-10);
  line(55,5,65,10);
  noFill();
  pop();

}


function createWorker(angle) {
  let worker = {
    x: 0,
    y: 0,
    sizeX: 120,
    sizeY: 60,
    angle: angle,
    speed: 5
  };
  worker.angle = antAngle;
  return worker;
}

function createSoldier(angle) {
  let soldier = {
    x: 0,
    y: 0,
    sizeX: 120,
    sizeY: 60,
    angle: angle,
    speed: 5
  };
  soldier.angle = antAngle;
  return soldier;
}

function createFood(x, y) {
  let food = {
    x: 0,
    y: 0,
    size: 100,
    speed: 5
  };
  return food;
}
function createBug(x, y) {
  let bug = {
    x: x,
    y: y,
    size: 100,
    speed: 5
  };
  return bug;
}