import Texture from './texture.js'
import textures from "./textures.js";

let _defaultTexture = null


/*
 * Multi purpose material. Combines properties of different types of materials
 * in one data aggregation. To be used with the appropiate program.
 */
class Material {
	constructor(gl, config) {
		if (!_defaultTexture)
			_defaultTexture = new Texture(gl, { name: 'default' })

		this.gl = gl
		this.config = config

		// simple		
		config.ambient   = config.ambient   || [0,0,0]
		config.diffuse   = config.diffuse   || [1,1,1]
		config.specular  = config.specular  || [1,1,1]
		config.shininess = config.shininess || 32

		// textured
		config.diffuseTexture  = config.diffuseTexture || _defaultTexture
	}

	bind(program) {
		let config = this.config
		let gl = this.gl
		
		switch (program.name) {

			case 'color':
				break

			case 'phong_vertex':
			case 'phong_pixel':
				 program.setUniform('material.ambient',   config.ambient);
				 program.setUniform('material.diffuse',   config.diffuse);
				 program.setUniform('material.specular',  config.specular);
				 program.setUniform('material.shininess', config.shininess);
				break;
			case 'earth':
				program.setUniform('material.ambient',   config.ambient);
				program.setUniform('material.diffuse',   config.diffuse);
				program.setUniform('material.specular',  config.specular);
				program.setUniform('material.shininess', config.shininess);

				program.setTexture('earthDayTex', 0, textures.getTexture("earthDay"));
				program.setTexture('earthCloudTex', 1, textures.getTexture("earthCloud"));
				program.setTexture('earthNightTex',2,textures.getTexture("earthNight"));
				program.setTexture('earthWaterTex',3,textures.getTexture("earthWater"));
		}
	}
}


export default Material
