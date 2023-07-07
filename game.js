var player = new Player();
var enemyimg;
var pandaimg;
var startimg;
var start2img;
var endimgs = [];
function preload(){
    startimg = loadImage("./start.png");
    start2img = loadImage("./start2.png");
    endimgs = [loadImage("./end0.png"),loadImage("./end1.png"),loadImage("./end2.png"),loadImage("./end3.png"),loadImage("./end4.png"),loadImage("./end5.png"),loadImage("./end6.png"),loadImage("./end7.png"),loadImage("./end8.png"),loadImage("./end9.png"),loadImage("./end10ormore.png"),]
    enemyimg = loadImage("./tank.png");
    pandaimg = loadImage("./panda.png");
}
class Game{
    static starting = true;
    static starting2 = false;
    static dead = false;
    static width = 50;
    static height = 50;
    static gold = 0;
    static mana = 0;
    static tileSize = 32;
    static data = [];
    static buildMode = false;
    static x = 100; // based on pixels
    static y = 500; // based on pixels
    static screenTilesWidth = 45;
    static screenTilesHeight = 26;
    static basePlaced = false;
    static building = "none";
    static time = 3600;
    static base;
    static wave = 0;
    static addData(newObject){
        for(var d of this.data){
            if(d.x == newObject.x && d.y == newObject.y){
                d = newObject;
            }
        }
        this.data.push(newObject)
    }
    static getThingsAt(x,y){
        var things = [];
        for(var d of this.data){
            if(d.x + d.w > x && d.x <= x && d.y + d.h > y && d.y <= y){
                things.push(d);
            }
        } 
        return things;
    }
    static checkPlayerCollisions(){
        var playerPositionInTiles = findTilePosition(player.x + this.x,player.y + this.y);
        var playerWidth = player.w/32;
        var playerHeight = player.h/32;
        for(var d of this.data){
            if(d.obstacle){
            if(d.x + d.w > playerPositionInTiles.decimalX && d.x < playerPositionInTiles.decimalX + playerWidth && d.y + d.h > playerPositionInTiles.decimalY && d.y < playerPositionInTiles.decimalY + playerHeight){
                return true;
                
            }
        }
        }
        return false;
    }
    static spawnEnemies(){
        for(var i = 0; i < Math.pow(2,this.wave); i++){
            if(Math.random() > 0.5){
                this.addData(new Enemy(Math.random()*5,Math.random()*5,40,this.base));
            }else{
                this.addData(new Enemy(this.width-Math.random()*5,this.height-Math.random()*5,40,this.base)); 
            }
        }
        this.wave ++;
    }
    static draw(){
        if(this.basePlaced){
            fill(0);
            textSize(17);
            this.time --;
            textAlign(CENTER);
            var displaytime = this.time/60
            text(displaytime.toFixed(2),720,50)
            if(this.time <= 0){
                this.time = 3600;
                this.spawnEnemies();
            }
        }
        if(this.x < -663){
            this.x = -663;
        }
        if(this.y < -353){
            this.y = -353;
        }
        if(this.x > 855){
            this.x = 855;
        }
        if(this.y > 1165){
            this.y = 1165;
        }
        if(this.buildMode){
            for(var i = findTilePosition(this.x,this.y).x; i < Math.min(findTilePosition(this.x,this.y).x + this.screenTilesWidth,100); i++){
                if(i < 0){
                    i = 0;
                }
                if(i > this.width){
                    break;
                }
                for(var j = findTilePosition(this.x,this.y).y; j < Math.min(findTilePosition(this.x,this.y).y + this.screenTilesHeight,100); j++){
                    if(j < 0){
                        j = 0;
                    }
                    if(j > this.width){
                        break;
                    }
                    noFill();
                    stroke(210);
                    strokeWeight(1);
                    rect(i * this.tileSize - this.x, j * this.tileSize - this.y, this.tileSize, this.tileSize);
                }
            }
        }
        var tileX = findTilePosition(this.x,this.y).x;
        var tileY = findTilePosition(this.x,this.y).y;
        for(var d of this.data){
            if(d.x + d.w >= tileX && d.x <= tileX + this.screenTilesWidth && d.y + d.h >= tileY && d.y <= tileY + this.screenTilesHeight){
                d.draw((d.x - findTilePosition(this.x,this.y).decimalX) * 32,(d.y - findTilePosition(this.x,this.y).decimalY) * 32);
            }
        }  
        
        player.draw();
            stroke(40);
            fill(100);
            rect(320,660,80,80,10,10)
            rect(440,660,80,80,10,10)
            rect(560,660,80,80,10,10)
            rect(680,660,80,80,10,10)
            rect(800,660,80,80,10,10)
            rect(920,660,80,80,10,10)
            rect(1040,660,80,80,10,10)

            if(this.buildMode){
                if(keyIsDown(LEFT_ARROW)){
                    this.buildMode = false;
                }
                if(keyIsDown(RIGHT_ARROW)){
                    this.buildMode = false;
                }
                if(keyIsDown(UP_ARROW)){
                    this.buildMode = false;
                }
                if(keyIsDown(DOWN_ARROW)){
                    this.buildMode = false;
                }
                var tileX = findTilePosition(this.x + mouseX,this.y + mouseY).x;
                var tileY = findTilePosition(this.x + mouseX,this.y + mouseY).y;
                if(tileX < 1){
                    tileX = 1;
                }
                if(tileY < 1){
                    tileY = 1;
                }
                
                var x = tileX * this.tileSize - this.x;
                var y = tileY * this.tileSize - this.y;
                

                switch(this.building){
                    case "panda":
                        if(tileY > Game.height - 4){
                            tileY = Game.width - 4;
                        }
                        if(tileX > Game.width - 4){
                            tileX = Game.height - 4;
                        }
                        x = tileX * this.tileSize - this.x;
                        y = tileY * this.tileSize - this.y;
                        rect(x,y, 4 * this.tileSize, 4 * this.tileSize);
                        
                        break;
                    case "mini":
                        if(tileY > Game.height - 1){
                            tileY = Game.width - 1;
                        }
                        if(tileX > Game.width - 1){
                            tileX = Game.height - 1;
                        }
                        x = tileX * this.tileSize - this.x;
                        y = tileY * this.tileSize - this.y;
                        rect(x,y, 1 * this.tileSize, 1 * this.tileSize);
                        break;
                    case "turret":
                        if(tileY > Game.height - 2){
                            tileY = Game.width - 2;
                        }
                        if(tileX > Game.width - 2){
                            tileX = Game.height - 2;
                        }
                        x = tileX * this.tileSize - this.x;
                        y = tileY * this.tileSize - this.y;
                        rect(x,y, 2 * this.tileSize, 2 * this.tileSize);
                        break;
                    case "rail":
                        if(tileY > Game.height - 3){
                            tileY = Game.width - 3;
                        }
                        if(tileX > Game.width - 3){
                            tileX = Game.height - 3;
                        }
                        x = tileX * this.tileSize - this.x;
                        y = tileY * this.tileSize - this.y;
                        rect(x,y, 3 * this.tileSize, 3 * this.tileSize);
                        break;
                    case "wall":
                        if(tileY > Game.height - 1){
                            tileY = Game.width - 1;
                        }
                        if(tileX > Game.width - 1){
                            tileX = Game.height - 1;
                        }
                        x = tileX * this.tileSize - this.x;
                        y = tileY * this.tileSize - this.y;
                        rect(x,y, 1 * this.tileSize, 1 * this.tileSize);
                        break;
                    case "mine":
                        if(tileY > Game.height - 1){
                            tileY = Game.width - 1;
                        }
                        if(tileX > Game.width - 1){
                            tileX = Game.height - 1;
                        }
                        x = tileX * this.tileSize - this.x;
                        y = tileY * this.tileSize - this.y;
                        rect(x,y, 1 * this.tileSize, 1 * this.tileSize);
                        break;
                    case "mine2":
                        if(tileY > Game.height - 1){
                            tileY = Game.width - 1;
                        }
                        if(tileX > Game.width - 1){
                            tileX = Game.height - 1;
                        }
                        x = tileX * this.tileSize - this.x;
                        y = tileY * this.tileSize - this.y;
                        rect(x,y, 1 * this.tileSize, 1 * this.tileSize);
                        break;
                }
            }
        
    }   
    
