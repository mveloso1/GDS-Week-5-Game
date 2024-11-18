window.addEventListener('load', function(){

    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 500;

    //make player move with arrow keys
    class InputHandler {
        constructor(game){
            this.game = game;
            window.addEventListener ('keydown', e =>{
                if ((e.key === 'ArrowUp' || e.key === 'ArrowDown') && this.game.keys.indexOf(e.key) === -1){
                    this.game.keys.push(e.key);
                }
            });
            window.addEventListener('keyup', e=>{
              if (this.game.keys.indexOf(e.key) > -1) {
                this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
              } 
            });
        }
    }
    //Declare player, baby spider
    class Player {
        constructor(game){
            this.game = game;
            this.width = 50;
            this.height = 50;
            this.x = 100;
            this.y = 150;
            this.speedY = 0;
            this.maxSpeed = 4;
        }
        update(){
            if (this.game.keys.includes('ArrowUp')) this.speedY = -this.maxSpeed;
            else if (this.game.keys.includes('ArrowDown')) this.speedY = this.maxSpeed;
            else this.speedY = 0;
            this.y += this.speedY;
        }
        draw(context){
            context.fillStyle = 'green';
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    //generate obstacles to move down screen
    class Enemy {
        constructor(game){
            this.game = game;
            this.x = this.game.width;
            this.speedX = -3.5;
            this.markedForDeletion = false;
        }
        update(){
            this.x += this.speedX;
            if (this.x + this.width < 0) this.markedForDeletion = true;
        }
        draw(context){
            context.fillStyle = 'red';
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    class Plank extends Enemy {
        constructor(game){
            super(game);
            this.width = 15;
            this.height = 130;
            // obstacles generate in random locations 
            this.y = Math.random() * (this.game.height);
        }
    }

    class UI {
        constructor(game){
            this.game = game;
            this.fontSize = 40;
            this.fontFamily = 'Helvetica';
            this.color = 'white';
        }
        draw(context){
            context.fillStyle = this.color;
            context.font = `${this.fontSize}px ${this.fontFamily}`;
            // Score
            context.fillText('Score: ' + Math.floor(this.game.score), 20, 50);
            if(this.game.gameOver){
                context.textAlign = 'center';
                let message = 'Game Over!';
                context.font = '50px ' + this.fontFamily;
                context.fillText(message, this.game.width * 0.5, this.game.height * 0.5);
            }
            context.restore();
        }
    }

    class Game {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.ui = new UI(this);
            this.keys = [];
            this.enemies = [];
            this.enemyTimer = 0;
            this.enemyInterval = 400;
            this.gameOver = false;
            this.score = 0;
            this.scorePerSecond = 0.1; 
        }
        update(deltaTime){
            if(this.gameOver) return; 
            
            this.player.update();
            // make collision with objects cause game to end
            this.enemies.forEach(enemy => {
                enemy.update();
                if(this.checkCollision(this.player, enemy)){
                    this.gameOver = true; 
                    enemy.markedForDeletion = true;
                }
            });
            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);

            if (this.enemyTimer > this.enemyInterval && !this.gameOver){
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
            //make score increase by 1 every second
            this.score += this.scorePerSecond * (deltaTime / 100);
        }
        draw(context){
            this.player.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });
            this.ui.draw(context);
        }
        addEnemy(){
            this.enemies.push(new Plank(this));
        }
        checkCollision(rect1, rect2){
            return (rect1.x < rect2.x + rect2.width &&
                    rect1.x + rect1.width > rect2.x &&
                    rect1.y < rect2.y + rect2.height && 
                    rect1.height + rect1.y > rect2.y);
        }
    }

    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;
    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate(0);
});
