
module BrickStep {

    export class KEY {
        L : Array<Phaser.Key>;
        
        constructor(L1, L2, L3, L4) {
            this.L = new Array(4);
            this.L[0] = L1;
            this.L[1] = L2;
            this.L[2] = L3;
            this.L[3] = L4;
        }
        disableAll(game: Phaser.Game) {
            for (var l of this.L) {
                game.input.keyboard.removeKeyCapture(l.keyCode);
                l.enabled = false;
            }
        }
        
        enableAll(game:Phaser.Game) {
            for (var l of this.L) {
                game.input.keyboard.addKeyCapture(l.keyCode);
                l.enabled = true;
            }
        }
        
        addListeners(f1,f2,f3,f4,that) {
            this.L[0].onDown.add(f1,that);
            this.L[1].onDown.add(f2,that);
            this.L[2].onDown.add(f3,that);
            this.L[3].onDown.add(f4,that);

        }
    }
    
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