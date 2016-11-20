//-----------------------------------UI MODULE-----------------------------------\\
var ModuleUI =
{
  p1_pic: null,
  p2_pic: null,

  BOTTLES_OFFSET_Y: 40,
  BOTTLES_OFFSET_X: 20,

  bottle_1_red_bg: null,
  bottle_1_red_fill: null,
  bottle_1_green_bg: null,
  bottle_1_green_fill: null,
  bottle_1_blue_bg: null,
  bottle_1_blue_fill: null,
  bottle_1_yellow_bg: null,
  bottle_1_yellow_fill: null,

  bottle_2_red_fill: null,
  bottle_2_red_bg: null,
  bottle_2_green_bg: null,
  bottle_2_green_fill: null,
  bottle_2_blue_bg: null,
  bottle_2_blue_fill: null,
  bottle_2_yellow_bg: null,
  bottle_2_yellow_fill: null,

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
    this.p1_pic = game.add.sprite(0, 0, 'p1_pic');
    this.p1_pic.width = 128;
    this.p1_pic.height = 128;
    bmd.alphaMask(this.p1_pic, 'circle_mask');
    game.add.image(72, 150, bmd).anchor.set(0.5, 1);
    this.p1_pic.visible = false;

    bmd = game.make.bitmapData(128, 128);
    this.p2_pic = game.add.sprite(0, 0, 'p2_pic')
    this.p2_pic.width = 128;
    this.p2_pic.height = 128;
    bmd.alphaMask(this.p2_pic, 'circle_mask');
    game.add.image(game.world.width - 72, 150, bmd).anchor.set(0.5, 1);
    this.p2_pic.visible = false;

    // Name - Level
    game.add.bitmapText(150, 30, 'font','God', 64);
    game.add.bitmapText(150, 100, 'font','Lv 1000', 32);

    game.add.bitmapText(game.world.width - 300, 30, 'font','Pippa', 64);
    game.add.bitmapText(game.world.width - 300, 100, 'font','Lv 1', 32);

    // Bottles P1
    console.log(game.world.height - this.BOTTLES_OFFSET_Y);
    bottle_1_red_bg = game.add.sprite(100, game.world.height - this.BOTTLES_OFFSET_Y, 'bottle_bg');
    bottle_1_red_bg.anchor.set(0.5, 1);
    bottle_1_red_fill = game.add.sprite(bottle_1_red_bg.position.x, bottle_1_red_bg.position.y, 'bottle_fill');
    bottle_1_red_fill.anchor.set(0.5, 1);

    // Bottles P2
    bottle_2_red_bg = game.add.sprite(game.world.width - 100, game.world.height - this.BOTTLES_OFFSET_Y, 'bottle_bg');
    bottle_2_red_bg.anchor.set(0.5, 1);
    bottle_2_red_fill = game.add.sprite(bottle_2_red_bg.position.x, bottle_2_red_bg.position.y, 'bottle_fill');
    bottle_2_red_fill.anchor.set(0.5, 1);
  },

  update: function()
  {

  },

  /*
  ###########
  #   API   #
  ###########
  */

  // Set Bottle 1 level (0 - 1)
  setBottle1RedFill(level)
  {
    level = Math.min(Math.max(level, 0), 1);
    bottle_1_red_fill.scale.set(1, level)
  },

  setBottle1GreenFill(level)
  {
    level = Math.min(Math.max(level, 0), 1);
    bottle_1_green_fill.scale.set(1, level)
  },

  setBottle1BlueFill(level)
  {
    level = Math.min(Math.max(level, 0), 1);
    bottle_1_blue_fill.scale.set(1, level)
  },

  setBottle1YellowFill(level)
  {
    level = Math.min(Math.max(level, 0), 1);
    bottle_1_yellow_fill.scale.set(1, level)
  },

  // Set Bottle 2 level (0 - 1)
  setBottle2RedFill(level)
  {
    level = Math.min(Math.max(level, 0), 1);
    bottle_2_red_fill.scale.set(1, level)
  },

  setBottle2GreenFill(level)
  {
    level = Math.min(Math.max(level, 0), 1);
    bottle_2_green_fill.scale.set(1, level)
  },

  setBottle2BlueFill(level)
  {
    level = Math.min(Math.max(level, 0), 1);
    bottle_2_blue_fill.scale.set(1, level)
  },

  setBottle2YellowFill(level)
  {
    level = Math.min(Math.max(level, 0), 1);
    bottle_2_yellow_fill.scale.set(1, level)
  },

  /*
  ###########
  #   END   #
  ###########
  */
}
