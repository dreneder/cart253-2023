/**
 * What is love? (baby don't hurt me...)
 * André Neder
 * 
 *So the objective here is lovely, it is tragic, but difinitely a classic. So you control the cirlcle Romeo and you
 *must meet with Juliet to meet your destiny and you must do so without the Montagues and the Capulets finding out.
 *When you meet Juliet you must take, hughh... poison! Just click the mouse button. 
 *The Capulets are always following Juliet, while the Montagues are following Romeo
 *Juliet runs from the montagues
 *if Capulets get Romeo he dies
 *if Montagues get Juliet she dies
 *Romeo needs to get close to Juliet and get married (mouse click)
 */

"use strict";

// not using preload but will leave it here just in case
function preload() {

}
// defining objects
let juliet = {
    x: undefined,
    y: undefined,
    size: 100,
    vx: 0,
    vy: 0,
    speed: 3
};

let romeo = {
    x: undefined,
    y: undefined,
    size: 100,
    vx: 0,
    vy: 0,
    speed: 3
};

let montag = {
    x: 0,
    y: 0,
    size: 300,
    vx: 0,
    vy: 0,
    speed: 0
};

let capulet = {
    x: 0,
    y: 0,
    size: 300,
    vx: 0,
    vy: 0,
    speed: 0
};


// setting up the canvas and a few initial parameters
function setup() {
    createCanvas(windowWidth,windowHeight);

    //juliet, capulets and montagues spawn at a random positions
    juliet.x = random(0,width);
    juliet.y = random(0,height);
    capulet.x = random(0,width);
    capulet.y = random(0,height);
    montag.x = random(0,width);
    montag.y = random(0,height);
    // juliet initial speed
    juliet.vx = juliet.speed;
    juliet.vy = juliet.speed;
}

function draw() {
    background(0);

    romeoMove();
    julietMove();
    capuletMove();
    montagMove();
    capuletOverlap();



    // make juliet run from romeo if montagues are near
    let dMontag = dist(juliet.x, juliet.y, montag.x, montag.y);
    if (dMontag <= juliet.size/3*2 + montag.size/3*2) {
       countdown = 1;
       juliet.speed = 10;
       
       // mapping the distance from juliet and romeo so she actually runs away when 
       let awayFromRomeoX = juliet.x - romeo.x;
       let awayFromRomeoY = juliet.y - romeo.y;   
       juliet.vx = map(awayFromRomeoX, -width/2, width/2, -juliet.speed, juliet.speed);
       juliet.vy = map(awayFromRomeoY, -height/2, height/2, -juliet.speed, juliet.speed);
     
    }
    else if (dMontag >= juliet.size/3*5 + montag.size/3*5) { // resets her speed when far
        juliet.speed = 3;
    }

    
    display();

console.log("x is " + capulet.x + "y is " + capulet.y);
  
    
}

function romeoMove() {
       // Romeo movement
       romeo.x = mouseX;
       romeo.y = mouseY;
   
}

function julietMove(){
     // move juliet
     juliet.x += juliet.vx;
     juliet.y += juliet.vy;
 
     // bounce juliet
     if (juliet.x <= 0 + juliet.size/2 || juliet.x >= width + -juliet.size/2) {
         juliet.vx = -juliet.vx;
     }
     if (juliet.y <= 0 + juliet.size/2 || juliet.y >= height + -juliet.size/2) {
         juliet.vy = -juliet.vy;
     }
}

function capuletMove() {
     //capulet follows juliet
     if (juliet.x > capulet.x) {
        capulet.vx = capulet.speed;
    }
    else if (juliet.x < capulet.x) {
        capulet.vx = -capulet.speed;
    }
     if (juliet.y > capulet.y) {
        capulet.vy = capulet.speed;
    }
    else if (juliet.y < capulet.y) {
        capulet.vy = -capulet.speed;
    }

    // capulet movement
    capulet.speed = juliet.speed + -1;

    capulet.x = capulet.x + capulet.vx;
    capulet.y = capulet.y + capulet.vy;
}

function montagMove() {
     //montague follow romeo
     if (romeo.x > montag.x) {
        montag.vx = montag.speed;
    }
    else if (romeo.x < montag.x) {
        montag.vx = -montag.speed;
    }
     if (romeo.y > montag.y) {
        montag.vy = montag.speed;
    }
    else if (romeo.y < capulet.y) {
        montag.vy = -montag.speed;
    }

    // montague movement
    montag.speed = 3;

    montag.x = montag.x + montag.vx;
    montag.y = montag.y + montag.vy;

}

function capuletOverlap() {
     //limit capulet overlap 
     let dCapulet = dist(juliet.x, juliet.y, capulet.x, capulet.y);
     if (dCapulet <= juliet.size/2 + capulet.size/2) {
         capulet.speed = 0;
         capulet.speed = 0;
     }
}

function display() {
    textSize(60);
    fill(255);
    textAlign(CENTER,CENTER);

    noStroke();
    fill(117, 4, 148);
    ellipse(capulet.x,capulet.y,capulet.size);
    fill(255);
    text('CAPU',capulet.x,capulet.y-23);
    text('LETS',capulet.x,capulet.y+23);
    
    fill(4, 138, 122);
    ellipse(montag.x,montag.y,montag.size);
    fill(255);
    text('MONTA',montag.x,montag.y-23);
    text('GUES',montag.x,montag.y+23);

    textSize(20);
    fill(221, 115, 250);
    ellipse(juliet.x, juliet.y, juliet.size, juliet.size);
    fill(255);
    text('JULZ',juliet.x,juliet.y);

    fill(40, 222, 200);
    ellipse(romeo.x,romeo.y,romeo.size);
    fill(255);
    text('ROMY',romeo.x,romeo.y);
}