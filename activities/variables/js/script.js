/**
 * Variables
 * Andre Neder
 * 
 * Variables experiments and exercise
 */

"use strict";

/**
 * Description of preload
*/
function preload() {

}


// defining a variable it can either be as bellow or under settup or draw as circleSize = 200;
// variable names must be named continiguosly, like one name with no spaces, avoid numbers or weird simbols
// if there is a difference of lower X upper case javascript will respect that, so make sure it follows the exact name


let backgroundShade = 0;
let circleX = 0;
let circleY = 250;
let circleSize = 200;
//in programming, rather than subtracting values it might be better to use negative numbers
let circleSpeed = 2;
let circleAcceleration = 0.25;


function setup() {
createCanvas(500, 500);
}


// variables can be altered as seen below
// the += can be used as a way to add the value of the variable to itself


function draw() {
    

background(backgroundShade);
circleX += circleSpeed;
circleSpeed = circleSpeed + circleAcceleration;
ellipse(circleX, circleY, circleSize);
}