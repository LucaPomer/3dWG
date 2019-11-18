"use strict"

class Dragger {
    constructor(config) {
        this.position = config.positionDragger;
        this.imageSize = 20;
        this.image = new Image(10,10);
        this.image.src = 'res/drag.png';

    }



    isHit(positionMouse) {
        //check if mouse on dragger with some space
        if (positionMouse[0] > this.position[0] - this.imageSize && positionMouse[0] < this.position[0] + this.imageSize

            && positionMouse[1] > this.position[1] - this.imageSize && positionMouse[1] < this.position[1] + this.imageSize) {
            return true;

        } else {
            return false;
        }

    }

    //change dragger position
    drag(position) {
        this.position[0]=position[0];
        this.position[1]=position[1];
    }


    render(context) {
        context.fillStyle = "rgb(184,184,185)";
        context.drawImage(this.image,this.position[0],this.position[1],20,20);

    }

    update() {


    }


}

export default Dragger