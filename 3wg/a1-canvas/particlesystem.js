
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
		this.particleConstructor = config.particleConstructor
		this.particleLifeTime = config.particleLifeTime;
		this.particles = []
		//this.create();
	}

	create() {
		// TODO: implement particle creation
			let p = new this.particleConstructor({
				position: [1,1],
				velocity: [0,1]
			});
			p.init(this.particleLifeTime);
			this.emitter.place(p);
			this.particles.push(p);

	}


	render(context) {
		for (let particle of this.particles) {
			particle.render(context)
		}
	}

	update(){
		// update the emitter
		this.emitter.update(this)

		// update the particles
		for (let particle of this.particles) {
			if (particle.dead==true){
				//console.log(this.particles.indexOf(particle));
				//delete this.particles[this.particles.indexOf(particle)];
				this.particles.splice(this.particles.indexOf(particle),1);
			}
			else{
				particle.update()
			}

		}

		// TODO: more logic over the particles if necessary
	}
}


export default ParticleSystem
