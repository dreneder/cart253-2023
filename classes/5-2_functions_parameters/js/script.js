

function preload() {
    
}


function setup() {
    createCanvas(500,500);
}


function draw() {
    background(0);

// read the comment bellow first
// when information is inside the paranthesis of a function they are called arguments
// the arguments in the functions here are taking the values assigned according
// to each object
    parallels(100,100,5,1,100,1);
    parallels(50,50,10,2,20,10);
    parallels(200,200,15,7,3,20);
    parallels(312,257,20,0.5,300,2)
    
}

// when information is inside the paranthesis of a function they are called parameters
// the parameters are values that can be defined in draw
function parallels(x,y, numLines, lineWidth, lineHeight, lineSpacing) { 
    for (let i = 0; i < numLines; i++) {
        noStroke();
        fill(255);
        rectMode(CENTER);
        rect(x,y,lineWidth,lineHeight);
        x = x + lineSpacing;
    }
}