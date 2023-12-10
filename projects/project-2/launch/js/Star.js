class Star {
	constructor() {
	  this.x = random(-border, width + border);
	  this.y = random(-border, height + border);
  
	  this.r = random(255);
	  this.g = random(3);
	}
  
	display() {
	  let forceX = 0;
	  let forceY = 0;
	  
	  if (starVelX != 0 && starVelY != 0) {
		forceX = -map(starVelX,0,10,0,5);
		forceY = -map(starVelY,0,10,0,5);
	  }

	  this.x += forceX;
	  this.y += forceY;
  
	  if (this.x < -border) {
		this.x = width + random(border);
		this.y = random(0, height);
	  } else if (this.x > width + border) {
		this.x = 0 - random(border);
		this.y = random(0, height);
	  }
  
	  if (this.y < -border) {
		this.y = height + random(border);
		this.x = random(0, width);
	  } else if (this.y > height + border) {
		this.y = 0 - random(border);
		this.x = random(0, width);
	  }
	noStroke();
	  fill(255, this.r);
	  circle(this.x, this.y, this.g);
	}
  }