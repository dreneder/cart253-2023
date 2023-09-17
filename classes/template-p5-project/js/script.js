/**
 * Drwaing experiments
 * Andre Neder
 * 
 * Experimenting with p5's drawing and color function
 * currently draws a face
 */

"use strict";

/**
 * Description of preload
*/
function preload() {

}


/**
 * draws a face
*/
function setup() {
createCanvas(500, 500);

//set the background to mint
background(191, 255, 199);

//draw a flesh-coloured head
fill(250, 200, 200);
ellipse(250, 250, 200, 200);

//Draw the eyes
fill(0, 0, 255);
ellipse(200, 250, 30, 30);
ellipse(300, 250, 30, 30);

//draw mouth black
strokeWeight(10);
line(200, 300, 300, 300);



/**
 * shapeMode is to determine the anchor point of the next rectangles in the code
 * fill and shape mode come before the shape you're drawing
 * noFill or noStroke also come bedfore and define the parameter for such shapes
 */





}


/**
 * Description of draw()
*/
function draw() {

}