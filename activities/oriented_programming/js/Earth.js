class Earth {


    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.size = 300;
    }



    display() {
        push();
        fill(100,100,255);
        noStroke();
        ellipse(this.x,this.y,this.size);
        pop();
    }

}