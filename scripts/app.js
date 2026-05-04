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
let enemyHit = false;
let overlapCollider;

function preload(){
    this.load.image('enemy', 'assets/images/enemy.png');
    this.load.image('player', 'assets/images/player.png');
    this.load.image('bg3', 'assets/images/bg3.png');
}

function create(){
    this.add.image(0, 0, 'bg3').setOrigin(0, 0);
    player = this.physics.add.sprite(400, 300, "player");
    player.setOrigin(0.5, 0);

    enemy = this.physics.add.sprite(Math.random() * this.game.config.width, Math.random() * this.game.config.height, "enemy");

    //Score Test
    score = 0;
    let style = { font: '20px Arial', fill: '#FFF'};
    txtScore = this.add.text(10, 10, score.toString(), style);

    cursors = this.input.keyboard.createCursorKeys();
    overlapCollider = this.physics.add.overlap(player, enemy, enemyHitHandler, null, this);
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
}

function enemyHitHandler(){
    if (enemyHit) {
        return;
    }

    enemyHit = true;
    if (overlapCollider) {
        this.physics.world.removeCollider(overlapCollider);
    }

    enemy.x = Math.random() * game.config.width;
    enemy.y = Math.random() * game.config.height;

    console.log("Enemy hit!");
    score++;
    txtScore.setText(score.toString());

    this.time.delayedCall(200, () => {
        enemyHit = false;
        overlapCollider = this.physics.add.overlap(player, enemy, enemyHitHandler, null, this);
    });
}