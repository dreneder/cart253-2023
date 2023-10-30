/**
 * Title of Project
 * Author Name
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";

/**
 * Description of preload
*/
function preload() {

}

let antAngle = 0; // Initial angle of the gun

let antHillAngle = 0; // Initial angle of the gun

let army = []; // Array to store dart objects

let centerAnt = {
    r: 191,
    g: 38,
    b: 0,
};

function setup() {
  createCanvas(1200, 1200);
}

function draw() {
  background(220);

  // Calculate gun position based on canvas center
 

  let dx = mouseX - width / 2;
  let dy = mouseY - height / 2;
  antAngle = atan2(dy, dx) * 180 / PI;

  // Draw the center ant
  push();
  translate(width/2, height/2);
  rotate(radians(antAngle));
  rectMode(CENTER);
  drawAnt(0, 0, centerAnt.r, centerAnt.g, centerAnt.b);
  pop();

  // Display and update army
  for (let i = 0; i < army.length; i++) {
    army[i]();
  }

  // Instructions
  fill(0);

}

function mouseClicked() {
  // even though I've used polar coordinates to change angles before this is the first time
  // I use it with mouse inputs, I learnt this code from this tutorial: https://www.youtube.com/watch?v=N633bLi_YCw

  // Send soldier
  let soldier = createSoldier(width / 2, height / 2, antAngle);
  army.push(soldier);
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