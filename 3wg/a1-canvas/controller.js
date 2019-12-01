/*
 * Encapsulates interaction responses and head up display things like menus.
 */
import ParticleSystem from "./particlesystem.js";

class Controller {
    constructor(context, scene) {
        this.context = context
        this.scene = scene
        this.paused = false
        this.mouse = {
            pos: [],
            dxy: []
        }
        this.draggersExsist = false;
        this.debugModusOn(true)

        this.listen()
    }

    debugModusOn(want) {
        //want the debug modus
        let actors = this.scene.actors;
        let collected = [];
        if (want && !this.draggersExsist) {
            // first only collect
            for (let actor of actors) {
                if (actor instanceof ParticleSystem) {
                    let draggersToAdd = actor.getDraggers();
                    collected = collected.concat(draggersToAdd);
                    actor.setDebug(true);
                }

            }
            // second add all to scene
            this.scene.add(collected);
            //to avois adding the draggers twice
            this.draggersExsist = true;
        } else {
            for (let actor of actors) {
                //is this a particle system ?
                if (actor instanceof ParticleSystem) {

                    actor.setDebug(false);
                    collected = collected.concat(actor.getDraggers());
                }

            }
            this.scene.remove(collected);
            this.draggersExsist = false;
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

            this.scene.moveDraggers(this.contextPos(event));

        }, false)

        canvas.addEventListener('click', (event) => {
            // activate that keypresses are associated with the canvas
            canvas.setAttribute('tabindex', '0')
            canvas.focus()

            // perform picking on the scene

        })

        canvas.addEventListener('mouseup', (event) => {
            // activate that keypresses are associated with the canvas
            canvas.setAttribute('tabindex', '0')
            canvas.focus()

            // perform picking on the scene
            this.scene.unPick(this.contextPos(event))
        })
        canvas.addEventListener('mousedown', (event) => {
            // activate that keypresses are associated with the canvas
            canvas.setAttribute('tabindex', '0')
            canvas.focus()

            //console.log("mose don event");

            // perform picking on the scene
            this.scene.pick(this.contextPos(event))
        })


        canvas.addEventListener('keypress', (event) => {
            switch (event.code) {
                case 'KeyP':
                    this.paused = !this.paused;
                case 'KeyD':
                    this.debugModusOn(true);
                    break;

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
