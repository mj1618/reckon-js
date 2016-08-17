import Immutable from 'immutable';

export default class View {
    
    constructor(name,fn,selector){
        this._name=name;
        this._fn=fn;
        this._selector = selector;
        this._selector.onUpdate(()=>this._selectUpdate());
        this._selectUpdate();
    }
    
    _selectUpdate(){
        let data = this._fn(this._selector.get());
        
        if(!Immutable.is(this._data,data)){
            this._data = data;
            this._selector.emit(this._name+'λupdated');
        }
    }
    
    onUpdate(fn){
        this._selector.on(this._name+'λupdated',()=>fn(this._data));
    }
    
    get(){
        return this._data;
    }
    
    getJS(){
        if(this._data instanceof Object){
            return this._data.toJS();
        } else {
            return this._data;
        }
    }
}