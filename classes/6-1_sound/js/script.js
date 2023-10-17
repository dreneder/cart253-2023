
"use strict";




let barkSFX;

function preload() {
    barkSFX = loadSound(`assets/sounds/bark.wav`);
}


function setup() {
    createCanvas(500, 500);
}


function draw() {
    background(0);


}

function keyPressed() {
    if (!barkSFX.isPlaying()) {
    barkSFX.play ();
}
}