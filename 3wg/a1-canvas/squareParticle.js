"use strict"

import Particle from './particle.js';

class SquareParticle extends Particle{
    constructor(){
        super();
    }

    render(context) {
        // TODO: use the canvas2d context API for graphics
        context.fillStyle = "rgb(0,0,255)";
        context.fillRect(this.position[1,0],10,10,10);

    }





}

export default SquareParticle;