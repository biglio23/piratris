var StateGame =
{
    preload: function()
    {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        ModuleGrid.preload();
    },

    create: function()
    {
        ModuleGrid.create();
    },

    update: function()
    {
    }
}