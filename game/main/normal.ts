
module BrickStep {
    import Key = Phaser.Key;
    export class NormalMode extends Phaser.State {
        tiles;
        timer;
        startTime;
        timeText;
        pauseText;
        v;
        DText;
        FText;
        JText;
        KText;
        maxTime;

        key;

        BlackQueue;




        L1() {
            this.LDown(0);
        }
        L2() {
            this.LDown(1);
        }
        L3() {
            this.LDown(2);
        }
        L4() {
            this.LDown(3);
        }

        LDown(index: number) {
            let toBe = this.BlackQueue.peekOne();


            if (toBe.indexInRow != index) {

                console.log("YOU LOSE At DOWN " + toBe.indexInRow + " not as " + index);
            } else {
                console.log("You Win " + toBe.indexInRow);
                toBe.fadeOutToGrey();
                this.BlackQueue.popOne();
            }
        }

        preload() {

        }

        create() {


            let L1 = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
            let L2 = this.game.input.keyboard.addKey(Phaser.Keyboard.F);
            let L3 = this.game.input.keyboard.addKey(Phaser.Keyboard.J);
            let L4 = this.game.input.keyboard.addKey(Phaser.Keyboard.K);

            this.key = new BrickStep.KEY(L1,L2,L3,L4);
            this.key.addListeners(this.L1, this.L2, this.L3, this.L4, this);


            this.BlackQueue = new BrickStep.Queue<BrickStep.BlackTile>(100);



            this.game.stage.backgroundColor = '#ffffff';
            this.tiles = this.game.add.group();

            var style = {
                font: "32px Futura condensed",
                align: "center",
                fill: "#3d3d3d"
            };
            this.startTime = this.game.time.time;
            this.maxTime = this.startTime;
            this.timeText = this.game.add.text(200, 10, '00:00:00', style);
            this.pauseText = this.game.add.text(100, 300, 'Press Space to Start', style);

            this.DText = this.game.add.text(10, 600, 'D', style);
            this.FText = this.game.add.text(130, 600, 'F', style);
            this.JText = this.game.add.text(250, 600, 'J', style);
            this.KText = this.game.add.text(370, 600, 'K', style);

            var spaceKey = this.game.input.keyboard.addKey(
                Phaser.Keyboard.SPACEBAR);

            this.initTiles();
            this.v = 200;
            this.timer = this.game.time.events.loop(780, this.addRowOfTiles, this);

            this.game.paused = true;
            spaceKey.onDown.add(this.start, this);
        }

        initTiles() {
            // random roll a number from 0 to 3
            // the rolled number is the black tile, the others are white
            for (var j = 3; j >= -1; j--) {
                var black = Math.floor(Math.random() * 4);
                for (var i = 0; i < 4; i++)
                    if (i != black) {
                        this.addWhiteTile(i * 120, j * 160, 200);
                    } else {
                        this.addBlackTile(i * 120, j * 160, 200,i);
                    }
            }
        }

        start() {
            if (this.game.paused) {
                this.game.paused = false;
                this.pauseText.setText('');
                this.key.enableAll(this.game);
            } else {
                this.game.paused = true;
                this.pauseText.setText('Press Space to Start');
                this.key.disableAll(this.game);
            }
        }

        addWhiteTile(x, y, v) {
            // Create a tile at the position x and y
            var tile = this.game.add.sprite(x, y, 'white');

            // Add to created group
            this.tiles.add(tile);


            // Add velocity to the tile to make it move
            this.game.physics.arcade.enable(tile);
            tile.body.velocity.y = v;

            tile.checkWorldBounds = true;
            tile.outOfBoundsKill = true;
            tile.events.onEnterBounds.add(this.destoryLisenter, tile);
        }


        addBlackTile(x, y, v,index:number) {
            // Create a tile at the position x and y
            let tile= new BrickStep.BlackTile(this.game,x, y, 'black');
            this.game.add.existing(tile);
            tile.indexInRow = index;
            console.log(tile.indexInRow);
            this.BlackQueue.addOne(tile);
            tile.events.onOutOfBounds.add(this.blackTileKillListener,this);
            // Add to created group
            this.tiles.add(tile);

            // Add velocity to the tile to make it move
            this.game.physics.arcade.enable(tile);
            tile.body.velocity.y = v;
            tile.checkWorldBounds = true;
            tile.outOfBoundsKill = true;
           // console.log(tile.checkWorldBounds);
            tile.events.onEnterBounds.add(this.destoryLisenter, this, 0,tile);
        }

        private destoryLisenter(tile) {
            console.log("addedListener")
            // Automatically kill the pipe when it's no longer visible
            tile.outOfBoundsKill = true;
        }

        private blackTileKillListener(tile) {
            if (tile === this.BlackQueue.peekOne()){
                console.log("YOU LOSE");
            }
            //this.BlackQueue.popOne();
        }

        addRowOfTiles() {
            // random roll a number from 0 to 3
            var black = Math.floor(Math.random() * 4);

            // the rolled number is the black tile, the others are white
            for (var i = 0; i < 4; i++)
                if (i != black) {
                    this.addWhiteTile(i * 120, -160, this.v);
                } else {
                    this.addBlackTile(i * 120, -160, this.v,i);
                }
        }

        backToMenu() {
            this.game.state.start('menu', true, false);
        }

        update() {
            this.updateTimer();
            if (this.game.time.time - this.maxTime > 2 * 1000) {
                this.updateVelocity();
            }
        }

        updateTimer() {
            let minutes: any;
            let seconds: any;
            let milliseconds: any;
            minutes = Math.floor((this.game.time.time - this.startTime) / 60000) % 60;
            seconds = Math.floor((this.game.time.time - this.startTime) / 1000) % 60;
            milliseconds = Math.floor(this.game.time.time - this.startTime) % 100;
            //If any of the digits becomes a single digit number, pad it with a zero
            if (milliseconds < 10)
                milliseconds = '0' + milliseconds;
            if (seconds < 10)
                seconds = '0' + seconds;
            if (minutes < 10)
                minutes = '0' + minutes;
            this.timeText.setText(minutes + ':' + seconds + ':' + milliseconds);


        }

        updateVelocity() {
            this.maxTime = this.game.time.time;
            this.tiles.addAll('body.velocity.y', 20);
            this.v = this.v + 20;
            this.timer.delay = Math.floor((160 * 1000/ this.v)) - 20;
        }
    }
}