const { Mars } = require('./mars.js')
const { Robot } = require('./robot.js')


const MAX_COORDS = 50;
const MAX_INSTRUCTION_LENGTH = 100;

function Main(){
    // Get the input
    let args = process.argv.slice(2);
    let fileName = args[0];
    let file = require('fs');
    let data = ""
    try{
        data = file.readFileSync(fileName, 'utf-8');
    }catch (err){
        console.error(err);
    }

    // Get map size
    data = data.replace(new RegExp("\r", "g"), "");
    data = data.split("\n");
    let [sizex, sizey] = data[0].split(" ");

    // Init the map
    let mars = new Mars(Number(sizex), Number(sizey));
    
    // Get robots state + instructions and place them on the map
    data = data.slice(1);
    let robots = []
    for (let i=0; i < data.length; i+=2){
        let [posx, posy, orientation] = data[i].split(" ");
        let robot = new Robot(Number(posx), Number(posy), orientation, data[i + 1]);
        robots.push(robot)
        mars.grid[posx][posy] = robot;
    }
    

    for (let i = 0; i < robots.length; i++){
        let robot = robots[i];
        if (robot.isAlive){
            for (let j=0; i < robot.instructions; i++){
                let instruction = robot.instructions[i]
                if (instruction === "F"){
                    robot.moveForward(mars.grid);
                    if (!mars.isInside(robot)){
                        robot.isAlive = false;
                        robot.moveForward(mars.grid, backwards=true)
                    }
                }else{
                    robot.rotate(instruction);
                }
            }
        }
    }
    for (let i = 0; i < robots.length; i++){
        console.log(robots[i])
    }
    
}


Main()
