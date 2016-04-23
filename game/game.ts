////// <reference path="./main/" />
module BrickStep {
    export class Game extends Phaser.Game {
        constructor() {
            //initilize with null because this class will only include declearation
            super(800, 600, Phaser.AUTO, 'content', null)
            
            this.state.add('boot',Boot,false);
            this.state.add('menu',Menu,false);
            this.state.add('zen',ZenMode,false);
            this.state.add('normal',NormalMode,false);
            
            this.state.start('boot');
            
        }
    }
    
}