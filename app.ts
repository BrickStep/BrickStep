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

///</// <reference path="./game/" />

window.onload = () => {

    var game = new BrickStep.Game;

};