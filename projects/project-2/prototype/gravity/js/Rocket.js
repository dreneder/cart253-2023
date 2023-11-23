class Rocket {

    constructor(_mass, _pos, _vel, angle) { // before was x,y,angle
    // this.x = x;
    // this.y = y;
    this.width = 70;
    this.height = 40;
    this.vx = 0;
    this.vy = 0;

    this.angle = angle;
    this.speed = 0;
    this.maxSpeed = 1;
    this.boost = 0.001;
    this.reverseBoost = -0.001;
    this.mass = _mass;
    this.pos = _pos;
    this.vel = _vel;
      this.path = [];
      this.boostOn = false;
    }


move() {

    if (this.boostOn === true) {
   this.vel.x += this.speed * cos(this.angle);
   this.vel.y += this.speed * sin(this.angle);
    }

    this.pos.x = this.pos.x + this.vel.x;
    this.pos.y = this.pos.y + this.vel.y;

    // if(this.y - this.size/2 > height) {
    //     this.active = false;
    // }

}



handleInput() {
    if (keyIsDown(LEFT_ARROW)) {
      // Turn LEFT if the LEFT arrow is pressed
      this.angle -= 0.05;
    }
    else if (keyIsDown(RIGHT_ARROW)) {
      // Turn RIGHT if the RIGHT arrow is pressed
      this.angle += 0.05;
    }
    
    if (keyIsDown(UP_ARROW)) {
      // Accelerate forward if the UP ARROW is pressed
      this.boostOn = true;
      this.speed += this.boost;
      this.speed = constrain(this.speed, 0, this.maxSpeed);
    }
    // Brake if the DOWN ARROW is pressed
    else if (keyIsDown(DOWN_ARROW)) {
      if (this.speed > 0) {
      this.speed += this.reverseBoost;
      this.speed = constrain(this.speed, 0, this.maxSpeed);
      }
      else if (this.speed <= 0) {
      this.speed -= this.boost;
      this.speed = constrain(this.speed, -this.maxSpeed/4, 0);
    }
    else {
      // Apply drag if neither are pressed
    //   this.speed += this.drag;
      this.speed = constrain(this.speed, 0, this.maxSpeed);
    }
  }
}

update() {
  this.pos.x += this.vel.x;
  this.pos.y += this.vel.y;
  this.path.push(createVector(this.pos.x,this.pos.y));
  if (this.path.length > 500) { // keep path at a constant lenght
      this.path.splice(0,1);
  }

}


display() {
  push();
  translate(this.pos.x,this.pos.y);
  rotate(this.angle);
  fill(255,0,0);
  noStroke();
  rectMode(CENTER);
  rect(this.width/2+5,0,this.width,this.height-10);
  fill(255);
  rect(5,0,this.width-60,this.height);
  pop();
  
  push();
  strokeWeight(2);
  stroke(255);
  for (let i = 0; i < this.path.length-2; i++) {
    line(this.path[i].x, this.path[i].y, this.path[i+1].x, this.path[i+1].y,);
  }
  pop();
  
}




applyForce(f) {
  this.vel.x += f.x / this.mass;
  this.vel.y += f.y / this.mass;
}


// attract(body) {
 
  
//   let r = dist(this.pos.x, this.pos.y, body.pos.x, body.pos.y);
//   let f = this.pos.copy().sub(body.pos);

//   f.setMag((gravity * this.mass * body.mass) / (r * r));

//   body.applyForce(f);
// }





}