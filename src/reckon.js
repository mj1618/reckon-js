import Immutable from 'immutable';
import _ from 'lodash';
import Select from './select';
import {pathGet} from './helpers';
import Emitter from './emitter';

class Reckon {
    
    constructor(data={},options={}){
        this._data = Immutable.fromJS(data);
        this._lastData = null;
        this._selects = {};
        this._updating=false;
        this._doPersist = options.persist ? true : false;
        this._maxHistory = 0;
        this._reckon = this;
        if(options.maxHistory){
            this._maxHistory=options.maxHistory;
        }
        this._history = [];
        this._emitter = new Emitter(this);
        ['on','before','after','once','emit','getRemover','clear','clearAll','off','getAllEventTypes'].forEach(fn=>{
            this['_'+fn] = (...args)=>{
                return this._emitter[fn](...args);
            };
        });
        ['getLast','getLastJS','addView','init','update','onUpdate','get','on','before','after','once','emit','getRemover','clear','clearAll','off'].forEach(fn=>{
            this[fn] = (...args)=>{
                return this.select()[fn](...args);
            };
        });
    }
    
    select(selector){
        let path=_.toPath(selector);
        if(!this._selects[path]){
            this._selects[path]  = new Select(this,path);    
        }
        return this._selects[path];
    }
    
    _get(path=[]){
        if(path && path.length>0){
            return Immutable.fromJS(pathGet(this._data,path));
        } else {
            return Immutable.fromJS(this._data);
        }
    }
    
    _getJS(path=[]){
        let res = this._get(path);
        if(res instanceof Object && res.toJS){
            return res.toJS();
        }
        return res;
    }
    
    _update(data,path=[],record=true){
        let old = this._get(path);
        this._lastData = this._get();
        this._set(data,path);
        if(record===true && this._history.length<this._maxHistory){
            this._history.push({
                path:path,
                oldData:old
            });
        }
        
        this._emit('λupdated',{
            path:path,
            oldData:old
        });
    }
    
    _getLast(path=[]){
        if(path && path.length>0){
            return Immutable.fromJS(pathGet(this._lastData,path));
        } else {
            return Immutable.fromJS(this._lastData);
        }
    }
    
    _getLastJS(path=[]){
        let res = this._getLast(path);
        if(res instanceof Object && res.toJS){
            return res.toJS();
        }
        return res;
    }
    
    _set(data,path=[]){
        let newData = data;
        if(data && data.toJS){
            newData = data.toJS();
        }
        if(path && path.length>0){
            let dataRef = this._data.toJS();
            let f = dataRef;
            let i=0;
            for(i=0;i<path.length-1;i++){
                f = f[path[i]];
            }
            f[path[i]] = newData;
            this._data = Immutable.fromJS(dataRef);
        } else {
            this._data = Immutable.fromJS(data);
        }
        this.persist();
    }
    
    persist(){
        if(this._doPersist){
            localStorage.setItem('reckon-data',JSON.stringify(this._data.toJS()));
        }
    }
    
    loadPersisted(){
        if(localStorage.getItem('reckon-data')!=null){
            this._data = Immutable.fromJS(JSON.parse(localStorage.getItem('reckon-data')));
            console.log(this._data.toString());
        }
    }
    
    undo(){
        if(this._history.length===0){
            return false;
        }
        let last = this._history.pop();
        this._set(last.oldData,last.path);
        return true;
    }
}

export default Reckon;