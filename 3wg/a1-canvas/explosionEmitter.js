import ParticleEmitter from "./particleemitter.js";
import util from './util.js'
import Dragger from "./dragger.js";

//"user strict"


/*
 * An emitter knows only how much and where to spawn particles.
 */

class ExplosionEmitter extends ParticleEmitter {

    constructor(config) {
        super(config);
        this.middle = config.middle;
        this.radius = config.radius;
    }

    update(particleSystem) {
        super.update(particleSystem);
        this.middle = this.draggers[0].position;
        this.radius =Math.abs(this.middle[0]- this.draggers[1].position[0]);
    }

    emit(particleSystem) {
        super.emit(particleSystem);
    }

    place(particle) {
        let randX = util.rand(-this.radius, this.radius);
        let randY = util.rand(-this.radius, this.radius);

        this.emitPosition = [randX + this.middle[0], randY + this.middle[1]];
        particle.velocity = [this.emitPosition[0] - this.middle[0], this.emitPosition[1] - this.middle[1]];
        particle.position = this.emitPosition;

    }

    setDraggers(){
        let dragger = new Dragger({
            positionDragger: this.middle
        })
        let draggerRadius = new Dragger({
            positionDragger: [this.middle[0]-this.radius*2, this.middle[1]-this.radius*2]
        })
        this.draggers.push(dragger);
        this.draggers.push(draggerRadius);
    }

    render(context){
        var centerX = this.middle[0];
        var centerY = this.middle[1];
        var radius = this.radius;

        context.beginPath();
        context.arc(centerX, centerY, radius+5, 0, 2 * Math.PI, false);
        context.lineWidth = 2;
        context.strokeStyle = '#0f610c';
        context.stroke();
        context.setTransform(1,0,0,1,0,0);

    }
}

export default ExplosionEmitter;