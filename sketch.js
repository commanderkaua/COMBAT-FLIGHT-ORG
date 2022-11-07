var F22, F22Img;
var SU57, SU57Img;
var gameState = "fight";
var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;
var score = 0;
var life = 3;
var bg, bgImg;
var SU57Group;
var missile = 70;
var missileImg;
var restartB;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	SU57Img = loadImage("SU57ORG.jpg");
	F22Img = loadImage("F22ORG2.jpg");
	bgImg = loadImage("sky.jpg");
	heart1Img = loadImage("LIFE1.png");
	heart2Img = loadImage("LIFE2.png");
	heart3Img = loadImage("LIFE3.png");
	missileImg = loadImage("AIM.jpg");
}

function setup() {
	createCanvas(windowWidth,windowHeight);
	//bg = createSprite(displayWidth/2,displayHeight/2-40,20,20);
  	//bg.addImage(bgImg);
  //bg.scale = 2.7



		restartB = createSprite(400,500,50,50);
	  restartB.visible = false;

	engine = Engine.create();
	world = engine.world;

	//Crie os corpos aqui.
	F22 = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
	F22.addImage(F22Img)
	F22.scale = 0.2
	F22.debug = true
	F22.setCollider("rectangle",0,0,650,200)

	Engine.run(engine);

	heart1 = createSprite(displayWidth-330,40,20,20)
   heart1.visible = false
    heart1.addImage(heart1Img);
    heart1.scale = 0.03;

    heart2 = createSprite(displayWidth-265,40,20,20)
    heart2.visible = false
    heart2.addImage(heart2Img);
    heart2.scale = 0.03;

    heart3 = createSprite(displayWidth-200,40,20,20)
    heart3.addImage(heart3Img);
    heart3.scale = 0.03;
	heart3.visible = false;
  

	SU57Group = new Group();
	missileGroup = new Group();
}


function draw() {
  background(bgImg);
  textSize(30);
  stroke("red");
  text("pontuação:"+ score, windowWidth/2, 40);


  if(gameState === "fight"){

	if(life===3){
	  heart3.visible = true
	  heart1.visible = true
	  heart2.visible = true
	}
	if(life===2){
	  heart2.visible = true
	  heart1.visible = true
	  heart3.visible = false
	}
	if(life===1){
	  heart1.visible = true
	  heart3.visible = false
	  heart2.visible = false
	}
 

  if(life===0){
    heart1.visible = false
    heart3.visible = false
    heart2.visible = false
    gameState = "lost"
    
  }

  if(keyDown("UP_ARROW")||touches.length>0){
	F22.y = F22.y-30
  }
  if(keyDown("DOWN_ARROW")||touches.length>0){
   F22.y = F22.y+30
  }

  if(keyWentDown("space")){
	missile = createSprite(displayWidth-1150,F22.y-1,20,10)
	missile.velocityX = 20
	missile.addImage(missileImg);
	missile.scale = 0.09
	missileGroup.add(missile)
	F22.depth = F22.depth
	F22.depth = F22.depth+2
	missile = missile-1
	
  }

  if(SU57Group.isTouching(missileGroup)){
	for(var i=0;i<SU57Group.length;i++){     
	 if(missileGroup.isTouching(SU57Group)){
		  SU57Group[i].destroy()
		  missileGroup.destroyEach();
		  score = score+1;		 
		} 
	
	}
  }

  if(SU57Group.isTouching(F22)){

	for(var i=0;i<SU57Group.length;i++){     
		 
	 if(SU57Group[i].isTouching(F22)){
		  SU57Group[i].destroy()
   life = life-1;
		  } 
		  
	}
   }

  
  enemy();

if(score===10){
	gameState = "won"
}

  if(gameState == "lost"){  
	textSize(100)
	fill("red");
	text("Você Perdeu :(", 400,400);
	SU57Group.destroyEach();
	restartB.visible = true;
    
  }
  else if(gameState == "won"){   
	textSize(100)
	fill("yellow")
	text("Você Ganhou :D",400,400)
	SU57Group.destroyEach();
	restartB.visible = true;
  }

 drawSprites();  
  }



if(mousePressedOver(restartB)){
	gameState = "fight";
	score = 0;
	life = 3;
	zombieGroup.destroyEach();
	bulletGroup.destroyEach();
	restartB.visible = false;
} 

}
function enemy(){
	if(frameCount%50===0){
	  SU57 = createSprite(random(200,1100),random(200,500),40,40)
  
	  SU57.addImage(SU57Img)
	  SU57.scale = 0.15
	  SU57.velocityX = -8;
	  SU57.debug= true
	  SU57.setCollider("rectangle",0,0,800,250)
	  SU57.lifetime = 150
	  SU57Group.add(SU57)
	}
  
  }

