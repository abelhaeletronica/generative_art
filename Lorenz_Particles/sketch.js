//Lorenz Particles
//Created by Gustavo Assis (abelhaeletronica)
//and CHAT GPT 4.0
let Bubbles = [];
let increment = 0;
let a = 1; // Coeficiente para o cálculo do raio
let b = 0.007; // Constante de crescimento para o logaritmo natural
let zoom = 1; // Fator de zoom inicial
let zoomIncrement = 0.01; // Incremento do zoom

function setup() {
  createCanvas(innerWidth, innerHeight);
  angleMode(DEGREES);
  background(225);
}

function draw() {
  background(225); // Redesenhar o fundo para limpar frames anteriores
  increment++;
  if (increment > 2) {
    Bubbles.push(new Bubble());
    increment = 0;
  }

  translate(innerWidth / 2, innerHeight / 2);
  scale(zoom); // Aplica o zoom atual
  translate(-innerWidth / 2, -innerHeight / 2);

  for (let i = 0; i < Bubbles.length; i++) {
    Bubbles[i].update();
    Bubbles[i].show();

    if (Bubbles[i].gone()) {
      zoom += zoomIncrement; // Aumenta o zoom
      Bubbles.splice(i, 1);
      i--; // Ajusta o índice após remover a bolha
    }
  }
}

class Bubble {
  constructor() {
    this.angle = 1; // Inicializa o ângulo de cada bolha
    this.r = a * exp(b * this.angle); // Raio inicial baseado na espiral de Fibonacci
  }

  update() {
    this.angle++; // Aumenta o ângulo para a próxima posição na espiral
    this.r = a * exp(b * this.angle); // Atualiza o raio conforme o ângulo aumenta
  }

  show() {
    push();
    translate(innerWidth / 2, innerHeight / 2);
    rotate(this.angle);
    let x = this.r * cos(this.angle);
    let y = this.r * sin(this.angle);

    //stroke(0);
    strokeWeight( 0.3 * 1 / zoom);
    noFill();
    ellipse(x, y, this.r * 1); // Desenha a bolha com o tamanho reduzido para visibilidade
    pop();
  }

  gone() {
    return this.r > innerWidth * 1.5; // Define a condição de desaparecimento quando a bolha ultrapassa 1.5 vezes a largura da tela
  }
}
