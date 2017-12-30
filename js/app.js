// Enemies our player must avoid
var Enemy = function(x,y,sprite) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x=x || 0;
    this.y=y || 3;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite =sprite || 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    setInterval(function(){
        this.x++;
        if (this.x>5) this.x=1;
    },dt);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x*101, this.y*74);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player=function(x,y,sprite){
    Enemy.call(this,x || 2,y || 5,sprite || 'images/char-boy.png'); 
}

Player.prototype=Object.create(Enemy.prototype);
Player.prototype.constructor=Player;

Player.prototype.update=function(){

}

Player.prototype.render=function(){ 
    var ratioX=101;
    var ratioY=this.y===5 ? 76:90;
    ctx.drawImage(Resources.get(this.sprite), this.x*ratioX, this.y*ratioY);
}

Player.prototype.handleInput=function(direction){
    switch(direction){
        case 'left':
            this.x--;
            if (this.x<=0) this.x=0;
            break;
        case 'up':
            this.y--;
            if (this.y<=0) this.y=0;
            break; 
        case 'right':
            this.x++;
            if (this.x>=4) this.x=4;
            break;
        case 'down':
            this.y++;
            if (this.y>=5) this.y=5;
            break;
    }

}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies=[];
allEnemies.push(new Enemy(0,1));
allEnemies.push(new Enemy(0,2));
allEnemies.push(new Enemy(0,3));

var player=new Player();

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
