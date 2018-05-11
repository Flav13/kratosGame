let Scores = {
  preload: function () {
    this.load.image('menuscreen', 'assets/menu.jpg')
    this.load.image('button', 'assets/button.png')

  },

  create: function () {
    menuscreen = kratos_game.add.sprite(0,0, 'menuscreen');

    menuscreen.height = kratos_game.height;
    menuscreen.width =  kratos_game.width;

    let backButton = kratos_game.add.button(560,340, 'button', function(){kratos_game.state.start('Menu')});
    backButton.anchor.set(0.5);

    let buttonText = kratos_game.add.text(560,340, 'Back', { font: "16px Arial", fill: "#fff", align: "center" });
    buttonText.anchor.set(0.5);

    backButton.scale.setTo(0.4,0.4);
    console.log(master_scores);
    for(let i=0; i<master_scores.length; i++){
      kratos_game.add.text(160,20+i*30, i+1 + ". "+master_scores[i]);
    }
}
};
