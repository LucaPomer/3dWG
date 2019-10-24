
/**
 * Small encapsulation to not let this code float around in main scope.
 */
class Renderer {
	constructor(context, bgcolor) {
		this.context = context
		this.bgcolor = bgcolor
	}

	clear() {
		let context = this.context
		let canvas  = this.context.canvas

		// clear background
		// TODO: improve with gradient or image parameter
		context.fillStyle = this.bgcolor
		context.fillRect(0, 0, canvas.width, canvas.height)
	}

	render(scene, controller) {

		// prepare next frame
		this.clear()
		
		// render the scene
		scene.render(this.context)

		// render the hud over the scene
		controller.render()
	}
}

export default Renderer
