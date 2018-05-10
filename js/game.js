let GameState = {
  preload: function(){
    this.load.image('background', 'assets/background.gif');
    this.load.spritesheet('player', 'assets/kratos-walk.png', 61,61,78,1,6);
    this.load.spritesheet('skeleton', 'assets/skeleton.png', 61,61,14, 1,6);
    this.load.spritesheet('lever', 'assets/lever.png', 61,61,2);
    this.load.tilemap('map', 'assets/level1.csv');
    this.load.image('tileset', 'assets/tileset.png');

    this.facing_right = true;
    this.is_jumping = false;


  },
  create: function(){
    kratos_game.physics.startSystem(Phaser.Physics.ARCADE);
    kratos_game.time.desiredFps = 30;
    kratos_game.physics.arcade.gravity.y = 400;

    this.enemies = [];

    this.background = kratos_game.add.sprite(0,0, 'background')
    this.background.height = kratos_game.height;
    this.background.width = kratos_game.width;
    this.background.fixedToCamera = true;

    this.map = kratos_game.add.tilemap('map');
    this.map.addTilesetImage('tileset');

    this.map.setCollisionByExclusion([-1]);

    this.layer = this.map.createLayer(0);
    this.layer.resizeWorld();

    this.enemy = kratos_game.add.sprite(614, 549, 'skeleton');
    this.enemy_2 = kratos_game.add.sprite(923, 197, 'skeleton');
    this.lever = kratos_game.add.sprite(540,548.5, 'lever');
    this.player = kratos_game.add.sprite(100, 550, 'player');

    this.enemies.push(this.enemy);
    this.enemies.push(this.enemy_2);

    kratos_game.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.scale.setTo(1.5,1.5);

    this.lever.scale.setTo(1.6,1.6);

    this.player.checkWorldBounds = true;
    this.player.health = 100;

    this.player.animations.add('right', [0, 1,2,3,4,5,6,7,8], 10, true);
    this.player.animations.add('stand-right', [9,10, 11, 12, 13, 14,15], 10, true);
    this.player.animations.add('stand-left', [33,34, 35, 36, 37, 38,39], 10, true);

    this.player.animations.add('left', [16,17, 18, 19, 20, 21, 22, 23], 10, true);
    this.player.animations.add('jump', [24,25, 26, 27, 28, 29, 30, 31, 32], 10, true);
    this.player.animations.add('jump-left', [40,41, 42, 43, 44, 45, 46, 47, 48], 10, true);

    this.player.animations.add('attack', [49, 50, 51,52,53,54,55,56], 10, true);
    this.player.animations.add('attack-left', [57, 58, 59,60,61,62,63,64, 65], 10, true);

    this.player.animations.add('block-right', [66], 10, true);
    this.player.animations.add('block-left', [67], 10, true);

    this.player.animations.add('pull', [68,69, 70, 71], 10, true);
    this.lever.animations.add('pull', [0,1], 10, false);

    for(let i=0; i<this.enemies.length; i++){

    this.enemies[i].animations.add('attack', [0,1,2,3,4,5], 10, true);
    this.enemies[i].animations.add('attack-left', [6,7,8,9,10,11], 10, true);

    this.enemies[i].animations.add('stand-left',[12], 10, true);
    this.enemies[i].animations.add('stand-right',[13], 10, true);

    this.enemies[i].health = 100;
    this.enemies[i].scale.setTo(1.5,1.5);
    kratos_game.physics.enable(this.enemies[i], Phaser.Physics.ARCADE);
    }


    let barConfig = {width: 150, height: 15, x: 550, y: 30, bg: {color: '#000000'}, bar:{color: '#a01c00'}};
    this.hpBar = new HealthBar(kratos_game, barConfig);
    this.hpBar.setFixedToCamera(true);

    this.health_text = kratos_game.add.text(440,20, this.player.health, { font: "16px Arial", fill: "#000", align: "center" });
    this.health_text.fixedToCamera = true;


    this.is_jumping = false;
    kratos_game.camera.follow(this.player);

  },
  update: function(){
    this.health_text.setText(this.player.health);

    console.log(this.player.x, this.player.y);
    kratos_game.physics.arcade.collide(this.enemy, this.layer);
    kratos_game.physics.arcade.collide(this.enemy_2, this.layer);
    kratos_game.physics.arcade.collide(this.player, this.layer);

    this.player.body.velocity.x = 0;

    if(this.player.health<=0){
      kratos_game.state.start('GameState');
    }
    for(let i=0; i<this.enemies.length; i++){
    if (  this.enemies[i].x >= this.player.x &&  this.enemies[i].alive &&  this.enemies[i].y == this.player.y){
       if (this.enemies[i].x - this.player.x <= 70){
          this.enemies[i].animations.play('attack-left');
         if(!kratos_game.input.keyboard.isDown(Phaser.Keyboard.Z)){
            this.player.health -=2;
            this.hpBar.setPercent(this.player.health);
        } else if(kratos_game.input.keyboard.isDown(Phaser.Keyboard.X)){
            this.player.health -=2;
            this.hpBar.setPercent(this.player.health);
        }

         console.log(this.player.health);
       }
       else{
        this.enemies[i].animations.play('stand-left');
       }
    }
    else {
      if (this.player.x >= this.enemies[i].x && this.enemies[i].alive && this.enemies[i].y == this.player.y ){
        if (this.player.x - this.enemies[i].x <= 90){
          this.enemies[i].animations.play('attack');
        if(!kratos_game.input.keyboard.isDown(Phaser.Keyboard.Z)){
          this.player.health -= 1;
          this.hpBar.setPercent(this.player.health);
        } else if(kratos_game.input.keyboard.isDown(Phaser.Keyboard.X)){
            this.player.health -= 1;
            this.hpBar.setPercent(this.player.health);
        }
      }
      else{
        this.enemies[i].animations.play('stand-right');
      }
    }
  }
}

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
   this.player.body.velocity.x = -180;
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
   this.player.body.velocity.x = 180;
   this.facing_right = true;
   if (!this.is_jumping){
   this.player.animations.play('right');
 }else {
   this.player.animations.play('jump');
   this.is_jumping = false;
 }
}
else if (kratos_game.input.keyboard.isDown(Phaser.Keyboard.X)) {
  if (this.player.x > this.lever.x && this.player.x - this.lever.x <= 60  && this.player.y == this.lever.y){
    this.player.animations.play('pull');
    this.lever.animations.play('pull');
    this.map.putTile(3,50,20, 0);
    this.map.putTile(3,51,20, 0);
    this.map.putTile(3,52,20, 0);
    this.map.putTile(3,53,20, 0);

    this.map.removeTile(54,19, 0);
    this.map.removeTile(54,18, 0);
    this.map.removeTile(54,17, 0);
    this.map.removeTile(54,16, 0);



  }

  else if (this.facing_right) {
    for (let i=0; i<this.enemies.length; i++){
      if (this.enemies[i].x >= this.player.x && this.enemies[i].x - this.player.x <=90) {
        this.enemies[i].damage(5);
    }
  }
  this.player.animations.play('attack');
  } else {
    for (let i=0; i<this.enemies.length; i++){
      if (this.player.x >= this.enemies[i].x && this.player.x - this.enemies[i].x<=90) {
        this.enemies[i].damage(5);
    }
  }
  this.player.animations.play('attack-left');
  }

}
else if (kratos_game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
  if (this.facing_right) {
  this.player.animations.play('block-right');
  } else {
  this.player.animations.play('block-left');
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