    static move(xMovement,yMovement){
        x += xMovement;
        y += yMovement;
    }
}

function findTilePosition(x,y){
    return {"x": Math.floor(x/Game.tileSize), "decimalX": x/Game.tileSize, "y": Math.floor(y/Game.tileSize), "decimalY": y/Game.tileSize};
}

function setup(){
    createCanvas(1440,820);
}

function moveTilTouchingX(dir){
    if(Game.checkPlayerCollisions()){
        if(dir > 0){
            Game.x ++;
        }else{
            Game.x--;
        }
        if(Game.checkPlayerCollisions()){
            moveTilTouchingX(dir);
        }
    }
}   
function moveTilTouchingY(dir){
    if(Game.checkPlayerCollisions()){
        if(dir > 0){
            Game.y ++;
        }else{
            Game.y--;
        }
        if(Game.checkPlayerCollisions()){
            moveTilTouchingY(dir);
        }
    }
}   

function draw(){
    background(100,200,100);
    if(Game.starting){
        image(startimg,0,0,1440,820);
    }else if(Game.starting2){
        image(start2img,0,0,1440,820);
    }
    if(Game.dead){
        Game.basePlaced = false;
        if(Game.wave < 12){
            image(endimgs[Game.wave - 2],0,0,1440,820);
        }else{
            image(endimgs[10],0,0,1440,820);
        }
    }
    if(Game.starting || Game.dead || Game.starting2){return;}
    for(var g of Game.data){
        g.update();
    }
    Game.draw();
    if(keyIsDown(LEFT_ARROW)){
        Game.x -= 14;
        if(Game.checkPlayerCollisions()){
            moveTilTouchingX(1)
        }
    } if(keyIsDown(RIGHT_ARROW)){
        Game.x += 14;
        if(Game.checkPlayerCollisions()){
            moveTilTouchingX(-1);
        }
    }
    if(keyIsDown(UP_ARROW)){
        Game.y -= 14;
        if(Game.checkPlayerCollisions()){
            moveTilTouchingY(1)
        }
    } if(keyIsDown(DOWN_ARROW)){
        Game.y += 14;
        if(Game.checkPlayerCollisions()){
            moveTilTouchingY(-1);
        }
    }

    fill("yellow");
    stroke("black");
    strokeWeight(3);
    textStyle(NORMAL);
    rect(50,50,30,30,25,25);
    fill(0);
    noStroke();
    textSize(20);
    textAlign(LEFT);
    text(Math.floor(Game.gold),93,72.5);


    fill(0,255,255);
    stroke("black");
    strokeWeight(3);
    rect(50,100,30,30);
    fill(0);
    noStroke();
    textSize(20);
    textAlign(LEFT);
    text(Math.floor(Game.mana),93,122.5);

    if (mouseX > 320 && mouseX < 400 && mouseY > 660 && mouseY < 740){
        //building 1 - base
        noStroke();
        fill(60,60,60,155)
        rect(270,520,180,110);
        textAlign(CENTER);
        fill(255);
        textStyle(BOLD);
        textSize(17);
        text("Panda",360,550);
        textStyle(NORMAL);
        textSize(15);
        text("The center of your base,",360,580);
        text("if it dies you lose",360,600)
    }
    if (mouseX > 440 && mouseX < 520 && mouseY > 660 && mouseY < 740){
        //building 2 - turret cheap
        noStroke();
        fill(60,60,60,155)
        rect(390,520,220,110);
        textAlign(CENTER);
        fill(255);
        textStyle(BOLD);
        textSize(17);
        text("Mini-Turret",480,550);
        textStyle(NORMAL);
        textSize(15);
        text("Cheap, Fast shooting",480,580);
        text("turret perfect for",480,600)
        text("early defenses",480,620)

        fill("yellow");
        stroke("black");
        strokeWeight(3);
        rect(580,530,20,20,25,25);
        fill(255);
        noStroke();
        textSize(15);
        textAlign(CENTER);
        text("500",589,570);


        fill(0,255,255);
        stroke("black");
        strokeWeight(3);
        rect(580,580,20,20);
        fill(255);
        noStroke();
        text("500",589,620);
    }
    if (mouseX > 560 && mouseX < 640 && mouseY > 660 && mouseY < 740){
        //building 2 - turret normal
        noStroke();
        fill(60,60,60,155)
        rect(510,520,220,110);
        textAlign(CENTER);
        fill(255);
        textStyle(BOLD);
        textSize(17);
        text("Turret",600,550);
        textStyle(NORMAL);
        textSize(15);
        text("Fast shooting",600,580);
        text("turret perfect for",600,600)
        text("large groups",600,620)

        fill("yellow");
        stroke("black");
        strokeWeight(3);
        rect(700,530,20,20,25,25);
        fill(255);
        noStroke();
        textSize(15);
        textAlign(CENTER);
        text("2000",709,570);


        fill(0,255,255);
        stroke("black");
        strokeWeight(3);
        rect(700,580,20,20);
        fill(255);
        noStroke();
        text("1250",709,620);
    }
    if (mouseX > 680 && mouseX < 760 && mouseY > 660 && mouseY < 740){
        //building 3 - turret expensive
        noStroke();
        fill(60,60,60,155)
        rect(630,500,220,130);
        textAlign(CENTER);
        fill(255);
        textStyle(BOLD);
        textSize(17);
        text("Railgun",720,530);
        textStyle(NORMAL);
        textSize(15);
        text("Expensive, slow shooting",720,560);
        text("but powerful turret",720,580)
        text("perfect for destroying",720,600)
        text("strong enemies",720,620)

        fill("yellow");
        stroke("black");
        strokeWeight(3);
        rect(820,530,20,20,25,25);
        fill(255);
        noStroke();
        textSize(15);
        textAlign(CENTER);
        text("12500",829,570);


        fill(0,255,255);
        stroke("black");
        strokeWeight(3);
        rect(820,580,20,20);
        fill(255);
        noStroke();
        text("17500",829,620);
    }
    if (mouseX > 800 && mouseX < 880 && mouseY > 660 && mouseY < 740){
        //building 4 - wall
        noStroke();
        fill(60,60,60,155)
        rect(750,520,220,110);
        textAlign(CENTER);
        fill(255);
        textStyle(BOLD);
        textSize(17);
        text("Wall",840,550);
        textStyle(NORMAL);
        textSize(15);
        text("Stops enemies from",840,580);
        text("proceeding",840,600)
        fill("yellow");
        stroke("black");
        strokeWeight(3);
        rect(940,530,20,20,25,25);
        fill(255);
        noStroke();
        textSize(15);
        textAlign(CENTER);
        text("100",949,570);


        fill(0,255,255);
        stroke("black");
        strokeWeight(3);
        rect(940,580,20,20);
        fill(255);
        noStroke();
        text("50",949,620);
    }
    if (mouseX > 920 && mouseX < 1000 && mouseY > 660 && mouseY < 740){
        //building 5 - mine
        noStroke();
        fill(60,60,60,155)
        rect(870,520,220,110);
        textAlign(CENTER);
        fill(255);
        textStyle(BOLD);
        textSize(17);
        text("Mine",960,550);
        textStyle(NORMAL);
        textSize(15);
        text("Mines from underneath it,",960,580);
        text("harvesting resources",960,600)

        fill("yellow");
        stroke("black");
        strokeWeight(3);
        rect(1060,530,20,20,25,25);
        fill(255);
        noStroke();
        textSize(15);
        textAlign(CENTER);
        text("500",1069,570);


        fill(0,255,255);
        stroke("black");
        strokeWeight(3);
        rect(1060,580,20,20);
        fill(255);
        noStroke();
        text("500",1069,620);
    }
    if (mouseX > 1040 && mouseX < 1120 && mouseY > 660 && mouseY < 740){
        //building 7 - mine v2
        noStroke();
        fill(60,60,60,155)
        rect(990,520,220,110);
        textAlign(CENTER);
        fill(255);
        textStyle(BOLD);
        textSize(17);
        text("Mine v2",1080,550);
        textStyle(NORMAL);
        textSize(15);
        text("Mines from underneath it,",1080,580);
        text("harvesting resources",1080,600)
        text("5x faster",1080,620);

        fill("yellow");
        stroke("black");
        strokeWeight(3);
        rect(1180,530,20,20,25,25);
        fill(255);
        noStroke();
        textSize(15);
        textAlign(CENTER);
        text("2000",1189,570);


        fill(0,255,255);
        stroke("black");
        strokeWeight(3);
        rect(1180,580,20,20);
        fill(255);
        noStroke();
        text("2000",1189,620);
    }
    if(mouseIsPressed){
        for(var d of Game.data){
            if(d instanceof Gold || d instanceof Mana){
                if(d.checkCollision()){
                    if(Game.basePlaced){
                        if(d instanceof Gold){Game.gold++;}
                        if(d instanceof Mana){Game.mana++;}
                    }else if (!Game.buildMode){
                        fill("red");
                        textAlign(CENTER);
                        textStyle(BOLD);
                        textSize(35);
                        text("Please Place a Panda Before Starting",720,80)
                    }
                }
            }
        }
    }


    

}

