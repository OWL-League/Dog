var dog, dogIMG, dogIMG1;
var database;
var food, foodStock



function preload()
{
  dogIMG = loadImage("images/dogImg.png");
  dogIMG1 = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();

  dog = createSprite(250,300,150,150);
  dog.addImage(dogIMG);
  dog.scale = 0.15;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);



}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(food);
    dog.addImage(dogIMG1);
  }




  drawSprites();

  fill(255, 255, 254);
  stroke("black");
  textSize(20);
  text("food remaining: "+ food, 170, 200);
  textSize(13);
  text("Note: Press Up Arrow Key To Feed The Dog", 130, 10);
}


function readStock(data){
  food = data.val();
}


function writeStock(x){
  if(x <= 0){
    x = 0;
  }else {
    x = x-1;
  }
  database.ref('/').update({
    Food:x
  })
}