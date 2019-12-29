

class Light {
	constructor(gl, config) {

		this.gl = gl;
		this.config = config;

		this.position = config.position;
		this.color    = config.color;

		// extend with more properties, e.g. attenuation
	}
	bind(program) {
		let config = this.config
		let gl = this.gl

		switch (program.name) {

			case 'color':
				break;
			case 'phong_vertex':
			case 'phong_pixel':
				program.setUniform('light.color',   config.color);
				program.setUniform('light.position',   config.position);
				break;
		}
	}
}


export default Light
