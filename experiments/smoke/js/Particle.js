class Particle {
    constructor(side, velX, velY) {
      
      this.alpha = 230;
      
    
        this.x = width/4+20;
        this.y = height/2;
      
  
      this.velX = random(-1, 1);
      this.velY = map(mouseY,0,height,0,20);
      
    }
    
    move() {
      this.x += this.velX;
      this.y += this.velY;
      this.alpha -= map(mouseY,0,height,1,35);
    }
    
    display() { 
      let size = map(this.alpha, 0, 200, 5, 30)
      fill(100, this.alpha);
      // stroke(100);
      noStroke();
      ellipse(this.x, this.y, size);
    }
    
    finished() {
      return this.alpha < 0;
    }
  }