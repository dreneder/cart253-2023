

"use strict";

let clownImage;

function preload() {
    clownImage = loadImage("assets/images/clown.png");
}


function setup() {
    createCanvas(500,500);
}

function draw() {
    background(0);

    imageMode(CENTER);
// image takes the the image loaded, positionX, positionY, scaleX and scaleY
    image(clownImage,mouseX,mouseY,50,50);
}