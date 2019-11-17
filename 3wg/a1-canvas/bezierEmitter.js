"use strict"

import util from './util.js'
import ParticleEmitter from "./particleemitter.js";
import Dragger from "./dragger.js";

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
    update(particleSystem) {
        super.update(particleSystem);
        this.p0 = this.draggers[0].position;
        this.p1 = this.draggers[1].position;
        this.p2 = this.draggers[2].position;
        this.p3 = this.draggers[3].position;

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

    setDraggers(){

        let draggerP0 = new Dragger({
            positionDragger: this.p0
        })
        let draggerP1 = new Dragger({
            positionDragger: this.p1
        })
        let draggerP2 = new Dragger({
            positionDragger: this.p2
        })
        let draggerP3 = new Dragger({
            positionDragger: this.p3
        })
        this.draggers.push(draggerP0);
        this.draggers.push(draggerP1);
        this.draggers.push(draggerP2);
        this.draggers.push(draggerP3);


    }

    render(ctx){
        ctx.setTransform(1,0,0,1,0,0);
        ctx.beginPath();
        ctx.moveTo(this.p0[0], this.p0[1]);
        ctx.lineTo(this.p1[0], this.p1[1]);
        ctx.lineTo(this.p2[0], this.p2[1]);
        ctx.stroke();
        ctx.setTransform(1,0,0,1,0,0);
    }




}

export default BezierEmitter;