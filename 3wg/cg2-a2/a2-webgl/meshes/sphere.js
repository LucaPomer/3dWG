
import Mesh from '../engine/mesh.js'
import {vec3} from "../../lib/gl-matrix-1.3.7.js";


let _sphereMeshes = {}


class Sphere {

    constructor(gl, config) {

        // check if we have already created sphere with the dimensions
        let key = '' + config.numLatitudes + '' + config.numLongitudes;
        if (!_sphereMeshes[key]) {

            console.log(`creating a new unit sphere mesh with resolution (${config.numLatitudes}, ${config.numLongitudes}).`) 
            let coords = [];
            let texcoords = [];
            let normals = [];
            let indices = [];

            // generate the attributes
            for (let latitude = 0; latitude <= config.numLatitudes; ++latitude) {
                let theta = latitude * Math.PI / config.numLatitudes;
                let sinTheta = Math.sin(theta);
                let cosTheta = Math.cos(theta);

                for (let longitude = 0; longitude <= config.numLongitudes; ++longitude) {
                    let phi = longitude * 2 * Math.PI / config.numLongitudes;
                    let cosPhi = Math.cos(phi);
                    let sinPhi = Math.sin(phi);
                    let x = cosPhi * sinTheta;
                    let y = cosTheta;
                    let z = sinPhi * sinTheta;

                    // generate the sphere vertex attributes
                    coords.push(x);
                    coords.push(y);
                    coords.push(z);
                    texcoords.push(1 - longitude / config.numLongitudes); // u
                    texcoords.push(1 - latitude  / config.numLatitudes);  // v
                    // TODO: generate normals
                    let center = config.center;
                    let pointOnSphere = vec3.createFrom(x,y,z);
                    let normal = vec3.subtract(pointOnSphere,center);
                    let normalized = vec3.normalize(normal);
                    normals.push(normalized[0]);
                    normals.push(normalized[1]);
                    normals.push(normalized[2]);
                }
            }

            // generate the indices
            for (let latitude  = 0; latitude  < config.numLatitudes;  ++latitude)
            for (let longitude = 0; longitude < config.numLongitudes; ++longitude) {
                
                let first  = latitude * (config.numLongitudes + 1) + longitude;
                let second = first + config.numLongitudes + 1;
                
                indices.push(second);
                indices.push(first);
                indices.push(first + 1);

                indices.push(second + 1);
                indices.push(second);
                indices.push(first + 1)
            }

            _sphereMeshes[key] = new Mesh(gl, {
                coords    : coords,
                texcoords : texcoords,
                normals   : normals, // TODO: activate when generated
                indices   : indices,
                primitiveType : gl.TRIANGLES
            })
        }

        this.mesh = _sphereMeshes[key]
    }
}


export default Sphere
