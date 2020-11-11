var Run,manRunning,ground,Ground,obstacle1,obstacle2,obstacle3,Run1,invisibleGround,invisibleMan,Man_jump,jumpingMan;
var GameState=0;
var bk,BackGround,ak,wood,w1,win,nk,lose,dk;
var score,b2,reward;

function preload(){
Run=loadAnimation("run1.png","run2.png","run3.png","run4.png","run5.png","run6.png");
Ground=loadImage("ground2.png");

bk =loadImage("background1.png");
Man_jumping=loadAnimation("jump1.png","jump2.png","jump3.png","jump4.png","jump5.png","jump6.png","jump7.png","jump8.png");

ob=loadImage("gameover.png");
wood=loadImage("log.png")

win=loadImage("youWin.png");
lose=loadImage("youlose.png");

obstacle1 = loadImage("obstacle1.png");
obstacle2 = loadImage("obstacle2.png");
obstacle3 = loadImage("obstacle3.png");
reward  = loadImage("reward.png")
}

function setup() {
  createCanvas(displayWidth-100,displayHeight-100);
  BackGround=createSprite(0,100,displayWidth-50,displayHeight-100);
  BackGround.x=BackGround.width/2-400;
  BackGround.addImage(bk);
  BackGround.scale=6;
  BackGround.velocityX=-20;
  manRunning=createSprite(displayWidth/2-500,displayHeight/2+50);
  manRunning.addAnimation("running",Run);
  manRunning.addAnimation("jumping",Man_jumping);

  ak = createSprite(displayWidth/2,displayHeight/2,40,40);
  ak.visible=false;

  nk = createSprite(displayWidth/2,displayHeight/2,40,40);
  nk.visible=false;

  dk = createSprite(displayWidth/2,displayHeight/2,40,40);
  dk.visible=false;

  w1=createSprite(displayWidth/2+400,displayHeight/2+200,10,40);
  w1.addImage(wood);
  w1.visible=false;
w1.scale=0.5;

  ground=createSprite(displayWidth/2,displayHeight/2+200,displayWidth,10)
  ground.addImage(Ground);
  ground.visible=false;
   
  invisibleGround = createSprite(displayWidth/2,displayHeight/2+250,displayWidth,10);
  invisibleGround.visible = false;

 

  ground.velocityX=-20;

  obstaclesGroup =createGroup();
  coinGroup =createGroup();
score=0
}

function draw() {
 
  background(255);
  
  
  if(GameState===0){

  if (BackGround.x < 0){
    BackGround.x = BackGround.width/2;
  }
 
  if(touches.length>0 || keyWentDown("space") &&manRunning.y >= 410) {
 
    manRunning.changeAnimation("jumping",Man_jumping);
     
    manRunning.velocityY = -25;
    touches=[];
  }
  score=score+1;
 
  if(manRunning.isTouching(invisibleGround)){
    manRunning.changeAnimation("running",Run)
   }

 manRunning.velocityY = manRunning.velocityY + 0.8

  ground.depth = manRunning.depth;
  manRunning.depth = manRunning.depth + 1;

  manRunning.collide(invisibleGround);

  if(manRunning.isTouching(obstaclesGroup)){
    GameState=1;
  }



  if(manRunning.isTouching(w1)){
    GameState=2;
    }
}

if(GameState===1){
  background("red");
manRunning.remove();
dk.visible=true;
dk.addImage(lose);
w1.remove();
BackGround.velocityX=0;
BackGround.visible=false
obstaclesGroup.destroyEach();
}

  if(GameState===2){
    background("red");
    manRunning.remove();
    nk.visible=true;
    nk.addImage(win);
    w1.remove();
    BackGround.velocityX=0;
    BackGround.visible=false
    obstaclesGroup.destroyEach();
    coinGroup.destroyEach();
  }
spawnObstacles();

 console.log();
  drawSprites();

  textSize(40);
  fill("red");
text("Score: "+score,100,100);
    
}


function spawnObstacles() {
  if(frameCount % 100 === 0) {
    
    var obstacle = createSprite(displayWidth/2+400,displayHeight/2+200,10,40);
    obstacle.velocityX = -12;
    obstacle.scale=0.2;
    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
      obstacle.scale=0.5;
              break;
      case 2: obstacle.addImage(obstacle2);
      obstacle.scale=0.4;
              break;
      case 3: obstacle.addImage(obstacle3);
      obstacle.scale=0.8;
              break;
      default: break;
    }

    
    //assign scale and lifetime to the obstacle           
   obstacle.lifeTime=260;

    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function spawnCoins() {
  if(frameCount % 100 === 0) {
    
    var coin = createSprite(displayWidth/2+400,displayHeight/2+50,10,40);
    coin.velocityX = -12;
    coin.scale=0.2;
    
    //generate random obstacles
  
    coin.addImage(reward);
           

    
    //assign scale and lifetime to the obstacle           
    coin.lifeTime=260;

    
    //add each obstacle to the group
    coinGroup.add(coin);
  }
}