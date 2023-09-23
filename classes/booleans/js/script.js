
"use strict";


function preload() {

}

let displayCircle = false;

function setup() {
    createCanvas(500,500);
}


function draw() {
// following action is true if mouse is pressed, it already has a true statement in it but i can be
// specified by "=== true", it could also be a key insted of mouse for any keyboard key
    // if (mouseIsPressed) {
    //     background(255);
    // }
    // else {
    //     background(0);
    // }

    background(0);

// this change the object statement to true and shows it on the canvas, but won't change to false when
// mouse is released, for that need to add an "else object = false"
    if (mouseIsPressed) {
        displayCircle = true;
    }
  

    if(displayCircle) {
        ellipse(250,250,100,100);
    }



}