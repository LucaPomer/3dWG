"use strict"

import Particle from './particle.js';

class SquareParticle extends Particle{
    startSize =0
    endSize =0;
    sizeGrowth =0;
    lifeTime =0;
    currentAge = 0;
    dead=false;


    constructor(){
        super();
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
            context.fillRect(this.position[1,0],10,this.startSize,this.startSize);

        }

    }





}

export default SquareParticle;