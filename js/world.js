
let world;

class World{
   constructor(){
      this.origin = createVector(width/2, height/2);
      this.isDragging = false;
      this.dragHandleCoords = createVector(); // Mouse position relative to origin whenever LMB is pressed
      this.gridTileSize = 10;
      this.halfGridTileSize = 5;
      this.gridWidth = ceil(width / this.gridTileSize);
      this.gridHeight = ceil(height / this.gridTileSize);
   }


   // Draw a cross with its center at (0, 0) in world space
   drawCenterLines()
   {
      stroke(0);
      strokeWeight(1);
      line(this.origin.x, 0, this.origin.x, height);
      line(0, this.origin.y, width, this.origin.y);
   }


   // Draw grid lines aligned with (0, 0) in world space
   drawGrid()
   {
      // First find the gap between the left-most grid line and the left of the screen. Same for the top.
      // Then draw the lines from left to right and then from top to bottom, starting at the left-most and top-most pointss.

      var leftGap = abs(this.origin.x % this.gridTileSize);
      var topGap = abs(this.origin.y % this.gridTileSize);

      stroke(BG_COL_SHADE_1);
      strokeWeight(1);

      for(let i = leftGap; i < width; i += this.gridTileSize)
      {
         line(i, 0, i, height);
      }
      for(let i = topGap; i < height; i += this.gridTileSize)
      {
         line(0, i, width, i);
      }
      
      //this.drawCenterLines(this.origin);
   }


   // Log mouse position relative to origin so that the origin can be repositioned during mouse drag.
   mousePressed(){
      this.dragHandleCoords = createVector(mouseX - world.origin.x, mouseY - world.origin.y);
      this.isDragging = true;
   }
   
   
   // 
   mouseReleased(){
      this.isDragging = false;
   }
   
   
   // Reposition the origin
   mouseDragged(){
      if(this.isDragging){
      this.origin.x = mouseX - this.dragHandleCoords.x;
      this.origin.y = mouseY - this.dragHandleCoords.y;
      }
   }
}