import ParticleEmitter from "./particleemitter.js";
import util from './util.js'

//"user strict"


/*
 * An emitter knows only how much and where to spawn particles.
 */

class ExplosionEmitter extends ParticleEmitter{
    radius;
    nextParticlePos;
    middle;

    constructor(config){
        super(config);
        this.middle=config.middle;
    }

    emit(particleSystem) {
        super.emit(particleSystem);
    }

    place(particle) {
        //place within a line
        this.emitPosition = [util.rand(this.middle[0]-this.radius,this.radius),util.rand(this.middle[1]-this.radius,this.radius)];
        //particle.velocity=[0,1];
        particle.position=this.emitPosition;
        console.log(particle.position);
        //this.nextParticlePos+=this.distancePerParticle;
    }
}

export default ExplosionEmitter;