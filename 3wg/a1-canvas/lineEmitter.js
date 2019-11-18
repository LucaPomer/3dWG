import ParticleEmitter from "./particleemitter.js";
import util from './util.js'
import Dragger from "./dragger.js";

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
    update(particleSystem) {
        super.update(particleSystem);
        //the the hight of the particle system to dragger
        this.lineHeight = this.draggers[0].position[1];
        this.lineStart = (this.draggers[0].position[0])+ this.distancePerParticle;
        this.nextParticlePos = this.draggers[0].position[0] + this.distancePerParticle;
    }

    emit(particleSystem) {
        super.emit(particleSystem);
        this.nextParticlePos=this.lineStart;
    }

    place(particle) {
        //place within a line
        this.emitPosition = [this.nextParticlePos,this.lineHeight];
        particle.position=this.emitPosition;
        this.nextParticlePos+=this.distancePerParticle;
    }

    setDraggers() {
        let dragger = new Dragger({
            positionDragger:[(this.lineStart - this.distancePerParticle),this.lineHeight]
        })
        this.draggers.push(dragger);
    }
}

export default LineEmitter;