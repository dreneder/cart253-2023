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
let handBrake;
let ignition;
let tachometer;
let speedometer;

let mouseOn = false;

let clutch = false;
let brake = false;
let accelerator = false;
let startStop = false;
let parkOn = true;
let pButton = false;

let engineOn = false;

let rpm = 0;
let speed = 0;
let rpmFactor = 0;

let engineSFX;
let ignitionSFX;
let pedalSFX;
let clutchUpSFX;
let clutchDownSFX;



/**
 * loads all the SFX
*/
function preload() {
    engineSFX = loadSound(`assets/sounds/engine.wav`);
    ignitionSFX = loadSound(`assets/sounds/ignition.wav`);
    pedalSFX = loadSound(`assets/sounds/pedal.wav`);
    clutchUpSFX = loadSound(`assets/sounds/clutch_up.wav`);
    clutchDownSFX = loadSound(`assets/sounds/clutch_down.wav`);
}


/**
 * defining the sounds and classes
*/
function setup() {
    createCanvas(1200,800);
    
    tachometer = new Tachometer(180,180);
    speedometer = new Speedometer(450,180);
    ignition = new Ignition(620,300);
    handBrake = new HandBrake(680,400);
    transmission = new Transmission(980,450);
    pedals = new Pedals(350,600);

}


/**
 * display all classes, methods and functions
*/
function draw() {
    background(200);

    handleRPM();
    handleSpeed();

    tachometer.move();
    tachometer.display();
    speedometer.move();
    speedometer.display();
    handBrake.pressed();
    handBrake.display();
    ignition.pressed();
    ignition.display();
    transmission.pressed();
    transmission.display();
    pedals.pedalDown();
    pedals.display();

    console.log(engineOn);

}

// change the mouse interaction on the classes
function mousePressed() {
    mouseOn = true;

    if (startStop === true && engineOn === false) {
        ignitionSFX.loop();
       }

}

function mouseReleased() {
    mouseOn = false;
    if (startStop === true && engineOn === false) {
        engineOn = true;
    }
    else if (startStop === true && engineOn === true) {
        engineOn = false;
    }
    if (pButton === true && parkOn === false) {
        parkOn = true;
    }
    else if (pButton === true && parkOn === true) {
        parkOn = false;
    }

    if (ignitionSFX.isPlaying()) {
        ignitionSFX.stop();
     }

     if (engineOn === true) {
        engineSFX.loop();
     }

}

function keyPressed() {
    //sound for the pedals
    if (keyCode === 65 || keyCode === 83 || keyCode === 68) {
        pedalSFX.rate(1);
        pedalSFX.play();
    }
}

function keyReleased() {
    //sound for the pedals
    if (keyCode === 65 || keyCode === 83 || keyCode === 68) {
    pedalSFX.rate(-1);
    pedalSFX.play();
    }
}


function handleRPM() {

    // rpm limits
    if (rpm <= 0) {
        rpm = 0;
        }
    else if (rpm >= 7000) {
        rpm = 7000;
    }
    
    if (rpm === 0 && engineOn === true) {
        
    }

    if (engineOn === true && currentGear === 0 & rpm <= 600) {
        // if (rpm < 600) {
        // rpm += rpmFactor;
        // }
        // else {
            rpm = 600;
        // }
    }
    else if (engineOn === true && speed >= 3 && rpm <= 600) {
        rpm = 600;
    }


    // change to rpm factor based on the gear
    if (currentGear != 0) {
        rpmFactor = map(currentGear,1,5,20,5);
    }
    else if (currentGear === 6) {
        rpmFactor = 10;
    }
    else if (engineOn === false) {
        rpmFactor = 100;
    }
    else {
        rpmFactor = 100;
    }
    
    // to increase the rpm
    if (accelerator === true && engineOn === true) {
        rpm += rpmFactor;
    }
    else { // to decrease
        rpm -= rpmFactor;
    }

    // to handle the engine loop
    if (rpm < 600) {
        engineSFX.rate(map(rpm,0,600,0,1));
    }
    else if (rpm >= 600) {
        engineSFX.rate(map(rpm,600,7000,1,3));
    }
    else if (currentGear === 6 && accelerator === true) {
        engineSFX.rate(map(rpm,600,7000,-1,-2));
    }

}

function handleSpeed() {
    // speed limits
    if (speed <= 0) {
        speed = 0;
    }
    else if (speed >= 200) {
        speed = 200;
    }

    // to reduce speed
    if (brake === true) { // with brake
        speed -= 0.3;
    }
    if (parkOn === true) { // with hand brake
        speed -= 0.1;
    }
    if (speed > 0 && accelerator === false && engineOn === true) { // with inertia
        speed -= 0.03;
    }
    else if (speed > 0 && engineOn === false) {
        speed -= 0.03;
    }
    
    // increases speed
    if (engineOn === true) {
        if (accelerator === true && brake === false && parkOn === false) {
            if (currentGear != 0) {
                speed += map(currentGear,1,5,0.1,0.05);
            }
            else if (currentGear === 6) {
                speed += 0.1;
            }
        }
    }
}

