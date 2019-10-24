
import Particle from './particle.js'
import util from './util.js'
import SquareParticle from './squareParticle.js'

/*
 * A particle system does the book keeping of particles.
 */
class ParticleSystem {

	particleAmount = 10;
	constructor(config) {
		this.emitter = config.emitter
		this.particles = []
		this.create();
	}

	create() {
		// TODO: implement particle creation
		for(let i =0; i<this.particleAmount; i++){
			let p = new  SquareParticle();
			p.init([util.rand(1,700),util.rand(1,700)],[0,0]);
			console.log(p);
			this.particles.push(p);

		}
	}

	render(context) {
		for (let particle of this.particles) {
			particle.render(context)
		}
	}

	update() {
		// update the emitter
		this.emitter.update(this)

		// update the particles
		for (let particle of this.particles) {
			particle.update()
		}

		// TODO: more logic over the particles if necessary
	}
}


export default ParticleSystem
