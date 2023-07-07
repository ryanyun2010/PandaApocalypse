class Enemy extends GameObject{
    constructor(x,y,health,target){
        super(x,y,2,2,true);
        this.target = target;
        this.health = health;
    }
    draw(x,y){
        image(enemyimg,x,y,80,60)
    }
    update(){
        var angle = Math.atan2(this.y - this.target.y,this.x - this.target.x);
        this.x += Math.cos(angle + Math.PI)/10;
        this.y += Math.sin(angle + Math.PI)/10;
        if(this.health < 0){
            Game.data.splice(Game.data.indexOf(this),1);
        }
        if(Math.hypot(this.x - this.target.x,this.y - this.target.y) < 1.5){
            this.target.health --;
        }
    }
}