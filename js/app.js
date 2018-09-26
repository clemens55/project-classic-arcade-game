// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    //load enemy image
    this.sprite = 'images/enemy-bug.png';
};

//Update enemy position
Enemy.prototype.update = function(dt) {
   this.x += this.speed * dt;

    //reset enemy when out of map
    if (this.x > 550) {
        this.x = -100;
        this.speed = 100 + Math.floor(Math.random() * 512);
    }

    //Check if player hits an enemy
    if (player.x < this.x + 60 &&
        player.x + 40 > this.x &&
        player.y < this.y + 25 &&
        30 + player.y > this.y) {
        //player gets reset to starting point
        player.x = 200;
        player.y = 380;
        //increase hit count
        count += 1;
        hitCount();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player class
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

//update ()
Player.prototype.update = function() {
    // Prevent player from moving beyond canvas wall boundaries
    if (this.y > 380) {
        this.y = 380;
    }

    if (this.x > 400) {
        this.x = 400;
    }

    if (this.x < 0) {
        this.x = 0;
    }

    // Check if Player reaches the top
    if (this.y < 0) {
        //Player gets reset to starting point
        this.x = 200;
        this.y = 380;
        //winning message
        if (confirm(`Congrats! You just won the game with ${count} Hit(s)! Do you want to play again?`)) {
        location.reload();
            } else {
        
        location.reload();
            }
        }
};

//render()
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//handleInput()
Player.prototype.handleInput = function(keyPress) {
    switch (keyPress) {
        case 'left':
            this.x -= this.speed + 50;
            break;
        case 'up':
            this.y -= this.speed + 30;
            break;
        case 'right':
            this.x += this.speed + 50;
            break;
        case 'down':
            this.y += this.speed + 30;
            break;
    }
};

//array allEnemies
var allEnemies = [];

//position where player will be created
var enemyPosition = [60, 140, 220];
var player = new Player(200, 380, 50);
var enemy;
var count = 0;

enemyPosition.forEach(function(posY) {
    enemy = new Enemy(0, posY, 100 + Math.floor(Math.random() * 512));
    allEnemies.push(enemy);
});

//EventListener
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function hitCount() {
    document.getElementById('count').innerHTML = count;
}
