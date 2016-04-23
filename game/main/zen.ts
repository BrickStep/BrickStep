module BrickStep {
    export class ZenMode extends Phaser.State {
        preload() {
            
        }
        create() {
            
        }
                
        backToMenu() {
            this.game.state.start('menu',true,false);
        }
        update() {
            
        }
    }
}