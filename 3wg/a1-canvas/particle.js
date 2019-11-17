/*
 * A particle is a small graphical unit on which emitters and systems act on.
 */
class Particle {
    dead = false;
    lifeTime = 0;
    currentAge = 0;

    constructor(config) {
        this.position = config.position;  // xy
        this.velocity = config.velocity;
        this.image = new Image(10,10);// xy

        // TODO: define life time properties
    }


    init(lifeTime) {
        //this.position = position
        //this.velocity = velocity
        // TODO: initialize life time properties
        this.lifeTime = lifeTime;
        this.image.src = 'res/star.png';
    }

    update() {
        // integrate movement properties
        //this.position[0] += this.velocity[0]
        //this.position[1] += this.velocity[1]
        //console.log(this.position);

        // TODO: integrate life time properties
        this.currentAge++;
        if (this.currentAge > this.lifeTime) {
            this.dead = true;
        }
    }


    render(context) {
        // TODO: use the canvas2d context API for graphics
        if (!this.dead) {
            //context.fillStyle = "rgb(85,255,94)";
            context.drawImage(this.image,this.position[0],this.position[1],15,15);
        }

    }

}

export default Particle
