'use strict';

var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
   bgReady = true;
};
bgImage.src = 'imagens/background.png';

var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
   heroReady = true;
};
heroImage.src = 'imagens/hero.png';

var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
   monsterReady = true;
};
monsterImage.src = 'imagens/monster.png';

// Objetos do jogo
var hero = {
   speed: 256 // movimento em pixels por segundo
};
var monster = {};
var monsterCaught = 0;

// contole do teclado
var keysDown = {};

window.addEventListener('keydown', function (e) {
   keysDown[e.keyCode] = true;
}, false);

window.addEventListener('keyup', function (e) {
   delete keysDown[e.keyCode];
}, false);

//Reseta o jogo quando o jogo pega o monstro
var reset = function reset() {
   hero.x = canvas.width / 2;
   hero.y = canvas.height / 2;

   //posiciona o monstro randomicamente na tela
   monster.x = 32 + Math.random() * (canvas.width - 64);
   monster.y = 32 + Math.random() * (canvas.height - 64);
};

// Atualiza os objetos do jogo
var update = function update(modifier) {
   if (38 in keysDown) {
      //Pressionand a seta pra cima
      hero.y -= hero.speed * modifier;
   }
   if (40 in keysDown) {
      // Pressionado a seta pra baixo
      hero.y += hero.speed * modifier;
   }
   if (37 in keysDown) {
      // Pressionando a seta pra esquerda                                                                 
      hero.x -= hero.speed * modifier;
   }
   if (39 in keysDown) {
      // Pressionando a seta pra direita
      hero.x += hero.speed * modifier;
   }

   // Os personagens se encostaram?
   if (hero.x <= monster.x + 32 && monster.x <= hero.x + 32 && hero.y <= monster.y + 32 && monster.y <= hero.y + 32) {
      ++monsterCaught;
      reset();
   }
};
// Renderiza tudo
var render = function render() {
   if (bgReady) {
      ctx.drawImage(bgImage, 0, 0);
   }
   if (heroReady) {
      ctx.drawImage(heroImage, hero.x, hero.y);
   }

   if (monsterReady) {
      ctx.drawImage(monsterImage, monster.x, monster.y);
   }

   ctx.fillStyle = 'rgb(250, 250, 250)';
   ctx.font = '24px Helvetica';
   ctx.textAlign = 'left';
   ctx.textBaseline = 'top';
   ctx.fillText('monstros pegos: ' + monsterCaught, 32, 32);
};

// Controla o loop do jogo
var main = function main() {
   var now = Date.now();
   var delta = now - then;

   update(delta / 1000);
   render();

   then = now;

   //Executa isso o mais breve possivel
   requestAnimationFrame(main);
};

var w = window;
var requestAnimationFrame = w.requestAnimationFrame || w.webkitRequesAnimationFrame || w.msRequesAnimationFrame || w.mozRequesAnimationFrame;

//Que comece o jogo!
var then = Date.now();
reset();
main();
