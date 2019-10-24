
import util from './util.js'

/*
 * An emitter knows only how much and where to spawn particles.
 */
class ParticleEmitter {
	emitPosition;
	emitAmount;
	constructor(emitAmount, startPosition) {
		// TODO: emitter properties
		this.emitAmount=emitAmount;
		this.emitPosition=startPosition
	}


	update(particleSystem) {
		// TODO: implement the emitters emit behaviour

	}

	emit(particleSystem) {
		// TODO: let the emitter emit particles on this particlesystem
	}

	place(particle) {
		// TODO: place a particle with the emitter settings
	}
}

export default ParticleEmitter
