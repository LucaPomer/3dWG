import ParticleEmitter from "./particleemitter.js";
import util from './util.js'

"user strict"


/*
 * An emitter knows only how much and where to spawn particles.
 */

class LineEmitter extends ParticleEmitter{
    lineLength;
    startHeight
    constructor(emitAmount, startPosition,lineLength, startHeight){
        super(emitAmount, startPosition);
        this.lineLength=lineLength;
        this.startHeight=startHeight;

    }

    update(particleSystem) {
        super.update(particleSystem);
    }


}

export default LineEmitter;