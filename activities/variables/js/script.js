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

//in programming, rather than subtracting values it might be better to use negative numbers


// making a javascript object, instead of using "=" you use ":" to define value and a "," to separate the values
// the objects are a set of properties that can be defined as different variables and then used in the program
let circle = {
    x: 0,
    y: 250,
    size: 200,
    speed: 2
};

function setup() {
createCanvas(500, 500);
}


// variables can be altered as seen below
// the += can be used as a way to add the value of the variable to itself


function draw() {
background(backgroundShade);
circle.x = circle.x + circle.speed;
ellipse(circle.x, circle.y, circle.size);
}