/**
 * Dodge RAM 'em
 * Author Name
 * 
 * Now that covid 19 is a little more contained, our Dodge RAM 1500 Pro tow package
 * will live it's adventures off-roading in the wild (also known as downtown MTL),
 * and dodging orange cones like a true american made fossil fuel burner
 */

"use strict";


function preload() {
    ram.image = loadImage("assets/images/ram.png");
}

let bg = 0;

let speed = 0;

let ram = {
    x: 0,
    y: 0,
    sx: 0,
    sy: 0,
    vx: 0,
    vy: 0,
    ax: 0,
    ay: 0,
    acce: 0.25,
    image: undefined
    
};

let cone = {
    x: 0,
    y: 250,
    size: 0,
    vx: 0,
    vy: 0,
    speed: 0,
    fill: {
       r: 242,
       g: 130,
       b: 31 
    }

};

let laneDiv = {
    x:0,
    y:-900,
    xs: 30,
    ys: 300,
    vx: 0,
    vy: 0,
    speed: 0,
};


let coneCounter= 0;


function setup() {
    //setting window size
    createCanvas(windowWidth,windowHeight);
    //setup angle
    angleMode(DEGREES);

    //defninig initial possition fo all objects
    ram.x = width/2;
    ram.y= height/3 *2 ;

    laneDiv.x = width/2; 
    
    cone.x = random(0,width);
    

    // DEFINING THE SIZE OF THINGS ACCORNDINGLY CAUSE MY SMART ASS MADE THIS ON A HUGE SCREEN
    ram.sy = height/2;
    ram.sx = ram.sy/2;

    cone.size = height/8;
    
}



function draw() {
    //setting the background
    background(bg);
    

    
    //defining lane animation loop
    if (laneDiv.y > -200) {
        laneDiv.y = -900;
       } 
     
    // setting speed limits
    if (speed >= 8) {
        speed = 8;
    }
    else if (speed <= 0) {
        speed = 0;
    }

    
    // lane speed converted to general speed
   laneDiv.speed = speed;
    laneDiv.vy = laneDiv.speed;
    
    laneDiv.y = laneDiv.y + laneDiv.vy;

    // make multiple lane marks
    
    let y = laneDiv.y;
        
    for (let i = 0; i < 10; i++) {
        y = y + 350;
    
        fill(252,219,3);
        rect(laneDiv.x,y,laneDiv.xs,laneDiv.ys);
        }
    
    // cone speed converted to general speed
    cone.speed = speed;
    cone.vy = cone.speed;
    
    cone.x = cone.x + cone.vx;
    cone.y = cone.y + cone.vy;
    
    // inserting ram image as object
    noStroke();
    fill(255);
    imageMode(CENTER);
    image(ram.image,ram.x,ram.y,ram.sx,ram.sy);
    
    

    // ram X limits
    if (ram.x >= width) {
        ram.x = width;
    }
    else if (ram.x <= 0) {
        ram.x = 0;
    }
    
    // ram X movements made by arrows
    if (keyIsDown(LEFT_ARROW)) {
        ram.x = ram.x + -5;
    }
    else if(keyIsDown(RIGHT_ARROW)) {
        ram.x = ram.x + 5;
    }
    // still working on making 0 movement when both are pressed
    else if(keyIsDown(RIGHT_ARROW)&& keyIsDown(LEFT_ARROW)) {
        ram.x = ram.x;
    }
    
    // controlling the speed
    if (keyIsDown(UP_ARROW)) {
        speed = speed + 0.1;
    }
    else if (keyIsDown(DOWN_ARROW)) {
        speed = speed + -0.1;
    }
    else if (keyIsDown(UP_ARROW) === false) {
        speed = speed + -0.05;
    }
    
    // cone loop from Y
    if (cone.y > height) {
        cone.y = 0;
        cone.x = random(0,width);
        coneCounter = coneCounter + 1;
    }
    
    
    //drawing the cone
    strokeWeight(5);
    stroke(0);
    fill(cone.fill.r,cone.fill.g,cone.fill.b);
    ellipseMode(CENTER);
    ellipse(cone.x,cone.y,cone.size);
    fill(255)
    ellipse(cone.x,cone.y,cone.size/3*2);
    fill(cone.fill.r,cone.fill.g,cone.fill.b);
    ellipse(cone.x,cone.y,cone.size/3);           

//test


//stopping the loop for hitting orange cone

if (ram.x - ram.sx /3 < cone.x + cone.size/2 &&
    ram.x + ram.sx /3 > cone.x - cone.size/2 &&
    ram.y - ram.sy /2 < cone.y + cone.size/2 &&
    ram.y + ram.sy /2 > cone.y - cone.size/2
)
 {
       // game over message
       textSize(100);
       textAlign(CENTER);
       stroke(255,255,255);
       fill(242,130,31);
   text('YOU DID NOT DODGE', width/2, height/2);
    noLoop();

}

   
    // text counter
    textSize(30);
    textAlign(LEFT);
    noStroke();
    fill(242,130,31);
text('Orange cones dodged: '+coneCounter, width/50, height/20);


    
}


