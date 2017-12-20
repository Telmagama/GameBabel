const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d'); 
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

let bgReady = false;
const bgImage = new Image(); 
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = 'imagens/background.png';

let heroReady = false;
const heroImage = new Image();
heroImage.onload =function () {
	heroReady = true;
};
heroImage.src = 'imagens/hero.png';

let monsterReady = false;
const monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
}
monsterImage.src = 'imagens/monster.png';

// Objetos do jogo
const hero = {
   speed: 256 // movimento em pixels por segundo
};
const monster = {};
let monsterCaught = 0;


// contole do teclado
const keysDown = {};

window.addEventListener('keydown',function (e) {
	keysDown[e.keyCode] = true;
}, false);

window.addEventListener('keyup',function (e) {
 delete	keysDown[e.keyCode];
}, false);

//Reseta o jogo quando o jogo pega o monstro
const reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	//posiciona o monstro randomicamente na tela
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};


// Atualiza os objetos do jogo
const update = function (modifier) {
   if (38 in keysDown) { //Pressionand a seta pra cima
      hero.y -= hero.speed * modifier; 
   }
   if (40 in keysDown) { // Pressionado a seta pra baixo
      hero.y += hero.speed * modifier;
   }                                              
   if (37 in keysDown) { // Pressionando a seta pra esquerda                                                                 
      hero.x -= hero.speed * modifier;                                               
   }
   if (39 in keysDown) { // Pressionando a seta pra direita
   	hero.x += hero.speed * modifier;
   }

   // Os personagens se encostaram?
   if(
   	hero.x <= (monster.x + 32)
   	&& monster.x <= (hero.x + 32)
   	&& hero.y <= (monster.y + 32)
   	&& monster.y <= (hero.y + 32)

   	) {
   	++monsterCaught;
   reset();
   }
}; 
// Renderiza tudo
const render = function () {
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
const main = function () {
	const now = Date.now();
	const delta = now - then;

	update(delta / 1000);
	render();

	then = now;

    //Executa isso o mais breve possivel
	requestAnimationFrame(main);
};

const w = window;
const requestAnimationFrame = w.requestAnimationFrame || w.webkitRequesAnimationFrame || w.msRequesAnimationFrame || w.mozRequesAnimationFrame;

//Que comece o jogo!
let then = Date.now();
reset();
main();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               