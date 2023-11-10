
"use strict";

let synth;
let notes = [`F4`,`G4`,`Ab4`,`Bb4`,`C4`,`Db4`,`Eb4`,`F4`];
let currentNote = 0;
let note;

function setup() {
    createCanvas(600,600);
    
    synth = new p5.PolySynth();
    
    userStartAudio();

}


function draw() {
    background(0);

    // playRandomNote();
   fill(255);
    textSize(32);
    text(note,100,100)

 }

function keyPressed() {
    setInterval(playRandomNote,200);
}

function playRandomNote() {
    note = notes[currentNote];
    synth.play(note,1,0,0.1);
   
    currentNote += 1;
    if (currentNote === notes.length) {
        currentNote = 0;
    }

}