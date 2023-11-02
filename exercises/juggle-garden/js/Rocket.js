class Rocket {

    constructor(x,y,angle) {
    this.x = x;
    this.y = y;
    this.width = 70;
    this.height = 40;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.angle = angle;
    this.speed = 0;
    this.maxSpeed = 10;
    this.acceleration = 0.1;
    this.braking = -0.1;


    }


move() {
    this.vx = this.vx + this.ax;
    this.vy = this.vy + this.ay;

   this.vx = this.speed * cos(this.angle);
   this.vy = this.speed * sin(this.angle);

    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

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
      this.speed += this.acceleration;
      this.speed = constrain(this.speed, 0, this.maxSpeed);
    }
    // Brake if the DOWN ARROW is pressed
    else if (keyIsDown(DOWN_ARROW)) {
      if (this.speed > 0) {
      this.speed += this.braking;
      this.speed = constrain(this.speed, 0, this.maxSpeed);
      }
      else if (this.speed <= 0) {
      this.speed -= this.acceleration;
      this.speed = constrain(this.speed, -this.maxSpeed/4, 0);
    }
    else {
      // Apply drag if neither are pressed
    //   this.speed += this.drag;
      this.speed = constrain(this.speed, 0, this.maxSpeed);
    }
  }
}


display() {
    push();
    translate(this.x,this.y);
    rotate(this.angle);
    fill(255,0,0);
    noStroke();
    rectMode(CENTER);
    rect(this.width/2+5,0,this.width,this.height-10);
    fill(255);
    rect(5,0,this.width-60,this.height);
    pop();

}



}