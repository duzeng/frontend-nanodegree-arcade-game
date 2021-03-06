    // define const value for coordinates 
const RATION_X=101,
    RATION_Y=83,
    // define margin for checkCollisions
    MARGIN=17.5,
    COLS=5,
    ROWS=6,
    // adjust value for picture's position
    MODIFIER_POSITION=30;
/**
 * get random number between min and max
 * @param {* minimu number} min 
 * @param {* maximum number} max 
 */
const randomInt=function(min,max){
    if (min>max){
        let temp=min;
        min=max;
        max=temp;
    } 
    return Math.floor(Math.random()*(max-min+1))+min;
}

// Enemies our player must avoid
var Enemy = function(x,y,sprite) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x=x || -1;
    this.y=y || randomInt(1,3);
    this.speed=randomInt(1,3);
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
    this.x+=dt*this.speed;
    if (this.x>ROWS) {
        this.resetBase();
    }
};

/**
 * initial object's postion an speed
 */
Enemy.prototype.resetBase=function(){
    this.x=-1;
    this.y=randomInt(1,3);
    this.speed=randomInt(1,3);
}

/**
 * check collisions
 * @param {* the player} player 
 */
Enemy.prototype.checkCollisions=function(player){ 
    // if the both are not in a row, then return
    if (this.y!==player.y) return;

    // enemy's and player's coordinate range
    const [min_player,max_player]=[player.x*RATION_X+MARGIN,(player.x+1)*RATION_X-MARGIN]; 
    const [min_me,max_me]=[this.x*RATION_X,(this.x+1)*RATION_X]; 
    
    // if they do not overlap, then return 
    if (min_me>max_player || max_me<min_player) return;

    // go home, bye bye
    player.goHome(); 
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x*RATION_X, this.y*RATION_Y-MODIFIER_POSITION);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

/**
 * class Player
 * @param {*} sprite 
 * @param {*} x 
 * @param {*} y 
 */
var Player=function(sprite,x,y){
    const orgX=x || 2;
    const orgY=y || 5;
    Enemy.call(this,orgX,orgY,sprite || 'images/char-boy.png'); 
    this.__orgX=orgX;
    this.__orgY=orgY;
}

// inherited from Enemy
Player.prototype=Object.create(Enemy.prototype);
Player.prototype.constructor=Player;

Player.prototype.update=function(){

}

/**
 * go back to origin
 */
Player.prototype.goHome=function(){
    this.y=this.__orgY;
    this.x=this.__orgX;
} 

/**
 * change the players role
 * @param {*} src 
 */
Player.prototype.changeRole=function(src){
    this.sprite=src; 
}

/**
 * handler for inputting
 * @param {*} direction 
 */
Player.prototype.handleInput=function(direction){
    switch(direction){
        case 'left':
            this.x--;
            if (this.x<=0) this.x=0;
            break;
        case 'up':
            this.y--;
            if (this.y<=0) {this.goHome();};
            break; 
        case 'right':
            this.x++;
            if (this.x>=COLS-1) this.x=COLS-1;
            break;
        case 'down':
            this.y++;
            if (this.y>=ROWS-1) this.y=ROWS-1;
            break;
    }

}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// enemies's array
var allEnemies=[];
for (let index = 0; index < 5; index++) {
    allEnemies.push(new Enemy()); 
} 

// the instance object of Player
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
