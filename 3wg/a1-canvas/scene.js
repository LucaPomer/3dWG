
import util from './util.js'

/*
 * Ordered collection of actors.
 * Actors must provide a render/update interface.
 */
class Scene {
    constructor() {
        this.actors = []
    }
     
    // add actors to the scene
    add(actors) {
        for (let actor of actors) {
            if (typeof actor.render !== 'function' ||
                typeof actor.update !== 'function')
                continue
            
            this.actors.push(actor)
        }
    }

    // removes actors from the scene
    remove(actors) {
        for (let actor of actors) {
            let id = this.actors.indexOf(actor)
            if (id !== -1) {
                this.actors.splice(id, 1)
            }   
        }
    }

    // updates all actors
    update() {
        for (let actor of this.actors) {
            actor.update()
        }
    }

    // render all actors in array order
    render(context) {
        for (let actor of this.actors) {
            actor.render(context)
        }
    }

    pick(position) {
        // TODO: implement picking of actors
    }
}


export default Scene
