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

let swarm = [];

let swarmSize = 0;

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

let centerAnt = {
  r: 50,
  g: 50,
  b: 50,
};

let threatTimer = 2000;
let threatPush = threatTimer;

let origin = {
  x: 0,
  y: 0
};

let startY = 0;

let randomThreats = [
  `food`,
  `bug`
];



/**
 * Importing some images (that I might have not googled from the internet) into the program
*/
function preload() {

  for (let i = 0; i < numMedia; i++) {
    let loadedFoodImg = loadImage(`assets/images/food-${i}.png`);
  foodImage.push(loadedFoodImg);
  }
  for (let i = 0; i < numMedia; i++) {
    let loadedBugImg = loadImage(`assets/images/bug-${i}.png`);
  bugImage.push(loadedBugImg);
  }
}



function setup() {
  createCanvas(windowWidth,windowHeight);

  // setting the limits for the threats to be created
  originLimit.sw = width+150;
  originLimit.sh = height+150;

  if (width >= height) {
   origin.y = width/2 + 150;
   }
  else {
   origin.y = height/2 + 150;
   
  }



  
}




function threatOrigin() {
  

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

  
  
  

    


  

  

}

// brings the terrarium to life
function terrarium() {
 
  // antHill();
  antHill();

  createThreat();

  
  //calculate ange according to mouse position
  antAngle = atan2(mouseY - height/2, mouseX - width/2,) * 180 / PI;
  
  // display the center ant
  middleAnt();
  
  // display and update the proletariat
  for (let i = 0; i < proletariat.length; i++) {
    proletariat[i]();


  }
  // display and update army
  for (let i = 0; i < army.length; i++) {
    army[i]();
 


}
  // display and update the food
  for (let i = 0; i < meal.length; i++) {
    meal[i]();


  }
  // display and update the predators
  for (let i = 0; i < swarm.length; i++) {
    swarm[i]();

  
}
checkCollisions();
handleCollisions();

}

// draw the center ant
function middleAnt() {
  // according to the type of ant selected
  if (antType === `worker`) {
    centerAnt.r = 50;
    centerAnt.g = 50;
    centerAnt.b = 50;
  }
  else if (antType === `soldier`) {
    centerAnt.r = 191;
    centerAnt.g = 38;
    centerAnt.b = 0;
  }

 push();
 translate(width/2, height/2);
 rotate(radians(antAngle));
 rectMode(CENTER);
 drawAnt(0, 0, centerAnt.r, centerAnt.g, centerAnt.b);
 pop();
}

// sends the selected type of ant in the direction of the mouse
function mousePressed() {
  
  if (antType === `worker`) {
   // Send worker
   let worker = createWorker(width / 2, height / 2, antAngle);
   proletariat.push(worker);
 }
  else if (antType === `soldier`) {
      // Send soldier
  let soldier = createSoldier(width / 2, height / 2, antAngle);
  army.push(soldier);
  }
}

// changes the type of ant when SPACEBAR is pressed
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




// creates a soldier when selected
function createWorker(x, y, angle) {
    
  let worker = {
      x: x,
      y: y,
      speed: 6,
      r: 50,
      g: 50,
      b: 50,
    };

return function() {
  // calculate the speed and direction
  let dx = worker.speed * cos(radians(angle));
  let dy = worker.speed * sin(radians(angle));

  // move the ant
  x += dx;
  y += dy;

  // place the ant
  push();
  translate(x, y);
  rotate(radians(angle));
  rectMode(CENTER);
  drawAnt(0, 0, worker.r, worker.g, worker.b);
  pop();
};
}

// creates a soldier when selected
function createSoldier(x, y, angle) {
    
  let soldier = {
      x: x,
      y: y,
      speed: 6,
      r: 191,
      g: 38,
      b: 0,
    };

return function() {
  // calculate the speed and direction
  let dx = soldier.speed * cos(radians(angle));
  let dy = soldier.speed * sin(radians(angle));

  // move the ant
  x += dx;
  y += dy;

  // place the ant
  push();
  translate(x, y);
  rotate(radians(angle));
  rectMode(CENTER);
  drawAnt(0, 0, soldier.r, soldier.g, soldier.b);
  pop();
};
}

function createFood(x, y, angle, start, img) {
  let food = {
    x: x,
    y: y,
    size: 100,
    angle: angle,
    speed: 1,
    start: start,
    img: img
  };
  return function() {
    // move the food
    food.start -= food.speed;

    // display the food
    push();
    translate(food.x,food.y);
    rotate(food.angle);
    imageMode(CENTER);
    image(food.img,0,food.start,food.size, food.size);
    pop();
 }

}

function createBug(x, y, angle, start, img) {
  let bug = {
    x: x,
    y: y,
    size: 100,
    angle: angle,
    speed: 1,
    start: start,
    img: img
  };
  return function() {
    // move the bugs
    bug.start -= bug.speed;

    // display the bugs
    push();
    translate(bug.x,bug.y);
    rotate(bug.angle);
    imageMode(CENTER);
    image(bug.img,0,bug.start,bug.size, bug.size);
    pop();
 }

}






