
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
import CircleParticle from "./circleParticle.js";
import BezierEmitter from "./bezierEmitter.js";
import ParametricCurveEmitter from "./paramtericCurveEmitter.js";


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


    // purpel Line
    // create actors for the scene
    let lineEmitter = new LineEmitter({
        emitAmount:5,
        emitCycle: 200,
        lineLength:100,
        lineHeight: 100,
        lineStart: 200


    })
    let particleSystem = new ParticleSystem({
        emitter: lineEmitter,
        particleLifeTime: 100,
        particleConstructor: CircleParticle
    })


    //flame explosion
    // create actors for the scene
    let explosionEmitter = new ExplosionEmitter({
        emitAmount: 100,
        emitCycle: 20,
        radius:10,
        middle: [300,300],

    })
    let particleExplosion = new ParticleSystem({
        emitter: explosionEmitter,
        particleLifeTime: 50,
        particleConstructor: ExplosionParticle
    })

    // growing red square
    let lineEmitter2 = new LineEmitter({
        emitAmount: 10,
        emitCycle: 20,
        lineLength:300,
        lineHeight: 200,
        lineStart: 400

    })
    let particleSystemSquare = new ParticleSystem({
        emitter: lineEmitter2,
        particleLifeTime: 200,
        particleConstructor: SquareParticle
    })


    //bezier curve
    let bezierEmitter = new BezierEmitter({
        // emitter properties
        emitAmount: 20,
        emitCycle: 8,
        p0: [130.0,100.0],
        p1: [150.0,50.0],
        p2: [250.0,50.0],
        p3: [310.0,100.0],


    })
    let particleSystemBezier = new ParticleSystem({
        emitter: bezierEmitter,
        particleLifeTime: 10,
        particleConstructor: Particle
    })

    //parametric curve
    let parametricEmitter = new ParametricCurveEmitter({
        //emitter properties
        emitAmount: 60,
        emitCycle: 6,
        startPoint : [200,200],
        tMin: -30,
        tMax: 30,
        functionX:  function (t) {
            return (Math.sin(t)*100);
        },
        functionY:  function (t) {
            return (Math.cos(2*t)*30);
        },


    })
    let particleSystemParametric = new ParticleSystem({
        emitter: parametricEmitter,
        particleLifeTime: 30,
        particleConstructor: Particle
    })


    // create and populate our scene
    let scene = new Scene()
    scene.add([
        particleSystem,
        particleExplosion,
        particleSystemSquare,
        particleSystemBezier,
        particleSystemParametric
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
