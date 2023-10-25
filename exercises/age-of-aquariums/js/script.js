/**
 * The Age of Terrariums
 * André Neder
 * 
 * This is the battle for the anthill! So, the owner of this terrarium wants to see
 * 
 * 
*/

"use strict";

let school = [];
let schoolSize = 4;

let screen = `terrarium`;

let threatAngle = 0;


function setup() {
  createCanvas(windowWidth,windowHeight);
  
  // for (let i = 0; i < schoolSize; i++) { // counts from zero to one number smaller than 4 (3, duh)
  //     let fish = createFish(random(0, width), random(0, height));
  //     school.push(fish);
  //       // Changing the fish to arrays, the information inside the array is an index
  
  //     // school[i] = createFish(random(0, width), random(0, height));
  // }
  threatAngle = random(0,PI*2);
  
}

// createFish(x,y)
// Creates a new JavaScript Object describing a fish and returns it
function createWorker(x, y) {
  let ant = {
    x: 0,
    y: 0,
    sizeX: 50,
    sizeY: 50,
    speed: 5
  };
  return ant;
}

function threatOrigin() {
  if (width < height) {
      outOfCanvas = outOfCanvas = height/2;
  }
}

function createThreat(x, y) {
  let threat = {
    x: 0,
    y: 0,
    sizeX: 50,
    sizeY: 20,
    speed: 5
  };
  return threat;
}



// draw()
// Moves and displays our fish
function draw() {
  background(20, 128, 36);

  if (screen === `title`) {
    titleScree();
  }
  else if (screen === `terrarium`) {
    terrarium();
  }
  else if (screen === `ending`) {
    ending();
  }

  
  
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
    let antAngle = atan2(mouseY - height / 2, mouseX - width / 2);
   
  

  
    rotate(threatAngle);
    rectMode(CENTER);
    rect(0,500,10,40);
    rotate(antAngle);
    fill(255,0,0);
    rect(150,0,300,10);



    


    // for (let i = 0; i < school.length; i++) {
    //     moveFish(school[i]);
    //     displayFish(school[i]);
    // }




}

// moveFish(fish)
// Chooses whether the provided fish changes direction and moves it
function moveAnt(ant) {
 
  ant.x = ant.x + ant.speed;
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
    let fish = createFish(mouseX,mouseY);
    school.push(fish);
}

// function beetlePosition() { // determines base position randomly
  
//   beetle.x = random(0, width);
//   beetle.y = random(0, height);
  
//   // the followings assign the position based on the closest wall
//   let distCenterX = dist(beetle.x,0,width/2,0);
//   let distCenterY = dist(0,beetle.y,0,height/2);
  
//   if (distCenterX >= distCenterY) { // determines if that it's close to a X wall
//     if (beetle.x <= width/2) { // determines which X wall is closer 
//       beetle.x = 0 - 50; // attaches it to that wall
//       beetle.y = random(0, height);
//     }
//     else {
//       beetle.x = width + 50;
//       beetle.y = random(0, height);
//     }
//   }
//   else { // does all the same as above but in case it is closer to a Y wall
//     if (beetle.y <= height/2) {
//       beetle.y = 0 + 35;
//       beetle.y = random(0, width);
//     }
//     else {
//       beetle.y = height - 35;
//       beetle.y = random(0, width);
//     }
//   }

// }