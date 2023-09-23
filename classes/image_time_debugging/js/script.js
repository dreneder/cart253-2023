// time starts from a blank script

let clown = {
    x: 250,
    y: 250,
    size: 100,
    image: undefined
};

// set for images
// let clownImage;

function preload() {
    clown.image = loadImage("assets/images/clown.png");


// set for images
//     clownImage = loadImage("assets/images/clown.png");
}


function setup() {
    createCanvas(500,500);
}


function draw() {
    background(0);

// set for images
//     imageMode(CENTER);
// image takes the the image loaded, positionX, positionY, scaleX and scaleY
    // image(clownImage,mouseX,mouseY,50,50);

// set for time
    clown.x = mouseX;
    clown.y = mouseY;

    imageMode(CENTER);
    image(clown.image,clown.x,clown.y,clown.size,clown.size);
}

// in time it's explained that this is an event function
function mousePressed() {
    clown.size = clown.size +50;
}