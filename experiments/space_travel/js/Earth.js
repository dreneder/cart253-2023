class Earth {

    
    constructor(x, y, radius) {
    this.pos = createVector(x, y);
	this.radius = radius;
	this.mass = 1000;
    this.sprite = new Sprite(x,y,radius);
    
   
    }



    display() {
        push();
        fill(100,100,255);
        noStroke();
        imageMode(CENTER);
        // image(earthImg,this.pos.x,this.pos.y,this.radius,this.radius);
        // ellipse(this.pos.x,this.pos.y,this.radius);
        pop();

        // this.sprite.x = this.pos.x;
        // this.sprite.y = this.pos.y;
        this.sprite.collider = 'static';
    }

  
}
