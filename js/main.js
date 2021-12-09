/*

*/

// DOM Ids and elements
let ID_PARENT = 'p5-canvas-container';
let ID_INTERFACE_OUTPUT = 'interface-output';
let INTERFACE_DATA;

let canvas;
let lsys;

let inputRaw = [];


function setup() {
  INTERFACE_DATA = document.getElementById('interface-data');
  initializeP5Canvas();
  world = new World();
  lsys = new LSystem();
  lsys.setOutputElement(document.getElementById(ID_INTERFACE_OUTPUT));
  lsys.outputSentence();
}


function initializeP5Canvas(){
  let parentStyle = window.getComputedStyle(document.getElementById(ID_PARENT));
  canvas = createCanvas(parseInt(parentStyle.width), parseInt(parentStyle.height));
  canvas.parent(ID_PARENT);
}


function updateCanvasSize(){
  let parentStyle = window.getComputedStyle(document.getElementById(ID_PARENT));
  resizeCanvas(parseInt(parentStyle.width), parseInt(parentStyle.height));
}


function draw(){
  background(BG_COL);
  world.drawGrid();
  lsys.render();
}


function getInput(){
  inputRaw = [];
  parseInputData();
}


// Read input data from DOM and store it into the input array
function parseInputData(){
  let rawData = INTERFACE_DATA.value;
  let number = 0;
  let isPrevCharNumber = false;
  for(let i = 0; i < rawData.length; i++){
    let char = rawData[i];
    if(!isNaN(char) && char != ' '){ // Current char is a number
      char = parseInt(char);
      if(isPrevCharNumber){
        number *= 10;
      }
      number += char;
      isPrevCharNumber = true;
    }
    else{   // Current char is NOT a number
      if(isPrevCharNumber){
        inputRaw.push(number);
        number = 0;
        isPrevCharNumber = false;
      }
    }
  }
  // If the string ended on a number, include it too.
  if(isPrevCharNumber){
    inputRaw.push(number);
  }
}


function mousePressed(){
  world.mousePressed();
}


function mouseReleased(){
  world.mouseReleased();
}


// Reposition the origin
function mouseDragged(){
  world.mouseDragged();
}


function windowResized() {
  updateCanvasSize();
}


function keyPressed(){
  lsys.keyPressed(key);
}