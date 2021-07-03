var balloon,balloonImage1,balloonImage2;
var database;
var position, positionRef;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;
  var  balloonPosition= database.ref('balloon/position');
  balloonPosition.on("value", readPosition, showError);
  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);
  
  showError();
  

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    writePosition(-5,0)
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    writePosition(5,0)
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    writePosition(0,-5)
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
   writePosition(0,5)
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}


function changePosition(x,y){
  balloon.x = balloon.x + x;
  balloon.y = balloon.y + y;
}

function readPosition(data){
  position= data.val()
  balloon.x=position.x;
 balloon.y=position.y;
}

function showError(){
  console.log("error in writing to the database")
}

function  writePosition(x,y){
  database.ref('balloon/position').set({
      'x': position.x+x, 
      'y':position.y+y
  })
}