class HandBrake {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.button = 1; // for size
        this.r = 130;
        this.g = 130;
        this.b = 130;
    }

pressed() {
    // defines if the mouse is over the button
    let onButton = collidePointCircle(mouseX,mouseY,this.x,this.y,80*this.button)
    // activates the ignition
    if (mouseOn === true && onButton === true) {
        pButton = true;
        this.button = 0.75; // changes the size
    }
    else { 
        this.button = 1;
    }

    if (parkOn === true) {
        this.r = 250;
        this.g = 160;
        this.b = 50;
    }
    else {
        this.r = 130
        this.g = 130
        this.b = 130
    }
}

display() { //draws the button with text inside
    push();
    stroke(this.r,this.g,this.b);
    strokeWeight(6*this.button);
    fill(80);
    ellipse(this.x,this.y,75*this.button);

    noStroke();
    fill(this.r,this.g,this.b);
    textAlign(CENTER,CENTER);
    textStyle(BOLD);
    textSize(50*this.button);
    text(`P`,this.x,this.y+5);
    pop();
}
}

