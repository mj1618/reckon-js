import _ from 'lodash';
import {isSubPath,isRelativeEqual,pathGet,scopes} from './helpers';

export default class Select {
    
    constructor(fabric,path=[]){
        this._fabric=fabric;
        this._path=path;
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
    
    emit(name,data){
        this._fabric._emit(name,data,this._path);
    }
    
    on(name,fn,scope=scopes.exact){
        return this._fabric._on(name,fn,scope(this._path));
    }
    
    once(name,fn,scope=scopes.exact){
        return this._fabric._once(name,fn,scope(this._path));
    }
    
    update(fn){
        let promise = this.once('λupdate',()=>{
            this._fabric._set(fn(this.get()),this._path);
            return this.get();
        });
        this._fabric._emit('λupdate',this.get(),this._path);
        return promise;
    }
    
    onUpdate(fn){
        return new Promise((resolve,reject)=>{
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
                    resolve(fn(this.get()));
                }
            });
        });
    }
}