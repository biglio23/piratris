var StateMenu =
{
  button_play: null,
  button_hotseat: null,

  preload: function()
  {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.load.image('button_play', 'assets/button_play.png');
    game.load.image('button_hotseat', 'assets/button_hotseat.png');
  },

  create: function()
  {
    game.stage.backgroundColor = '#3b85ba';

    button_play = game.add.button(game.world.centerX, 500, 'button_play', function()
    {
      game.state.start('state_game');
    });
    button_play.anchor.set(0.5, 0.5);

    button_hotseat = game.add.button(game.world.centerX, 700, 'button_hotseat', function()
    {
      game.state.start('state_game');
    });
    button_hotseat.anchor.set(0.5, 0.5);
  },

  update: function()
  {

  },

  /*
  ###############
  #   PRIVATE   #
  ###############
  */

  fadeOut: function()
  {

  }

  /*
  ###########
  #   END   #
  ###########
  */
}
