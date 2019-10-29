
import Renderer from './renderer.js'
import Controller from './controller.js'
import Scene from './scene.js'
import Particle from './particle.js'
import ParticleSystem from './particlesystem.js'
import ParticleEmitter from './particleemitter.js'
import util from './util.js'
import LineEmitter from "./lineEmitter.js";
import ExplosionEmitter from "./explosionEmitter.js";
import ExplosionParticle from "./explosionParticle.js";
import SquareParticle from "./squareParticle.js";


// called when the index.html is loaded by the browser
window.onload = function() {
    console.log('page loaded')

    // get our canvas
    let canvas = util.byid('canvas2d')    
    if (!canvas)
        util.fatal('canvas not found...')

    // get the 2D rendering context from canvas element
    let context = canvas.getContext('2d')
    if (!context)
        util.fatal('could not create 2D rendering context...')


    // green line square
    // create actors for the scene
    let lineEmitter = new LineEmitter({
        // TODO: emitter properties
        emitAmount: 10,
        emitCycle: 20,
        lineLength:400,
        lineHeight: 50,
        lineStart: 200


})
    let particleSystem = new ParticleSystem({
        emitter: lineEmitter,
        particleLifeTime: 100,
        particleConstructor: Particle
        // TODO: particle system properties (e.g. particle type)
    })


    //flame explosion
    // create actors for the scene
    let explosionEmitter = new ExplosionEmitter({
        emitAmount: 100,
        emitCycle: 20,
        radius:50,
        middle: [100,100],

    })
    let particleSystem2 = new ParticleSystem({
        emitter: explosionEmitter,
        particleLifeTime: 10,
        particleConstructor: ExplosionParticle
        // TODO: particle system properties (e.g. particle type)
    })

    // growing square
    let lineEmitter2 = new LineEmitter({
        // TODO: emitter properties
        emitAmount: 10,
        emitCycle: 20,
        lineLength:200,
        lineHeight: 200,
        lineStart: 400

    })
    let particleSystemSquare = new ParticleSystem({
        emitter: lineEmitter2,
        particleLifeTime: 200,
        particleConstructor: SquareParticle
        // TODO: particle system properties (e.g. particle type)
    })

    // create and populate our scene
    let scene = new Scene()
    scene.add([
        //particleSystem,
        //particleSystem2,
        particleSystemSquare
    ])

    // stick the engine together
    let controller = new Controller(context, scene)
    let renderer   = new Renderer(context, 'rgb(0,50,100)')
    
    // for fps measuring
    let before = 0
    let fps = 0
    let delta

    let mainloop = function() {

        // integrate the scene
        if (!controller.paused) {
            scene.update()
        }
        
        // render next frame
        renderer.render(scene, controller)

        // hud fps
        context.font = '12pt Arial'
        context.fillStyle = 'white'
        context.fillText(`fps: ${fps}`, 10, 25)

        // let the browser do the fps thing
        requestAnimationFrame(() => {

            // measure fps
            let now = performance.now()
            fps = Math.trunc(1 / ((now - before) * 0.001))
            before = now

            mainloop()
        })
    }

    // start
    mainloop()
}
