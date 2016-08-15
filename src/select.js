import _ from 'lodash';
import {isSubPath,isRelativeEqual,pathGet,scopes} from './helpers';

export default class Select {
    
    constructor(fabric,path=[]){
        this._fabric=fabric;
        this._path=path;
        this.initFilters();
    }
    initFilters(){
        this.FILTER_EXACT = path=>_.isEqual(path,this._path);
        this.FILTER_SUB = path=>isSubPath(this._path,path);
        this.FILTER_SUPER = path=>isSubPath(path,this._path);
        this.FILTER_ROOT = path=>!path || path.length===0;
        this.FILTER_ANY = ()=>true;
        this.FILTER_SUB_EXCLUSIVE = path=>isSubPath(this._path,path) && !_.isEqual(this._path,path);
        this.FILTER_SUPER_EXCLUSIVE = path=>isSubPath(path,this._path) && !_.isEqual(this._path,path);
    }
    
    get(path=[]){
        return this._fabric._get(this._path.concat(_.toPath(path)));
    }
    
    getRoot(){
        return this._fabric._get();
    }
    
    getParent(){
        if(this._path.length==0){
            return null;
        } else {
            return this._fabric._get(this._path.slice(0,this._path.length-1));
        }
    }
    
    emit(name,data=null){
        this._fabric._emit(name,data,this._path);
    }
    
    on(name,fn,filter=this.FILTER_EXACT){
        return this._fabric._on(name,fn,filter);
    }
    
    before(name,fn,filter=this.FILTER_EXACT){
        return this._fabric._before(name,fn,filter);
    }
    
    after(name,fn,filter=this.FILTER_EXACT){
        return this._fabric._after(name,fn,filter);
    }
    
    off(name,fn,filter=this.FILTER_EXACT){
        return this._fabric._off(name,fn,filter);
    }
    
    once(name,fn,filter=this.FILTER_EXACT){
        return this._fabric._once(name,fn,filter);
    }
    
    update(fn){
        this.once('λupdate',()=>{
            this._fabric._set(fn(this.get()),this._path);
        });
        this._fabric._emit('λupdate',this.get(),this._path);
    }
    
    onUpdate(fn){
        this._fabric._on('λupdated',(data) => {
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