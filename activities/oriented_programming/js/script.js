

"use strict";

let paddle;

let ball;

let gravityForce = 0.0025;


function setup() {
createCanvas(windowWidth,windowHeight);

paddle = new Paddle(300,20);


    ball = new Ball(width/2,height/2);

}


function draw() {
    background(0);


    paddle.move();
    paddle.display();

 
        if(ball.active) {
        ball.gravity(gravityForce);
        ball.move();
        ball.bounce(paddle);
        ball.display();
        }

}