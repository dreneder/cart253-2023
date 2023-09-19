/**
 * Est dies in nox
 * André Neder
 * 
 * The objective of my exercise is to compose a canvas with a city skyline and a
 * day and night animation are controlled by mouse left to right movements, a sun object and a moon object will
 * do an alternate rotation movement and the background color shifts from dar to light blue
 * low to high mouse movements control the moon phase (ellipse size)

 * Day n Nite
 * André
 * 
 * The objective of my exercise is to compose a small city skyline where the sun and moon move
 */

"use strict";

/**
 * I guess this is not being used at the moment :)
*/
function preload() {
}
let bg = {
    r: 0,
    g: 0,
    b: 227
};


let sun = {
    x: 0,
    y: 0,
    size: 150, 
};

let moon = {
    x: 0,
    y: 0,
    size: 150
};
// naming the moon phases as earth just because eclipse is too hard to type

let earthMove= {
    w: 0,
    e: 0
};

let earth = {
    w: -75,
    n: -75,
    e: 75,
    s: 75
};
let day = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: -580
};

let night = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 580
};

let angle = 0;

/**
 * Just setting up the canvas
*/
function setup() {
    createCanvas(1000, 700);
    angleMode(DEGREES);
}


/**
 * Description of draw() = where the magic happens
 * I tried to change one of my map functions to constrain to fit the exercise
 * description but the code worked nicely the way it is
*/
function draw() {

// r values: day = 0; night = 68
// g values: day = 178; night = 0



angle = map(mouseX, 0, width, 0, 180);

bg.r = map(angle, 0, 180, 0, 68);
bg.g = map(angle, 0, 180, 178, 0);



background(bg.r, bg.g, bg.b);


 // setting up the sun
 sun.x = day.x + -500;
 sun.y = day.y + -700; 
 


 // sun rotation is based on a line shape (day)
 push();
 translate(500, 700);
 rotate(angle);
 noStroke();
 line(day.x1, day.y1, day.x2, day.y2);
 
 sun.x = day.x2;
 sun.y = day.y2;
 noStroke(); 
 fill(255, 166, 0);
 ellipse(sun.x, sun.y, sun.size);
 pop();
 
 // the moon movement is the same as the sun, based on the opposed value
 moon.x = day.x + -500;
 moon.y = day.y + -700;
 
 
 push();
 translate(500, 700);
 rotate(angle);
 noStroke();
 line(night.x1, night.y1, night.x2, night.y2);
 
 moon.x = night.x2;
 moon.y = night.y2;
 noStroke(); 
 fill(255);
 ellipse(moon.x, moon.y, moon.size);

 // this is the moon phase movement
 earth.w = map(mouseY, 350, height, -75, 75, true);
 earth.e = map(mouseY, 350, 0, 75, -75, true)

 push();
 ellipseMode(CORNERS);
 fill(bg.r, bg.g, bg.b);
 
 ellipse(moon.x+earth.w, moon.y+earth.n, moon.x+earth.e, moon.y+earth.s);
 pop();

 pop();
 
 
    
    
    //drawing the skyline, I listened to a podcast and actually had fun doing this, please don't judge me
    push();
    translate(0, 0);

    noStroke();
    fill(50);
    beginShape();
    vertex(0, 700);
    vertex(0, 350);
    vertex(70, 430);
    vertex(45, 430);
    vertex(45, 580);
    vertex(110, 580);
    vertex(110, 560);
    vertex(130, 560);
    vertex(130, 470);
    vertex(150, 470);
    vertex(150, 390);
    vertex(170, 390);
    vertex(170, 290);
    vertex(190, 290);
    vertex(190, 250);
    vertex(205, 250);
    vertex(205, 190);
    vertex(207, 190);
    vertex(207, 250);
    vertex(222, 250);
    vertex(222, 290);
    vertex(242, 290);
    vertex(242, 390);
    vertex(262, 390);
    vertex(262, 470);
    vertex(282, 470);
    vertex(282, 560);
    vertex(310, 560);
    vertex(310, 330);
    vertex(390, 250);
    vertex(390, 575);
    vertex(415, 550);
    vertex(440, 575);
    vertex(440, 510);
    vertex(465, 510);
    vertex(465, 480);
    vertex(490, 480);
    vertex(490, 300);
    vertex(540, 220);
    vertex(570, 220);
    vertex(620, 300);
    vertex(620, 570);
    vertex(650, 570);
    vertex(650, 400);
    vertex(690, 400);
    vertex(690, 490);
    vertex(740, 440);
    vertex(790, 490);
    vertex(790, 400);
    vertex(830, 400);
    vertex(830, 580);
    vertex(860, 580);
    vertex(860, 540);
    vertex(890, 540);
    vertex(890, 450);
    vertex(920, 450);
    vertex(920, 300);
    vertex(950, 300);
    vertex(950, 200);
    vertex(1000, 200);
    vertex(1000, 700);
    endShape(CLOSE);
    

   
    

     pop();
 
    
    
    
}