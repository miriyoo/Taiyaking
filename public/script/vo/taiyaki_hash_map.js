class TaiyakiHashMap {
    constructor() {
        this.clear();
    }
    /**
     * Update the key value with specified Taiyaki added.
     * @param {Taiyaki} item Item to be added Taiyaki
     */
    add(item) {
        if(item instanceof Taiyaki) {
            if(this._taiyakis.hasOwnProperty(item.type)){
                this._taiyakis[item.type]++;
                return true;
            }
        }
        return false;
    }
    /**
     * Set each types of quantities
     * @param {Number} type 
     * @param {Number} count 
     */
    setQuantity(type, count) {
        if(this._taiyakis.hasOwnProperty(type)){
            this._taiyakis[type] = count;
            return true;
        }
    }
    /**
     * Update the key value with specified Taiyaki deleted.
     * @param {Taiyaki} item Item to be deleted Taiyaki
     */
    remove(item) {
        if(item instanceof Taiyaki) {
            if(this._taiyakis.hasOwnProperty(item.type)) {
                this._taiyakis[item.type]--;
                return true;
            }
        }
        return false;
    }
    /**
     * Get the count of specified taiyaki.
     * @param {Number} type Taiyaki type to get
     */
    get(type) {
        if(this._taiyakis.hasOwnProperty(type)) {
            return this._taiyakis[type];
        }
        return -1;
    }
    /**
     * Clear Taiyaki numbers.
     */
    clear() {
        this._taiyakis = {0:0, 1:0, 2:0};
    }
    /**
     * Get all Taiyaki counts registered here.
     */
    count() {
        let sum = 0;
        for(var property in this._taiyakis) {
            sum += this._taiyakis[property];
        }
        return sum;
    }
    /**
     * Compare other object if it has same value.
     * Changed: Returns true if greater than the parameter.
     * @param {TaiyakiHashMap} otherHashMap Other object to be compared.
     */
    similar(otherHashMap) {
        if(!(otherHashMap instanceof TaiyakiHashMap)){
            console.log('ERROR: TaiyakiHashMap.similar() does not fit type');
            return false;
        }
        for(var property in this._taiyakis) {
            //if(!otherHashMap._taiyakis.hasOwnProperty(property) || otherHashMap._taiyakis[property] !== this._taiyakis[property]){
            if(!otherHashMap._taiyakis.hasOwnProperty(property) || otherHashMap._taiyakis[property] > this._taiyakis[property]){
                return false;
            }
        }
        return true;
    }
}