class GameObject{
    constructor(x,y,w,h,obstacle){
        this.x = x;
        this.y = y;
        this.obstacle = obstacle;
        this.w = w;
        this.h = h;
    }
    draw(x,y){ 
        fill("black");
        noStroke();
        rect(x,y,Game.tileSize * this.w, Game.tileSize * this.h);
    }
    update(){}
}