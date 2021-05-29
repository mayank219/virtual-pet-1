var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;

function preload(){
   dogImg=loadImage("Images/Dog.png");
   dogImg1=loadImage("Images/happy dog.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(500,500);
  foodStock = database.ref("Food");
  foodStock.on("value",readStock);
  foodStock.set(20);

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20); 
}

// function to display UI
function draw() {
  background(46,139,87);
  if(foods!==undefined){
    textSize(20);
    fill(225);
    text("Note: Press UP ARROW to feed DRAGO milk",50,50);
    text("Food Remaining:",150,150)
  }
 
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  if(keyWentUp(UP_ARROW)){
    dog.addImage(dogImg1);
  }

if(foodS === 0) {
  foodS = 20
}

  drawSprites();
}


function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  });
}

function readStock(data){
  foodS = data.val();
}