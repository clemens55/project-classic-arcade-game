// Enemies our player must avoid
class Enemy {
    constructor(y){
    this.sprite = 'images/enemy-bug.png';
    this.x = -200;
    this.y = y;
    this.speed = 100 + Math.floor(Math.random() * 350 );
    }
    
    //update enemie's position
    update(dt){
        this.x += this.speed * dt;

        //Enemy is looping through field
        if (this.x > 550) {
            this.x = -100;
            this.speed = 100 + Math.floor(Math.random() * 350);
        }

        if (player.x < this.x + 55 &&
            player.x + 40 > this.x &&
            player.y < this.y + 25 &&
            30 + player.y > this.y) {
            //player gets reset to starting point
            player.x = 200;
            player.y = 390;
            //increase hit count
            count += 1;
            hitCount();
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
class Player {
    constructor(){
        this.sprite = 'images/char-boy.png';
        this.x = 200;
        this.y = 390;
    }
    //update player's position and reset game when he reaches the top
    update(){
        if(this.y <= 0){
            this.x = 200;
            this.y = 390;
            //winning alert
            win();
        }
        //keeps player inside field
        if (this.y > 390) {
        this.y = 390;
        }

        if (this.x > 400) {
            this.x = 400;
        }

        if (this.x < 0) {
            this.x = 0;
        }
    }
    //press key to move player
    handleInput(key) {
        switch(key){
            case 'left':
            this.x -= 100;
            break;
        case 'up':
            this.y -= 85;
            break;
        case 'right':
            this.x += 100;
            break;
        case 'down':
            this.y += 85;
            break;
        }
    }
    //draw the player on screen
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }    
};

//array allEnemies
let allEnemies = [];

//creating player, set starting point of enemy and keep track on count
var enemyPosition = [60, 140, 220];
var player = new Player();
var count = 0;

allEnemies = [new Enemy(60), new Enemy(140), new Enemy(220)];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//count function
function hitCount() {
    document.getElementById('count').innerHTML = count;
}

//alert function
function win() {
    if (confirm(`Congrats! You just won the game with ${count} Hit(s)! Do you want to play again?`)) {
        location.reload();
    } else {
        window.close();
    }
}