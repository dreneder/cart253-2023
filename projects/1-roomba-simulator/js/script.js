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
//  * Description of preload
// */
// function preload() {

// }


// /**
//  * Description of setup
// */
// function setup() {

// }


// /**
//  * Description of draw()
// */
// function draw() {

// }

let roomba = {
    x: 300,
    y: 300,
    size: 100,
    angle: 0, // Facing right to start
    speed: 0, // Start out not moving
    maxSpeed: 5, // Moving at 5 pixels per frame
    acceleration: 0.1, // How much velocity is gained when accelerating
    braking: -0.5, // How much velocity is lost when breaking
    drag: -0.1 // How much velocity is lost when neither accelerating nor braking
  };

  let obstacle = {
    x: 150,
    y: 150,
    size: 50
  }
  
  function setup() {
    createCanvas(600, 600);
  }
  
  function draw() {
    background(0);
  
    handleInput();
    move();
    wrap();
    wrapObstacle();
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
      // Accelerate forward if the UP ARROW is pressed
      roomba.speed += roomba.acceleration;
      roomba.speed = constrain(roomba.speed, 0, roomba.maxSpeed);
    }
    // Brake if the DOWN ARROW is pressed
    else if (keyIsDown(DOWN_ARROW)) {
      roomba.speed += roomba.braking;
      roomba.speed = constrain(roomba.speed, 0, roomba.maxSpeed);
    }
    else {
      // Apply drag if neither are pressed
      roomba.speed += roomba.drag;
      roomba.speed = constrain(roomba.speed, 0, roomba.maxSpeed);
    }
  }
  
  function move() {
    // The magical formula!
    let vx = roomba.speed * cos(roomba.angle);
    let vy = roomba.speed * sin(roomba.angle);
  
    // Move the roomba with the calculated velocities
    roomba.x += vx;
    roomba.y += vy;
  }
  
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

  function wrapObstacle() {
    
    let dX = abs(roomba.x - obstacle.x);
    let dY = abs(roomba.y - obstacle.y);

    // Check for collision with the obstacle
    if (dX < (obstacle.size / 3 + roomba.size / 2) && dY < (obstacle.size / 3 + roomba.size / 2)) {
        // Revert roomba's position to previous coordinates to avoid collision
        roomba.x -= roomba.speed * cos(roomba.angle);
        roomba.y -= roomba.speed * sin(roomba.angle);
        
        // If roomba reaches obstacle, treat it as if it reached the canvas boundaries
        if (roomba.x < roomba.size / 2) {
            roomba.x = roomba.size / 2;
        } else if (roomba.x > width - roomba.size / 2) {
            roomba.x = width - roomba.size / 2;
        }

        if (roomba.y < roomba.size / 2) {
            roomba.y = roomba.size / 2;
        } else if (roomba.y > height - roomba.size / 2) {
            roomba.y = height - roomba.size / 2;
        }
}
  }


  
  function display() {
    push();
    noStroke();
    // Because we're going to represent rotation, we should translate
    // to the roomba's centre
    translate(roomba.x, roomba.y);
    // Then rotate by its angle
    rotate(roomba.angle);
    // Draw the roomba (at 0,0 because we translated)
    ellipse(0, 0, roomba.size);
    // Then draw a rectangle that sticks out to the "right" of the roomba, which
    // is the direction it faces by default
    fill(255,0,0);
    rectMode(CENTER);
    rect(roomba.size / 3, 0, roomba.size / 3, roomba.size / 10);
    pop();

    fill(255);
    rectMode(CENTER);
    rect(obstacle.x,obstacle.y,obstacle.size,obstacle.size);
  }