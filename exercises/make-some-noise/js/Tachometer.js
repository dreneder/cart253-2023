class Tachometer {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.size = 220;
        this.needle = undefined; // for angle
    }

move(){
    //moves the needle according to the RPM
    this.needle = map(rpm,0,7000,149,359);
}

display() {
    // defines
    angleMode(DEGREES);
    
    // draws the main gauge cluster
    push();
    translate(this.x,this.y);
    fill(255);
    stroke(0,0,255);
    strokeWeight(5);
    ellipse(0,0,this.size);
    noStroke();
    
    // draws text of RPM
    fill(0);
    textAlign(CENTER,CENTER);
    textStyle(BOLD);
    textSize(40);
    text(`RPM`,0,50);
    textSize(15);
    text(`x1000`,0,75);
    
    
    // rotate for the angle of the first level
    rotate(-45);
    //draws the levels of gauge
    for (let i = 0; i < 8; i++) {
        fill(0);
        rotate(30); // rotate at each addition
        rect(-110,0,15,3);
        push();
        translate(-85,0); //draws number above the first level
        rotate(15+i*-30); // counter rotates each number so it's allingned
        textSize(20);
        text(i,0,0+1); // writes number according to loop
        pop();
    }
    
    // draws the needle
    rotate(this.needle);
    fill(100,100,255);
    triangle(0,3,-100,0,0,-3);
    
    // center circle
    fill(60);
    ellipse(0,0,12);
      
    pop();
}
}