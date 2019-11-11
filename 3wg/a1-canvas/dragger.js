"use strict"

class Dragger {
    constructor(config){
        this.positionX = config.positionX;
        this.positionY = config.positionY;

    }

    render(){
        context.fillStyle = "rgb(109,109,110)";
        context.fillRect(this.positionX, this.positionY, 10, 10);
    }

    update(){


    }




}
export default Dragger