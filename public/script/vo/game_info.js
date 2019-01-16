/**
 * GameInfo
 * ---
 * @description Singleton game information
 * @property {Number} life Life
 */
class GameInfo {
    constructor(){
        this.life = 5;
        /** @type {Array<Guest>} **/
        this.guests = new Array(2); //Array of Guest
        /** @type {Array<Taiyaki>} **/
        this.taiyakis = new Array(9);
        this.basket = new TaiyakiHashMap();
        this.score = 0;
        this.objScore = null;
        /** @type {Array<PIXI.Sprite>} **/
        this.objLifes = new Array(5);
        /** @type {PIXI.Sprite} */
        this.objBack = null;
        /** @type {PIXI.Graphics} */
        this.objPointer = null;
        /** @type {PIXI.Sprite} */
        this.objAnkoSpoon = null;
        this.handClick = false;
        this.handClickCount = 0;
    }
}