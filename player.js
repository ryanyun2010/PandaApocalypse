class Player{
    constructor(){
        this.w = 90;
        this.h = 110; 
        this.x = 675;
        this.y = 385;
    }
    draw(){
        fill("green");
        noStroke();
        image(pandaimg,this.x,this.y,this.w,this.h);
    }
}