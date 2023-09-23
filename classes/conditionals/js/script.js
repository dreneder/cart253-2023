/**
 * Learning conditionals
 * Andre Neder
 * 
 * This was started to learn conditionals
 */

"use strict";

function preload() {

}

let backgroundShade = 0;
let circle = {
    x: 0,
    y: 250,
    size: 100,
    speed: 5
}


function setup() {
    createCanvas(500, 500);
}


function draw() {
    background(backgroundShade);
    
    circle.x = circle.x + circle.speed;

    if (circle.x > width) {
        circle.speed = -circle.speed;
    }

    if (circle.x < 0) {
        circle.speed = -circle.speed;
    }
// possibilities here are >, <, >=, <=, and the followings   
// use 3 "=" (===) if you want ot check wether two things are equal to each other
// use "!==" means does not equal

if (mouseY < height/2) {
    fill(255, 0, 0);
}
if (mouseY > height/2) {
    fill(0, 0, 255);
}


    ellipse(circle.x,circle.y,circle.size);

}