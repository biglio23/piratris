//-----------------------------------UI MODULE-----------------------------------\\
var ModuleUI =
{
  p1_pic: null,
  p2_pic: null,

  p1_tween: null,
  p2_tween: null,

  BOTTLES_OFFSET_Y: 40,
  BOTTLES_OFFSET_X: 20,

  bottles: [],

  preload: function()
  {
    game.load.image('circle_mask', 'assets/circle_mask.png');
    game.load.image('p1_pic', 'assets/p1_pic.jpg');
    game.load.image('p2_pic', 'assets/p2_pic.jpg');
    game.load.image('bottle_bg', 'assets/bottle_bg.png');
    game.load.image('bottle_fill', 'assets/bottle_fill.png');

    game.load.bitmapFont('font', 'assets/fonts/font.png',
    'assets/fonts/font.fnt');
  },

  create: function()
  {
    // Players pics
    var bmd = game.make.bitmapData(128, 128);
    var p1_pic = game.add.sprite(0, 0, 'p1_pic');
    p1_pic.width = 128;
    p1_pic.height = 128;
    bmd.alphaMask(p1_pic, 'circle_mask');
    this.pic_1 = game.add.image(72, 150, bmd);
    this.pic_1.anchor.set(0.5, 1);
    p1_pic.visible = false;

    bmd = game.make.bitmapData(128, 128);
    var p2_pic = game.add.sprite(0, 0, 'p2_pic')
    p2_pic.width = 128;
    p2_pic.height = 128;
    bmd.alphaMask(p2_pic, 'circle_mask');
    this.pic_2 = game.add.image(game.world.width - 72, 150, bmd);
    this.pic_2.anchor.set(0.5, 1);
    p2_pic.visible = false;

    // Tweens
    this.p1_tween = game.add.tween(this.pic_1).to( { width: 140, height: 140 },
      500, 'Linear', false, 0, -1, true);
    this.p2_tween = game.add.tween(this.pic_2).to( { width: 140, height: 140 },
      500, 'Linear', false, 0, -1, true);

    // Name - Level
    game.add.bitmapText(150, 30, 'font','God', 64);
    game.add.bitmapText(150, 100, 'font','Lv 1000', 32);

    game.add.bitmapText(game.world.width - 300, 30, 'font','Pippa', 64);
    game.add.bitmapText(game.world.width - 300, 100, 'font','Lv 1', 32);

    // Bottles P1
    this.createBottle('red_1', 100, game.world.height - this.BOTTLES_OFFSET_Y);
    this.createBottle('green_1', 220, game.world.height - this.BOTTLES_OFFSET_Y);

    // Bottles P2
    this.createBottle('red_2', game.world.width - 100, game.world.height - this.BOTTLES_OFFSET_Y);
    this.createBottle('green_2', game.world.width - 220, game.world.height - this.BOTTLES_OFFSET_Y);

    // Signals
    StateGame.signal_new_turn.add(this.setTurn, this);
  },

  update: function()
  {

  },

  /*
  ###############
  #   PRIVATE   #
  ###############
  */

  createBottle(bottle, x, y)
  {
    this.bottles[bottle] = { bg: null, fill: null, tween: null, level: 1};
    this.bottles[bottle].bg = game.add.sprite(x, y, 'bottle_bg');
    this.bottles[bottle].bg.anchor.set(0.5, 1);
    this.bottles[bottle].fill = game.add.sprite(x, y, 'bottle_fill');
    this.bottles[bottle].fill.anchor.set(0.5, 1);
  },

  /*
  ###########
  #   END   #
  ###########
  */

  /*
  ###########
  #   API   #
  ###########
  */

  // Set Bottle 1 level (0 - 1)
  setBottleFill(bottle, level)
  {
    level = Math.min(Math.max(level, 0), 1);
    game.add.tween(this.bottles[bottle].fill.scale).to( { y: level },
      500, Phaser.Easing.Quadratic.In, true);
    this.bottles[bottle].level = level;
  },

  // p1, p2, none
  setTurn(player)
  {console.log(player);
    if (player === 'p1')
    {
      this.p2_tween.stop();
      this.p1_tween.start();
    }
    else if (player == 'p2')
    {
      this.p1_tween.stop();
      this.p2_tween.start();
    }
    else if (player === 'none')
    {
      this.p1_tween.stop();
      this.p2_tween.stop();
    }
  },

  /*
  ###########
  #   END   #
  ###########
  */
}
