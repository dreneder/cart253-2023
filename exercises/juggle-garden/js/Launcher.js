class Launcher {

    constructor() { // defines parameters to launch the rocket in orbit according to mouse position
        this.x1 = width/2;
        this.y1 = height/2-150;
        this.x2 = 0; // these will be mouse position
        this.y2 = 0;
        this.force = 0;
        this.force_x = 0;
        this.force_y = 0;
        this.launching=false;
        
        }

   



    update () {

	
	

		if (mouseIsPressed) { // creates trajectory target
            this.launching = true;
			this.x2 = mouseX;
			this.y2 = mouseY;
			this.force = int(dist(this.x1, this.y1, this.x2, this.y2))/10;
		}

		if (!mouseIsPressed && this.launching) { // launches into trajectory
			let alpha = 0;
			let x_dir = 0;
			let y_dir = 0;

			if (this.force > 0.1) { // only launches if force is above 0.1
				if (this.x1 != this.x2) { // only shoots if the target position is different
					alpha = atan(abs((this.y1 - this.y2)) / abs((this.x1 - this.x2)));
					this.force_x = this.force * cos(alpha);
					this.force_y = this.force * sin(alpha);
				} else {
					this.force_x = 0;
					this.force_y = this.force;
				}	
                // calculates if the shooting will be subtracted or added according to direction
				if (this.x1 < this.x2) { 
					if(this.y1 < this.y2) {
						x_dir = 1;
						y_dir = 1;
					} else {
						x_dir = 1;
						y_dir = -1;
					}
				} else {
					if(this.y1 < this.y2) {
						x_dir = -1;
						y_dir = 1;
					} else {
						x_dir = -1;
						y_dir = -1;
					}
				}
                let rocket = new Rocket(this.x1, this.y1, (x_dir * this.force_x),(y_dir * this.force_y),10);
                rockets.push(rocket); // creates the rocket
				
			}
			this.launching = false;
		}
	}


    display() {
       push();
        if (this.launching) {
            // draws the line and the targert
            strokeWeight(5);
            stroke(255,0,0);
            line(this.x2-5,this.y2, this.x2+5, this.y2);
            line(this.x2,this.y2-5, this.x2, this.y2+5);
            strokeWeight(1);
            line(this.x1, this.y1, this.x2, this.y2);
        }
        pop();
    }
}