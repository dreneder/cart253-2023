class UI {

    constructor(x,y) { 
      this.x = x;
      this.y = y;
      
    }


display() {
  
  //calculates the speed of the ship
	shipSpeed = sqrt(sq(spaceShip.vel.x)+sq(spaceShip.vel.y));
	displaySpeed = round(map(shipSpeed,0,1,0,10000));
	
	// calculates the angle of each space body from the ship's position
	earthAngle = atan2(earth.y/2-spaceShip.y/2,earth.x/2-spaceShip.x/2);
	moonAngle = atan2(moon.y/2-spaceShip.y/2,moon.x/2-spaceShip.x/2);
	marsAngle = atan2(mars.y/2-spaceShip.y/2,mars.x/2-spaceShip.x/2);
	
	//UI block
	push()
	translate(travelUI.x,travelUI.y);
	rectMode(CENTER);
	angleMode(DEGREES);

	// square of the UI
	strokeWeight(5);
	stroke(255, 150);
	fill(20, 190, 247, 150);
	rect(0,0,1000,300, 50);

	//calculates display distances
	let toEarth = round(distEarth-earth.d/1.92);
	let toMoon = round(distMoon-moon.d/1.92);
	let toMars = round(distMars-mars.d/1.92);

	noStroke();

	// displays fuel level and speed
	textAlign(CENTER,CENTER);
	fill(255);
	textFont(spaceFont);
	textSize(70);
	text(`Fuel`, -380,-115);
	text(`Speed`, -150,-115);
	textSize(120);
	text(round(fuel)+`%`, -380,-40);
	textSize(100);
	text(displaySpeed, -150,-50);
	textSize(40);
	text(`Km/h`, -150,15);
	
	//a separator
	fill(255,150);
	rect(0,-50,7,150, 20);

	//each of these blocks display the UI info for a different space body
	// earth
	fill(0, 217, 116);
	textSize(40);
	text(`earth`, 100,-120);
	text(toEarth+` KM`, 100,10);
	push();
	translate(100,-50);
	rotate(earthAngle);
	fill(0, 217, 116);
	rect(0,0,70,10);
	triangle(15,-20,15,20,45,0);
	pop();
	
	//moon
	fill(235, 235, 171);
	text(`moon`, 250,-120);
	text(toMoon+` KM`, 250,10);
	push();
	translate(250,-50);
	rotate(moonAngle);
	rect(0,0,70,10);
	triangle(15,-20,15,20,45,0);
	pop();
	
	//mars
	fill(214, 125, 24);
	text(`mars`, 400,-120);
	text(toMars+` KM`, 400,10);
	push();
	translate(400,-50);
	rotate(marsAngle);
	rect(0,0,70,10);
	triangle(15,-20,15,20,45,0);
	pop();
  
  // warning messages
  if (warningDistance === true || warningFuel === true || warningSpeed === true) {
    fill(255,0,0);
    rect(0,-190,500,80)
    fill(255);
    textSize(80);
    if (warningDistance === true){
      text(`warning: distance`, 0,-198);
    }
    else if (warningFuel === true){
      text(`warning: fuel low`, 0,-198);
    }
    else if (warningSpeed === true){
      text(`warning: speed`, 0,-198);
    }
  }
	pop();
}

}