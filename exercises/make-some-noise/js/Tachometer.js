class Tachometer {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.size = 220;
    }

display() {
    push();
    translate(this.x,this.y);
    fill(255);
    stroke(0,0,255);
    strokeWeight(5);
    ellipse(0,0,this.size);
    noStroke();
    fill(60);
    ellipse(0,0,this.size*0.05)
    pop();
}
}