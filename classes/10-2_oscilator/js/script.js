
"use strict";

let oscillator;
let angle = 0;


function setup() {
    createCanvas(windowWidth,windowHeight);
    userStartAudio();

    oscillator = new p5.Oscillator(440, `sine`);
    oscillator.amp(0.2);
}


function draw() {
    background(0);
   

    let sinAngle = sin(angle);
    let newFreq = map(sinAngle,-1,1,440,880);
    oscillator.freq(newFreq);

    angle += 0.1;

 }

function mousePressed() {
    oscillator.start();
}

function mouseReleased() {
    oscillator.stop();
}