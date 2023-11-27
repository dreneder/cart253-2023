class LaunchShip {
    constructor() {
        this.x = x;
        this.y = y;


    }

    move() {

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

    display() {
        
    }

}