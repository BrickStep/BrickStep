module BrickStep {
    export class Menu extends Phaser.State {
        
        preload() {
            // this should be empty as resouces are loaded in boot.ts
            
        }

        button_normal;
        button_zen;
        button_setting;

        create() {
            //TODO: menu scene set up
            this.button_normal = this.game.add.button(240, 0, 'white', this.startNormal, this);
            this.button_zen = this.game.add.button(0, 160, 'white', this.startZen, this);
            this.button_setting = this.game.add.button(240, 320, 'white', this.startZen, this);
        }
        
        private startZen() {
            this.game.state.start('zen',true,false);
            
        }
        
        private startNormal() {
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