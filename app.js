// class BrickStep {
//     State:{}
//     constructor() {
//         this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
//     }
//     game: Phaser.Game;
//     preload() {
//         this.game.load.image('logo', 'assets/image/phaser.png');
//     }
//     create() {
//         var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
//         logo.anchor.setTo(0.5, 0.5);
//     }
// }
/// <reference path="game/game.ts"/>
/// <reference path="scripts/require.js" />
window.onload = function () {
    requirejs(['game/boot', 'game/menu', 'game/game', 'game/main/normal', 'game/main/zen'], function () {
        var game = new BrickStep.Game;
    });
};
function loadS() {
    var directory = ['game/', 'game/main/'];
    var extension = '.js';
    var gamefiles = ['boot', 'menu', 'game'];
    var mainfiles = ['normal', 'zen'];
    for (var _i = 0, mainfiles_1 = mainfiles; _i < mainfiles_1.length; _i++) {
        var file = mainfiles_1[_i];
        var path = directory[1] + file + extension;
        var script = document.createElement("script");
        script.src = path;
        document.head.appendChild(script);
    }
    for (var _a = 0, gamefiles_1 = gamefiles; _a < gamefiles_1.length; _a++) {
        var file = gamefiles_1[_a];
        var path = directory[0] + file + extension;
        var script = document.createElement("script");
        script.src = path;
        document.head.appendChild(script);
    }
    var game = new BrickStep.Game;
}
//# sourceMappingURL=app.js.map