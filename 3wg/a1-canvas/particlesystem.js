/*
 * A particle system does the book keeping of particles.
 */
class ParticleSystem {


    constructor(config) {
        this.emitter = config.emitter
        this.particleConstructor = config.particleConstructor
        this.particleLifeTime = config.particleLifeTime;
        this.startSpeed = config.startSpeed;
        this.particles = []
        this.maxParticles = 100;

        this.debug = true
    }

    create() {
        //dont let the particle system take to many particles
        if (this.particles.length < this.maxParticles) {
            let p = new this.particleConstructor({
                position: [1, 1],
                velocity: [0, 1]
            });
            p.init(this.particleLifeTime);
            this.emitter.place(p);
            this.particles.push(p);
        }
    }


    render(context) {
        for (let particle of this.particles) {
            particle.render(context)
        }
        //render the dragger lines for the emitter
        //not every emitter has dragger lines
        if(typeof this.emitter.render === 'function'){
            if (this.debug)
                this.emitter.render(context);
        }

    }

    update() {
        // update the emitter
        this.emitter.update(this)

        // update the particles
        for (let particle of this.particles) {
            //delete dead particles
            if (particle.dead === true) {
                this.particles.splice(this.particles.indexOf(particle), 1);
            } else {
                particle.update()
            }

        }

    }

    getDraggers(){
            return this.emitter.getDraggers();

    }

    //if I am in debug mode i want to render the dragger lines for the emitter
    setDebug(doit) {
        this.debug = doit
    }

}


export default ParticleSystem
