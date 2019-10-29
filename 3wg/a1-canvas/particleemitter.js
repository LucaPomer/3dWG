
import util from './util.js'

/*
 * An emitter knows only how much and where to spawn particles.
 */
class ParticleEmitter {
	emitPosition;
	emitNow=false;
	emitCount = 0;
	constructor(config) {
		// TODO: emitter properties
		this.emitAmount=config.emitAmount;
		this.emitCycle=config.emitCycle;
	}


	update(particleSystem) {
		// TODO: implement the emitters emit behaviour
		this.emitCount++;
		if (this.emitCount>this.emitCycle){
			this.emitNow=true;
		}
		if(this.emitNow){
			this.emit(particleSystem);
			this.emitCount=0;
			this.emitNow=false;
			//console.log("emmiter update called");
		}


	}

	emit(particleSystem) {
		// TODO: let the emitter emit particles on this particlesystem
		//console.log("emmiter emit called");
		for (let i = 0; i<this.emitAmount; i++) {
			//create a particle and add it to the array
			particleSystem.create();
			//console.log("emmiter emit called");

		}
	}

	place(particle) {
		// TODO: place a particle with the emitter settings
		//basic settings
		this.emitPosition=[1,1];
		particle.velocity = [1,1];
		particle.position = this.emitPosition;
	}

}

export default ParticleEmitter
