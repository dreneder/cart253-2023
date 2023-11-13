class Transmission {
    constructor (x,y) {
        this.x = x;
        this.y = y;
        this.gear1 = createVector(0,0);
        this.gear2 = createVector(0,0);
        this.gear3 = createVector(0,0);
        this.gear4 = createVector(0,0);
        this.gear5 = createVector(0,0);
        this.nuetral = createVector(0,0);
        this.reverse = createVector(0,0);
    }
    
    move() {
        
    }

    display() {
        push();
        translate(this.x,this.y);
        
        fill(0);
        noStroke();
        rectMode(CENTER);
        rect(0,0,300,450);
        // fill(150);
        // rectMode(CORNER);
        // rect(-135,0,30,450);
        
        
        stroke(255,0,0);
        stroke(20);
        point(0,0);
        
        pop();
    }









}