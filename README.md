# Martian Robots

## **Description**

Martian Robots simulates the movement of certain robots given a size of a map, initial positions, orientation and a set of instructions for each robot.<br>Instructions include: 
- "L" (wich means a left 90 degree rotation) 
- "R" (wich means a right 90 degree rotation)
- "F" (wich means to move one step forward in the actual orientation).

Robots can be oriented: "**N**" (north), "**S**" (south), "**E**" (east) and "**W**" (west). So, for explample, if a robot is oriented "**N**" and recibes an "**L**" instruction he will rotate into "**W**" orientation, consequently when he recibes "**R**" he will rotate "**E**".<br>
If a robot gets outs of the map bounds he will be lost forever leaving a scent at the last map point before getting lost. When another robot gets to that point scent will prevent him from obeying the order.<br>
The map size can´t be greater than 50. Instructions set can`t be greater than 100.<br>
### Sample input
5 3 <br>
1 1 E <br>
RFRFRFRF <br>
3 2 N <br>
FRRFLLFFRRFLL <br>
0 3 W <br>
LLFFFLFLFL 
### Corresponding output
1 1 E <br>
3 3 N LOST <br>
2 3 S


## **Run it**
In order to run the program you will need to download the code. You also need to have an input.txt (in the same directory) just like the one in the sample. Once you have your input file ready you can run it from the file location as: node main.js "file name.txt".<br>
Once you have run the code you will see the output on the console. Additionally an output.txt file will be created on the same directory.

## **Requirements**
You need to have node.js installed. You can downlaod it from: https://nodejs.org/es/download/
