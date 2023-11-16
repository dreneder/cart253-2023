class Pedals {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.pedal = 120; // for size
        this.a = 1; // for the scale
        this.b = 1; // for the scale
        this.c = 1; // for the scale
    }

pedalDown(){ // changes size and makes the pedal true when pressed
    if (keyIsDown(65)) {
        clutch = true;
        this.c = 0.75;
    }
    else {
        this.c = 1;
        clutch = false;
    }
    if (keyIsDown(83)) {
        brake = true;
        this.b = 0.75;
    }
    else {
        this.b = 1;
        brake = false;
    }
    if (keyIsDown(68)) {
        accelerator = true;
        this.a = 0.75;
    }
    else {
        this.a = 1;
        accelerator = false;
    }
}

display(){
    push();
    translate(this.x,this.y);
    stroke(0);
    strokeWeight(3);
    fill(100);
    rectMode(CENTER);
    rect(-150,0,this.pedal*1.2*this.c,this.pedal*0.9*this.c,10);
    rect(0,0,this.pedal*this.b,this.pedal*this.b,10);
    rect(150,0,this.pedal*this.a,this.pedal*1.5*this.a,10);

    strokeWeight(1);
    fill(255);
    textAlign(CENTER,CENTER);
    textStyle(BOLD);
    textSize(40*this.c);
    text(`A`,-150,0);
    textSize(40*this.b);
    text(`S`,-0,0);
    textSize(40*this.a);
    text(`D`,150,0);
    pop();
}


}