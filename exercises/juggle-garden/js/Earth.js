class Earth {


    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.size = 300;
    //     this.mass = _mass
    //     this.pos = _pos
    //     this.vel = _vel
    //     this.d = this.mass*2
    //     this.thetaInit = 0
    //     this.path = []
    //     this.pathLen = Infinity
    }



    display() {
        push();
        fill(100,100,255);
        noStroke();
        ellipse(this.x,this.y,this.size);
        pop();
    }

}
