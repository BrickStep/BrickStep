module BrickStep {
    import Key = Phaser.Key;
    export class ZenMode extends Phaser.State {
        tiles;

        score;
        scoreText;

        DText;
        FText;
        JText;
        KText;

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

        LDown(index:number) {
            let toBe = this.BlackQueue.peekOne();


            if (toBe.indexInRow != index) {

                console.log("YOU LOSE At DOWN " + toBe.indexInRow + " not as " + index);
            } else {
                this.addRowOfTiles();
                this.tiles.addAll('y', 160);
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

            this.key = new BrickStep.KEY(L1, L2, L3, L4);
            this.key.addListeners(this.L1, this.L2, this.L3, this.L4, this);


            this.BlackQueue = new BrickStep.Queue<BrickStep.BlackTile>(100);


            this.game.stage.backgroundColor = '#ffffff';
            this.tiles = this.game.add.group();

            var style = {
                font: "32px Futura condensed",
                align: "center",
                fill: "#3d3d3d"
            };

            this.score = 0;
            this.scoreText = this.game.add.text(200, 10, '0', style);

            this.DText = this.game.add.text(10, 600, 'D', style);
            this.FText = this.game.add.text(130, 600, 'F', style);
            this.JText = this.game.add.text(250, 600, 'J', style);
            this.KText = this.game.add.text(370, 600, 'K', style);

            this.initTiles();

        }

        initTiles() {
            // random roll a number from 0 to 3
            // the rolled number is the black tile, the others are white
            for (var j = 3; j > -1; j--) {
                var black = Math.floor(Math.random() * 4);
                for (var i = 0; i < 4; i++)
                    if (i != black) {
                        this.addWhiteTile(i * 120, j * 160);
                    } else {
                        this.addBlackTile(i * 120, j * 160, i);
                    }
            }
        }

        addWhiteTile(x, y) {
            // Create a tile at the position x and y
            var tile = this.game.add.sprite(x, y, 'white');

            // Add to created group
            this.tiles.add(tile);

            tile.checkWorldBounds = true;
            tile.outOfBoundsKill = true;
            tile.events.onEnterBounds.add(this.destoryLisenter, tile);
        }


        addBlackTile(x, y, index:number) {
            // Create a tile at the position x and y
            let tile = new BrickStep.BlackTile(this.game, x, y, 'black');
            this.game.add.existing(tile);
            tile.indexInRow = index;
            console.log(tile.indexInRow);
            this.BlackQueue.addOne(tile);
            tile.events.onOutOfBounds.add(this.blackTileKillListener, this);
            // Add to created group
            this.tiles.add(tile);

            tile.checkWorldBounds = true;
            tile.outOfBoundsKill = true;
            // console.log(tile.checkWorldBounds);
            tile.events.onEnterBounds.add(this.destoryLisenter, this, 0, tile);
        }

        private destoryLisenter(tile) {
            console.log("addedListener")
            // Automatically kill the pipe when it's no longer visible
            tile.outOfBoundsKill = true;
        }

        private blackTileKillListener(tile) {
            if (tile === this.BlackQueue.peekOne()) {
                console.log("YOU LOSE");
            }
            //this.BlackQueue.popOne();
        }

        addRowOfTiles() {
            this.score++;
            // random roll a number from 0 to 3
            var black = Math.floor(Math.random() * 4);

            // the rolled number is the black tile, the others are white
            for (var i = 0; i < 4; i++)
                if (i != black) {
                    this.addWhiteTile(i * 120, -160);
                } else {
                    this.addBlackTile(i * 120, -160, i);
                }
        }

        backToMenu() {
            this.game.state.start('menu', true, false);
        }

        update() {
            this.scoreText.setText(this.score);
        }
    }
}