function mousePressed(){
    if(Game.starting2){
        if(mouseX > 485 && mouseX < 905 && mouseY > 600 && mouseY < 710){
            Game.starting = false;
            Game.starting2 = false;
            return;
        }
    }
    if(Game.starting){
        if(mouseX > 485 && mouseX < 905 && mouseY > 600 && mouseY < 710){
            Game.starting2 = true;
            Game.starting = false;
            return;
        }
    }
    if(!Game.basePlaced && Game.buildMode && Game.building == "panda"){
        var tileX = findTilePosition(Game.x + mouseX,Game.y + mouseY).x;
        var tileY = findTilePosition(Game.x + mouseX,Game.y + mouseY).y;
        if(tileX < 1){
            tileX = 1;
        }
        if(tileY < 1){
            tileY = 1;
        }
        if(tileY > Game.height - 4){
            tileY = Game.width - 4;
        }
        if(tileX > Game.width - 4){
            tileX = Game.height - 4;
        }
        Game.addData(new Panda(tileX,tileY));
        Game.basePlaced = true;
        Game.base = Game.data[Game.data.length - 1];
    }
    
        if (mouseX > 320 && mouseX < 400 && mouseY > 660 && mouseY < 740){
            //building 1 - base 4x4
            Game.buildMode = true;
            Game.building = "panda";
            return;
        }
        if (mouseX > 440 && mouseX < 520 && mouseY > 660 && mouseY < 740){
            //building 2 - turret cheap 2x2
            Game.buildMode = true;
            Game.building = "mini";
            return;
        }
        if (mouseX > 560 && mouseX < 640 && mouseY > 660 && mouseY < 740){
            //building 2 - turret cheap 2x2
            Game.buildMode = true;
            Game.building = "turret";
            return;
        }
        if (mouseX > 680 && mouseX < 760 && mouseY > 660 && mouseY < 740){
            //building 3 - turret expensive 3x3
            Game.buildMode = true;
            Game.building = "rail";
            return;
        }
        if (mouseX > 800 && mouseX < 880 && mouseY > 660 && mouseY < 740){
            //building 4 - wall 1x1
            Game.buildMode = true;
            Game.building = "wall";
            return;
        }
        if (mouseX > 920 && mouseX < 1000 && mouseY > 660 && mouseY < 740){
            //building 5 - mine 1x1
            Game.buildMode = true;
            Game.building = "mine";
            return;
        }
        if (mouseX > 1040 && mouseX < 1120 && mouseY > 660 && mouseY < 740){
            Game.buildMode = true;
            Game.building = "mine2";
            return;
        }
    if(Game.buildMode && Game.building == "mine" && Game.mana >= 500 && Game.gold >= 500){
        var tileX = findTilePosition(Game.x + mouseX,Game.y + mouseY).x;
        
        var tileY = findTilePosition(Game.x + mouseX,Game.y + mouseY).y;
        var g = Game.getThingsAt(tileX,tileY);
        Game.mana -= 500;
        Game.gold -= 500;
        for (var d of g){
            if(d.obstacle){
                return;
            }
        }
        if(tileX < 1){
            tileX = 1;
        }
        if(tileY < 1){
            tileY = 1;
        }
        if(tileY > Game.height - 1){
            tileY = Game.width - 1;
        }
        if(tileX > Game.width - 1){
            tileX = Game.height - 1;
        }
        Game.addData(new Mine(tileX,tileY));
    }
    if(Game.buildMode && Game.building == "mine2" && Game.mana >= 2000 && Game.gold >= 2000){
        var tileX = findTilePosition(Game.x + mouseX,Game.y + mouseY).x;
        
        var tileY = findTilePosition(Game.x + mouseX,Game.y + mouseY).y;
        var g = Game.getThingsAt(tileX,tileY);
        for (var d of g){
            if(d.obstacle){
                return;
            }
        }
        Game.mana -= 2000;
        Game.gold -= 2000;
        if(tileX < 1){
            tileX = 1;
        }
        if(tileY < 1){
            tileY = 1;
        }
        if(tileY > Game.height - 1){
            tileY = Game.width - 1;
        }
        if(tileX > Game.width - 1){
            tileX = Game.height - 1;
        }
        Game.addData(new Mine2(tileX,tileY));
    }
    if(Game.buildMode && Game.building == "mini" && Game.mana >= 500 && Game.gold >= 500){
        var tileX = findTilePosition(Game.x + mouseX,Game.y + mouseY).x;
       
        var tileY = findTilePosition(Game.x + mouseX,Game.y + mouseY).y;
        var g = Game.getThingsAt(tileX,tileY);
        for (var d of g){
            if(d.obstacle){
                return;
            }
        }
        Game.mana -= 500;
        Game.gold -= 500;
        if(tileX < 1){
            tileX = 1;
        }
        if(tileY < 1){
            tileY = 1;
        }
        if(tileY > Game.height - 1){
            tileY = Game.width - 1;
        }
        if(tileX > Game.width - 1){
            tileX = Game.height - 1;
        }
        Game.addData(new MiniTurret(tileX,tileY));
    }
    if(Game.buildMode && Game.building == "turret" && Game.mana >= 1250 && Game.gold >= 2000){
        var tileX = findTilePosition(Game.x + mouseX,Game.y + mouseY).x;
       
        var tileY = findTilePosition(Game.x + mouseX,Game.y + mouseY).y;
        var g = Game.getThingsAt(tileX,tileY);
        for (var d of g){
            if(d.obstacle){
                return;
            }
        }
        Game.mana -= 1250;
        Game.gold -= 2000;
        if(tileX < 1){
            tileX = 1;
        }
        if(tileY < 1){
            tileY = 1;
        }
        if(tileY > Game.height - 1){
            tileY = Game.width - 1;
        }
        if(tileX > Game.width - 1){
            tileX = Game.height - 1;
        }
        Game.addData(new Turret(tileX,tileY));
    }
    if(Game.buildMode && Game.building == "rail" && Game.mana >= 17500 && Game.gold >= 12500){
        var tileX = findTilePosition(Game.x + mouseX,Game.y + mouseY).x;
       
        var tileY = findTilePosition(Game.x + mouseX,Game.y + mouseY).y;
        var g = Game.getThingsAt(tileX,tileY);
        for (var d of g){
            if(d.obstacle){
                return;
            }
        }
        Game.mana -= 17500;
        Game.gold -= 12500;
        if(tileX < 1){
            tileX = 1;
        }
        if(tileY < 1){
            tileY = 1;
        }
        if(tileY > Game.height - 1){
            tileY = Game.width - 1;
        }
        if(tileX > Game.width - 1){
            tileX = Game.height - 1;
        }
        Game.addData(new Rail(tileX,tileY));
    }
    
}