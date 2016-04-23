
module BrickStep {
    export class Boot extends Phaser.State {
        constructor() {
            super();
        }
        
        preload() {
            //load resouces
            this.loadresouces();
        }
        
        private loadresouces() {
            this.load.image('defaultArt','../assests/image/phaser.png',true);
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