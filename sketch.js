var balloon,balloonImg1,balloonImg2,balloonImg3;

var groundImg;

var database;


function preload() {
  //load the image for the background
  groundImg = loadImage("images/Ground.png");

  //load images for the balloon
  balloonAnimation = loadAnimation("images/HotAirBalloon1.png","images/HotAirBalloon2.png","images/HotAirBalloon3.png");

}


function setup() {
  database = firebase.database();

  //create the canvas
  createCanvas(800,400);

  var balloonPosition = database.ref("Balloon/position");
  balloonPosition.on("value",readPosition,showError);

  //create the hot air balloon
  balloon = createSprite(300,200,50,50);
  balloon.addAnimation("animation",balloonAnimation);
  balloon.scale = 0.5;
}


function draw() {
  //set the background image
  background(groundImg);

  //display the instruction
  textSize(25);
  fill("lightgreen");
  strokeWeight(5);
  stroke("black");
  text("Use the arrow keys to move the Hot Air Balloon!!",10,50);

  //make the balloon move along with the right arrow key
  if(keyDown(RIGHT_ARROW)) {
    balloon.position.x = balloon.position.x + 5;
  }  

  //make the balloon move along with the left arrow key
  if(keyDown(LEFT_ARROW)) {
    balloon.position.x = balloon.position.x - 5;    
  }  
    
  //make the balloon move along with the down arrow key and scale it
  if(keyDown(DOWN_ARROW)) {
    balloon.position.y = balloon.position.y + 5;

    balloon.scale = balloon.scale + 0.01;
  }  

  //make the balloon move along with the up arrow key and scale it
  if(keyDown(UP_ARROW)) {
    balloon.position.y = balloon.position.y - 5;
    
    balloon.scale = balloon.scale - 0.01;
  }

  //update the position of the balloon in the database
  updatePosition(balloon.position.x,balloon.position.y);

  //draw the sprites
  drawSprites();
}


function updatePosition(x,y) {
  database.ref("Balloon/position").set({
    'x': balloon.position.x,
    'y': balloon.position.y
  })
}


function readPosition(data) {
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}


function showError() {
  console.log("Error in writing to the database");
}