class Ignition {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.button = 1; // for size
    }

pressed() {
    // defines if the mouse is over the button
    let onButton = collidePointCircle(mouseX,mouseY,this.x,this.y,80*this.button)
    // activates the ignition
    if (mouseOn === true && onButton === true) {
        startStop = true;
        this.button = 0.75; // changes the size
    }
    else {startStop = false;
        this.button = 1;
    }
}

display() { //draws the button with text inside
    push();
    stroke(255,0,0);
    strokeWeight(8*this.button);
    fill(255);
    ellipse(this.x,this.y,80*this.button);

    noStroke();
    fill(0);
    textAlign(CENTER,CENTER);
    textStyle(BOLD);
    textSize(10*this.button);
    text(`ENGINE`,this.x,this.y-15);
    textSize(15*this.button);
    text(`START`,this.x,this.y);
    text(`STOP`,this.x,this.y+15);
    pop();
}
}

