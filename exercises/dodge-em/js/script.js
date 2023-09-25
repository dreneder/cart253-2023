/**
 * Dodge RAM 'em
 * Author Name
 * 
 * Now that covid 19 is a little more contained, our Dodge RAM 1500 Pro tow package
 * will live it's adventures off-roading in the wild, and dodging like
 * a true american made fossil fuel burner
 */

"use strict";


function preload() {
    // ram.image = loadImage("assets/images/ram.png");
}

let bg = 0;

let speed = 0;

let ram = {
    x: 0,
    y: 0,
    size: 100,
    vx: 0,
    vy: 0,
    ax: 0,
    ay: 0,
    acce: 0.25,
    // image: undefined
    
};

let barrel = {
    x: 0,
    y: 250,
    size: 100,
    vx: 0,
    vy: 0,
    speed: 0,
    fill: {
       r: 255,
       g: 0,
       b: 0 
    }

};

function setup() {
    //setting window size
    createCanvas(windowWidth,windowHeight);
    //setup angle
    angleMode(DEGREES);

    //defninig ram initial possition
    ram.x = width/2;
    ram.y= height/2;



    barrel.x = random(0,width);

    
}



function draw() {
    //setting the background
    background(bg);

    //setting the RAM image
    // imageMode(CENTER);
    // image(ram.image,ram.x,ram.y,ram.size,ram.size);

    // ram.x = width/2;
 
    // barrel speed limits
    if (speed >= 5) {
        speed = 5;
    }
    else if (speed <= 0) {
        speed = 0;
    }
    barrel.speed = speed;
    barrel.vy = barrel.speed;
    
    barrel.x = barrel.x + barrel.vx;
    barrel.y = barrel.y + barrel.vy;

    if (barrel.y > height) {
        barrel.y = 0;
        barrel.x = random(0,width);
    }


    noStroke();
    fill(255);
    rectMode(CENTER);
    rect(ram.x,ram.y,ram.size,ram.size);


    // ram X limits
    if (ram.x >= width) {
        ram.x = width;
    }
    else if (ram.x <= 0) {
        ram.x = 0;
    }
    
    if (keyIsDown(LEFT_ARROW)) {
            ram.x = ram.x + -5;
        }
        else if(keyIsDown(RIGHT_ARROW)) {
            ram.x = ram.x + 5;
        }
        else if(keyIsDown(RIGHT_ARROW)||(LEFT_ARROW)) {
            ram.x = ram.x + 0;
        }

    
    if (keyIsDown(UP_ARROW)) {
        speed = speed + 0.1;
        }
        else if (keyIsDown(DOWN_ARROW)) {
        speed = speed + -0.1;
        }
   

        fill(barrel.fill.r,barrel.fill.g,barrel.fill.b);
        ellipse(barrel.x,barrel.y,barrel.size);
  
}