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


// defining a variable it can either be as bellow or under settup as circleSize = 100;
// variable names must be named continiguosly, like one name with no spaces, avoid numbers or weird simbols
// if there is a difference of lower X upper case javascript will respect that, so make sure it follows the exact name


let backgroundShade = 0;
let cricleX = 250;
let circleY = 250;
let circleSize = 100;


function setup() {
createCanvas(500, 500);
}


/**
 * Description of draw()
*/
function draw() {
background(backgroundShade);
ellipse(circleX, circleY, circleSize);
}