
/// <reference path="game" />


module BrickStep {
    export class Menu extends Phaser.State {
        
        preload() {
            // this should be empty as resouces are loaded in boot.ts
            
        }

        button_normal;
        button_zen;
        button_setting;
        button_empty;
        text;

        create() {
            //TODO: menu scene set up
            this.button_normal = this.game.add.button(240, 0, 'white_big',this.startNormal, this);
            this.button_zen = this.game.add.button(0, 160, 'white_big', this.startZen, this);
            this.button_setting = this.game.add.button(240, 320, 'white_big', this.startSetting, this);
            this.button_empty = this.game.add.button(0, 480,'white_big');

            //setting texts
            var style = {font: "32px Futura condensed", align: "center", fill: "#000000"};
            this.text = this.game.add.text(300, 70, "Normal", style);
            this.text = this.game.add.text(90, 230, "Zen", style);
            this.text = this.game.add.text(300, 390, "Setting", style);
        }

        startZen() {
            this.game.state.start('zen',true,false);
        }
        
        startNormal() {
            this.game.state.start('normal',true,false);
        }
        
        private startSetting(){
            this.game.state.start('setting',true,false);
        }
        update() {
            //TODO: possible some animation?
            
        }
    }
}