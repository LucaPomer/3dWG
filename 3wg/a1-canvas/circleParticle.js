import Particle from './particle.js'

/*
 * A particle is a small graphical unit on which emitters and systems act on.
 */
class CircleParticle extends Particle {
    constructor(config) {
        super(config);
        this.SpeedDecrease = 0.2;
        this.image = new Image(10, 10);
    }


    init(lifeTime) {
        super.init(lifeTime);
        this.image.src = 'res/blub.png';
        this.velocity = [0, 10];
    }

    update() {
        this.velocity[1] -= this.SpeedDecrease;
        this.position[0] += this.velocity[0];
        this.position[1] += this.velocity[1];
        super.update();
    }


    render(context) {
        // TODO: use the canvas2d context API for graphics
        if (!this.dead) {
            context.fillStyle = "rgb(85,255,94)";
            context.drawImage(this.image, this.position[0], this.position[1], 20, 20);
        }

    }

}

export default CircleParticle
