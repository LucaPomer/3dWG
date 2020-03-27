
import shaders from './engine/shaders.js'
import textures from './engine/textures.js'

import Camera from './engine/camera.js'
import Light from './engine/light.js'
import Material from './engine/material.js'
import Program from './engine/program.js'

import Gizmo from './meshes/gizmo.js'
import Parametric from './meshes/parametric.js'
import Sphere from './meshes/sphere.js'
import Model from './engine/model.js'

import { mat3, mat4 } from '../lib/gl-matrix-1.3.7.js'
import {vec3} from "../lib/gl-matrix-1.3.7.js";
import Texture from "./engine/texture.js";


class Scene {

    constructor(gl) {

        // store the WebGL rendering context 
        this.gl = gl ;
        this.simtime = 0;
        this.ambientLight = vec3.createFrom(0,0,1); //@me
       // this.textures = textures;

        this.camera = new Camera(gl)
        this.camera.lookAt(
            [0, 0.5, 10],
            [0, 0, 0],
            [0, 1, 0]
        )

        this.lights = [];
        // a light
        this.lights[0] = new Light(gl, {
            position : [1000,100,100,1],
            color    : [0.2,0.2,0.2]
        });
        this.lights[1] = new Light(gl, {
            position : [50,10,10,1],
            color    : [1,1,1]
        });

        this.materials = {};
        // a material
        this.materials['white'] = new Material(gl, {
            ambient   : [0.1,0.1,0.1],
            diffuse   : [1,1,1],
            specular  : [1,1,1],
            shininess : 40.0
        });


        this.projectionMatrix = mat4.create()
        this.viewMatrix       = mat4.create()
        this.modelMatrix      = mat4.create()
        this.modelViewMatrix  = mat4.create()
        this.normalMatrix     = mat3.create()
        this.normalMatrix2    = mat3.create()
        
        // load some meshes for use in models
        this.gizmo = new Gizmo(gl)

        this.parametric = new Parametric(gl, {
            uSegments: 100,
            vSegments: 100,
            // a centered flat plane on the ground
            surface: function(u, v) {
              //return [5 * (u - 0.5), 0, 5 * (v - 0.5)]
                return[(5 + 2 *Math.cos(v))* Math.cos(u),(5 + 2 *Math.cos(v))*Math.sin(u),2 *Math.sin(v)]

            }
        });

        this.sphere = new Sphere(gl,{
            numLatitudes: 100,
            numLongitudes: 100,
            center : vec3.createFrom(0,0,0)
        });
     
        // add models to the scene
        this.models = {
            'gizmo' : new Model(gl, {
                mesh    : this.gizmo.mesh,
                program : shaders.getProgram('color')
            }),/**
             //-----Aufgabe 2.1 ----//
         'manip' : new Model( gl, {
                mesh : this.parametric.mesh,
                program : shaders.getProgram('manip')

                }),

          'sphere' : new Model(gl,{
                mesh : this.sphere.mesh,
                material : this.materials['white'],
                program: shaders.getProgram('phong_vertex'),
              transform:mat4.multiply(mat4.translate(mat4.identity(), vec3.createFrom(-10,3,0)),mat4.scale(mat4.identity(),vec3.createFrom(3,3,3)) ),
              // light: this.lights[0],
            }),
            'spherePixel' : new Model(gl,{

                mesh : this.sphere.mesh,
                material : this.materials['white'],
                program: shaders.getProgram('phong_pixel'),
                transform:mat4.multiply(mat4.translate(mat4.identity(), vec3.createFrom(-15,-5,0)),mat4.scale(mat4.identity(),vec3.createFrom(3,3,3)),)
                // light: this.lights[0],
            }),**/
            'sphereEarth' : new Model(gl,{
                mesh : this.sphere.mesh,
                material : this.materials['white'],
                program: shaders.getProgram('earth'),
                transform:mat4.scale(mat4.identity(),vec3.createFrom(5,5,5)),
                    //* mat4.translate(mat4.identity(), vec3.createFrom(0,6,0)),
            }),
        }
    }


    update(deltatime) {
        this.simtime += deltatime;
        //console.log("simtime "+Math.sin(this.simtime));
        
        // let the camera roate around the center of the scene
        let distance = 15
        this.camera.lookAt(
         //  [distance * Math.sin(this.simtime), 6, distance * Math.cos(this.simtime)],
            [distance,6,distance],
            [0,0,0],
            [0,1,0]
        )
        this.models.sphereEarth.transform =
       mat4.multiply(mat4.rotate(mat4.identity(),this.simtime,vec3.createFrom(0,1,0)),mat4.scale(mat4.identity(),vec3.createFrom(5,5,5)))
    }
    
    render() {
        // get the actual camera matrices
        this.projectionMatrix = this.camera.getProjection()
        this.viewMatrix       = this.camera.getView()

        // render all models
        for (let name in this.models) {
            let model = this.models[name]
 
            mat4.multiply(this.viewMatrix, model.transform, this.modelViewMatrix)
            this.setupProgram(model.program)
            model.render()
        }
    }


    setupProgram(program) {
        // bind program before setting uniforms
        program.use()
        
        // set this matrices for all programs
        program.setUniform('projectionMatrix', this.projectionMatrix)
        program.setUniform('modelViewMatrix', this.modelViewMatrix)

        // create normal matrix for lighting calculations
        mat4.toInverseMat3(this.modelViewMatrix, this.normalMatrix)
        mat3.transpose(this.normalMatrix)

        switch (program.name) {
            case 'manip':
                // TODO
                //uniforms
                program.setUniform('simtime', this.simtime);
                break;
            case 'phong_pixel':
                //this.lights[1].bind(program);
            case 'phong_vertex':
            case 'earth':
                program.setUniform('viewMatrix', this.viewMatrix);
                program.setUniform('normalMatrix', this.normalMatrix)
                this.lights[0].bind(program);
                program.setUniform('ambientLight', this.ambientLight);
                break;

        }
    }
}

export default Scene
