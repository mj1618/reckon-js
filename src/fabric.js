import Immutable from 'immutable';
//import EventEmitter from 'events';
import _ from 'lodash';
import Select from './select';
import {pathGet,inScope} from './helpers';
import Emitter from './emitter';

class Fabric {
    
    constructor(data){
        this._data = Immutable.fromJS(data);
        this._selects = {};
        this._emitter = new Emitter();
        
    }
    
    select(selector){
        let path=_.toPath(selector);
        if(!this._selects[path]){
            this._selects[path]  = new Select(this,path);    
        }
        return this._selects[path];
    }
    
    _emit(name, data, path){
        return this._emitter.emit(name,data,path);
    }
    
    _on(name, fn, filter){
        return this._emitter.on(name,fn,filter);
    }
    
    _once(name, fn, scope){
        return this._emitter.once(name,fn,scope);
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
        this._emit('λupdated',{
            path:path,
            oldData:old
        });
    }
}

export default Fabric;