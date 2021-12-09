class LSystem{
   constructor(){
      this.axiom = "F"; // This is the initial sentence or the 'seed'
      this.sentence = this.axiom;
      this.rules = {
         'F': 'FF+[+F-F-F]-[-F+F+F]'
         //'F': 'FF+F-F'
      };
      this.functions = {   // This could be used to set up the behaviour of each symbol in one place

      };
      this.outputElement;
      angleMode(DEGREES);
   }
   
   
   // Generate and return the next generation of the sentence
   // Note the similarity between these sentence iterations and cellular automata
   generate(){
      let newSentence = "";

      for(let i = 0; i < this.sentence.length; i++){
         let currentChar = this.sentence.charAt(i);
         if(Object.keys(this.rules).includes(currentChar)){ // If there's a rule about this char...
            newSentence += this.rules[currentChar];   // ... append its mapping.
         }
         else{
            newSentence += currentChar;   // ... else append the char unchanged
         }
      }

      this.sentence = newSentence;
   }
   
   // Draw a visualization of the L-system
   render(){
      let stateStack = [{ // Stack to store the drawhead states of each unfinished branch
         pos: world.origin,
         dir: createVector(0, -1)
      }];

      for(let i = 0; i < this.sentence.length; i++){
         let ch = this.sentence.charAt(i);
         let state = stateStack[stateStack.length -1];
         if(ch === 'F'){
            state.pos = this.drawLine(state.pos, state.dir, 10, 0);
         }
         else if(ch === '['){
            stateStack.push({
               pos: state.pos,
               dir: state.dir
            });
            state = stateStack[stateStack.length -1];
         }
         else if(ch === ']'){
            stateStack.pop();
            state = stateStack[stateStack.length -1];
         }
         else if(ch === '+'){
            state.dir.rotate(24);
         }
         else if(ch === '-'){
            state.dir.rotate(-24);
         }
      }
   }

   // Draw a line segment given the starting coordinates and direction. Return new position.
   drawLine(start, dir, len, col){
      stroke(col);
      strokeWeight(2);
      let delta = dir.copy().setMag(len);
      let end = p5.Vector.add(start, delta);
      line(start.x, start.y, end.x, end.y);
      return end;
   }

   // Set the contents of the output DOM element to the current sentence
   outputSentence(){
      if(this.outputElement){
         this.outputElement.innerHTML = this.sentence;
         return;
      }
      console.log("outputSentence() in l-system.js has no output element defined.");
   }

   // Set the DOM element to which output is passed
   setOutputElement(element){
      this.outputElement = element;
   }
   
   // 
   getAxiom(){
      return axiom;
   }

   keyPressed(key){
      if(key === " "){
         this.generate();
      }
   }
}
