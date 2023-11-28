class Particle {
    constructor(velX, velY, x, y) {
      
      this.alpha = 330; // alpha is used for size and fade
      
    
        this.x = x;
        this.y = y;
        this.particleSprite;
        
        this.fireLevel = 0;
        
        // starts with smoke going a little wild in direction (booster on)
        // this.velX = random(-3, 3);
        // this.velY = random(-0.5, 1);
        // this.mapx = map(mouseX,0,width,1,6);
        this.velX = random(-1,1);
        this.velY = map(altitude,0,120,1,0,true);
        
      }
      // adds the random velocitys to particles and changes the alpha / size as it goes higher
      move() {
        this.x += this.velX;
        this.y += this.velY;
        // this.alpha -= map(rocket.y,height/8*7,0,1,3);
        this.alpha -= map(altitude,0,120,1,0.1,true);
      }
      
      
      
      display() { // display the particle
        
        
        
        let fF = { //fire fill
          r: map(this.fireLevel,0,10,252,250),
          g: map(this.fireLevel,0,10,135,229),
          b: map(this.fireLevel,0,10,25,210)
        };
        let fS = { //fire stroke
          r: map(this.fireLevel,0,10,247,255),
          g: map(this.fireLevel,0,10,181,255),
          b: map(this.fireLevel,0,10,119,255)
        };
        
      let fillColor = color(fF.r, fF.g,fF.b, this.alpha);
      let strokeColor = color(fS.r, fS.g, fS.b, this.alpha);

      let size = map(this.alpha, 0, 200, 5, 25) // maps alpha for the size
      fill(fF.r, fF.g,fF.b, this.alpha);

      stroke(fS.r, fS.g, fS.b, this.alpha);
      strokeWeight(1);
      ellipse(this.x, this.y, size);
      // this.particleSprite = new Sprite(this.x,this.y,size);
      // this.particleSprite.color = fillColor;
      // this.particleSprite.stroke = strokeColor;
      // this.particleSprite.collider = 'none';

      // console.log (this.fireLevel);
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

