var path,mainCyclist,cycleBell;
var pathImg,mainRacerImg1,mainRacerImg2,mr3;
var cyclebell,redCG,pinkCG,yellowCG;
var redP,r1,r2;
var pinkP,p1,p2;
var yellowP,y1,y2;
var END =0;
var PLAY =1;
var gameState = PLAY;
var gameoverImg,gameover;
var distance=0
var score=0;
var obsGroup,obstacle,ob1,ob2,ob3;
var rCG,pCG,yCG;
var arrow,arrowImg,arrowG;
var topEdges;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadImage("images/mainPlayer3.png");
  p1=loadAnimation("images/opponent1.png","images/opponent2.png");
  p2=loadAnimation("images/opponent3.png");
  y1=loadAnimation("images/opponent4.png","images/opponent5.png");
  y2=loadAnimation("images/opponent6.png");
         
  r1=loadAnimation("images/opponent7.png","images/opponent8.png");
  r2=loadAnimation("images/opponent9.png"); 
  gameoverImg=loadImage("images/gameOver.png");
  ob1=loadImage("images/obstacle1.png");
  ob2=loadImage("images/obstacle2.png");
  ob3=loadImage("images/obstacle3.png");
  arrowImg=loadImage("images/arrow0.png");
}

function setup(){
  
canvas = createCanvas(900,300);
  
// Moving background
/*path=createSprite(100,150);
path.addImage(pathImg);
path.scale=0.5;*/
  
//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;


gameover=createSprite(250,130,50,40);
gameover.addImage("gameover",gameoverImg);
gameover.scale=0.8;
  rCG=new Group();
  pCG=new Group();
  yCG=new Group();
  obsGroup=new Group();
  arrowG=new Group();

}

function draw() {
  background(pathImg);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
  text("Score: "+score,350,55);     
  if(gameState===PLAY){
  
   //mainCyclist.x = World.mouseX;
  gameover.visible=false;
  // topEdges= createTopEdges();
   //mainCyclist .collide(edges);
   distance=distance+Math.round(getFrameRate()/50);
   camera.position.x=mainCyclist.x;
   camera.position.y=mainCyclist.y;
   
  //code to reset the background
  //if(path.x < 0 ){
    //path.x = width/2;

    if(keyDown("RIGHT_ARROW")){
      mainCyclist.x +=20;
    }

    

    if(keyDown("UP_ARROW")){
      mainCyclist.y -=20;
    }

    if(keyDown("DOWN_ARROW")){
      mainCyclist.y +=20;
    }
    
  }
    
    
    //path.velocityX=-(4+2*distance/150);
    
   spawnPlayer();
   spawnOb();
   spawnArrow();
    if(mainCyclist.isTouching(rCG)){
       gameState=END;
       rCG.destroyEach();
       path.velocityX=0;
       rCG.velocityX=0;
       rCG.setLifetime=-1;
       mainCyclist.addAnimation(mainRacerImg2);
       }
    
    if(mainCyclist.isTouching(pCG)){
       gameState=END;
       pCG.destroyEach();
       path.velocityX=0;
       pCG.velocityX=0;
       pCG.setLifetime=-1;
       
       }
    if(mainCyclist.isTouching(arrowG)){
       gameState=END;
       arrowG.destroyEach();
       path.velocityX=0;
       arrowG.velocityX=0;
       arrowG.setLifetime=-1;
       
       }
    if(mainCyclist.isTouching(yCG)){
       gameState=END;
       yCG.destroyEach();
       path.velocityX=0;
       yCG.velocityX=0;
       yCG.setLifetime=-1;
       
       }
  if(mainCyclist.isTouching(obsGroup)){
     
       obsGroup.destroyEach();
       obsGroup.setLifetime=-1;
       gameState=END;
       
      score=score+1;
       }
 } 
  if (gameState===END){
   
   gameover.visible=true;
  textSize(20);
  fill(255);
  text("Press Space Key to Restart the Game",90,200);
  mainCyclist.addImage(mainRacerImg2);
   
   if (keyDown("space")){
     reset();
   }
   
 }


function spawnPlayer(){
   if(frameCount%200===0){
      var rand=Math.round(random(1,4));
      switch(rand){
        case 1 :yellowC() ;
          break;
       case 2 : redC();
          break;
          case 3 : pinkC();
          break;
          default:break;
          
          
          
      }
   
   
    }
}
function redC(){
 
   redP=createSprite(500,100,20,30);
   redP.addAnimation("red",r1);
   redP.setLifetime=170;
   redP.velocityX=-(6+2*distance/150);
   redP.y=Math.round(random(50,140));
   redP.scale=0.06;
   rCG.add(redP);
  
  

}

function pinkC(){
   pinkP=createSprite(500,100,20,30);
   pinkP.addAnimation("pink",p1);
   pinkP.setLifetime=170;
   pinkP.velocityX =-(6+2*distance/150);  
   pinkP.y=Math.round(random(50,140));
   pinkP.scale=0.06;
   pCG.add(pinkP);
  
  }

function yellowC(){
 
   
   yellowP=createSprite(500,100,20,30);
   yellowP.addAnimation("red",y1);
   yellowP.setLifetime=170;
   yellowP.velocityX=-(6+2*distance/150);
   yellowP.y=Math.round(random(50,140));
   yellowP.scale=0.06;
   yCG.add(yellowP);
  
  

}

function reset(){

  gameState=PLAY;
  path.velocityX=-(6+2*distance/150);
  pCG.destroyEach();
  rCG.destroyEach();
  yCG.destroyEach();
  obsGroup.destroyEach();
  distance=0;
  score=0;
  
}


function spawnOb(){
  if(frameCount%300===0){
  obstacle=createSprite(500,30,40,40);
  obstacle.scale=0.1;
  obstacle.velocityX=-(5+2*distance/150);
  obstacle.y=Math.round(random(30,270));
    var position = Math.round(random(1,3));
    switch(position){
      
      case 1:obstacle.addImage(ob1);
        break;
      case 2 :obstacle.addImage(ob2);
        break;
        case 3 : obstacle.addImage(ob3);
        break;
        default:break;
    }
  
    obsGroup.add(obstacle);
} 
  
}

function spawnArrow(){
  if(frameCount%400==0){
  arrow=createSprite(500,10,20,30);
  arrow.addImage(arrowImg);
  arrow.y=Math.round(random(30,270));
  arrow.velocityX=-(8+2*distance/150);
  arrow.scale=0.3;
  arrowG.add(arrow);}
}













































































