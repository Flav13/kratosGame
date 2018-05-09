let GameState = {
  preload: function(){
    this.load.image('background', 'assets/background.gif');
    this.load.spritesheet('player', 'assets/kratos-walk.png', 61,61,66,1,6);
    this.load.spritesheet('skeleton', 'assets/skeleton.png', 61,61,6, 1,6);
    this.load.tilemap('map', 'assets/level1.csv');
    this.load.image('tileset', 'assets/tileset.png');

    this.facing_right = true;
    this.is_jumping = false;


  },
  create: function(){
    kratos_game.physics.startSystem(Phaser.Physics.ARCADE);
    kratos_game.time.desiredFps = 30;
    kratos_game.physics.arcade.gravity.y = 400;

    this.background = kratos_game.add.sprite(0,0, 'background')
    this.background.height = kratos_game.height;
    this.background.width = kratos_game.width;
    this.background.fixedToCamera = true;

    this.map = kratos_game.add.tilemap('map');
    this.map.addTilesetImage('tileset');

    this.map.setCollisionByExclusion([-1]);

    this.layer = this.map.createLayer(0);

    this.layer.resizeWorld();

    this.player = kratos_game.add.sprite(100, 596, 'player');
    kratos_game.physics.enable(this.player, Phaser.Physics.ARCADE);

    this.enemy = kratos_game.add.sprite(140, 596, 'skeleton');
    kratos_game.physics.enable(this.enemy, Phaser.Physics.ARCADE);


    this.player.scale.setTo(1.5,1.5);
    this.enemy.scale.setTo(1.5,1.5);

    this.player.checkWorldBounds = true;

    this.player.animations.add('right', [0, 1,2,3,4,5,6,7,8], 10, true);
    this.player.animations.add('stand-right', [9,10, 11, 12, 13, 14,15], 10, true);
    this.player.animations.add('stand-left', [33,34, 35, 36, 37, 38,39], 10, true);

    this.player.animations.add('left', [16,17, 18, 19, 20, 21, 22, 23], 10, true);
    this.player.animations.add('jump', [24,25, 26, 27, 28, 29, 30, 31, 32], 10, true);
    this.player.animations.add('jump-left', [40,41, 42, 43, 44, 45, 46, 47, 48], 10, true);

    this.player.animations.add('attack', [49, 50, 51,52,53,54,55,56,57], 10, true);
    this.player.animations.add('attack-left', [58, 59, 60,61,62,63,64,65,66], 10, true);

    this.enemy.animations.add('attack', [0,1,2,3,4,5], 10, true);


    console.log(this.player.body);


    kratos_game.camera.follow(this.player);

    let barConfig = {width: 150, height: 15, x: 550, y: 30, bg: {color: '#000000'}, bar:{color: '#a01c00'}};
    let hpBar = new HealthBar(kratos_game, barConfig);
    hpBar.setFixedToCamera(true);

    this.is_jumping = false;
  },
  update: function(){
    kratos_game.physics.arcade.collide(this.enemy, this.layer);
    kratos_game.physics.arcade.collide(this.player, this.layer);
    this.player.body.velocity.x = 0;
    this.enemy.animations.play('attack');


    if (this.player.y > 704+40) {
      kratos_game.state.start('GameState');
    }

    if (kratos_game.input.keyboard.isDown(Phaser.Keyboard.UP) && this.player.y <= 612.5 && this.player.body.onFloor())
    {
      if(this.facing_right){
        this.player.animations.play('jump');
     }else {
       this.player.animations.play('jump-left');
       }
       this.player.body.velocity.y = -350;
       this.is_jumping = true;

    }

  if (kratos_game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
  {
   this.player.body.velocity.x = -150;
   this.facing_right = false;
   if (!this.is_jumping){
   this.player.animations.play('left');
  }
   else {
   this.player.animations.play('jump-left');
   this.is_jumping = false;
    }
   }
else if (kratos_game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
{
   this.player.body.velocity.x = 150;
   this.facing_right = true;
   if (!this.is_jumping){
   this.player.animations.play('right');
 }else {
   this.player.animations.play('jump');
   this.is_jumping = false;
 }
}
else if (kratos_game.input.keyboard.isDown(Phaser.Keyboard.X)) {
  if (this.facing_right) {
  this.player.animations.play('attack');
  } else {
  this.player.animations.play('attack-left');
  }
}

else if (this.player.body.onFloor() && !this.is_jumping)
{
  if(this.facing_right){
  this.player.animations.play('stand-right');
   }
  else {
  this.player.animations.play('stand-left');
   }
}
else if (this.player.body.onFloor()){
  this.is_jumping = false;
 }

}
};
