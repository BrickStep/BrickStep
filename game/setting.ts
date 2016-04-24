module BrickStep {
    export class Setting extends Phaser.State {
        preload() {

        }

        button_music;
        button1;
        button2;
        button3;
        text;
        create() {
            var style1 = {font: "64px Futura condensed", align: "center", fill: "#FFFFFF"};
            var style2 = {font: "64px Futura condensed", align: "center", fill: "#000000"};

            this.text = this.game.add.text(28, 50, "Music", style1);
            this.button_music = this.game.add.button(240, 0, 'button_off', this.settingMusic, this);
            this.button1 = this.game.add.button(0, 160, 'white_big');
            this.button2 = this.game.add.button(240, 320, 'white_big');
            this.button3 = this.game.add.button(0, 480,'white_big', this.backToMenu, this);

            this.text = this.game.add.text(40, 530, "Back", style2);

        }

        private settingMusic(){
            if(this.button_music.key == 'button_off') {
                this.button_music = this.game.add.button(240, 0, 'button_on', this.settingMusic, this);
            } else {
                this.button_music = this.game.add.button(240, 0, 'button_off', this.settingMusic, this);
            }

        }
        backToMenu() {
            this.game.state.start('menu',true,false);
        }
        update() {

        }
    }
}