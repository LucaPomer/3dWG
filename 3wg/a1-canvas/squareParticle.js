"use strict"

import Particle from './particle.js';

class SquareParticle extends Particle{
    startSize =0
    endSize =0;
    sizeGrowth =0;
    lifeTime =0;
    currentAge = 0;
    dead=false;


    constructor(config){
        super(config);
        //console.log("super called this,position is " + this.position);
    }


    init( startSize, endSize, lifeTime) {
        super.init();
        this.startSize=startSize;
        this.endSize=endSize;
        this.lifeTime=lifeTime;
        this.sizeGrowth=(this.endSize-this.startSize)/this.lifeTime;

    }

    update() {
        // integrate movement properties
        super.update();
        this.currentAge++;
        if(this.currentAge<this.lifeTime){
            this.startSize+=this.sizeGrowth;
        }
        else{
            this.dead=true;
        }

    }

    render(context) {
        // TODO: use the canvas2d context API for graphics
        if(!this.dead){
            context.fillStyle = "rgb(255,0,0)";
            context.fillRect(this.position[0],this.position[1],this.startSize,this.startSize);
            //console.log(this.position);

        }

    }





}

export default SquareParticle;