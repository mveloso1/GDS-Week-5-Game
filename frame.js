const spider = document.getElementById('spider');
const boss = document.getElementById('boss');
const enemies = document.getElementById('enemies');
const score = document.getElementById('score');


function jump() {
    spider.classList('jump-animation');
    setTimeout(() => {
        spider.classList.remove('jump-animation');
    }, 500);
}
function run() {
    spider.classList('run.animation');
}

document.addEventListener('keypress', () => {
    if(!spider.classList.contains('jump-animation')) {
jump();
    }
})

window.addEventListener('load', function(){

    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 800;

    class InputHandler {
        constructor(game){
            this.game = game;
            window.addEventListener ('keydown', e =>{
                if ((
                    (e.key === 'ArrowUp') ||
                    (e.key === 'ArrowDown')
                    ||
                    (e.key === 'ArrowLeft')
                    ||
                    (e.key === 'ArrowRight')
                )&& this.game.keys.indexOf(e.key) === -1){
                    this.game.keys.push(e.key)
                }
                console.log(this.game.keys);
            });
            window.addEventListener('keyup', e=>{
              if (this.game.keys.indexOf(e.key)> -1) {
                this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
              } 
              console.log(this.game.keys);
            });
        }
    }
    class Projectile {

    }
    class Particle{

    }
    class Player {
        constructor(game){
            this.game = game;
            this.width = 60;
            this.height = 60;
            this.x = 360;
            this.y = 600;
            this.speedY=0;
            this.speedX=0;
            this.maxSpeed = 2;
        }
        update(){
            if (this.game.keys.includes('ArrowUp')) this.speedY = -this.maxSpeed;
            else if (this.game.keys.includes('ArrowDown')) this.speedY = this.maxSpeed;
            else this.speedY = 0;
            this.y += this.speedY;
            if (this.game.keys.includes('ArrowLeft')) this.speedX = -this.maxSpeed;
            else if (this.game.keys.includes('ArrowRight')) this.speedX = this.maxSpeed;
            else this.speedX = 0;
            this.x += this.speedX;
        }
        draw(context){
            context.fillRect(this.x,this.y,this.width,this.height);
        }
    }
    class Obstacle {
        constructor(game){
            this.game = game;
            this.width = 60;
            this.height = 60;
            this.x = 220;
            this.y = 350;
            this.speedY=0;
            this.speedX=0;
            this.maxSpeed = 2;
        }
        

    }
    class Layer {

    }
    class Background{

    }
    class UI{

    }
    class Game {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.keys = [];
        }
        update(){
            this.player.update();
        }
        draw(context){
            this.player.draw(context);
        }
    }

    const game = new Game(canvas.width, canvas.height);
    function animate(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        game.update();
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate();
});