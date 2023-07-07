class Panda extends GameObject{
    constructor(x,y){
        super(x,y,4,4,true);
        this.health = 1000;
    }
    draw(x,y){
        fill("white");
        stroke("black");
        strokeWeight(3);
        rect(x,y,Game.tileSize * this.w, Game.tileSize * this.h);
        textAlign(CENTER);
        fill("black");
        noStroke();
        text(this.health + "/1000",x + 2 * Game.tileSize,y-30)
        if(this.health < 1){
            Game.data.splice(Game.data.indexOf(this));
            Game.dead = true;
        }
    }
}
class Mine extends GameObject{
    constructor(x,y){
        super(x,y,1,1,true);
    }
    draw(x,y){
        noFill();
        stroke("black");
        strokeWeight(12);
        rect(x,y,Game.tileSize * this.w, Game.tileSize * this.h);
        strokeWeight(3);
    }
    update(){
        for(var g of Game.getThingsAt(this.x,this.y)){
            if(g instanceof Gold){
                Game.gold += 0.5;
            }
            if(g instanceof Mana){
                Game.mana += 0.5;
            }
        }
    }
}
class Mine2 extends GameObject{
    constructor(x,y){
        super(x,y,1,1,true);
    }
    draw(x,y){
        noFill();
        stroke("black");
        strokeWeight(12);
        rect(x,y,Game.tileSize * this.w, Game.tileSize * this.h);
        strokeWeight(3);
    }
    update(){
        for(var g of Game.getThingsAt(this.x,this.y)){
            if(g instanceof Gold){
                Game.gold += 2.5;
            }
            if(g instanceof Mana){
                Game.mana += 2.5;
            }
        }
    }
}

class MiniTurret extends GameObject{
    constructor(x,y){
        super(x,y,1,1,true);
        this.attackdelay = 3;
        this.curattackdelay = this.attackdelay;
    }
        draw(x,y){ 
            fill("orange");
            stroke("black");
            strokeWeight(3);
            rect(x,y,Game.tileSize * this.w, Game.tileSize * this.h);
}
    update(){
        this.curattackdelay--;
        if(this.curattackdelay < 0){
            this.curattackdelay = this.attackdelay;
        var lowestDistance = [10000000,"none"];
        for(var d of Game.data){
            if(d instanceof Enemy){
                if(Math.sqrt((d.x - this.x)^2 + (d.y-this.y)^2) < lowestDistance[0]){
                    lowestDistance = [Math.sqrt((d.x - this.x)^2 + (d.y-this.y)^2),d];
                }
            }
        }
        if(lowestDistance[1] != "none" && lowestDistance[0] < 8){
            Game.addData(new Projectile(this.x,this.y,1,7,lowestDistance[1],2))
        }
    }
    }
}
class Turret extends GameObject{
    constructor(x,y){
        super(x,y,2,2,true);
        this.attackdelay = 1;
        this.curattackdelay = this.attackdelay;
    }
    draw(x,y){ 
        fill("orange");
        stroke("black");
        strokeWeight(3);
        rect(x,y,Game.tileSize * this.w, Game.tileSize * this.h);
}
    update(){
        this.curattackdelay--;
        if(this.curattackdelay < 0){
            this.curattackdelay = this.attackdelay;
        var lowestDistance = [10000000,"none"];
        for(var d of Game.data){
            if(d instanceof Enemy){
                if(Math.sqrt((d.x - this.x)^2 + (d.y-this.y)^2) < lowestDistance[0]){
                    lowestDistance = [Math.sqrt((d.x - this.x)^2 + (d.y-this.y)^2),d];
                }
            }
        }
        if(lowestDistance[1] != "none" && lowestDistance[0] < 8){
            Game.addData(new Projectile(this.x,this.y,1,10,lowestDistance[1],5))
        }
    }
    }
}
class Rail extends GameObject{
    constructor(x,y){
        super(x,y,3,3,true);
        this.attackdelay = 10;
        this.curattackdelay = this.attackdelay;
    }
    draw(x,y){ 
        fill("orange");
        stroke("black");
        strokeWeight(3);
        rect(x,y,Game.tileSize * this.w, Game.tileSize * this.h);
}
    update(){
        this.curattackdelay--;
        if(this.curattackdelay < 0){
            this.curattackdelay = this.attackdelay;
        var lowestDistance = [10000000,"none"];
        for(var d of Game.data){
            if(d instanceof Enemy){
                if(Math.sqrt((d.x - this.x)^2 + (d.y-this.y)^2) < lowestDistance[0]){
                    lowestDistance = [Math.sqrt((d.x - this.x)^2 + (d.y-this.y)^2),d];
                }
            }
        }
        if(lowestDistance[1] != "none" && lowestDistance[0] < 8){
            
            Game.addData(new Projectile(this.x,this.y,1000,20,lowestDistance[1],100))
        }
    }
    }
}

class Projectile extends GameObject{
    constructor(x,y,damage,speed,target,pierce){
        super(x,y,1,1,false)
        this.pierce = pierce || 1;
        this.damage = damage;
        this.speed = speed;
        this.target = target;
        this.angle = Math.atan2(this.y - this.target.y,this.x - this.target.x);
    }
    draw(x,y){
        fill("black");
        noStroke();
        ellipse(x,y,20,20);
    }
    update(){
        // this.angle = Math.atan2(this.y - this.target.y,this.x - this.target.x);
        for(var g of Game.data){
            if(g instanceof Enemy){
                if(Math.hypot(this.x - g.x, this.y - g.y) < 0.8){
                    g.health -= this.damage;
                    this.pierce --;
                    if(this.pierce < 1){
                        Game.data.splice(Game.data.indexOf(this),1); 
                    }
                }
            }
        }
        
       
        this.x += Math.cos(this.angle + Math.PI) * this.speed/10;
        this.y += Math.sin(this.angle + Math.PI) * this.speed/10; 
        
    }
    
}