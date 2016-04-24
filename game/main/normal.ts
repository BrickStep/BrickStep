module BrickStep {
    export class NormalMode extends Phaser.State {
        tiles;
        timer;

        preload() {

        }

        create() {
            this.tiles = this.game.add.group();

            this.timer = this.game.time.events.loop(800, this.addRowOfTiles, this);
        }

        addWhiteTile(x, y) {
            // Create a tile at the position x and y
            var tile = this.game.add.sprite(x, y, 'white');

            // Add to created group
            this.tiles.add(tile);

            // Add velocity to the pipe to make it move
            tile.body.velocity.y = -200;

            // Automatically kill the pipe when it's no longer visible
            tile.checkWorldBounds = true;
            tile.outOfBoundsKill = true;
        }


        addBlackTile(x, y) {
            // Create a tile at the position x and y
            var tile = this.game.add.sprite(x, y, 'black');

            // Add to created group
            this.tiles.add(tile);

            // Add velocity to the pipe to make it move
            tile.body.velocity.y = -200;

            // Automatically kill the pipe when it's no longer visible
            tile.checkWorldBounds = true;
            tile.outOfBoundsKill = true;
        }

        addRowOfTiles() {
            // Randomly pick a number between 1 and 5
            // This will be the hole position
            var black = Math.floor(Math.random() * 4) + 1;

            // Add the 6 pipes
            // With one big hole at position 'hole' and 'hole + 1'
            for (var i = 0; i < 4; i++)
                if (i != black) {
                    this.addWhiteTile(0, i * 120);
                } else {
                    this.addBlackTile(0, i * 120);
                }
        }

        backToMenu() {
            this.game.state.start('menu', true, false);
        }

        update() {

        }
    }
}