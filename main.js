const { Mars } = require('./mars.js')
const { Robot } = require('./robot.js')


const MAX_COORDS = 50;
const MAX_INSTRUCTION_LENGTH = 100;
const DIRECTORY_PATH = __dirname + "\\"


function Main(){

    // Get the input
    let args = process.argv.slice(2);
    let fileName = args[0];
    let file = require('fs');
    let data = ""
    try{
        data = file.readFileSync(DIRECTORY_PATH + fileName, 'utf-8');
    }catch (err){
        console.error(err);
    }

    // Get map size
    data = data.replace(new RegExp("\r", "g"), "");
    data = data.split("\n");
    let [sizex, sizey] = data[0].split(" ");

    // Check for valid input on map size
    if ((Number(sizex) > MAX_COORDS || Number(sizex) < 0) || 
        (Number(sizey) > MAX_COORDS || Number(sizey) < 0)){
            console.error("Map size invalid. Size should be in [0, 50] range")
            return
        }
    

    // Init the map
    let mars = new Mars(Number(sizex) + 1, Number(sizey) + 1);
    
    // Get robots state + instructions and place them on the map
    let robots = []
    for (let i=1; i < data.length; i+=2){
        let [posx, posy, orientation] = data[i].split(" ");
        // Check for correct instruction length
        if (data[i+1].length > MAX_INSTRUCTION_LENGTH){
            let error_message = "Instruction length invalid. Instruction lenght should be less than " + MAX_INSTRUCTION_LENGTH.toString();
            console.error(error_message);
            return;
        }
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
                    // he goes back to his old position and continues with next instruction.
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

    // Generate the oputput
    let output = "";
    for (let i = 0; i < robots.length; i++){
        let robot = robots[i];
        let resume = String(robot.posx) + " " + String(robot.posy) + " " + 
                     robot.orientation + (robot.isAlive ? "" : " LOST") + "\n";
        output += resume;
    }
    console.log(output);
    
    // Write the output in a file
    let fs = require('fs');
    try{
        fs.writeFileSync(DIRECTORY_PATH + 'output.txt', output)
    }catch (err){
        console.error(err);
    }
}


Main()