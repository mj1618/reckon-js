import Immutable from 'seamless-immutable';
import EventEmitter from 'events';
import _ from 'lodash';
import Select from './select';

class Fabric extends EventEmitter {
    
    constructor(data){
        super();
        this._data = Immutable(data);
        this._selects = {};
    }
    
    select(selector){
        let path=_.toPath(selector);
        if(!this._selects[path]){
            this._selects[path]  = new Select(this,path);    
        }
        return this._selects[path];
    }
    
    emit(name, data){
        super.emit(name,data);
    }
    
    on(name, fn, path=[]){
        return new Promise((resolve,reject)=>{
            super.on(name,function(){
                let newData = fn(this._get(path),...arguments);
                if(newData){
                    this._set(newData,path);
                }
                resolve();
            });
        });
    }
    
    once(name, fn, path=[]){
        return new Promise((resolve,reject)=>{
            super.once(name,function(){
                let newData = fn(this._get(path),...arguments);
                if(newData){
                    this._set(newData,path);
                }
                resolve();
            });
        });
    }
    
    _get(path){
        if(path && path.length>0){
            return _.get(this._data,path);
        } else {
            return this._data;
        }
    }
    _set(data,path=[]){
        let old = this._get(path);
        if(path && path.length>0){
            this._data = this._get().merge(_.set({},path,data));
        } else {
            this._data = data;
        }
        this.emit(':updated',{
            path:path,
            oldData:old
        });
    }
    
}

export default Fabric;