module BrickStep {
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

        preload() {

        }

        create() {
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
            for (var j = -1; j < 4; j++) {
                var black = Math.floor(Math.random() * 4);
                for (var i = 0; i < 4; i++)
                    if (i != black) {
                        this.addWhiteTile(i * 120, j * 160, 200);
                    } else {
                        this.addBlackTile(i * 120, j * 160, 200);
                    }
            }
        }

        start() {
            if (this.game.paused) {
                this.game.paused = false;
                this.pauseText.setText('');
            } else {
                this.game.paused = true;
                this.pauseText.setText('Press Space to Start');
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

            tile.events.onEnterBounds.add(this.destoryLisenter, tile);
        }


        addBlackTile(x, y, v) {
            // Create a tile at the position x and y
            var tile = this.game.add.sprite(x, y, 'black');

            // Add to created group
            this.tiles.add(tile);

            // Add velocity to the tile to make it move
            this.game.physics.arcade.enable(tile);
            tile.body.velocity.y = v;

            tile.events.onEnterBounds.add(this.destoryLisenter, tile);
        }

        private destoryLisenter(tile) {
            // Automatically kill the pipe when it's no longer visible
            tile.checkWorldBounds = true;
            tile.outOfBoundsKill = true;
        }

        addRowOfTiles() {
            // random roll a number from 0 to 3
            var black = Math.floor(Math.random() * 4);

            // the rolled number is the black tile, the others are white
            for (var i = 0; i < 4; i++)
                if (i != black) {
                    this.addWhiteTile(i * 120, -160, this.v);
                } else {
                    this.addBlackTile(i * 120, -160, this.v);
                }
        }

        backToMenu() {
            this.game.state.start('menu', true, false);
        }

        update() {
            this.updateTimer();
            if (this.game.time.time - this.maxTime > 3 * 1000) {
                this.updateVelocity();
            }
        }

        updateTimer() {
            var minutes = Math.floor((this.game.time.time - this.startTime) / 60000) % 60;
            var seconds = Math.floor((this.game.time.time - this.startTime) / 1000) % 60;
            var milliseconds = Math.floor(this.game.time.time - this.startTime) % 100;
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
            this.tiles.addAll('body.velocity.y', 100);
            this.v = this.v + 100;
            this.timer.delay = Math.floor((160 * 1000/ this.v)) - 20;
        }
    }
}