// draws an ant, indepentently of the type
function drawAnt(x,y,r,g,b) { 
  let ant = {
    x: x,
    y: y,
    sizeX: 120,
    sizeY: 60,
    r: r,
    g: g,
    b: b
  };

  push();
  translate(ant.x,ant.y);
  rectMode(CENTER);
  fill(r, g, b);
  noStroke();
  ellipse(-30,0,55,40);
  ellipse(10,0,45,25);
  ellipse(40,0,35);
  stroke(r, g, b);
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
  stroke(0,0,255,0);
  rect(0,0,ant.sizeX,ant.sizeY);// for measurement
  pop();
  
  return ant;
}

function createThreat() {
  
  if (millis() > threatPush) { // creates a timer that pushes an action every 2 seconds
      
 
    let randomThreat = random(randomThreats);
    threatAngle = random(0,TWO_PI);

    if (randomThreat === `food`) {
      let randomImg = []; // array for random iamge selection
      randomImg.length = foodImage.length;
      let randomImgIndex = floor(random(randomImg.length)); // select a random food value
      randomImg = foodImage[randomImgIndex]; // get the corresponding imag from the array
      startY = 0 + origin.y; // assigns the start point
      // creates the food threat
      let food = createFood(width/2, height/2, threatAngle, startY, randomImg);
      meal.push(food);
    }
    // all the same but for the bug
    if (randomThreat === `bug`) {
      let randomImg = []; 
    randomImg.length = bugImage.length;
    let randomImgIndex = floor(random(randomImg.length)); 
    randomImg = bugImage[randomImgIndex];
    startY = 0 + origin.y;
    // creates the bug threat
    let bug = createBug(width/2, height/2, threatAngle, startY, randomImg);
    swarm.push(bug);
    }    

    threatPush = millis() + threatTimer; // resets the timer for the current value
    console.log(`randomthreat`+randomThreat);
   
    
  }
}


function antHill() {
    // draws two circles with a radial gradient, adapted form Pippin's wiggly piramid
    const hillLayers = 50;
    for (let i = 0; i < hillLayers; i++) {
      
      const circleSize = map(i, 0, hillLayers, 600, 10);
      noStroke();
      fill(107, 43, 11,map(i, 0, hillLayers, 0, 255));
      ellipse(width/2, height/2, circleSize);
    }
    const topLayers = 30;
    for (let i = 0; i < topLayers; i++) {
      
      const circleSize = map(i, 0, topLayers, 100, 2);
      noStroke();
      fill(0,map(i, 0, topLayers, 0, 255));
      ellipse(width/2, height/2, circleSize);
    }
}

function handleCollisions() {
  // Check collisions between proletariat and swarm
  for (let i = proletariat.length - 1; i >= 0; i--) {
    let collided = false;
    for (let j = swarm.length - 1; j >= 0; j--) {
      if (collideRectRect(proletariat[i].x, proletariat[i].y, proletariat[i].sizeX, proletariat[i].sizeY, 
                           swarm[j].x, swarm[j].y, swarm[j].size, swarm[j].size)) {
        // Collision detected, splice objects from both arrays
        proletariat.splice(i, 1);
        swarm.splice(j, 1);
        collided = true;
        break; // Exit inner loop after collision
      }
    }
    if (collided) {
      break; // Exit outer loop after collision
    }
  }

  // Check collisions between army and meal
  for (let i = army.length - 1; i >= 0; i--) {
    let collided = false;
    for (let j = meal.length - 1; j >= 0; j--) {
      if (collideRectRect(army[i].x, army[i].y, army[i].sizeX, army[i].sizeY, 
                           meal[j].x, meal[j].y, meal[j].size, meal[j].size)) {
        // Collision detected, splice objects from both arrays
        army.splice(i, 1);
        meal.splice(j, 1);
        collided = true;
        break; // Exit inner loop after collision
      }
    }
    if (collided) {
      break; // Exit outer loop after collision
    }
  }
}

function checkCollisions() {
  // Check collisions between proletariat and swarm
  for (let i = proletariat.length - 1; i >= 0; i--) {
    for (let j = swarm.length - 1; j >= 0; j--) {
      if (collideRectRect(proletariat[i].x, proletariat[i].y, proletariat[i].sizeX, proletariat[i].sizeY, 
                           swarm[j].x, swarm[j].y, swarm[j].size, swarm[j].size)) {
        // Collision detected, remove objects from both arrays
        proletariat.splice(i, 1);
        swarm.splice(j, 1);
        break; // Exit inner loop after collision
      }
    }
  }

  // Check collisions between army and meal
  for (let i = army.length - 1; i >= 0; i--) {
    for (let j = meal.length - 1; j >= 0; j--) {
      if (collideRectRect(army[i].x, army[i].y, army[i].sizeX, army[i].sizeY, 
                           meal[j].x, meal[j].y, meal[j].size, meal[j].size)) {
        // Collision detected, remove objects from both arrays
        army.splice(i, 1);
        meal.splice(j, 1);
        break; // Exit inner loop after collision
      }
    }
  }
}
