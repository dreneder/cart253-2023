class Transmission {
    constructor (x,y) {
        this.x = x;
        this.y = y;
        this.gear1 = createVector(-110,-180);
        this.gear2 = createVector(-110,180);
        this.gear3 = createVector(0,-180);
        this.gear4 = createVector(0,180);
        this.gear5 = createVector(110,-180);
        this.reverse = createVector(110,180);
        this.neutral = line(-110,0,110,0);
        this.stick = createVector(-110,-180);
        this.stickSize = 80;
    }
    
    pressed() {
        // translating mouse position for this
        let translatedMouseX = mouseX - 900;
        let translatedMouseY = mouseY - 450;
            
        //  let the gear shift move if clicked on
        let onStick = dist(translatedMouseX,translatedMouseY,this.stick.x,this.stick.y);
        if (mouseOn === true && clutch === true && onStick < this.stickSize/2) {
        this.stick.x = translatedMouseX;
        this.stick.y = translatedMouseY;
        }

        // creating coliding lines
        let col1_2 = collidePointLine(this.stick.x,this.stick.y, this.gear1.x, this.gear1.y, this.gear2.x, this.gear2.y, 10);
        let col3_4 = collidePointLine(this.stick.x,this.stick.y, this.gear3.x, this.gear3.y, this.gear4.x, this.gear4.y, 10);
        let col5_R = collidePointLine(this.stick.x,this.stick.y, this.gear5.x, this.gear5.y, this.reverse.x, this.reverse.y, 10);
        let lineN = collidePointLine(this.stick.x,this.stick.y, -115, 0, 115, 0, 10);

        // constraining positions so the stick stay on the line
        if (lineN) {
            this.stick.x = constrain(this.stick.x,-115,115);
            if(col3_4){
                this.stick.y = constrain(this.stick.y,-180,180);
            }
            else{this.stick.y = constrain(this.stick.y,-5,5);}
        }
        else if (col1_2 && lineN === false) {
            this.stick.x = -115;
            this.stick.y = constrain(this.stick.y,-180,180);
        }
        else if (col3_4 && lineN === false) {
            this.stick.x = 0;
            this.stick.y = constrain(this.stick.y,-180,180);
        }
        else if (col5_R && lineN === false) {
            this.stick.x = 115;
            this.stick.y = constrain(this.stick.y,-180,180);
        }
        else {
            this.stick.x = constrain(this.stick.x,-115,115);
            this.stick.y = constrain(this.stick.y,-180,180);
        }
        
        
        // defining when the car is at a gear or not
        if (this.stick === this.gear1) {
            currentGear = 1;
        }
        else if (this.stick === this.gear2) {
            currentGear = 2;
        }
        else if (this.stick === this.gear3) {
            currentGear = 3;
        }
        else if (this.stick === this.gear4) {
            currentGear = 4;
        }
        else if (this.stick === this.gear5) {
            currentGear = 5;
        }
        else if (this.stick === this.reverse) {
            currentGear = 6;
        }
        else if (this.stick.y === 0) {
            currentGear = 0;
        }
        
        // transfering the stick to a position
         if (mouseOn === false) {
         if (this.stick.y <= -40 && lineN === false) {
             this.stick.y = -180;
         }
         else if (this.stick.y >= 40 && lineN === false) {
             this.stick.y = 180;
         }
         else {this.stick.y = 0}
        }
    }

    
    display() {
        push();
        translate(this.x,this.y);
        
        //draw the gear lines
        stroke(0);
        strokeWeight(10);
        strokeJoin(ROUND);
        line(this.gear1.x,this.gear1.y,this.gear2.x,this.gear2.y);
        line(this.gear3.x,this.gear3.y,this.gear4.x,this.gear4.y);
        line(this.gear5.x,this.gear5.y,this.reverse.x,this.reverse.y);
        line(-110,0,110,0); // for neutral
        
        // draw the gear stick
        strokeWeight(3);
        fill(255,0,0);
        ellipse(this.stick.x,this.stick.y,this.stickSize);

        //draw the gear names for reference
        fill(0);
        noStroke();
        textAlign(CENTER,CENTER);
        textStyle(BOLD);
        textSize(60);
        text(`1`,this.gear1.x,this.gear1.y-70);
        text(`2`,this.gear2.x,this.gear2.y+70);
        text(`3`,this.gear3.x,this.gear3.y-70);
        text(`4`,this.gear4.x,this.gear4.y+70);
        text(`5`,this.gear5.x,this.gear5.y-70);
        text(`R`,this.reverse.x,this.reverse.y+70);
        
        pop();

        
    }


}