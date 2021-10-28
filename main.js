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
    let mars = new Mars(Number(sizex) + 1, Number(sizey) + 1);
    
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
        for (let j=0; j < robot.instructions.length; j++){
            let instruction = robot.instructions[j]
            if (robot.isAlive){
                if (instruction === "F"){
                    // If theres a scent robot moves on, however if he gets out of mars
                    // he gets to his old position.
                    if (mars.theresScent(robot.posx, robot.posy)){
                        robot.moveForward(mars.grid);
                        if (!mars.isInside(robot)){
                            robot.moveForward(mars.grid, backwards=true);
                            continue;
                        }
                        continue;
                    }
                    robot.moveForward(mars.grid);

                    if (!mars.isInside(robot)){
                        robot.isAlive = false;
                        robot.moveForward(mars.grid, backwards=true)
                        robot.leaveScent(mars);
                    }
                }else{
                    robot.rotate(instruction);
                }
            }
        }
    }
    for (let i = 0; i < robots.length; i++){
        console.log(robots[i]);
    } 
}


Main()
