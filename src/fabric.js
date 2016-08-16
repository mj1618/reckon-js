import Immutable from 'immutable';
//import EventEmitter from 'events';
import _ from 'lodash';
import Select from './select';
import {pathGet,inScope} from './helpers';
import Emitter from './emitter';

class Fabric extends Emitter {
    
    constructor(data){
        super();
        this._data = Immutable.fromJS(data);
        this._selects = {};
        this.updating=false;
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
    
    _set(data,path=[]){
        let old = this._get(path);
        if(path && path.length>0){
            this._data = this._get().merge(_.set({},path,data));
        } else {
            this._data = Immutable.fromJS(data);
        }
        this.emit('λupdated',{
            path:path,
            oldData:old
        });
    }
}

export default Fabric;