let Controls = {
  preload: function(){
    this.load.image('menuscreen', 'assets/menu.jpg');
    this.load.image('arrows', 'assets/arrows.png');
    this.load.image('letter_z', 'assets/letter_z.png');
    this.load.image('letter_x', 'assets/letter_x.png');
    this.load.image('button', 'assets/button.png');

  },
  create: function(){
    menuscreen = kratos_game.add.sprite(0,0, 'menuscreen');
    menuscreen.height = kratos_game.height;
    menuscreen.width =  kratos_game.width;

    jump_text = "Jump";
    left_text = "Left";
    right_text = "Right";
    attack_text = "Attack/Interact";
    block_text = "Block";
    style = { font: "26px Arial", fill: "#000", align: "center" };

    arrows = kratos_game.add.sprite(20,-40, 'arrows');
    let z = kratos_game.add.sprite(35,180, 'letter_z');
    let x = kratos_game.add.sprite(35,270, 'letter_x');

    let jump = kratos_game.add.text(230,50, jump_text, style);
    jump.anchor.set(0.5);

    let left = kratos_game.add.text(140,130, left_text, style);
    left.anchor.set(0.5);

    let right = kratos_game.add.text(300,130, right_text, style);
    right.anchor.set(0.5);

    let attack = kratos_game.add.text(150,220, attack_text, style);
    attack.anchor.set(0.5);

    let block = kratos_game.add.text(140,300, block_text, style);
    block.anchor.set(0.5);

    let backButton = kratos_game.add.button(560,340, 'button', function(){kratos_game.state.start('Menu')});
    backButton.anchor.set(0.5);

    let buttonText = kratos_game.add.text(560,340, 'Back', { font: "16px Arial", fill: "#fff", align: "center" });
    buttonText.anchor.set(0.5);

    z.scale.setTo(0.13,0.13);
    x.scale.setTo(0.13,0.13);
    backButton.scale.setTo(0.4,0.4);



  }
}
