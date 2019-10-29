import ParticleEmitter from "./particleemitter.js";
import util from './util.js'

//"user strict"


/*
 * An emitter knows only how much and where to spawn particles.
 */

class ExplosionEmitter extends ParticleEmitter{

    constructor(config){
        super(config);
        this.middle=config.middle;
        this.radius=config.radius;
    }

    update(particleSystem) {
        super.update(particleSystem);
    }

    emit(particleSystem) {
        super.emit(particleSystem);
    }

    place(particle) {
        let randX = util.rand(-this.radius,this.radius);
        let randY = util.rand(-this.radius,this.radius);

        this.emitPosition = [randX+this.middle[0],randY+this.middle[1]];
        particle.velocity=[this.emitPosition[0] -this.middle[0],this.emitPosition[1] -this.middle[1]];
        particle.position=this.emitPosition;

        //this.nextParticlePos+=this.distancePerParticle;
    }
}

export default ExplosionEmitter;