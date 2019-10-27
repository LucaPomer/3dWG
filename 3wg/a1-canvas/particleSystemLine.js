import ParticleSystem from "./particlesystem";
import SquareParticle from "./squareParticle";

"use strict"

class ParticleSystemLine extends ParticleSystem{

    create() {
        // TODO: implement particle creation
        let p = new  SquareParticle();
        p.init(4,20,300);
        this.emitter.place(p);
        this.particles.push(p);
    }


}
export default ParticleSystem