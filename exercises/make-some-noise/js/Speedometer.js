class Speedometer { // almost a copy of tachometer
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.size = 220;
        this.needle = undefined; // for angle
    }

move(){
    //moves the needle according to the speed
    this.needle = map(speed,0,200,129.5,359);
}

display() {
    // defines
    angleMode(DEGREES);
    
    // draws the main gauge cluster
    push();
    translate(this.x,this.y);
    fill(255);
    stroke(50,150,50);
    strokeWeight(5);
    ellipse(0,0,this.size);
    noStroke();
    
    // draws text of kilometer/hour
    fill(0);
    textAlign(CENTER,CENTER);
    textStyle(BOLD);
    textSize(30);
    text(`Km/h`,0,60);

    
    
    // rotate for the angle of the first level
    rotate(-46);
    //draws the levels of gauge
    for (let i = 0; i < 11; i++) {
        fill(0);
        rotate(23); // rotate at each addition
        rect(-110,0,10,2);
        push();
        translate(-85,0); //draws number above the first level
        rotate(23+i*-23); // counter rotates each number so it's allingned
        textSize(15);
        text(i*20,0,0+1); // writes number according to loop
        pop();
    }
    
    // draws the needle
    rotate(this.needle);
    fill(100,200,100);
    triangle(0,3,-100,0,0,-3);
    
    // center circle
    fill(60);
    ellipse(0,0,12);
      
    pop();
}
}