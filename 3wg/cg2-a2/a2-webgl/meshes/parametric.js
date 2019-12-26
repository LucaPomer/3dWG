
import Mesh from '../engine/mesh.js'


class Parametric {

    constructor(gl, config) {

        this.surface = config.surface
        this.usegm   = config.uSegments
        this.vsegm   = config.vSegments

        let coords = []
        let indices = []

        /**
         *  for (let u=0; u<=this.usegm; ++u)
         for (let v=0; v<=this.vsegm; ++v)
         let pos = this.surface(u / this.usegm, v / this.vsegm)
         */

        for (let u=0; u<=this.usegm; ++u) {
            for (let v = -this.vsegm/2; v <= this.vsegm/2; ++v) {
                // do not push arrays but the bare components into the buffer
                let pos = this.surface(u , v );

                coords.push(pos[0]);
                coords.push(pos[1]);
                coords.push(pos[2]);
            }
        }
        // just all points stripewise indexed
        for (let u=0; u<=this.usegm; ++u)
        for (let v=0; v<=this.vsegm; ++v) {
            indices.push(u*(this.vsegm + 1) + v)
        }

        //create parametric  surface
  /**      let size = this.usegm*2;
         for (let u=0; u<=size; u+2){
             indices.push(u);
         }
        let sizev = this.usegm*2;
        for (let v=1; v<=sizev;v+2){
            indices.push(v);
        }
**/
        this.mesh = new Mesh(gl, {
            coords        : coords,
            indices       : indices,
            primitiveType : gl.LINE_STRIP
        })
    }
}


export default Parametric
