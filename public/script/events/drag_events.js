//@ts-nocheck
class DragEvents {

    /**
     * onDragStart 
     * @param {PIXI.interaction.InteractionEvent} event Event variable
     */
    static onDragStart(event) {
        this.data = event.data;
        this.alpha = 0.5;
        this.dragging = true;
    }

    /**
     * Kiji Drag Move
     *
     */
    static kijiOnDragMove() {
        if (this.dragging) {
            var newPosition = this.data.getLocalPosition(this.parent);
            this.rotation = -0.8;

            gameInfo.objPointer.visible = true;

            gameInfo.objPointer.x = newPosition.x - 80;
            gameInfo.objPointer.y = newPosition.y + 20;

            this.x = newPosition.x;
            this.y = newPosition.y;
        }
    }

    static kijiOnDragEnd() {
        this.alpha = 1;
        this.rotation = 0.0;

        if (TornadoLogic.hitTestRectangle(gameInfo.objPointer, gameInfo.objBack)) {
            let kvIdxSprite = [];
            for (let idx = 0; idx < gameInfo.taiyakis.length; idx++) {
                var newitem = {};
                newitem.key = idx;
                newitem.val = TornadoLogic.checkNearestPoint(gameInfo.objPointer, gameInfo.taiyakis[idx].objKiji);
                kvIdxSprite.push(newitem);
            }
            console.log(kvIdxSprite);
            kvIdxSprite.sort(function (a, b) {
                var dflt = Number.MAX_VALUE;

                var aVal = (a == null ? dflt : a.val);
                var bVal = (b == null ? dflt : b.val);
                return aVal - bVal;
            });
            console.log(kvIdxSprite);
            gameInfo.taiyakis[kvIdxSprite[0].key].cookStage = CookStage.KIJI;
            gameInfo.taiyakis[kvIdxSprite[0].key].updateVisual();
        }

        gameInfo.objPointer.visible = false;

        this.x = 640;
        this.y = 300;
        this.dragging = false;
        this.data = null;
    }

    /**
     * Anko event
     *
     */
    static ankoOnDragMove() {
        if (this.dragging) {
            var newPosition = this.data.getLocalPosition(this.parent);

            gameInfo.objAnkoSpoon.visible = true;
            gameInfo.objPointer.visible = true;

            gameInfo.objPointer.x = newPosition.x - 10;
            gameInfo.objPointer.y = newPosition.y + 60;

            gameInfo.objAnkoSpoon.x = newPosition.x;
            gameInfo.objAnkoSpoon.y = newPosition.y;
        }
    }

    static ankoOnDragEnd() {
        this.alpha = 1;

        if (TornadoLogic.hitTestRectangle(gameInfo.objAnkoSpoon, gameInfo.objBack)) {
            let kvIdxSprite = [];
            for (let idx = 0; idx < gameInfo.taiyakis.length; idx++) {
                var newitem = {};
                newitem.key = idx;
                newitem.val = TornadoLogic.checkNearestPoint(gameInfo.objPointer, gameInfo.taiyakis[idx].objKiji);
                kvIdxSprite.push(newitem);
            }
            console.log(kvIdxSprite);
            kvIdxSprite.sort(function (a, b) {
                var dflt = Number.MAX_VALUE;

                var aVal = (a == null ? dflt : a.val);
                var bVal = (b == null ? dflt : b.val);
                return aVal - bVal;
            });
            console.log(kvIdxSprite);

            if (gameInfo.taiyakis[kvIdxSprite[0].key].cookStage == CookStage.KIJI) {
                gameInfo.taiyakis[kvIdxSprite[0].key].cookStage = CookStage.INSIDE;
                gameInfo.taiyakis[kvIdxSprite[0].key].resetCookTime();
                gameInfo.taiyakis[kvIdxSprite[0].key].updateVisual();
            }
        }

        this.dragging = false;
        gameInfo.objPointer.visible = false;
        gameInfo.objAnkoSpoon.visible = false;
        this.data = null;
    }

    static handOnMouseDown(event) {
        this.data = event.data;
        this.alpha = 0.5;

        let taiyaki = DragEvents.findNearTaiyaki();
        console.log("handOnMouseDown: ");
        console.log(taiyaki);
        if(typeof taiyaki === "undefined") {
            //Outside
            gameInfo.handClick = !gameInfo.handClick;
        } else if(gameInfo.handClick) {
            // this.visible = false;
            this.alpha = 0.0;
            gameInfo.objPointer.visible = false;
            taiyaki.grab(true);
        }
    }

    static handOnMouseMove() {
        if (gameInfo.handClick) {
            var mousePosition = app.renderer.plugins.interaction.mouse.global;
            gameInfo.objPointer.x = mousePosition.x;
            gameInfo.objPointer.y = mousePosition.y + 50;

            this.x = mousePosition.x;
            this.y = mousePosition.y;
        }
    }

    static handOnMouseEnd() {
        let taiyaki = DragEvents.findNearTaiyaki();
        console.log("handOnMouseUp: ");
        console.log(taiyaki);
        if(gameInfo.handClick) {
            if(taiyaki instanceof Taiyaki) {
                taiyaki.grab(false);
            }
        }

        this.alpha = 1;

        gameInfo.objPointer.visible = false;

        this.data = null;
    }

    /**
     * @returns {Taiyaki} Nearest Taiyaki
     */
    static findNearTaiyaki() {
        if (TornadoLogic.hitTestRectangle(gameInfo.objPointer, gameInfo.objBack)) {
            let kvIdxSprite = [];
            for (let idx = 0; idx < gameInfo.taiyakis.length; idx++) {
                var newitem = {};
                newitem.key = idx;
                newitem.val = TornadoLogic.checkNearestPoint(gameInfo.objPointer, gameInfo.taiyakis[idx].objKiji);
                kvIdxSprite.push(newitem);
            }
            console.log(kvIdxSprite);
            kvIdxSprite.sort(function (a, b) {
                var dflt = Number.MAX_VALUE;
                var aVal = (a == null ? dflt : a.val);
                var bVal = (b == null ? dflt : b.val);
                return aVal - bVal;
            });
            console.log(kvIdxSprite);
            return gameInfo.taiyakis[kvIdxSprite[0].key];
        }
    }
}