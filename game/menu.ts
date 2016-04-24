
/// <reference path="game" />


module BrickStep {
    export class Menu extends Phaser.State {
        
        preload() {
            // this should be empty as resouces are loaded in boot.ts
            
        }
        create() {
            //TODO: menu scene set up
            
        }
        
        private startZen() {
            this.game.state.start('zen',true,false);
            
        }
        
        private startNormal() {
            this.game.state.start('normal',true,false);
            
        }
        update() {
            //TODO: possible some animation?
            
        }
    }
}