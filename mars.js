class Mars{
    constructor(sizex, sizey){
        this.sizex = sizex;
        this.sizey = sizey;
        this.grid = [];
        this.createGrid();
    }
    createGrid(){
        for(let i=0; i < this.sizey; i++) {
            this.grid[i] = new Array(this.sizex);
        }
    }
    isInside(robot){
        return (this.sizex >= robot.posx >= 0 && 
            this.sizey >= robot.posy >= 0)
    }
}

exports.Mars = Mars;