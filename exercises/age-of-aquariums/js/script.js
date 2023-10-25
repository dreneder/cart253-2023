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

  // if (screen === `title`) {
  //   titleScree();
  // }
  // else if (screen === `terrarium`) {
  //   terrarium();
  // }
  // else if (screen === `ending`) {
  //   ending();
  // }

  
  
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
   

    rectMode(CENTER);
    rotate(threatAngle);
    rect(0,60,10,40);
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

function drawWorker() { 

  rectMode(CENTER);
  fill(255,0,0);
  noStroke();
  ellipse(-30,0,55,40);
  ellipse(10,0,45,25);
  ellipse(40,0,35);
  stroke(255,0,0);
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
  rect(0,0,120,60);// for measurement

}