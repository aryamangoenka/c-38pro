var bck,bckimg;
var ghost,ghostimg,monkey,monkeyrun;
var ground;
var foodGroup,bananaimg;
var obstaclesGroup,obstacleimg;
var score=0;
var banana,obstacle;


function preload(){
  bckimg=loadImage("bckimg.png")
  ghostimg=loadImage("ghost-standing.png")
  monkeyrun=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaimg = loadImage("banana.png");
  obstacleimg = loadImage("obstacle.png"); 

}






function setup() {
  createCanvas(500, 400);
  bck=createSprite(200,200,210,210);
  bck.addImage(bckimg);
  bck.scale=1;
   bck.x=bck.width/2;
  bck.velocityX=-4;
  
  ghost=createSprite(50,310,10,10);
  ghost.addImage(ghostimg);
  ghost.scale=0.35;
  
  
  ground=createSprite(0,368,1600,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  
  monkey=createSprite(250,324,10,10);
  monkey.addAnimation("running",monkeyrun);
  monkey.scale=0.13;
  
  ghost.y=monkey.y;
  
  foodGroup=new Group();
  obstacleGroup=new Group();
  score=0;
}

function draw() {
  background(255);
   if(bck.x<120){
  bck.x=bck.width/2;
  }
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(foodGroup.isTouching(monkey)){
    foodGroup.destroyEach();
    score=score+2;
    ghost.x-=10
  }
 if(obstacleGroup.isTouching(monkey)){
    
    ghost.x+=1
  }
  
  if(keyDown("space") ) {
      monkey.velocityY = -12;  
    }
  monkey.velocityY = monkey.velocityY + 0.8;
  
   if(keyDown("space") ) {
      ghost.velocityY = -12;  
    }
    ghost.velocityY = ghost.velocityY + 0.8;
  
  
  
  monkey.collide(ground)
  ghost.collide(ground)
  spawnFood();
  spawnObstacles();
  drawSprites();
  if(ghost.isTouching(monkey)){
     stroke("red");
    fill("red");
       textSize(30);
  text("Game Over", 180, 180);
     
      stroke("black");
    fill("black");
       textSize(30);
     text("Monkey is dead", 180, 220);
     
    ground.velocityX=0;
    bck.velocityX=0;
    foodGroup.destroyEach();
    obstacleGroup.destroyEach();
   
    
  }
  stroke("black");
  textSize(20);
  fill("black");
  text("Score: "+ score, 200,20)
}

function spawnFood() {
  //write code here to spawn the food
  if ( camera.position.x = displayWidth/2) {
     banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaimg);
    banana.scale = 0.1;
    banana.velocityX = -5;
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add each banana to the group
    foodGroup.add(banana);
  }
}

function spawnObstacles() {
  if( camera.position.x = displayWidth/4) {
    var obstacle = createSprite(800,340,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleimg);
    
    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.15;
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}






