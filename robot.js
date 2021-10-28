class Robot{
    constructor(posx, posy, orientation, instructions){
        this.posx = posx;
        this.posy = posy;
        this.instructions = instructions;
        this.orientation = orientation;
        this.isAlive = true;
    }

    moveForward(map, backwards){
        let direction = 1
        if (backwards){
            direction = -1
        }
        switch (this.orientation){
            case "N":
                map[this.posx][this.posy] = null;
                this.posy += direction;
                map[this.posx][this.posy] = this;  
                break;
            case "S":
                map[this.posx][this.posy] = null;
                this.posy -= direction;
                map[this.posx][this.posy] = this;
                break;
            case "E":
                map[this.posx][this.posy] = null;
                this.posx += direction;
                map[this.posx][this.posy] = this;
                break;
            case "W":
                map[this.posx][this.posy] = null;
                this.posx -= direction;
                map[this.posx][this.posy] = this;
                break; 
        }
    }

    rotate(rotation){
        switch (this.orientation){
            case "E":
                if (rotation === "L"){
                    this.orientation = "N"
                }else{
                    this.orientation = "S"
                }
                break;

            case "S":
                if (rotation === "L"){
                    this.orientation = "E"
                }else{
                    this.orientation = "W"
                }
                break;

            case "W":
                if (rotation === "L"){
                    this.orientation = "S"
                }else{
                    this.orientation = "N"
                }
                break;
            case "N":
                    if (rotation === "L"){
                        this.orientation = "W"
                    }else{
                        this.orientation = "E"
                    }
                    break;
        }

    }
    leaveScent(map){
        let coords = [this.posx, this.posy]
        map.scents.push(coords);
    }
}


exports.Robot = Robot;