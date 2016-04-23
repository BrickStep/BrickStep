module BrickStep {
    export class NormalMode extends Phaser.State {
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