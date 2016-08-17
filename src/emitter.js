import Immutable from 'immutable';
import EventEmitter from 'events';
import filterPath, {filterTypes} from './filter';

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
    
    _handle(type,data,emitPath){
        if(!this._ons[type]){
            return false;
        }
        let current = this._ons[type]
                .filter(on=>{
                    return filterPath(on.filter,emitPath,on.listenPath)
                });
        let befores = current.filter(on=>on.action===actions.BEFORE);
        let ons = current.filter(on=>on.action===actions.ON);
        let afters = current.filter(on=>on.action===actions.AFTER);
        befores.concat(ons).concat(afters)
                .map(on=>{
                    let ret = on.fn(data, this._get(emitPath), emitPath);
                    if(ret!==undefined){
                        this._set(ret, on.listenPath);
                    }
                    if(on.n>0){
                        on.n-=1;
                    }
                    return on;
                });
        this._ons[type] = this._ons[type].filter(on=>on.n!==0);
        return true;
    }
    
    on(type,fn,listenPath,filter=filterTypes.EXACT,n=-1,action=actions.ON){
        if(this.has(type,fn,listenPath,filter)){
            return this.getRemover(type,fn,listenPath,filter);
        } else {
            if(!this._ons[type]){
                this._ons[type] = [];
                this._emitter.on(type,(data,emitPath)=>this._handle(type,data,emitPath));
            }

            this._ons[type].push({
                type,
                fn,
                filter,
                n,
                action,
                listenPath
            });
            return this.getRemover(type,fn,listenPath,filter);
        } 
    }
    
    getRemover(type,fn,listenPath,filter=null){
        return ()=>{
            this._ons[type] = this._ons[type].filter(on=>on.fn!==fn || (filter!==null && on.filter!==filter) || (listenPath!==null && on.listenPath!==listenPath));
        };
    }
    
    once(type,fn,listenPath,filter=null){
        return this.on(type,fn,listenPath,filter,1);
    }
    
    clear(type){
        this._ons[type] = [];
    }
    
    clearAll(){
        this._ons={};
    }
    
    has(type,fn,listenPath,filter=null){
        return this._ons[type] && this._ons[type].some(a=>a.fn===fn && (filter===null || a.filter===filter) && (listenPath===null || a.listenPath===listenPath));
    }
    
    off(type,fn,listenPath,filter=null){
        let remover = this.getRemover(type,fn,listenPath,filter);
        if(remover){
            remover();
            return true;
        } else {
            return false;
        }
    }
    
    before(type,fn,listenPath,filter=null,n=-1){
        return this.on(type,fn,listenPath,filter,n,actions.BEFORE);
    }
    
    after(type,fn,listenPath,filter=null,n=-1){
        return this.on(type,fn,listenPath,filter,n,actions.AFTER);
    }
    
    emit(type,data,emitPath){
        this._emitter.emit(type,data,emitPath);
    }
}