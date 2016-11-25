var StateGame =
{
    preload: function()
    {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        ModuleGrid.preload();
        ModuleUI.preload();
    },

    create: function()
    {
        ModuleGrid.create();
        ModuleUI.create();

        ModuleUI.setBottleFill('red_1', 0.5);
        ModuleUI.setTurn('none');
    },

    update: function()
    {
      ModuleUI.update();
    }
}
