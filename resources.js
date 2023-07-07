class Gold extends GameObject{
    constructor(x,y,w,h){
        super(x,y,w,h,false);
        this.hovered = false;
    }
    draw(x,y){
        this.hovered = false;
        fill("yellow");
        stroke(0);
        strokeWeight(3);
        rect(x,y,Game.tileSize * this.w, Game.tileSize * this.h);
        if(mouseX > x && mouseY > y && mouseX < x + Game.tileSize * this.w && mouseY < y + Game.tileSize * this.h){
          this.hovered = true;  
        }
    }
    checkCollision(){
        return this.hovered;
    }

}
class Mana extends GameObject{
    constructor(x,y,w,h){
        super(x,y,w,h,false);
        this.hovered = false;
    }
    draw(x,y){
        this.hovered = false;
        fill(0,255,255);
        stroke(0);
        strokeWeight(3);
        rect(x,y,Game.tileSize * this.w, Game.tileSize * this.h);
        if(mouseX > x && mouseY > y && mouseX < x + Game.tileSize * this.w && mouseY < y + Game.tileSize * this.h){
            this.hovered = true;
        }
    }
    checkCollision(){
        return this.hovered;
    }
}