var StateGame =
{
    // Signals
    signal_match: null,
    signal_new_turn: null,

    // Turn
    current_player: "p1",

    preload: function()
    {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        ModuleGrid.preload();
        ModuleUI.preload();
    },

    create: function()
    {
      // Init Signals
      this.signal_match = new Phaser.Signal();
      this.signal_new_turn = new Phaser.Signal();

      ModuleGrid.create();
      ModuleUI.create();

      // First Signal
      this.signal_new_turn.dispatch(current_player);
    },

    update: function()
    {
      ModuleUI.update();
    },

    switchPlayer: function()
    {
      if(this.current_player === "p1")
      {
        this.current_player = "p2";
      }
      else
      {
        this.current_player = "p1";
      }
      this.signal_new_turn.dispatch(this.current_player);
    },

    newMatch: function(type, count)
    {
      this.signal_match.dispatch(type, count);
    }
}
