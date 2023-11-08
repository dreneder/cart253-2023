/**
 * smoke experiment
 * André Neder
 * 
 * 
 * 
 */

"use strict";


let smoke = [];
// let ash = [];
let randSide = Math.random(1)<0.5 ? "right" : "left";
let chimneyL, chimneyR;







function setup() {
  let canvas = createCanvas(windowWidth-20, windowHeight-50);

}

function draw() {
  background(255);

  for (let i=0; i<5; i++){
    let p = new Particle(randSide, 1, 1);
    smoke.push(p);
  }
  
  for (let i = smoke.length-1; i >= 0; i--) {
    smoke[i].move();
    smoke[i].display();
    
    if(smoke[i].finished()) {
      smoke.splice(i, 1);
    }
    }  }
