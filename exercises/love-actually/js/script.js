/**
 * What is love? (baby don't hurt me...)
 * André Neder
 * 
 *So the objective here is lovely, it is tragic, but difinitely a classic. So you control the cirlcle Romeo and you
 *must meet with Juliet to meet your destiny and you must do so without the Montagues and the Capulets finding out.
 *When you meet Juliet you must take, hughh... poison! Just click the mouse button. 
 *The Capulets are always following Juliet, while the Montagues are following Romeo
 */

"use strict";

// not using preload but will leave it here just in case
function preload() {

}

let juliet = {
    x: 0,
    y: 0,
    size: 100,
    vx: 0,
    vy: 0,
    speed: 3
};

let romeo = {
    x: undefined,
    y: undefined,
    size: 100,
    vx: 0,
    vy: 0,
    speed: 3
};

let montag = {
    x: 0,
    y: 0,
    size: 500,
    vx: 0,
    vy: 0,
    speed: 3
};

let capulet = {
    x: undefined,
    y: undefined,
    size: 400,
    vx: 0,
    vy: 0,
    speed: 5
};

// setting up the canvas and a few initial parameters
function setup() {
    createCanvas(windowWidth,windowHeight);

    capulet.x = random(0,width);
    capulet.y = random(0,height);
    
    capulet.vx = random(-capulet.speed, capulet.speed);
    capulet.vy = random(-capulet.speed, capulet.speed);
}

function draw() {
    background(0);

    // move family
    capulet.x += capulet.vx;
    capulet.y += capulet.vy;

    // bounce the family
    if (capulet.x <= 0 || capulet.x >= width) {
        capulet.vx = -capulet.vx;
    }
    if (capulet.y <= 0 || capulet.y >= height) {
        capulet.vy = -capulet.vy;
    }

    fill(255);
    ellipse(capulet.x, capulet.y, capulet.size);
}


