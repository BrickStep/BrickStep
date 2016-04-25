module BrickStep {
    export var flag: boolean = false;//flag = true, have music, ==false, no music
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

    export class Queue<T> {
        //this queue is unreliable due to limited capacity
        queue: Array<T>;
        index: number;
        max: number;
        toExact: number;
        cap: number;
        constructor(max: number) {
            this.max = max;
            this.index = 0;
            this.cap = 0;
            this.toExact = 0;
            this.queue = new Array(max);
        }
        addOne(toAdd: T) {
            console.log(toAdd)
            this.index = this.index % this.max;
            if (++this.cap < this.max) {
                this.queue[this.index++] = toAdd;
                this.cap++;
            } else {
                console.error("queue overflow")
            }
        }
        peekOne() : T {
            if (this.cap > 0) {
                //console.log(this.queue[this.toExact])
                //console.log("to peek " + this.toExact);
                return this.queue[this.toExact];
            } else {
                console.error("queue underflow")
            }

        }
        popOne() : T {
            if (this.toExact >= this.max)
                this.toExact = this.toExact % this.max;
            //console.log("to Extact " + this.toExact);
            if (this.cap > 0) {
                this.cap--;
                return this.queue[this.toExact++];
            } else {
                console.error("queue underflow")
            }
        }


    }
    
    export class BlackTile extends Phaser.Sprite {
        indexInRow: number;
        constructor(game,x,y,key) {
            super(game, x, y, key);
        }
        
        fadeOutToGrey() {
            this.game.add.tween(this).to({alpha: 0.2}, 100, "Linear", true);
        }
    }
    
    export class LoseDialogGroup extends Phaser.Group {
        statusText: Phaser.Text;
        backgroud: Phaser.Sprite;
        button_Try: Phaser.Button;
        button_Menu: Phaser.Button;
        outTween: Phaser.Tween;

        constructor(game: Phaser.Game) {
            super(game);
            this.outTween = new Phaser.Tween(this,this.game,this.game.tweens).to({x:1,y:1}, 1000, "Linear", false);
            //this.game.add.existing(this.outTween);
        }
        init(text: Phaser.Text, back: Phaser.Sprite, b1: Phaser.Button, b2: Phaser.Button) {
            this.statusText = text;
            this.backgroud = back;
            this.button_Try = b1;
            this.button_Menu = b2;
            this.x = 0.1;
            this.y = 0.1;
            this.alpha = 0.9;
            //b1.input.enabled = false;
            //b2.input.enabled = false;

        }
        
        show(score: string) {
            this.game.add.existing(this);
            this.statusText.setText(score);
            this.button_Menu.input.enabled = true;
            this.button_Try.input.enabled = true;

            this.visible = true;
            console.log("add");
            //this.game.add.existing(this.outTween);

            this.outTween.start();
            
            
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
            this.load.image('button_on', './assets/image/tile_w_on.png');
            this.load.image('button_off', './assets/image/tile_w_off.png');
            this.load.audio('backmusic', './assets/music/111.mp3')
            
            //TODO: load resouces

            this.load.spritesheet('button_tryAgain','./assets/image/button/buttonTryAgain.png',163,67,3);
            this.load.spritesheet('button_menu','./assets/image/button/buttonMenu.png',163,67,3);

            this.load.image('youLose', './assets/image/youLose.png');

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