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



// /**
//  * Description of draw()
// */


let roomba = {
    x: 300,
    y: 300,
    size: 120,
    angle: 0, // Facing right to start
    speed: 0, // Start out not moving
    maxSpeed: 5, // Moving at 5 pixels per frame
    acceleration: 0.1, // How much velocity is gained when accelerating
    brake: -1 // instead of draging for long it stops the device almost imediately
  };

  // furn as in furniture
  let furn1 = {
    x: undefined,
    y: undefined,
    sx: undefined,
    sy: undefined
  };

  let furn2 = {
    x: undefined,
    y: undefined,
    sx: undefined,
    sy: undefined
  };

  let furn3 = {
    x: undefined,
    y: undefined,
    sx: undefined,
    sy: undefined
  };

let base = {
  x: undefined,
  y: undefined,
  sx: 10,
  sy: 90,
  angle: 0
};

  
// I know I might be jumping the gun a bit and I haven't really understood arrays 100% but the code bellow 
// I followed from this video https://youtu.be/vqE8DMfOajk?si=Nv8zz-yXEpU59jjd I copied the parts I needed and
// adapted to my code and it worked exaclty as I wanted
  let trail = []; 


  function setup() {
    createCanvas(800, 800);
    furnitureSize();
    furniturePosition();
    basePosition();
  }
  
  function draw() {
    background(138, 69, 4);
    
    handleInput();
    move();
    wrap();
    wrapObstacle();
    roombaTrail();
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
  }
  
  function move() {
    // function unchanged
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

  function wrapObstacle() {
    
    let dX = dist(roomba.x, furn1.x);
    let dY = dist(roomba.y, furn1.y);

    // Check for collision with the obstacle
    if (dX < (furn1.sx / 2 + roomba.size / 2) || dY < (furn1.sy / 2 + roomba.size / 2)) {
        // Revert roomba's position to previous coordinates to avoid collision
        roomba.x -= roomba.speed * cos(roomba.angle);
        roomba.y -= roomba.speed * sin(roomba.angle);
        
        // If roomba reaches obstacle, treat it as if it reached the canvas boundaries
        if (roomba.x < furn1.x) {
            roomba.x = furn1.x + -roomba.size/2 + -furn1.sx/2;
        } else if (roomba.x > furn1.x) {
            roomba.x = furn1.x + roomba.size/2 + furn1.sx/2;
        }

        if (roomba.y < furn1.y) {
          roomba.y = furn1.y + -roomba.size/2 + -furn1.sy/2;
      } else if (roomba.y > furn1.y) {
          roomba.y = furn1.y + roomba.size/2 + furn1.sy/2;
      }
}
  }

  function furnitureSize() {
    furn1.sx = random(100,300);
    furn1.sy = random(100,300);
  }

  // this furniture will limit the position of the furniture to the borders of the canvas
function furniturePosition() {
    furn1.x = random(0, width);
    furn1.y = random(0, height);

    // // limit the furniture position to the canvas
    // furn1.x = constrain(furn1.x, furn1.sx/2, width - furn1.sx/2);
    // furn1.y = constrain(furn1.y, furn1.sy/2, height - furn1.sy/2);

    // make the furniture stay close to the wall if the distance is smaller than the roomba
    if (furn1.x + -furn1.sx/2 < 0 + roomba.size/2 + furn1.sx/2) {
        furn1.x = furn1.sx/2;
    } else if (furn1.x + furn1.sx/2 > width - roomba.size/2) {
        furn1.x = width - furn1.sx/2;
    }
    if (furn1.y + -furn1.sy/2 < 0 + roomba.size/2 + furn1.sy/2) {
        furn1.y = furn1.sy/2;
    } else if (furn1.y + furn1.sy/2 > height - roomba.size/2) {
        furn1.y = height + -furn1.sy/2;
    }

   

    console.log("furn.x "+furn1.x+", furn.sx "+furn1.sx+", furn.y "+furn1.y+", furn.sy "+furn1.sy);
    

}

function basePosition() {
    base.x = random(0, width);
    base.y = random(0, height);

    if (base.x <= width/2) {
      base.x = 0 + roomba.size/2;
      base.angle = PI;
    }
    else if (base.x > width/2) {
      base.x = width + -roomba.size/2;
      base.angle = 0;
    }
    // if (base.y <= height/2) {
    //   base.y = 0;
    //   base.angle = HALF_PI;
    // }
    // else if (base.y > height/2) {
    //   base.y = height;
    //   base.angle = PI+HALF_PI;
    // }
  

    console.log("base.x "+base.x+", base.sx "+base.sx+", base.angle"+base.angle+", base.y "+base.y+", base.sy "+base.sy);
}

  
  function display() {

    // draw the trail after the roomba
    push();
      noFill();
      strokeWeight(120);
      stroke(150,150,0,150); // light yellow color
      beginShape();
      for (let i = 0; i < trail.length; i++) {
          vertex(trail[i].x, trail[i].y);
      }
      endShape();
        pop();

    push();
    noFill()
    stroke(0,255,0, 100);
    strokeWeight(180);
    rectMode(CENTER);
    rect(width/2,height/2,width-60,height-60);
    pop();

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



    push();
    translate(base.x,base.y);
    rotate(base.angle);
    noStroke();
    fill(255,0,0);
    rect(base.x,base.y,base.sx,base.sy);
    pop();


    fill(255);
    noStroke();
    rectMode(CENTER);
    rect(furn1.x,furn1.y,furn1.sx,furn1.sy);
    

 


  }


  function roombaTrail() {
     // Add the current roomba position to the trail path
     trail.push(createVector(roomba.x, roomba.y));

    

  }



