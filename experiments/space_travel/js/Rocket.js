class Rocket {

    constructor(x,y,accx,accy,radius,angle) { 
      this.pos = createVector(x, y);
      this.acceleration = createVector(accx, accy);
      this.vel = createVector(0, 0);
      this.radius = radius;
      this.traj = [];
      this.angle = angle;
      this.count = 0;
      this.mass = 10;
      this.Gravity = 1;
      this.width = 90;
      this.height = 30;
      this.orbitCount = 0;
      this.orbitChecked = false;
      this.orbitUnChecked = true;
      this.orbitR = 255; 
      this.orbitG = 0; 
      this.orbitB = 0; 
    }


display() {
  push(); // draws the rocket
  translate(this.pos.x,this.pos.y);
  rotate(this.angle);
imageMode(CENTER);
image(rocketImg,0,0,120,40);
  // noStroke();
  // rectMode(CENTER);
  // fill(255);
  // rect(0,0,this.width,this.height);
  pop();


 
  if (500 == this.count ) { // calculates the max amount of trail points
    for (let i = 0; i < this.count-1; i++) {
      this.traj[i] = this.traj[i+1];
    }
    this.traj[this.count-1] = createVector(this.pos.x,this.pos.y);
  } else { // uses the last position of the rocket
    this.traj[this.count] = createVector(this.pos.x,this.pos.y);
    this.count++;
  }// draws an orbit trail
  for (let i =0; i < this.traj.length; i++) {
    fill(this.orbitR,this.orbitG,this.orbitB);
    noStroke();
    ellipse(this.traj[i].x, this.traj[i].y, 2);
  }
  
}




applyForce(force) { // adds force to the acceleration

	this.acceleration.add(force);


}


gravity () {
  this.vel.add(this.acceleration);
  this.pos.add(this.vel);
  this.acceleration.mult(0);
}



orbit (body) {
  let gravity_force = 0; 
  let gravity_force_x = 0; 
  let gravity_force_y = 0; 
  let x_dir = 0;
  let y_dir = 0;
  let alpha =  0;


  // gravitational force
  let g_dist = dist(this.pos.x,this.pos.y,body.pos.x,body.pos.y)
  gravity_force = ((this.Gravity * this.mass * body.mass)/(sq(g_dist)));
  if (body.pos.x != this.pos.x) {
    alpha = atan(abs((body.pos.y - this.pos.y)) / abs((body.pos.x - this.pos.x)));
    gravity_force_x = gravity_force * cos(alpha);
    gravity_force_y = gravity_force * sin(alpha);
  } else {
    gravity_force_x = 0;
    gravity_force_y = gravity_force;
  }	

  // gravitational force direction
  if (this.pos.x < body.pos.x) { // if going counter clockwise
    if(this.pos.y < body.pos.y) {
      x_dir = 1;
      y_dir = 1;
    } else {
      x_dir = 1;
      y_dir = -1;
    }
  } else {
    if(this.pos.y < body.pos.y) { //if going clockwise
      x_dir = -1;
      y_dir = 1;
    } else {
      x_dir = -1;
      y_dir = -1;
    }
  }

  /* Apply gravitational force */
  this.applyForce(createVector((x_dir * gravity_force_x), (y_dir * gravity_force_y)));
}

bounds() { //calculates if the rocket has gone further than the a width or height and a half
  if (this.pos.x > width*1.5 || 
      this.pos.x < 0-width*1.5 ||
      this.pos.y > height*1.5 ||
      this.pos.y < 0-height*1.5) {
        screen = `lost`; // the rocket is lost
      }

      // checks if the rockets collides with the earth
      let d = dist(this.pos.x,this.pos.y,width/2,height/2);
      if (d < 300/2) {
        screen = `crashed`; // rocket is crashed :(
      }
}




recordOrbits() {
   let dOrbit = dist(this.pos.x,this.pos.y,orbitCounter.x,orbitCounter.y);
   if (dOrbit <= 50 && this.orbitChecked === false) {
    this.orbitChecked = true;
  }
  else if (dOrbit >= 50 && this.orbitChecked === true) {
  this.orbitCount++;
  this.orbitChecked = false;
  }
  // console.log(this.orbitCount);
  
   if (this.orbitCount > 1) {
    this.orbitR = 255;
    this.orbitG = 234;
    this.orbitB = 0;
  }
  if (this.orbitCount > 2) {
    this.orbitR = 0;
    this.orbitG = 255;
    this.orbitB = 0;
  }
  if (this.orbitCount > 3) {
    screen = `mission complete`;
  }

}




}