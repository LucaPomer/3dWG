
import Mesh from '../engine/mesh.js'


class Parametric {

    constructor(gl, config) {

        this.surface = config.surface
        this.usegm   = config.uSegments
        this.vsegm   = config.vSegments

        let coords = []
        let indices = []

        for (let u=0; u<=this.usegm; ++u)
        for (let v=0; v<=this.vsegm; ++v) {
            // do not push arrays but the bare components into the buffer
            let pos = this.surface(u / this.usegm, v / this.vsegm)
            coords.push(pos[0])
            coords.push(pos[1])
            coords.push(pos[2])
        }

        // just all points stripewise indexed
        for (let u=0; u<=this.usegm; ++u)
        for (let v=0; v<=this.vsegm; ++v) {
            indices.push(u*(this.vsegm + 1) + v)
        }

        this.mesh = new Mesh(gl, {
            coords        : coords,
            indices       : indices,
            primitiveType : gl.LINES
        })
    }
}


export default Parametric
