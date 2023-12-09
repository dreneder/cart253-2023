class Travel {

    setup() {
        for (let i = 0; i < 2000; i++) {
            stars.push(new Star());
          }
    
    
          allSprites.autoCull = false;
          
    
        spaceShip = new Sprite(-500,-500);
        earth = new Sprite(0,0,1000);
        mars = new Sprite(50000,-35000,2030);
        moon = new Sprite(-2500,0,1300);
        
        
        earth.img = earthImg;
        earth.collider = 'static';
        earth.scale = 1;
        
        mars.img = marsImg;
        mars.collider = 'static';
        mars.scale = 0.5;
        
        
        moon.collider = 'dynamic';
        moon.img = moonImg;
        moon.scale = 0.075;
        moon.vel.y = -3.2;
        
        spaceShip.img = spaceShipImg;
        spaceShip.scale = 0.05;
        spaceShip.vel.x = 2.5;
        spaceShip.vel.y = -2.5;
        spaceShip.rotation = -30;
    
        travelUI.x = width/2;
        travelUI.y = height+160;
        travelUI = new UI(travelUI.x,travelUI.y);
    }

    draw() {
<<<<<<< HEAD
<<<<<<< HEAD
        // clear();
=======
>>>>>>> parent of 94e25db (inserted states and broke the whole code 🙃)
=======
>>>>>>> parent of 94e25db (inserted states and broke the whole code 🙃)
        background(0);
        starVelX = spaceShip.vel.x;
	starVelY = spaceShip.vel.y;

	for (const star of stars) {
		star.display();
	  }

	camera.on();

	camera.zoom = 6;
	 camera.x = spaceShip.x;
	camera.y = spaceShip.y;

	spaceShip.draw();
	earth.draw();
	moon.draw();
	mars.draw();

	if (kb.pressing('left')) spaceShip.rotation -= 3;
	else if (kb.pressing('right')) spaceShip.rotation += 3;
	
	
	if (kb.pressing('up')) {
	let xForce = cos(spaceShip.rotation-90) * 500;
    let yForce = sin(spaceShip.rotation-90) * 500;
    spaceShip.applyForce(createVector(xForce, yForce));
	fuel -= 0.01;
	}
	if (kb.pressing('down')) {
	let xForce = cos(spaceShip.rotation+90) * 500;
    let yForce = sin(spaceShip.rotation+90) * 500;
    spaceShip.applyForce(createVector(xForce, yForce));
	}

	if (kb.pressed('space')) {
		spaceShip.vel.x = 0;
		spaceShip.vel.y = 0;
	}

	distEarth = dist(spaceShip.x,spaceShip.y,earth.x,earth.y);
	distMoon = dist(spaceShip.x,spaceShip.y,moon.x,moon.y);
	distMars = dist(spaceShip.x,spaceShip.y,mars.x,mars.y);
	

	spaceShip.attractTo(earth,map(distEarth,500,3000,500,0,true));
	spaceShip.attractTo(moon,map(distMars,250,1000,250,0,true));
	spaceShip.attractTo(mars,map(distMars,500,3000,500,0,true));
	

	moon.attractTo(earth,500);

	
	moon.debug = mouse.pressing();
	
	
	
	
	
	
	camera.off();
	
	//slides the UI according to the zoom
	if (camera.zoom === 1) {
		if (travelUI.y > height-50){
			travelUI.y -= 3;
		}
		if (travelUI.y <= height-50){
			travelUI.y = height-50;
		}
	}
	else if (camera.zoom === 5) {
		if (travelUI.y < height+160){
			travelUI.y += 3;
		}
		if (travelUI.y >= height+160){
			travelUI.y = height+160;
		}
	}
	travelUI.display();
	

<<<<<<< HEAD
<<<<<<< HEAD

    if (displaySpeed > 4000 && earth.collides(spaceShip)) {
        for (let i = 0; i < 200; i++) {
            new explosion.Sprite(spaceShip.x,spaceShip.y);  
            spaceShip.scale = 0;
            travelFailled = true;
        }
    }
    if (displaySpeed > 4000 && moon.collides(spaceShip)) {
        for (let i = 0; i < 200; i++) {
            new explosion.Sprite(spaceShip.x,spaceShip.y);  
        }
        spaceShip.scale = 0;
        travelFailled = true;
    }
    if (displaySpeed > 10000 && mars.collides(spaceShip)) {
        for (let i = 0; i < 100; i++) {
            new explosion.Sprite(spaceShip.x,spaceShip.y);  
        }
        spaceShip.scale = 0;
        travelFailled = true;
    }
    if (displaySpeed > 100 && mars.collides(spaceShip)) {
            spaceShip.scale = 0;
            travelComplete = true;
            location.href = "index-end.html";
=======
	
>>>>>>> parent of 94e25db (inserted states and broke the whole code 🙃)
=======
	
>>>>>>> parent of 94e25db (inserted states and broke the whole code 🙃)
    }

}