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


            // Add velocity to the tile to make it move
            this.game.physics.arcade.enable(tile);
            tile.body.velocity.y = 200;

            //tile.events.onEnterBounds.add(this.destoryLisenter, tile);
        }


        addBlackTile(x, y) {
            // Create a tile at the position x and y
            var tile = this.game.add.sprite(x, y, 'black');

            // Add to created group
            this.tiles.add(tile);

            // Add velocity to the tile to make it move
            this.game.physics.arcade.enable(tile);
            tile.body.velocity.y = 200;

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
                    this.addWhiteTile(i * 120, -200);
                } else {
                    this.addBlackTile(i * 120, -200);
                }
        }

        backToMenu() {
            this.game.state.start('menu', true, false);
        }

        update() {

        }
    }
}