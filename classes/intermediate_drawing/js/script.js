let angle = 0;

function setup() {
    createCanvas(500,500);
}


function draw() {
    background(255);

// already seen this: push and pop can make a shape independent from another
    // push();
    // fill(255,0,0);
    // stroke(0,255,255);
    // strokeWeight(10);
    // rect(100,100,100,100);
    // pop();

    // fill(0,0,255);
    // rect(300,100,100,100);

// already seen translate, but now aware that it is cumulative
    // fill(255, 0, 0);
    // rect (0, 0, 100, 100);

    // translate (200, 100);
    // fill (0,255,0); rect (0, 0, 100, 100);
    
    // // this is where it acumulates, so then push and pop can be used to translate and not cumulate
    // translate (0,200);
    // fill(0,0,255) ; rect (0,0, 100, 100);

    push();
    fill(255,0,0);
    rectMode(CENTER);
    translate(width/2,height/2);
    rotate(angle);
    // you can also use scale to make the size multiply
    scale(2);
    rect(0,0,100,100);
    pop();

    angle = angle + 0.01;
}