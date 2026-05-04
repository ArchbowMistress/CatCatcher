let game = new Phaser.Game(800, 600, Phaser.CANVAS, '', {preload: preload, create: create, update: update});
let enemy, player, cursors, txtScore, score;

function preload(){
    game.load.image('enemy', 'assets/images/enemy.png');
    game.load.image('player', 'assets/images/player.png');
    game.load.image('bg', 'assets/images/bg.png');
}

function create(){
    game.add.sprite(0, 0, 'bg');
    player = game.add.sprite(400, 300, "player");
    player.anchor.setTo(.5, 0);
    game.physics.enable(player, Phaser.Physics.ARCADE);

    enemy = game.add.sprite(Math.random() * game.width, Math.random() * game.height, "enemy");
    game.physics.enable(enemy, Phaser.Physics.ARCADE)


    //Score Test
    score = 0;
    let style = { font: '20px Arial', fill: '#FFF'};
    txtScore = game.add.text(10, 10, score.toString(), style);

    cursors = game.input.keyboard.createCursorKeys();
}

function update(){
    if(cursors.left.isDown){
        player.x -= 5;
        player.sccale.x = 1;
    }
    if(cursors.right.isDown){
        player.x += 5;
        player.sccale.x = -1;
    }
    if(cursors.up.isDown){
        player.y -= 5;
        
    }
    if(cursors.down.isDown){
        player.y += 5;
        
    }

    game.physics.arcade.overlap(player, enemy, enemyHitHandler);

    function enemyHitHandler(){

    }
}