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
        this.image = new Image(10,10);

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
        super.update();

    }

    render(context) {
        if(!this.dead){
            //context.fillStyle = "rgb(255,0,0)";
            //context.fillRect(this.position[0], this.position[1], 10, 10);
            context.drawImage(this.image,this.position[0],this.position[1],20,20);
            //console.log(this.position);

        }
    }


}

export default ExplosionParticle;