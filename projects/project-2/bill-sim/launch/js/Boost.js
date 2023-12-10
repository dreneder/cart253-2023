class Boost {
      constructor(x, y, rotation) {
      this.x = x;
      this.y = y;
      this.rotation = rotation;
    }
    

//creates a group for each stage so the it can shoot particles
// goes in the setup function
setRocket() {
boost1 = new Group();
boost1.collider = 'none';
boost1.y = this.y;
boost1.stroke = color(247,181,119,150);
boost1.color = color(252,135,25,150);
boost1.direction = this.rotation;
boost1.speed = () => 0.1;
boost1.d = () => random(5,15);
boost1.life = () => random(20,60);
}
// goes in the draw function
drawRocket(x,y,rotation) {
  boost1.draw();
  if (kb.pressing('up') && stage === 1 && countdown <= 6) {
  for (let i = 0; i < 10; i++) {
    new boost1.Sprite(random(x-15,x+15),y+120);
    }
  }
}

  // goes in the setup function
setStage2() {
boost2 = new Group();
boost2.collider = 'none';
boost2.y = this.y;
boost2.stroke = color(255, 245, 224);
boost2.color = color(255, 226, 145);
boost2.direction = this.rotation;
boost2.speed = () => 0;
boost2.d = () => random(15,25);
boost2.life = () => random(5,20);
}
// goes in the draw function
drawStage2(x,y,rotation) {
  boost2.draw();
  if (kb.pressing('up') && stage === 2) {
    new boost2.Sprite(random(x-5,x+5),y+45);
  }
}

// goes in the setup function
setShip() {
boost3 = new Group();
boost3.collider = 'none';
boost3.y = this.y;
boost3.stroke = color(143, 242, 255);
boost3.color = color(230, 250, 252);
boost3.direction = this.rotation;
boost3.speed = () => 0;
boost3.d = () => 15;
boost3.life = () => random(1,2);
}
// goes in the draw function
drawShip(x,y,rotation) {
  boost3.draw();
  if (kb.pressing('up') && stage === 3) {
    new boost3.Sprite(random(x-2,x+2),y+80);  
  }
}
}
