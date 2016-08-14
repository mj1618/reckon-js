import _ from 'lodash';
import {isSubPath,isRelativeEqual} from './helpers';

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
        let promise = this._fabric.once(':update',fn,this._path);
        this._fabric.emit(':update',this.get());
        return promise;
    }
    
    onUpdate(fn){
        return new Promise((resolve,reject)=>{
            this._fabric.on(':updated',(state,args) => {
                let path = args.path;
                let oldData = args.oldData;
                if(
                    isSubPath(path,this._path) && 
                    !isRelativeEqual({
                            path:path,
                            data:oldData,
                        },{
                            path:this._path,
                            data:this.get()
                        })){
                    fn(this.get());
                    resolve();
                }
            });
        });
    }
}