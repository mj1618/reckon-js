import Immutable from 'immutable';
import EventEmitter from 'events';
import _ from 'lodash';
import Select from './select';
import {pathGet} from './helpers';

class Fabric {
    
    constructor(data){
        this._data = Immutable.fromJS(data);
        this._selects = {};
        this._emitter = new EventEmitter();
    }
    
    select(selector){
        let path=_.toPath(selector);
        if(!this._selects[path]){
            this._selects[path]  = new Select(this,path);    
        }
        return this._selects[path];
    }
    
    emit(name, data){
        this._emitter.emit(name,data);
    }
    
    on(name, fn){
        return new Promise((resolve,reject)=>{
            this._emitter.on(name,data=>{
                resolve(fn(data));
            });
        });
    }
    
    once(name, fn){
        return new Promise((resolve,reject)=>{
            this._emitter.once(name,(data)=>{
                resolve(fn(data));
            });
        });
    }
    
    
    _get(path=[]){
        if(path && path.length>0){
            return pathGet(this._data,path);
        } else {
            return this._data;
        }
    }
    
    
    _getJS(path=[]){
        return this._get(path).toJS();
    }
    
    _set(data,path=[]){
        let old = this._get(path);
        if(path && path.length>0){
            this._data = this._get().merge(_.set({},path,data));
        } else {
            this._data = Immutable.fromJS(data);
        }
        this.emit(':updated',{
            path:path,
            oldData:old
        });
    }
}

export default Fabric;