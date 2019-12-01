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
        this.RotationDegree = 0;



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
        if (this.RotationDegree<351){
            this.RotationDegree+=4;
        }
        else {
            this.RotationDegree=0
        }
        super.update();

    }

    render(context) {
        if(!this.dead){
            this.drawRotated(context)

        }
    }

    drawRotated(ctx){
        ctx.setTransform(1,0,0,1,0,0)
        ctx.translate(this.position[0], this.position[1]);
        ctx.rotate(this.RotationDegree*Math.PI/90);
        let size = this.startSize * 0.5
        ctx.drawImage(this.image,-size,-size,size,size);
        ctx.setTransform(1,0,0,1,0,0)
    }


}

export default ExplosionParticle;