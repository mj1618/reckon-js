import _ from 'lodash';
import {isSubPath,isRelativeEqual,relativeData} from './helpers';
import View from './view';
import {filterTypes} from './filter';

export default class Select {
    
    constructor(reckon,path=[]){
        this._reckon=reckon;
        this._path=path;
        this._views = {};
        this._beforeUpdate = 
            this.before('λupdate',()=>{
                if(this._reckon._updating){
                    throw new Error('State is already updating');
                }
                this._reckon._updating=true;
            });
        this._afterUpdate = 
            this.after('λupdate',()=>{
                this._reckon._updating=false;
            });
    }
    
    init(data){
        this.update(state=>{
            if(state==null || (state.size && state.size==0)){
                return data;
            } else {
                return state;
            }
        });
    }
    
    select(selector){
        return this._reckon.select(this._path.concat(_.toPath(selector)));
    }
    
    get(path=[]){
        return this._reckon._get(this._path.concat(_.toPath(path)));
    }
    getJS(path=[]){
        return this._reckon._getJS(this._path.concat(_.toPath(path)));
    }
    
    getRoot(){
        return this._reckon._get();
    }
    
    getParent(){
        if(this._path.length==0){
            return null;
        } else {
            return this._reckon._get(this._path.slice(0,this._path.length-1));
        }
    }
    
    addView(name,fn){
        this._views[name] = new View(name,fn,this);
        return this._views[name];
    }
    
    getViews(){
        return this._views;
    }
    
    getView(name){
        return this._views[name];
    }
    
    emit(name,data=null){
        this._reckon._emit(name,data,this._path);
    }
    
    on(name,fn,filter=filterTypes.CURRENT){
        return this._reckon._on(name,fn,this._path,filter);
    }
    
    before(name,fn,filter=filterTypes.CURRENT){
        return this._reckon._before(name,fn,this._path,filter);
    }
    
    after(name,fn,filter=filterTypes.CURRENT){
        return this._reckon._after(name,fn,this._path,filter);
    }
    
    off(name,fn,filter=null){
        return this._reckon._off(name,fn,this._path,filter);
    }
    
    once(name,fn,filter=filterTypes.CURRENT){
        return this._reckon._once(name,fn,this._path,filter);
    }
    clear(name){
        return this._reckon._clear(name,this._path);
    }
    
    getAllEventTypes(){
        return this._reckon._getAllEventTypes();
    }
    
    clearAll(){
        return this._reckon._clearAll();
    }
    
    update(fn){
        this.once('λupdate',()=>{
            this._reckon._update(fn(this.get()),this._path);
        });
        this._reckon._emit('λupdate',null,this._path);
    }
    
    onUpdate(fn){
        return this.on('λupdated',(data) => {
            if(
                !isRelativeEqual({
                    path:data.path,
                    data:data.oldData
                },{
                    path:this._path,
                    data:this.get()
                })
            ){
                fn(this.get(),data);
            }
        },filterTypes.AFFECTED);
    }
    
}