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
    
    emit(name,data){
        this._fabric.emit(name,data,this._path);
    }
    
    on(name,fn){
        return this._fabric.on(name,fn,{
            type:'exact',
            path:this._path
        });
    }
    onSuper(name,fn){
        return this._fabric.on(name,fn,{
            type:'super',
            path:this._path
        });
    }
    onSub(name,fn){
        return this._fabric.on(name,fn,{
            type:'sub',
            path:this._path
        });
    }
    onRoot(name,fn){
        return this._fabric.on(name,fn,{
            type:'root',
            path:this._path
        });
    }
    
    update(fn){
        let promise = this._fabric.once('λupdate',()=>{
            this._fabric._set(fn(this.get()),this._path);
            return this.get();
        }, {
            type:'exact',
            path:this._path
        });
        this._fabric.emit('λupdate',this.get(),this._path);
        return promise;
    }
    
    onUpdate(fn){
        return new Promise((resolve,reject)=>{
            this._fabric.on('λupdated',(data) => {
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