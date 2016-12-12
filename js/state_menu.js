var StateMenu =
{
  bg: null,
  logo: null,
  button_play: null,
  button_hotseat: null,

  preload: function()
  {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.load.image('button_play', 'assets/button_play.png');
    game.load.image('button_hotseat', 'assets/button_hotseat.png');
    game.load.image('main_menu_bg', 'assets/sprites/main_menu_bg.png')
    game.load.image('main_menu_logo', 'assets/sprites/main_menu_logo.png');
  },

  create: function()
  {
    bg = game.add.sprite(0, 0, 'main_menu_bg');
    bg.anchor.setTo(0.5, 0.5);
    bg.position.x = game.world.centerX;
    bg.position.y = game.world.centerY;
    logo = game.add.sprite(0, 0, 'main_menu_logo');
    logo.anchor.setTo(0.5, 0.5);
    logo.position.x = game.world.centerX;
    logo.position.y = game.world.centerY;

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
