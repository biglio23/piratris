// Setup game
var game = new Phaser.Game(800, 1200, Phaser.CANVAS, 'piratris');

// Game States
game.state.add('state_menu', StateMenu);
game.state.add('state_game', StateGame);

// Init State
game.state.start('state_menu');

var PADDING_TOP = 300;
var GEM_SIZE = 128;
var GEM_SPACING = 4;
var GEM_SIZE_SPACED = GEM_SIZE + GEM_SPACING;
var BOARD_COLS = 6;
var BOARD_ROWS = 5;
var MATCH_MIN = 3;
