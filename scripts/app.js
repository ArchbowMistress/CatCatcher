const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let enemy, player, cursors, txtScore, score;

function preload(){
    this.load.image('enemy', 'assets/images/enemy.png');
    this.load.image('player', 'assets/images/player.png');
    this.load.image('bg', 'assets/images/bg.png');
}

function create(){
    this.add.image(0, 0, 'bg').setOrigin(0, 0);
    player = this.physics.add.sprite(400, 300, "player");
    player.setOrigin(0.5, 0);

    enemy = this.physics.add.sprite(Math.random() * this.game.config.width, Math.random() * this.game.config.height, "enemy");

    //Score Test
    score = 0;
    let style = { font: '20px Arial', fill: '#FFF'};
    txtScore = this.add.text(10, 10, score.toString(), style);

    cursors = this.input.keyboard.createCursorKeys();
}

function update(){
    if(cursors.left.isDown){
        player.x -= 5;
        player.scaleX = 1;
    }
    if(cursors.right.isDown){
        player.x += 5;
        player.scaleX = -1;
    }
    if(cursors.up.isDown){
        player.y -= 5;
        
    }
    if(cursors.down.isDown){
        player.y += 5;
        
    }

    this.physics.add.overlap(player, enemy, enemyHitHandler, null, this);

    function enemyHitHandler(){

    }
}