var BOARD_UNIT_SIZE = 100;
var ENEMY_STARTING_POINTS = [50, 125, 225];
var ENEMY_SPEED_OPTIONS = [100, 200, 300, 50];
var NUM_ENEMIES = 4;
// Enemies our player must avoid
var Enemy = function(y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = - Math.floor((Math.random() * 50) + 150);
    this.y = ENEMY_STARTING_POINTS[Math.floor(Math.random()*ENEMY_STARTING_POINTS.length)];
    this.speed = ENEMY_SPEED_OPTIONS[Math.floor(Math.random()*ENEMY_SPEED_OPTIONS.length)];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    console.log(" tick: "+ dt);
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //var offset = this.calculateOffset(this.x, this.y, 'right');
    this.x = this.x + (this.speed * dt);
     if(this.x > 606){
            this.x  = 0;
            this.speed = ENEMY_SPEED_OPTIONS[Math.floor(Math.random()*ENEMY_SPEED_OPTIONS.length)];
            this.y = ENEMY_STARTING_POINTS[Math.floor(Math.random()*ENEMY_STARTING_POINTS.length)];
            this.x = - Math.floor((Math.random() * 50) + 150);
        }

    if((this.x < player.x + 50) && (this.x > player.x - 50)
        && ((this.y < (player.y + 50)) && (this.y > (player.y - 50)))) {
        player.x = 202;
        player.y = 404;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 404;
    this.currDirection;
    this.score = 0;
    this.calculateOffset = function(x, y, direction){
        if(direction === 'right'){
            x += BOARD_UNIT_SIZE + 1;
        }
        else
        if(direction === 'left'){
            x -= BOARD_UNIT_SIZE - 1;
        }
        if(direction === 'up'){
            y -= BOARD_UNIT_SIZE - 1;
        }
        else
        if(direction === 'down'){
            y += BOARD_UNIT_SIZE + 1;
        }
        this.currDirection = null;
        return { "x" : x,"y": y};
    };
}

Player.prototype.update = function(dt){
    var offset = this.calculateOffset(this.x, this.y, this.currDirection);
    this.x = offset.x;
    this.y = offset.y;

    if(this.y < 0){
        this.y = 404;
    }

}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(allowedKeys){
    this.currDirection = allowedKeys;

}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var enemy1 = new Enemy();
var enemy2 = new Enemy();

var allEnemies = [];
for(var i = 0; i < NUM_ENEMIES; i++){
    allEnemies.push(new Enemy());
}


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
