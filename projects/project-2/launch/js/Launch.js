class Launch {

  //method to be called in the setup function
    setup() {
        //declaring p5play attraction force
        world.gravity.y = 10;
  
        //calling a different the boost class for each stage
        rocketBoost = new Boost();
        rocketBoost.setRocket();
        stage2Boost = new Boost();
        stage2Boost.setStage2();
        shipBoost = new Boost();
        shipBoost.setShip();
      
        //draws sprites
        ground = new Sprite(width/2,height-75,width*4,150,'static');
        base = new Sprite(width/2+150,height-420,'none');
        stage2 = new Sprite(width/2,height-384);
        launchShip = new Sprite(width/2,height-505);
        rocket = new Sprite(width/2,height-225);
        
        //color, image and scale attributes for images
        ground.color = '#00bd3f';
        launchShip.img = launchShipImg;
        stage2.img = stage2Img;
        rocket.img = rocketImg;
        base.img = baseImg;
        rocket.scale = 0.2;
        launchShip.scale = 0.2;
        stage2.scale = 0.2;
        base.scale = 0.2;
        
        //joints for the rocket stages
        dock1 = new GlueJoint(rocket,stage2);
        dock2 = new GlueJoint(stage2,launchShip);
    }

    //method to be called in the draw function
    draw() {
        //set the stars with no speed and draws them
        starVelX = 0;
        starVelY = 0;
        for (const star of stars) {
            star.display();
          }
        
        //rectangle covering the background, fades depending on altitude reavealing starry sky
        fill(183,226,247,map(altitude,50,80,255,0,true));
        rect(0,0,width,height);
        
        //all bellow this is affected by the camera
        camera.on();
        
        // changes camera zoom depending on the stage
          if (stage === 1) {
            camera.x = stage2.x;
            camera.zoomTo(1);
            if (stage2.y <= height/2) {//camera follows rocket if it goes over the middle of the canvas
              camera.y = stage2.y;
            }
          }
        else if (stage === 2) {
            camera.x = launchShip.x;
            camera.zoomTo(1.2);
            if (launchShip.y+100 <= height/2) {
              camera.y = launchShip.y+100;
            }
          }
          else if (stage === 3) {
            camera.x = launchShip.x;
            camera.zoomTo(1.5);
             if (launchShip.y <= height/2) {
                camera.y = launchShip.y;
                }
        }
        
        //gorund sprite follows the ship x position
        if (camera.y < 0-width/2) {
          ground.x = launchShip.x;
        }
      
        //draws the sprites in order
        ground.draw();
        base.draw();
        stage2Boost.drawStage2(stage2.x,stage2.y,stage2.rotation);
        rocketBoost.drawRocket(rocket.x,rocket.y,rocket.rotation);
        shipBoost.drawShip(launchShip.x,launchShip.y,launchShip.rotation);
        stage2.draw();
        rocket.draw();
        launchShip.draw();
      
        //makes the stage joints invisible
        dock1.visible = false;
        dock2.visible = false;
        
        //all bellow this are unaffected by the camera
        camera.off();
        
        //UI elements
        // variables for activating the stage and boost calls
        let alertColor = color(250, 52, 52,150);
        let enableColor = color(52, 250, 82, 150);
        let boosterColor;
        let stageColor;
    
        //conditionals to call stages and boosts
        if (boosterEnabled === true) {
            boosterColor = enableColor;
        }
        else if (boosterAlert === true) {
            boosterColor = alertColor;
        }
        else {
            boosterColor = color(20, 190, 247, 150);
        }
        if (stageEnabled === true) {
            stageColor = enableColor;
        }
        else if (stageAlert === true) {
            stageColor = alertColor;
        }
        else {
            stageColor = color(20, 190, 247, 150);
        }
        
        //drawing the UI
        stroke(255, 150);
        fill(boosterColor);
        rect(-50,405,350,100, 20);
        fill(stageColor);
        rect(-50,505,350,100, 20);
        fill(20, 190, 247, 150);
        rect(-50,100,350,300, 20);
        noStroke();
        fill(255,100);
        rect(50,245,200,7,20);
        fill(255);
        textFont(spaceFont);
        textAlign(CENTER,CENTER);
        textSize(35);
        text('Altitude',140,130);
        text('km',140,210);
        text('Speed',140,280);
        text('km/h',140,360);
        textSize(50);
        text(altitude,140,170);
        text(speed,140,320);
        textSize(80);
        text('BOOSTER',150,445);
        text('STAGE',150,545);
        
        //UI intructions that hide when the user advances
        if (stage === 0) {
          fill(255,0,0,150);
          textSize(35);
          text('activate when RED',420,500);
        }

        //input control for the stages
        if (kb.presses('spacebar')) {
            if (stage === 0) {
                stage = 1;
                missionSound[1].play(); //each plays a stage separation audio
            }
            else if (stage === 1 && altitude > 100) { //activates according to altitude
                dock1.remove();
                stage = 2;
                missionSound[17].play();
                if (frameCount % 60 == 0) {//had to adjust to framecount to avoid a bug of the speed
                    boosterAlert = true;
                }
            }
            else if (stage === 2 && altitude > 180) {
                dock2.remove();
                stage = 3;
                missionSound[20].play();
                if (frameCount % 120 == 0) {
                    boosterAlert = true;
                }
            }
            else if (stage === 3 && altitude > 260) {
                missionSound[23].play();
                launchComplete = true;//level completed once it reaches the stage/altitude 
            }
        }
        
        //activates the stage alerts according to altitude
        if (stage === 0) {
            stageAlert = true;
        }
        else if (altitude >= 100 && stage === 1) {
            stageAlert = true;
        }
        else if (altitude >= 180 && stage === 2) {
            stageAlert = true;
        }
        else if (altitude >= 260 && stage === 3) {
            stageAlert = true;
        }
        else {
            stageAlert = false;
        }
    
        //checks orbit sound at 205 kilometers
        if (stage === 3 && altitude === 205) {
            missionSound[22].play();
        }
        
        //changes the alert color once user responds with input
        if (kb.pressing('spacebar')) {
            stageEnabled = true;
        }
        else {
            stageEnabled = false;
        }
        if (kb.pressing('up')) {
            boosterEnabled = true;
        }
        else {
            boosterEnabled = false;
        }
    
        //controlling booster sound with keys
        if (kb.presses('up') && stage === 1 && countdown <= 6) {
            booster.loop();
            booster.amp(0.035);
        }
        else if (kb.released('up') && altitude > 5) {
            booster.stop();
            missionSound[16].play();		
        }
      
        //inputs for control of the vehicle according to stages
        if (stage === 1 && countdown <= 0) {
          if (kb.pressing('left')) { //rotation
          rocket.rotation -= 0.1;
          }
          else if (kb.pressing('right')) {
          rocket.rotation += 0.1;
          }
          if (kb.pressing('up')) { //boost
            let xForce = cos(rocket.rotation-90) * 10000;
          let yForce = sin(rocket.rotation-90) * 10000;
            rocket.applyForce(createVector(xForce, yForce))
            }
          }
        else if (stage === 2) {
          if (kb.pressing('left')) {
          stage2.rotation -= 0.1;
          }
          else if (kb.pressing('right')) {
          stage2.rotation += 0.1;
          }
          if (kb.pressing('up')) {
            let xForce = cos(stage2.rotation-90) * 10000;
          let yForce = sin(stage2.rotation-90) * 10000;
            stage2.applyForce(createVector(xForce, yForce));
            }
          }
        else if (stage === 3) {
          if (kb.pressing('left')) { // rotation changes only for last stage
          launchShip.rotation -= 0.2;
          }
          else if (kb.pressing('right')) {
          launchShip.rotation += 0.2;
          }
          if (kb.pressing('up')) {
            let xForce = cos(launchShip.rotation-90) * 10000;
          let yForce = sin(launchShip.rotation-90) * 10000;
            launchShip.applyForce(createVector(xForce, yForce));
            }
          }
        
        //mapping altitude to y position and rounding it for display
        alt = map(launchShip.y,300,-15000,0,200);
        altitude = round(alt);
        
        //calculating the speed for display
        speed = round(-launchShip.vel.y*50);		
        if (speed < 0 ) {
            speed = round(launchShip.vel.y*50);
        }

        //fails the mission if the negative speed is too high after a certain altitude
        if (launchShip.vel.y*50 > 200 && altitude > 5) {
          missionSound[29].play();//plays the fail sound
          launchFailled = true;
        }

        //countdown which variable starts at 13, is controlled by frame count
        if (stage === 1 && frameCount % 60 == 0 && altitude < 5) {
          countdown--;//lowers the count
          if (countdown <= 10 && countdown >= 0) {
              missionSound[-countdown+12].play(); //plays the sounds of the countdown
              
              //plays liftoff and claps sound when countdown reaches 0
              if (countdown === 0 && kb.pressing('up')) {
                  missionSound[14].play();
                  missionSound[30].play();
                  missionSound[30].amp(0.1);
                }
            }
            //if the vehicle doesn't take off the mission fails
            if (countdown === -10 && altitude < 5) {
                missionSound[29].play();
                launchFailled = true;
            }
        }
        //booster engaged sound
        if (countdown <= 6 && kb.presses('up') && stage === 1) {
            missionSound[13].play();
          }
          if (countdown <= 6) {
            boosterAlert = true;
          }
          //draws the countdown when between 10 and 0
        if (countdown <= 10 && countdown >= 0) {
        textFont(spaceFont);
        textAlign(CENTER,CENTER);
        textSize(200);
        fill(0);
        text(countdown,width/5*4,height/3);
      }
    }
}