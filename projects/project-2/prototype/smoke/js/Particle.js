class Particle {
    constructor(velX, velY, x, y) {
      
      this.alpha = 330; // alpha is used for size and fade
      
    
        this.x = x;
        this.y = y;
      
   // starts with smoke going a little wild in direction (booster on)
      this.velX = random(-3, 3);
      this.velY = random(-0.5, 1);
      
    }
    // adds the random velocitys to particles and changes the alpha / size as it goes higher
    move() {
      this.x += this.velX;
      this.y += this.velY;
      this.alpha -= map(rocket.y,height/8*7,0,1,3);
    }
    
   

    display() { // display the particle
      let size = map(this.alpha, 0, 200, 5, 30) // maps alpha for the size
      fill(100, this.alpha);
      strokeWeight(1);
      stroke(200, this.alpha);
      ellipse(this.x, this.y, size);
    }
    
    finished() {
      return this.alpha < 0; // will be used to splice once it reaches the value
    }
    
      liftOff() {
    
        if (stageCounter === 2) {
          // values change as the ship is lifting
          this.velX = random(-0.0001, 0.0001);
          this.velY = map(rocket.y,height/8*7,0,1,10);
         
        }
      
  }
}