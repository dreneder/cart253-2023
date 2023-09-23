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
    speed: 1
}


function setup() {
    createCanvas(500, 500);
}


function draw() {
    background(backgroundShade);
    
    circle.x = circle.x + circle.speed;

//     if (circle.x > width) {
//         circle.speed = -circle.speed;
//     }

//     if (circle.x < 0) {
//         circle.speed = -circle.speed;
//     }
// // possibilities here are >, <, >=, <=, and the followings   
// // use 3 "=" (===) if you want ot check wether two things are equal to each other
// // use "!==" means does not equal
// if (mouseY < height/2) {
//     fill(255, 0, 0);
// }

// here you can have as many else if's as you want, note that the "mouseX < 2 * width/3" means 2/3 of the value
// if (mouseX < width/3) {
//     fill(255, 0, 0);
// }
// else if (mouseX < 2 * width/3) {
//     fill(0, 255, 0);
// }
// else {
//     fill(0, 0, 255);
// }

// the if inside means another conditional inside the first one (a question followed by a subquestion)
//then it needs both conditions to be true so the second if means and
// fill(255,255,255);
// if (circle.x > width/3) {
//     if (circle.x < 2 * width/3) {
//         fill(255,0,0);
//     }
// }

// this does exactly the same thing but is how you actually declares an "and" statement to the code
// fill(255,255,255);
// if (circle.x > width/3 && circle.x < 2 * width/3) {
//     fill(255,0,0);
// }

// the following "||" means or, so it only turns read under these conditions
// fill(255,255,255);
// if (circle.x < width/3 || circle.x > 2 * width/3) {
//     fill(255,0,0);
// }

// the following ! means not (not true) and it needs to be under a parantesis of it's own
fill(255,255,255);
if (!(circle.x < width/3)) {
    fill(255,0,0);
}



    ellipse(circle.x,circle.y,circle.size);

}