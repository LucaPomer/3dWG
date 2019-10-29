import ParticleEmitter from "./particleemitter.js";
import util from './util.js'

//"user strict"


/*
 * An emitter knows only how much and where to spawn particles.
 */

class LineEmitter extends ParticleEmitter{

    constructor(config){
        super(config);
        this.lineLength=config.lineLength;
        this.lineHeight=config.lineHeight;
        this.lineStart = config.lineStart;
        this.distancePerParticle=this.lineLength/this.emitAmount;
        this.nextParticlePos=this.lineStart+this.distancePerParticle;
    }

    emit(particleSystem) {
        super.emit(particleSystem);
        this.nextParticlePos=this.lineStart;
    }

    place(particle) {
        //place within a line
        this.emitPosition = [this.nextParticlePos,this.lineHeight];
        //particle.velocity=[0,1];
        particle.position=this.emitPosition;
        this.nextParticlePos+=this.distancePerParticle;
    }
}

export default LineEmitter;