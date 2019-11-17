
/*
 * Encapsulates interaction responses and head up display things like menus.
 */
class Controller {
	constructor(context, scene) {
		this.context = context
		this.scene   = scene
		this.paused  = false
		this.mouse = {
			pos : [],
			dxy : []
		}
		this.debugModus = true;
		this.debugModusOn(this.debugModus)

		this.listen()
	}

	debugModusOn(want){
		//want the debug modus
		let actors = this.scene.actors;
		let collected = []
		if(want){
			// first only collect
			for (let actor of actors) {
				//ToDO : is this a particle system ?
				let draggersToAdd = actor.getDraggers()
			 	collected = collected.concat(draggersToAdd );

			}
			// second add all to scene
			this.scene.add(collected);
		}
		else{
			for (let actor of actors) {
				//ToDO : is this a particle system ?
				collected = collected.concat( actor.getDraggers());

			}
			this.scene.remove(collected);
		}
	}
	

	listen() {
		let canvas = this.context.canvas

		// register mouse actions over the canvas
		canvas.addEventListener('mousemove', (event) => {
			let mouse = this.mouse
			
			let newpos = this.contextPos(event)
			mouse.dxy[0] = newpos[0] - mouse.pos[0]
			mouse.dxy[1] = newpos[1] - mouse.pos[1]
			mouse.pos = newpos

			//console.log("mose move event");
			this.scene.moveDraggers(this.contextPos(event));

		}, false)

		canvas.addEventListener('click', (event) => {
			// activate that keypresses are associated with the canvas
			canvas.setAttribute('tabindex','0')
			canvas.focus()

			//console.log("mose click event");
			// perform picking on the scene

		})

		canvas.addEventListener('mouseup', (event) => {
			// activate that keypresses are associated with the canvas
			canvas.setAttribute('tabindex','0')
			canvas.focus()

			//console.log("moseUpEvent");

			// perform picking on the scene
			this.scene.unPick(this.contextPos(event))
		})
		canvas.addEventListener('mousedown', (event) => {
			// activate that keypresses are associated with the canvas
			canvas.setAttribute('tabindex','0')
			canvas.focus()

			//console.log("mose don event");

			// perform picking on the scene
			this.scene.pick(this.contextPos(event))
		})


		canvas.addEventListener('keypress', (event) => {
			switch (event.code) {
				case 'KeyP': this.paused =! this.paused; break
			}
		}, false)
	}

	contextPos(event) {
		// calculate the coordinates relative to the upper left corner
		let rect = this.context.canvas.getBoundingClientRect();
		return [
			event.clientX - rect.left,
			event.clientY - rect.top
		]
	}

	render() {
		let context = this.context
		
		context.font = '12pt Arial'
		context.fillStyle = 'white'
		context.fillText(
			`mouse: pos(${this.mouse.pos[0]}, ${this.mouse.pos[1]})
					dxy(${this.mouse.dxy[0]}, ${this.mouse.dxy[1]})`,
		10, 40)
	}
}

export default Controller
