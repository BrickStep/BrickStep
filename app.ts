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

/// <reference path="game/game/"/>

window.onload = () => {

    var game = new BrickStep.Game;
    loadScripts();

};

function loadScripts(){
   var directory = ['game/','game/main/'];
   var extension = '.js';
   var gamefiles = ['game', 'boot', 'menu'];  
   var mainfiles = ['normal','zen']
    for (var file of gamefiles){ 
       var path = directory[0] + file + extension; 
       var script = document.createElement("script");
       script.src = path;
       document.body.appendChild(script);
      }
    for (var file of mainfiles){ 
       var path = directory[1] + file + extension; 
       var script = document.createElement("script");
       script.src = path;
       document.body.appendChild(script);
      }
 }

