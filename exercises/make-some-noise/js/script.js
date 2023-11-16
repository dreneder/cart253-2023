/**
 * Make some cart noise
 * André Neder
 * 
 * This is a manual car or, at least, part of it. It has a manual transmission and ignition controlled by the mouse,
 * a clutch, brake and gas pedals controlled by the A, S, D keys respectively. The main manipulation of the sound is
 * through the RPM, that is changing the rate and amplitude of the engine sound. Some sounds just play according
 * to interaction.
 * What can I say, enjoy making car sounds!
 */

"use strict";


let gear = [`N`,`1`,`2`,`3`,`4`,`5`,`R`];
let currentGear = 1;
let transmission;
let pedals;
let ignition;
let tachometer;
let speedometer;

let mouseOn = false;

let clutch = false;
let brake = false;
let accelerator = false;
let startStop = false;

let engineOn = false;

let rpm = 0;
let speed = 0;


/**
 * loads all the SFX
*/
function preload() {
    
}


/**
 * Description of setup
*/
function setup() {
    createCanvas(1200,800);
    
    tachometer = new Tachometer(200,180);
    ignition = new Ignition(620,340);
    transmission = new Transmission(900,450);
    pedals = new Pedals(350,600);

}


/**
 * Description of draw()
*/
function draw() {
    background(200);


    tachometer.display();
    ignition.pressed();
    ignition.display();
    transmission.pressed();
    transmission.display();
    pedals.pedalDown();
    pedals.display();

}

// change the mouse interaction on the classes
function mousePressed() {
    mouseOn = true;
}

function mouseReleased() {
    mouseOn = false;
}