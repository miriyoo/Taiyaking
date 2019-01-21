/**
 * TornadoUtil: Own class to pack Pixi.js useful functions
 */
class TornadoUtil {
    /**
     * clear the stage by removing all children.
     * @param {PIXI.Container} stage the base of stage changed
     */
    static clearStage(stage) {
        while (stage.children[0]) {
            stage.children[0].destroy();
            stage.removeChild(stage.children[0]);
        }
    }

    /**
     * Create PIXI Object on the stage with specified texture.
     * @param {any} fileName String fileName or string[] texture frame fileName
     * @param {Number} scale Float to zoom in or out (Default: 1.0)
     * @param {PIXI.Container} targetObj Target stage to be changed
     * @param {String} spriteType (Default: "Sprite")
     * @param {Number} x Left X
     * @param {Number} y Top Y
     * @param {Number} z Z-order (Default: targetObj.children.length)
     * @param {Number} delayTime For AnimatedSprite only. Delay for each frames.
     * @returns {PIXI.Sprite | PIXI.extras.AnimatedSprite} Sprite Object
     */
    static createObjUsingTexture(fileName, scale, targetObj, spriteType, x, y, z = targetObj.children.length, delayTime = 0) {
        let texture = PIXI.Texture.fromImage(fileName);
        let sprite = null;
        if (spriteType == "Sprite") {
            sprite = new PIXI.Sprite(texture);
        } else if (spriteType == "AnimatedSprite") {
            sprite = new PIXI.extras.AnimatedSprite(fileName);
        }
        sprite.scale.set(scale, scale);
        if (x >= 0) {
            sprite.x = x;
        }
        if (y >= 0) {
            sprite.y = y;
        }
        targetObj.addChildAt(sprite, z);
        return sprite;
    }

    /**
     * Create PIXI Object interactive button
     * @param {String} fileNameDef Texture fileName on standard state
     * @param {String} fileNameHover Texture fileName on hover state
     * @param {String} fileNamePressed Texture fileName on pressed state
     * @param {Number} scale Float to zoom in or out (Default: 1.0)
     * @param {PIXI.Container} targetObj Target stage to be changed
     * @param {Number} x Left x
     * @param {Number} y Top y
     * @param {PIXI.interaction.InteractionEvent} onClick EventHandler to fire on click (or tap)
     */
    static createObjButton(fileNameDef, fileNameHover, fileNamePressed, scale, targetObj, x, y, onClick) {
        // let textureButtonDown = PIXI.Texture.fromImage(fileNamePressed);
        // let textureButtonOver = PIXI.Texture.fromImage(fileNameHover);
        let sprite = this.createObjUsingTexture(fileNameDef, scale, targetObj, "Sprite", x, y);
        sprite.anchor.set(0.5, 0.5);
        sprite.interactive = true;
        sprite.buttonMode = true;
        sprite["textureButton"] = PIXI.Texture.fromImage(fileNameDef);
        sprite["textureButtonDown"] = PIXI.Texture.fromImage(fileNamePressed);
        sprite["textureButtonOver"] = PIXI.Texture.fromImage(fileNameHover);
        sprite["tap"] = onClick;
        sprite["click"] = onClick;
        sprite.on('pointerdown', ButtonEvents.onButtonDown)
            .on('pointerup', ButtonEvents.onButtonUp)
            .on('pointerupoutside', ButtonEvents.onButtonUp)
            .on('pointerover', ButtonEvents.onButtonOver)
            .on('pointerout', ButtonEvents.onButtonOut);
    }

    /**
     * Fill the rect by specified color.
     * @param {Number} color Color to fill
     * @param {Number} x Left X
     * @param {Number} y Top Y
     * @param {Number} width Width
     * @param {Number} height Height
     * @param {PIXI.Container} targetObj Target stage to be changed
     * @param {Number?} alpha Optional. Alpha value
     * @returns {PIXI.Graphics} Graphics object
     */
    static fillRect(color, x, y, width, height, targetObj, alpha = undefined) {
        let graphic = new PIXI.Graphics();
        typeof alpha == "undefined" ? graphic.beginFill(color) : graphic.beginFill(color, alpha);
        graphic.drawRect(0, 0, width, height);
        graphic.endFill();
        graphic.x = x;
        graphic.y = y;
        targetObj.addChild(graphic);
        return graphic;
    }

    /**
     * Fill the rect by specified color.
     * @param {Number} color Color to fill
     * @param {Number} x Left X
     * @param {Number} y Top Y
     * @param {Number} radius radius
     * @param {PIXI.Container} targetObj Target stage to be changed
     * @param {Number} lineStylePixelWide Line style pixel wide
     * @param {Number} lineColor Line color
     * @param {Number} lineAlpha Line alpha
     * @returns {PIXI.Graphics} Graphics object
     */
    static fillCircle(color, x, y, radius, targetObj, lineStylePixelWide, lineColor, lineAlpha) {
        let graphic = new PIXI.Graphics();
        graphic.lineStyle(lineStylePixelWide, lineColor, lineAlpha);
        graphic.beginFill(color);
        graphic.drawCircle(x, y, radius);
        graphic.endFill();
        targetObj.addChild(graphic);
        return graphic;
    }

    /**
     * Fill the Rounedrect by specified color.
     * @param {Number} color Color to fill
     * @param {Number} x Left X
     * @param {Number} y Top Y
     * @param {Number} cornerRadius radius
     * @param {PIXI.Container} targetObj Target stage to be changed
     * @param {Number} lineStylePixelWide Line style pixel wide
     * @param {Number} lineColor Line color
     * @param {Number} lineAlpha Line alpha
     * @returns {PIXI.Graphics} Graphics object
     */
    static fillRoundedRect(color, x, y, width, height, cornerRadius, targetObj, lineStylePixelWide, lineColor, lineAlpha) {
        let graphic = new PIXI.Graphics();
        graphic.lineStyle(lineStylePixelWide, lineColor, lineAlpha);
        graphic.beginFill(color);
        graphic.drawRoundedRect(x, y, width, height, cornerRadius);
        graphic.endFill();
        targetObj.addChild(graphic);
        return graphic;
    }

    /**
     * Print Pixi.js Text
     * @param {String} text Text to output
     * @param {Number} x Left X
     * @param {Number} y Top Y
     * @param {PIXI.Container} targetObj Target stage to be changed
     * @param {PIXI.TextStyle?} textStyle Default: 'center'
     * @returns {PIXI.Text} Text Object
     */
    static textOut(text, x, y, targetObj, textStyle) {
        /*if(typeof textStyle == "undefined") {
            textStyle = new PIXI.TextStyle({
                //Set default text style here
            });
        }*/
        let txtObj = new PIXI.Text(text, textStyle);
        txtObj.position.set(x, y);
        targetObj.addChild(txtObj);
        return txtObj;
    }

    /**
     * Output yyyy/MM/dd
     * @param {Date} d 
     */
    static formatDate(d) {
        var month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        var sYear = year.toString();
        sYear = sYear.substr(sYear.length-2,2);

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
    
        return [sYear, month, day].join('/');
    }
}