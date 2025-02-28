let capture;

let canDraw = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO,{ flipped:true }, 
                          () => {canDraw = true;});
  capture.hide();
  
  noStroke();
}

function draw() {

  if (!canDraw) return;
  capture.loadPixels();
  
  for (let i = 0; i < 10000; i++) { //try changing the num greater than i
    drawRandomPoint(capture.pixels, capture.width, capture.height);
  }
}

// This works if you make sure that you have loaded the graphic's pixels in this draw cycle
//MAKE SURE YOU capture.loadPixels FIRST 
function getColorFromPixelArray(pixelArray, x, y, w) {
  const index = (x + y * w) * 4;
  const r = pixelArray[index];
  const g = pixelArray[index + 1];
  const b = pixelArray[index + 2];
  const a = pixelArray[index + 3];
  return color(r, g, b, a);
}

function drawRandomPoint(pixelArray, w, h) {
  
  let xPos = floor(random(0, w)); //FLOOR because xPos/yPos is a FLOAT and not an INT; if you pass that into an array for the index, it doesn't work. 
  let yPos = floor(random(0, h)); //floor rounds down

  //if you use int, it might ROUND UP

  // let xPos = ceil(random(0, w)); 
  // let yPos = ceil(random(0, h)); 
  
  
  let col = getColorFromPixelArray(pixelArray, xPos, yPos, w); //these parameters SPECIFICALLY 
  fill(col);
  
  circle(xPos, yPos, 3);
  
}

/*
let capture;

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO,{ flipped:true });
  capture.hide();
  
  noStroke();
}

function draw() {
  background(0);

  //when you want to create a pixarr:
  capture.loadPixels(); //in loadpixels, when we call this, it updates the pixel arr JUST ONCE
  // console.log(capture.pixels.length); //.pixels is native p5
  
  //get pixel R index from coordinates with equation: index = (x + y * w) * 4 : x position (which goes across), y is modified bc of where it is going down + width, * 4 for each section (which pixArr uses for each 4)
  //going down one y = going down an ENTIRE row of pixels, going down on x = goes down a single pixel --> thats why y is moidifed



  // change the stepSize for higher resolution
  drawPoints(capture.width, capture.height, 10); 
}

function getColorFromPixelArray(pixelArray, x, y, w){
  //this is the simplified solution
  //pass in a pixelarr, x, y, width
  let index = (x + y * w) * 4 //gives the index of the arr for the y val
  const r = pixelArray[index];
  const g = pixelArray[index+1];
  const b = pixelArray[index+2];
  const a = pixelArray[index+3];

  return color(r,g,b,a); //end the logic here; have a function give you a val back
  //THEREFORE: instead of using get function, get color from the pixel array
}


// draws each circle by using get() on the capture
function drawPoints(w, h, stepSize) {
  
  for (let x = 0; x < w; x += stepSize) { 
    for (let y = 0; y < h; y += stepSize) {
      // fill(capture.get(x, y)); //every time we're calling .get, its recreating the ENTIRE pixel arr every single time
      
      let col = getColorFromPixelArray(capture.pixels, x, y, capture.width); //oassing in pixelArray, x, y, width
      fill(col);
      circle(x, y, stepSize);
      // square(x, y, stepSize); //pixelated version
      //do both and it combines!
    }
  }
}

/*
for optimization consider:
 - loading pixels before drawing points
 - passing in specific pixelArrays to the drawPoints to support any kind of pixel array, not bound to "capture"
 - create getColorFromPixelArray(array, x, y, w) function

*/
//base code for optimized points