let Menu = {
  preload: function () {
    this.load.image('menuscreen', 'assets/menu.jpg')
    this.load.image('button', 'assets/button.png')

  },

  create: function () {
    menuscreen = kratos_game.add.sprite(0,0, 'menuscreen');

    let startGameButton = kratos_game.add.sprite(150,100, 'button');
    startGameButton.anchor.set(0.5);

    let highScoreButton = kratos_game.add.sprite(150,180, 'button');
    highScoreButton.anchor.set(0.5);

    let controlsButton = kratos_game.add.sprite(150,260, 'button');
    controlsButton.anchor.set(0.5);

    start_text = "New Game";
    score_text = "High Scores";
    controls_text = "Controls";
    style = { font: "18px Arial", fill: "#fff", align: "center" };

    let h = kratos_game.add.text(150,100, start_text, style);
    h.anchor.set(0.5);

    let g = kratos_game.add.text(150,180, score_text, style);
    g.anchor.set(0.5);

    let i = kratos_game.add.text(150,260, controls_text, style);
    i.anchor.set(0.5);


    menuscreen.height = kratos_game.height;
    menuscreen.width =  kratos_game.width;

    startGameButton.height = 150;
    startGameButton.width = 250;

    highScoreButton.height = 150;
    highScoreButton.width = 250;

    controlsButton.height = 150;
    controlsButton.width = 250;
  },

  update: function() {
    if(kratos_game.input.activePointer.justPressed()) {
    kratos_game.state.start('GameState');
  }
  }
}
