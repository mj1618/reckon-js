import _ from 'lodash';
import {isSubPath,isRelativeEqual,pathGet} from './helpers';

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
    
    update(fn){
        let promise = this._fabric.once(this._path+':update',()=>{
            this._fabric._set(fn(),this._path);
            return this.get();
        });
        this._fabric.emit(this._path+':update',this.get());
        return promise;
    }
    
    onExact(name,fn){
        return new Promise((resolve,reject)=>{
            
        });
    }
    
    onUpdate(fn){
        return new Promise((resolve,reject)=>{
            this._fabric.on(':updated',(data) => {
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