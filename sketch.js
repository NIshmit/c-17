var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var bg,bgimage
var cloud,cloudimage;
var obstacle,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var score =0
var cloudgroup,obstaclegroup;
var PLAY=1
var END=0
var gamestate=PLAY
var gameover,gameoverimage;
var reset,resetimage;
var trexcollided;
var jump
var die
var check

function preload() {
  trex_running = loadAnimation("run00.png", "run01.png", "run02.png","run03.png","run04.png","run05.png","run06.png","run07.png",);
  
bgimage=loadImage("background trex.jpg")
  groundImage = loadImage("ground2.png")
  cloudimage=loadImage("cloud.png");
  obstacle1=loadImage("obstacle1.png")
  obstacle2=loadImage("obstacle2.png")
  obstacle3=loadImage("obstacle3.png")
  obstacle4=loadImage("obstacle4.png")
  obstacle5=loadImage("obstacle5.png")
  obstacle6=loadImage("obstacle6.png")
  gameoverimage=loadImage("game_over_PNG57.png")
  resetimage=loadImage("reset1.png")
  trexcollided=loadAnimation("run00.png");
  jump=loadSound("jump.mp3");
  check=loadSound("checkPoint.mp3");
  die=loadSound("die.mp3");


}

function setup() {
createCanvas(600, 200);

  // bg=createSprite(200,180,600,200);
 // bg.addImage("bg",bgimage)
 // bg.scale=0.9
  
 //create a ground sprite
ground = createSprite(200,180,400,20);
ground.addImage("ground",groundImage);
ground.x = ground.width /2;

  
  
//create a trex sprite
trex = createSprite(50,190,20,50);
trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trexcollided);
trex.scale = 1.5;
  
  invisibleGround= createSprite(200,190,400,2);
  invisibleGround.visible=false
  
  obstaclegroup=new Group();
  cloudgroup=new Group();
  
  trex.debug=false;
  trex.setCollider("circle",0,0,20)
  
  gameover=createSprite(300,80)
  gameover.addImage("gameover" ,gameoverimage)
  gameover.scale=0.1
  
  reset=createSprite(300,120)
  reset.addImage("reset",resetimage)
  reset.scale=0.03
  
}

function draw() {
background(" lawngreen");
  
  text("score:"+score,500,50)

  if(gamestate===PLAY){
    ground.velocityX = -(4+3*score/100);
    
    score=score+Math.round(frameCount/60);
    if(score>0&&score%100===0){
      check.play();
    }
    
     if(keyDown("space")&&trex.y>=110) {
     trex.velocityY = -10;
       jump.play();
     }
    
    trex.velocityY = trex.velocityY + 0.8
    
   if (ground.x < 0) {
   ground.x = ground.width / 2;
   }
    
  spawnClouds();
  spawnObstacles();
    
    gameover.visible=false;
    reset.visible=false;
    
  if(obstaclegroup.isTouching(trex)){
    gamestate=END
    die.play();
   //trex.velocityY=-10
  }  
  }
  
  else if (gamestate===END){
    ground.velocityX = 0;
    obstaclegroup.setVelocityXEach(0)
    cloudgroup.setVelocityXEach(0)
    obstaclegroup.setLifetimeEach(-2)
    cloudgroup.setLifetimeEach(-2)
    gameover.visible=true;
    reset.visible=true;
    trex.changeAnimation("collided",trexcollided)
    
    }
  
  

if(mousePressedOver(reset)){
      console.log("reset")
      Reset();
}
trex.collide(invisibleGround);
  
 
drawSprites();
}
function spawnClouds(){
  if (frameCount%60===0){
cloud=  createSprite(600,60,40,10)
  cloud.velocityX=-4
    cloud.addImage(cloudimage);
    cloud.scale=0.2
    cloud.y=Math.round(random(10,60))
    console.log(cloud.depth)
    cloud.depth=trex.depth
    trex.depth=trex.depth+1
    cloud.lifetime=150;
    cloudgroup.add(cloud)
  }
}

function spawnObstacles(){
  if (frameCount%60===0){
    obstacle=  createSprite(600,170,10,40)
    obstacle.velocityX=-(4+3*score/100);
    var rand=Math.round(random(1,6))
    switch(rand){
      case 1:obstacle.addImage(obstacle1);
        break;
        case 2:obstacle.addImage(obstacle2);
        break;
        case 3:obstacle.addImage(obstacle3);
        break;
        case 4:obstacle.addImage(obstacle3);
        break;
        case 5:obstacle.addImage(obstacle1);
        break;
        case 6:obstacle.addImage(obstacle6);
        break;
        default:break;
    }
    obstacle.scale=0.1
    obstacle.lifetime=150;
    obstaclegroup.add(obstacle)
  }
}

function Reset(){
  gamestate=PLAY
  trex.changeAnimation("running",trex_running)
  obstaclegroup.destroyEach();
  cloudgroup.destroyEach();
  gameover.visible=false;
  reset.visible=false;
  score=0;
}

