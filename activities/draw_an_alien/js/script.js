/**
 * Alien
 * Andre Neder
 * 
 * this is my attempt to draw an alien using 2D shape elements in p5
 */

"use strict";

/**
 * Description of preload
*/
function preload() {

}


/**
 * Description of setup
*/
function setup() {


    createCanvas(640, 480);

    background(194);

    noStroke();

// draw the body
fill(36);
ellipse(320, 480, 200, 400)


//draw the head




noStroke();
fill(34);
beginShape();
curveVertex(170, 310);
curveVertex(170, 310);
curveVertex(130, 190);
curveVertex(520, 90);
curveVertex(500, 220);
curveVertex(200, 310);
endShape(CLOSE);

//shape on head

noStroke();
fill(150, 150, 150, 100);
beginShape();
curveVertex(140, 270);
curveVertex(140, 270);
curveVertex(120, 195);
curveVertex(430, 100);
curveVertex(450, 180);

endShape(CLOSE);

//mouth

stroke(200);
strokeWeight(5);
noFill();

beginShape();
curveVertex(140, 270);
curveVertex(140, 270);
curveVertex(190, 270);
curveVertex(210, 300);
curveVertex(170, 310);
curveVertex(170, 310);


endShape();

//teeth top

noStroke();
fill(255);
beginShape();
vertex(140, 270);
vertex(142, 300);
vertex(145, 270);
vertex(148, 290);
vertex(150, 270);
vertex(153, 290);
vertex(155, 270);
vertex(158, 290);
vertex(161, 270);
vertex(163, 285);
vertex(165, 270);
vertex(168, 285);
vertex(171, 270);

endShape();

//teeth bottom

noStroke();
fill(230, 230, 230, 250);
beginShape();
vertex(170, 310);
vertex(172, 290);
vertex(175, 310);
vertex(178, 295);
vertex(180, 310);
vertex(181, 295);
vertex(185, 310);
vertex(188, 295);
vertex(191, 308);
vertex(194, 295);
vertex(197, 308);



endShape();


}


/**
 * Description of draw()
*/
function draw() {

}