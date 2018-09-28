// Enemies our player must avoid
var Enemy = function(x,y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    var speedOptions = [100, 200, 300, 400];
    this.speed = speedOptions[Math.floor(Math.random() * 4 )];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
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
        }
        //keeps player inside field
        if (this.y > 380) {
        this.y = 380;
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

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//array allEnemies
var allEnemies = [];

//position where player will be created
var enemy;
var enemyPosition = [60, 140, 220];
var player = new Player();
var count = 0;




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
