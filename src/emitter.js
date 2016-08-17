import Immutable from 'immutable';
import EventEmitter from 'events';
import filterPath, {filterTypes} from './filter';
import _ from 'lodash';
import {isPathsEqual} from './helpers';

const actions = {
    ON:'ON',
    BEFORE:'BEFORE',
    AFTER:'AFTER'
};

export default class Emitter {
    
    constructor(reckon){
        this._emitter = new EventEmitter();
        this._ons = {};
        this._reckon = reckon;
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
                    let ret = on.fn(data, this._reckon._get(emitPath), emitPath);
                    if(ret!==undefined){
                        this._reckon._set(ret, on.listenPath);
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
        if(this._has(type,fn,listenPath,filter)){
            return this.getRemovers(type,fn,listenPath,filter);
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
            return this.getRemovers(type,fn,listenPath,filter);
        } 
    }
    
    getRemovers(type,fn,listenPath,filter=null){
        return ()=>{
            this._ons[type] = this._ons[type].filter(on=>on.fn!==fn || (filter!==null && on.filter!==filter) || (listenPath!==null && on.listenPath!==listenPath));
        };
    }
    
    once(type,fn,listenPath,filter=null){
        return this.on(type,fn,listenPath,filter,1);
    }
    
    clear(type,path=null){
        if(path===null){
            this._ons[type] = [];
        } else {
            this._ons[type].forEach(on=>console.log(JSON.stringify(on)));
            this._ons[type] = this._ons[type]
                .filter( on => !isPathsEqual(on.listenPath,path) );
        }
    }
    
    clearAll(path=null){
        Object.keys(this._ons).forEach(type=>{
            this.clear(type,path);
        });
    }
    
    getAllEventTypes(){
        return Object.keys(this._ons);
    }
    
    _has(type,fn,listenPath,filter=null){
        return this._ons[type] && this._ons[type].some(a=>a.fn===fn && (filter===null || a.filter===filter) && (listenPath===null || a.listenPath===listenPath));
    }
    
    off(type,fn,listenPath,filter=null){
        let remover = this.getRemovers(type,fn,listenPath,filter);
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