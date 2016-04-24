module BrickStep {
    export class Setting extends Phaser.State {
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