class Earth {

    
    constructor(x, y) {
    this.pos = createVector(x, y);
	this.radius = 250;
	this.mass = 300;

    
   
    }



    display() {
        push();
        fill(100,100,255);
        noStroke();
        ellipse(this.pos.x,this.pos.y,this.radius);
        // strokeWeight(2);
        // stroke(255);
        // for (let i = 0; i < this.path.length-2; i++) {
        //     line(this.path[i].x, this.path[i].y, this.path[i+1].x, this.path[i+1].y,);
        // }
        pop();
    }

  
}
