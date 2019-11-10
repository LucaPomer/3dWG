"use strict"

import ParticleEmitter from "./particleemitter.js";

class ParametricCurveEmitter extends ParticleEmitter {
    constructor(config) {
        super(config);
        this.functionX = config.functionX;
        this.functionY = config.functionY;
        this.tMin = config.tMin;
        this.tMax = config.tMax;
        this.deltaT = (this.tMax - this.tMin) / this.emitAmount;
        this.t = this.tMin;
        this.startingPointOnCanvas = config.startPoint;
    }

    emit(particleSystem) {
        super.emit(particleSystem);
        this.t = this.tMin;
    }


    place(particle) {
        let xPosition = this.functionX(this.t) + this.startingPointOnCanvas[0];
        let yPosition = this.functionY(this.t) + this.startingPointOnCanvas[1];
        this.t += this.deltaT;
        this.emitPosition = [xPosition, yPosition];
        particle.position = this.emitPosition;
    }

}

export default ParametricCurveEmitter
