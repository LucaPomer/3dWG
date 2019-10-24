
import util from './util.js'

/*
 * A particle is a small graphical unit on which emitters and systems act on.
 */
class Particle {
	constructor(config) {
		this.position = [0, 0]  // xy
		this.velocity = [0, 0]	// xy

		// TODO: define life time properties
	}


	init(position, velocity) {
		this.position = position
		this.velocity = velocity

		// TODO: initialize life time properties
	}

	update() {
		// integrate movement properties
		this.position[0] += this.velocity[0]
		this.position[1] += this.velocity[1]

		// TODO: integrate life time properties
	}

	render(context) {
		// TODO: use the canvas2d context API for graphics
		context.fillStyle = "rgb(0,0,255)";
		context.fillRect(this.position[1,0],10,100,100);

	}

}

export default Particle
