"use strict"
import util from './util.js'
import Particle from './particle.js'

/*
 * A particle is a small graphical unit on which emitters and systems act on.
 */
class ExplosionParticle extends Particle{

    speedDecreaseX;
    speedDecreaseY;
    constructor(config) {
        super(config);
        this.startSize = 25
        this.image = new Image(10,10);
        this.RotationDegree = 90;



    }

    init(lifeTime) {
        super.init(lifeTime);
        this.image.src = 'res/flame.png';
        this.speedDecreaseX = this.velocity[0]/lifeTime;
        this.speedDecreaseY = this.velocity[1]/lifeTime;
    }


    update() {
        //movements outwards
        this.velocity[0]-=this.speedDecreaseX;
        this.velocity[1]-=this.speedDecreaseY;
        this.position[0] += this.velocity[0];
        this.position[1] += this.velocity[1];
        this.startSize-=0.5;
        super.update();

    }

    render(context) {
        if(!this.dead){
            //context.fillStyle = "rgb(255,0,0)";
            //context.fillRect(this.position[0], this.position[1], 10, 10);
            this.drawRotated(context)
           // context.drawImage(this.image,this.position[0],this.position[1],this.startSize,this.startSize);
            //console.log(this.position);

        }
    }

    drawRotated(ctx){
      //  ctx.save();
        ctx.setTransform(1,0,0,1,0,0)
        ctx.translate(this.position[0], this.position[1]);
        ctx.rotate(this.RotationDegree*Math.PI/180);
        ctx.drawImage(this.image,0,0,this.startSize,this.startSize);
        //ctx.drawImage(this.image,-this.image.width/2,-this.image.width/2);
        //ctx.rotate(-(this.RotationDegree*Math.PI/180));
        //ctx.translate(-ctx.canvas.width/2,-ctx.canvas.height/2);
        ctx.setTransform(1,0,0,1,0,0)
            //  ctx.restore();
    }


}

export default ExplosionParticle;