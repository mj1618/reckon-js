import Immutable from 'immutable';
import EventEmitter from 'events';

const actions = {
    ON:'ON',
    BEFORE:'BEFORE',
    AFTER:'AFTER'
};

export default class Emitter {
    
    constructor(){
        this._emitter = new EventEmitter();
        this._ons = {};
    }
    
    _handle(type,data,filterData){
        if(!this._ons[type]){
            return false;
        }
        
        let current = this._ons[type]
                .filter(on=>!on.filter || on.filter(filterData));
        
        let befores = current.filter(on=>on.action===actions.BEFORE);
        let ons = current.filter(on=>on.action===actions.ON);
        let afters = current.filter(on=>on.action===actions.AFTER);
        befores.concat(ons).concat(afters)
                .map(on=>{
                    on.fn(data);
                    if(on.n>0){
                        on.n-=1;
                    }
                    return on;
                });
        this._ons[type] = this._ons[type].filter(on=>on.n!==0);
        return true;
    }
    
    on(type,fn,filter=null,n=-1,action=actions.ON){
        if(this.has(type,fn,filter)){
            return this.getRemover(type,fn,filter);
        } else {
            if(!this._ons[type]){
                this._ons[type] = [];
                this._emitter.on(type,(data,filterData)=>this._handle(type,data,filterData));
            }

            this._ons[type].push({
                type,
                fn,
                filter,
                n,
                action
            });
            return this.getRemover(type,fn,filter);
        } 
    }
    
    getRemover(type,fn,filter){
        return ()=>{
            this._ons[type] = this._ons[type].filter(a=>a.fn!==fn || a.filter!==filter);
        };
    }
    
    once(type,fn,filter=null){
        return this.on(type,fn,filter,1);
    }
    
    clear(type){
        this._ons[type] = [];
    }
    
    clearAll(){
        this._ons={};
    }
    
    has(type,fn,filter){
        return this._ons[type] && this._ons[type].some(a=>a.fn===fn && a.filter===filter);
    }
    
    off(type,fn,filter=null){
        let remover = this.getRemover(type,fn,filter);
        if(remover){
            remover();
            return true;
        } else {
            return false;
        }
    }
    
    before(type,fn,filter=null,n=-1){
        return this.on(type,fn,filter,n,actions.BEFORE);
    }
    
    after(type,fn,filter=null,n=-1){
        return this.on(type,fn,filter,n,actions.AFTER);
    }
    
    emit(type,data,filterData=null){
        this._emitter.emit(type,data,filterData);
    }
}