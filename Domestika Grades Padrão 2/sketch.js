let nb = 20;
let dim = 0;
let margin = 20;
let f = 1.0;
let frequencia = 0;
let x, y;

function setup() {
  createCanvas(500, 500);
  dim = (width - 2 * margin) / nb;
  angleMode(DEGREES);
}

function draw() {
  background(0);
  noStroke();
  fill(255);
  //stroke(255);
  //noFill();
  rectMode(CENTER);
    
  for (let j = 0; j < nb; j++) {
    
    for (let i = 0; i < nb; i++) {
      
      let x = margin + dim / 2 + i * dim;
      let y = margin + dim / 2 + j * dim;
      let frequencia =  f * sin (frameCount + dist (width / 2, height / 2, x, y));

      
      circle(x , y , frequencia * dim);
      //rect(dim / 2 + i * dim, dim / 2 + j * dim, 0.6 * dim, 0.4 * dim)
    }
  }
}