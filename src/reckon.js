import Immutable from 'immutable';
//import EventEmitter from 'events';
import _ from 'lodash';
import Select from './select';
import {pathGet,inScope} from './helpers';
import Emitter from './emitter';

class Reckon extends Emitter {
    
    constructor(data={},options={}){
        super();
        this._data = Immutable.fromJS(data);
        this._selects = {};
        this._updating=false;
        this._maxHistory = 0;
        if(options.maxHistory){
            this._maxHistory=options.maxHistory;
        }
        this._history = [];
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
            return pathGet(this._data,path);
        } else {
            return this._data;
        }
    }
    
    
    _getJS(path=[]){
        let res = this._get(path);
        if(res instanceof Object){
            return res.toJS();
        }
        return res;
    }
    
    _update(data,path=[],record=true){
        let old = this._get(path);
        this._set(data,path);
        this.emit('λupdated',{
            path:path,
            oldData:old
        });
        
        if(record===true && this._history.length<this._maxHistory){
            this._history.push({
                path:path,
                oldData:old
            });
        }
    }
    
    _set(data,path=[]){
        if(path && path.length>0){
            this._data = this._get().merge(_.set({},path,data));
        } else {
            this._data = Immutable.fromJS(data);
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