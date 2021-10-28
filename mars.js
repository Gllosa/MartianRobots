class Mars{
    constructor(sizex, sizey){
        this.sizex = sizex;
        this.sizey = sizey;
        this.grid = [];
        this.createGrid();
        this.scents = []
    }
    createGrid(){
        for(let i=0; i < this.sizey; i++) {
            this.grid[i] = new Array(this.sizex);
        }
    }
    isInside(robot){
        return (this.sizex - 1 >= robot.posx && robot.posx >= 0 
                && this.sizey -1 >= robot.posy && robot.posy >= 0)
    }

    theresScent(posx, posy){
        for (let i = 0; i<this.scents.length; i++){
            if (this.scents[i][0] === posx && 
                this.scents[i][1] === posy){
                return true
            }
        }
        return false
    }
}

exports.Mars = Mars;