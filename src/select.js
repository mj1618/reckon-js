import _ from 'lodash';
import {isSubPath,isRelativeEqual,pathGet,scopes} from './helpers';
import View from './view';

export default class Select {
    
    constructor(reckon,path=[]){
        this._reckon=reckon;
        this._path=path;
        this._initFilters();
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
    
    select(selector){
        return this._reckon.select(this._path.concat(_.toPath(selector)));
    }
    
    _initFilters(){
        this.FILTER_EXACT = path=>_.isEqual(path,this._path);
        this.FILTER_SUB = path=>isSubPath(this._path,path);
        this.FILTER_SUPER = path=>isSubPath(path,this._path);
        this.FILTER_ROOT = path=>!path || path.length===0;
        this.FILTER_ANY = ()=>true;
        this.FILTER_SUB_EXCLUSIVE = path=>isSubPath(this._path,path) && !_.isEqual(this._path,path);
        this.FILTER_SUPER_EXCLUSIVE = path=>isSubPath(path,this._path) && !_.isEqual(this._path,path);
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
        this._reckon.emit(name,data,this._path);
    }
    
    on(name,fn,filter=this.FILTER_EXACT){
        return this._reckon.on(name,fn,filter);
    }
    
    before(name,fn,filter=this.FILTER_EXACT){
        return this._reckon.before(name,fn,filter);
    }
    
    after(name,fn,filter=this.FILTER_EXACT){
        return this._reckon.after(name,fn,filter);
    }
    
    off(name,fn,filter=null){
        return this._reckon.off(name,fn,filter);
    }
    
    once(name,fn,filter=this.FILTER_EXACT){
        return this._reckon.once(name,fn,filter);
    }
    clear(name){
        return this._reckon.clear(name);
    }
    clearAll(){
        return this._reckon.clearAll();
    }
    
    update(fn){
        this.once('λupdate',()=>{
            this._reckon._update(fn(this.get()),this._path);
        });
        this._reckon.emit('λupdate',null,this._path);
    }
    
    onUpdate(fn){
        return this._reckon.on('λupdated',(data) => {
                if(
                    isSubPath(data.path,this._path) &&
                    !isRelativeEqual({
                        path:data.path,
                        data:data.oldData,
                    },{
                        path:this._path,
                        data:this.get()
                    })
                ){
                    fn(this.get());
                }
            },this.FILTER_ANY);
    }
    
}