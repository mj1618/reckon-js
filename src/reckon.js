import Immutable from 'immutable';
import _ from 'lodash';
import Select from './select';
import {pathGet,pathSet} from './helpers';
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
        this._undos = [];
        this._redos = [];
        this._emitter = new Emitter(this);
        ['on','before','after','once','emit','getRemover','clear','clearAll','off','getAllEventTypes'].forEach(fn=>{
            this['_'+fn] = (...args)=>{
                return this._emitter[fn](...args);
            };
        });
        ['getReckon','getLast','getLastJS','addView','init','update','onUpdate','get','on','before','after','once','emit','getRemover','clear','clearAll','off'].forEach(fn=>{
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
        if(record===true && this._undos.length<this._maxHistory){
            this._undos.push({
                path:path,
                data:old
            });
            this._redos=[];
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
        this._data = pathSet(this._data,data,path);
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
        }
    }
    
    nUndos(){
        return this._undos.length;
    }
    nRedos(){
        return this._redos.length;
    }
    
    undo(){
        if(this._undos.length===0){
            return false;
        }
        let before = this._get();
        let last = this._undos.pop();
        this._redos.push({
            data: this._get(last.path),
            path: last.path
        });
        
        this._data = pathSet(before,last.data,last.path);
        
        if(this._undos.length===0){
            this._lastData=null;
        } else {
            let previous = this._undos[this._undos.length-1];
            this._lastData = pathSet(this._data,previous.data,previous.path);
        }
        
        this._emit('λupdated',{
            path:[],
            data:before
        });
        return true;
    }
    
    redo(){
        if(this._redos.length===0){
            return false;
        }
        let before = this._get();
        this._lastData = before;
        let next = this._redos.pop();
        this._undos.push({
            data: this._get(next.path),
            path: next.path
        });
        this._data = pathSet(before,next.data,next.path);
        
        this._emit('λupdated',{
            path:[],
            data:before
        });
        return true;
    }
}

export default Reckon;