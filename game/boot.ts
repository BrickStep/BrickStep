
module BrickStep {
    export class Boot extends Phaser.State {
        constructor() {
            super();
        }
        
        preload() {
            //load resouces
            this.loadResouces();
        }
        
        private loadResouces() {
            this.load.image('black', './assets/image/tile_b.png');
            this.load.image('white', './assets/image/tile_w.png');
            this.load.image('white_big', './assets/image/tile_w_b.png');
            //TODO: load resouces
            
        }
        
        create() {
            //settings for the game

            //disable multitouch or mutiinput at once
            this.input.maxPointers = 1;
            //pause the game if lost focus
            this.stage.disableVisibilityChange = false;
            
            
            //cache should not be clean ever
            this.game.state.start('menu',true,false);
            
            
        }
    }
}