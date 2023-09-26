
"use strict";

/**
 * Description of preload
*/
function preload() {

}


function setup() {
let caterpillar = {
    x: 100,
    y: 250,
    segmentSize: 50
}


function setup() {
    createCanvas(500,500);
}


function draw() {

    background(0);
    noStroke();
    fill(100,200,100);

    // let x = caterpillar.x;
    // let numSegments = 10;
    // let segmentsDrawn = 0;

// WHILE LOOPS - like an if statement that keeps doing the action until false
// this creates a loop of ellipses drwan according to the objects just set
// so if the segmants drawn are less then the desired it will generate a new one according
// to the last command on the condition that tells it to add one,
// this can be done in one of the following ways but ++ is more efficient
    // while (segmentsDrawn < numSegments) {
    //     ellipse (x, caterpillar.y, caterpillar.segmentSize);
    //     x = x + 40;
    //     // segmentsDrawn = segmentsDrawn + 1;
    //     segmentsDrawn++;
    // }



// FOR LOOPS - based on counting   
// with "for" the loop can be made even more efficiently, you still need to set the following objects
// and draw and ellipse inside and the value it will increase, but the commands inside for are separated by ";"
// you have to include the object that starts it, the value limiter and the counter at the end
    let x = caterpillar.x;
    let numSegments = 10;

    // for (let segmentsDrawn = 0; segmentsDrawn < numSegments; segmentsDrawn++) {
// it can be substituted by "i", so it does not need to be an object defined
    for (let i = 0; i < numSegments; i++) {
        ellipse (x, caterpillar.y, caterpillar.segmentSize);
        x = x + 40;
    }

