var StateGame =
{
    // Signals
    signal_match: null,
    signal_new_turn: null,

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

      // Test Signal
      this.signal_new_turn.dispatch('p1');
    },

    update: function()
    {
      ModuleUI.update();
    }
}
