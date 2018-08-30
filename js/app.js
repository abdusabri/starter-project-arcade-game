// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.startX = -101; //Just off-screen
    this.x = this.startX;
    this.startY = ((Math.floor(Math.random() * Math.floor(4))) * 83) - 25; //4 rows, 0 excluded
    if (this.startY < 58) {
        this.startY = 58;
    }
    this.y = this.startY;
    // this.maxY = this.startY;
    // this.minY = -32;
    // this.minX = 0;
    // this.maxX = 4 * 101;
    this.speedOptions = [0.5, 1, 1.5, 1.75]; //Slow, normal, fast, extra fast
    this.speedFactor = this.speedOptions[Math.floor(Math.random() * this.speedOptions.length)];
    this.normalSpeed = 202;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.normalSpeed * this.speedFactor * dt;
    if (this.x > 505) {
        this.speedFactor = this.speedOptions[Math.floor(Math.random() * this.speedOptions.length)];

        this.startY = ((Math.floor(Math.random() * Math.floor(4))) * 83) - 25; //4 rows, 0 excluded
        if (this.startY < 58) {
            this.startY = 58;
        }
        this.y = this.startY;

        this.x = this.startX;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    this.startY = (5 * 83) - 32; //6th/bottom row (5 * 83) - 32
    this.y = this.startY;
    this.startX = (Math.floor(Math.random() * Math.floor(5))) * 101; //5 colmns max
    this.x = this.startX;
    this.maxY = this.startY;
    this.minY = -32;
    this.minX = 0;
    this.maxX = 4 * 101;
};

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // this.x += this.normalSpeed * this.speedFactor * dt;
    // this.x += this.normalSpeed * this.speedFactor * dt;
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'up':
            this.y -= 83;
            if (this.y <= this.minY) {
                this.y = this.minY;
                console.log('Game won');
            }
            break;

        case 'down':
            this.y += 83;
            if (this.y > this.maxY) {
                this.y = this.maxY;
            }
            break;

        case 'left':
            this.x -= 101;
            if (this.x < this.minX) {
                this.x = this.minX;
            }
            break;

        case 'right':
            this.x += 101;
            if (this.x > this.maxX) {
                this.x = this.maxX;
            }
            break;

        default:
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
window.player = new Player();
window.allEnemies = [new Enemy(), 
    new Enemy(),
    new Enemy(),
    new Enemy()
];

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
