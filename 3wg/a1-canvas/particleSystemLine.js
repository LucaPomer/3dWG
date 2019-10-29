import ParticleSystem from "./particlesystem";
import SquareParticle from "./squareParticle";

"use strict"

class ParticleSystemExplosion extends ParticleSystem{

    create() {
        // TODO: implement particle creation
        let p = new  ExplosionParticle();
        p.init(4,20,300);
        this.emitter.place(p);
        this.particles.push(p);
    }


}
export default ParticleSystem