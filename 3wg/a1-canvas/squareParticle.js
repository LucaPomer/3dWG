"use strict"

import Particle from './particle.js';
import util from './util.js';

class SquareParticle extends Particle{



    constructor(config){
        super(config);
        this.startSize = 1;
        this.endSize = 15;
        //console.log("super called this,position is " + this.position);
    }


    init(lifeTime) {
        super.init(lifeTime);
        this.sizeGrowth=(this.endSize-this.startSize)/this.lifeTime;
        this.redness = util.rand(10,255);

    }

    update() {
        // integrate movement properties
        super.update();
        this.position[0] += this.velocity[0]
        this.position[1] += this.velocity[1]
        this.startSize += this.sizeGrowth;
        this.redness = util.rand(10,255);


    }

    render(context) {
        // TODO: use the canvas2d context API for graphics
        if(!this.dead){
            context.fillStyle = `rgb(${this.redness},0,0)`;
            context.fillRect(this.position[0],this.position[1],this.startSize,this.startSize);
            //console.log(this.position);

        }

    }





}

export default SquareParticle;