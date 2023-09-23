
"use strict";

function preload() {

}
// for mouse input
// let bg = {
//     r: 0,
//     g: 0,
//     b: 0
// }

let circle = {
    x: 250,
    y: 250,
    size: 100,
    // speed: 5 // changed at second part for what it is bellow
    vx: 0,
    vy: 0,
    ax: 0,
    ay: 0,
    acceleration: 0.25,
    maxSpeed: 5
}

function setup() {
    createCanvas (500,500);
}


function draw() {
// for mouse input
//     background(bg.r,bg.g,bg.b);

//     ellipse(circle.x,circle.y,circle.size);
// }

//     // function mousePressed() {
//     // function mouseMoved() {
//     function mouseDragged() {
//     bg.r = random(0,255);
//     bg.g = random(0,255);
//     bg.b = random(0,255);


    background(0);
// these conditionals will make the circle follow the mouse with a delay
    if (mouseX < circle.x) {
        circle.ax = -circle.acceleration;
    }
    else {
        circle.ax = circle.acceleration;
    }

    if (mouseY < circle.y) {
        circle.ay = -circle.acceleration;
    }
    else {
        circle.ay = circle.acceleration;
    }

// added at second part, with this the circle follows but goes further than mouse position
    circle.vx = circle.vx + circle.ax;
    circle.vx = constrain(circle.vx,-circle.maxSpeed,circle.maxSpeed);
    circle.vy = circle.vy + circle.ay;
    circle.vy = constrain(circle.vy,-circle.maxSpeed,circle.maxSpeed);

// added at first portion
    circle.x = circle.x + circle.vx;
    circle.y = circle.y + circle.vy;

    ellipse(circle.x,circle.y,circle.size);
}