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

        ModuleUI.setBottle1RedFill(1);
        ModuleUI.setBottle2RedFill(0.5);
    },

    update: function()
    {
    }
}
