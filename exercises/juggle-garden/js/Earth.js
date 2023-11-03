class Earth {

    
    constructor(_mass, _pos, _vel) {
        this.mass = _mass;
        this.pos = _pos;
        this.vel = _vel;
        this.r = this.mass;
        this.path = []; // creates an orbit path

    
   
    }



    display() {
        push();
        fill(100,100,255);
        noStroke();
        ellipse(this.pos.x,this.pos.y,this.r);
        strokeWeight(2);
        stroke(255);
        for (let i = 0; i < this.path.length-2; i++) {
            line(this.path[i].x, this.path[i].y, this.path[i+1].x, this.path[i+1].y,);
        }
        pop();
    }

    //updates the position of the object in orbit according to the velocity
    update() {
        this.pos.x += this.vel.x; // adds velocity
        this.pos.y += this.vel.y;
        this.path.push(createVector(this.pos.x,this.pos.y)); //creates a trail path
        if (this.path.length > 500) { // keep path at a maximum lenght of 500
            this.path.splice(0,1);
        }
    
  }

    applyForce(f) { // uses the last object position to apply force according to the mass
        this.vel.x += f.x / this.mass; 
        this.vel.y += f.y / this.mass;
    }


    attract(body) {
       
        // uses the force of attraction to move object on orbit
        let r = dist(this.pos.x, this.pos.y, body.pos.x, body.pos.y); //measures distance between earth and the object
        let f = this.pos.copy().sub(body.pos); // creates for by subtracting the earth's position by the object's position

        // set's the magnetude of the force vector by dividing gravity and both masses by their distance 
        f.setMag((gravity * this.mass * body.mass) / (r * r)); 

        body.applyForce(f);
    }
}
