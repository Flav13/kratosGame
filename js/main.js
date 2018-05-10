let kratos_game = new Phaser.Game(640, 360, 'Canvas', '');

kratos_game.state.add('GameState', GameState);
kratos_game.state.add('Controls', Controls);
kratos_game.state.add('Menu', Menu);

kratos_game.state.start('Menu');
