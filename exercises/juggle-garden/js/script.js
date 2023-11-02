

"use strict";


let gravityForce = 0.0025;

let earth;

let rocket;


function setup() {
createCanvas(windowWidth,windowHeight);

// paddle = new Paddle(300,20);
// ball = new Ball(width/2,height/2);

let x = width/2;
let y = height/4*3;

rocket = new Rocket(x,y,0);
earth = new Earth(width/2,height/2);

}


function draw() {
    background(0);


    // paddle.move();
    // paddle.display();
    
    // if(ball.active) {
    // ball.gravity(gravityForce);
    // ball.move();
    // ball.bounce(paddle);
    // ball.display();
    // }


    earth.display();
    rocket.display();
    rocket.move();
    rocket.handleInput();
    



}