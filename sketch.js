let particles = [];
let sigma = 10;
let rho = 28;
let beta = 8.0 / 3.0;
let dt = 0.003; // Reduced time step for slower movement

function setup() {
  createCanvas(800, 800);
  for (let i = 0; i < 600; i++) { //número de partículas
    particles[i] = new Particle(random(-10, 10), random(-10, 10), random(0, 30));
  }
  background(0);
}

function draw() {
  // Increase the opacity of the fading rectangle to shorten trail duration
  fill(0, 60);
  rect(0, 0, width, height);
  
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].show();
  }
}

class Particle {
  constructor(x, y, z) {
    this.pos = createVector(x, y, z);
    this.history = [];
  }

  update() {
    let dx = (sigma * (this.pos.y - this.pos.x)) * dt;
    let dy = (this.pos.x * (rho - this.pos.z) - this.pos.y) * dt;
    let dz = (this.pos.x * this.pos.y - beta * this.pos.z) * dt;
    this.pos.x += dx;
    this.pos.y += dy;
    this.pos.z += dz;

    this.history.push(createVector(this.pos.x, this.pos.y, this.pos.z));
    if (this.history.length > 5) { // Reduce the number of historical positions
      this.history.splice(0, 1);
    }
  }

  show() {
    stroke(255);
    noFill();
    beginShape();
    for (let i = 0; i < this.history.length; i++) {
      let v = this.history[i];
      // Zoom out by adjusting the mapping
      let x = map(v.x, -30, 30, 0, width);
      let y = map(v.y, -40, 40, height, 0);
      vertex(x, y);
    }
    endShape();
  }
}
