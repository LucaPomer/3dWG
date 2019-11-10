"use strict"

import util from './util.js'
import ParticleEmitter from "./particleemitter.js";

class BezierEmitter extends ParticleEmitter {

    constructor(config) {
        super(config);
        this.t = 0;
        this.p0 = config.p0;
        this.p1 = config.p1;
        this.p2 = config.p2;
        this.p3 = config.p3;
        this.tDist = 1 / this.emitAmount;

    }

    emit(particleSystem) {
        super.emit(particleSystem);
        this.t = 0;
    }

    place(particle) {
        //bezier calculation
        let a0X = util.lerp(this.p0[0], this.p1[0], this.t);
        let a0Y = util.lerp(this.p0[1], this.p1[1], this.t);
        let a1X = util.lerp(this.p1[0], this.p2[0], this.t);
        let a1Y = util.lerp(this.p1[1], this.p2[1], this.t);
        let a2X = util.lerp(this.p2[0], this.p3[0], this.t);
        let a2Y = util.lerp(this.p2[1], this.p3[1], this.t);
        let b0X = util.lerp(a0X, a1X, this.t);
        let b0Y = util.lerp(a0Y, a1Y, this.t);
        let b1X = util.lerp(a1X, a2X, this.t);
        let b1Y = util.lerp(a1Y, a2Y, this.t);
        let cX = util.lerp(b0X, b1X, this.t);
        let cY = util.lerp(b0Y, b1Y, this.t);

        this.t += this.tDist;
        this.emitPosition = [cX,cY];
        particle.position = this.emitPosition;
    }


}

export default BezierEmitter;