let b;
var sponge = [];
let theta = 2;
function setup(){
  createCanvas(400,400, WEBGL);
  b = new Box(0, 0, 0, 200);
	sponge.push(b);
}


function draw(){
  background(51);
  stroke(255);
	rotateX(theta);
  rotateY(theta);
  rotateZ(theta);
	var dirX = (mouseX / width - 0.5) * 2;
  var dirY = (mouseY / height - 0.5) * 2;
  directionalLight(250, 250, 250, -dirX, -dirY, 0.25);
  ambientMaterial(250);

	for (let i = 0; i < sponge.length; i++){
		sponge[i].show();
	}

	theta += 0.005;

}

function mousePressed(){
	var next = []
	for (var i = 0; i < sponge.length; i++){
		var b = sponge[i];
		var newBoxes = b.fract();
		next = next.concat(newBoxes);
	}
	sponge = next;
}


class Box{
  constructor(x, y, z, size){
    this.pos = createVector(x, y ,z, size);
    this.size = size;
  }
	fract(){
    var boxes = [];
    for (let x = -1; x < 2; x++) {
      for (let y = -1; y < 2; y++) {
          for (let z = -1; z < 2; z++) {
            let sum = abs(x) + abs(y) + abs(z);
              let newSize = this.size / 3; //size of new boxes
              if (sum <= 2 ){ //to filter out the middle box of every "wall of boxes"{
                var b = new Box(this.pos.x + x * newSize, this.pos.y + y * newSize, this.pos.z + z * newSize, newSize);
                boxes.push(b);
              }
            }
          }
        }
				return boxes;
      }

  show(){
		push();
		translate(this.pos.x, this.pos.y, this.pos.z);
		stroke(255);
		noStroke();
		noFill();
		box(this.size);// note that box() creates a box in the center of the canvas by default
		pop();
  }
}
