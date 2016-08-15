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