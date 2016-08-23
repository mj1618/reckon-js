import _ from 'lodash';
import Immutable from 'immutable';

export function isSubPath(path,subPath){
    if(!path || path.length==0){
        return true;
    } else {
        return _.isEqual(subPath.slice(0,path.length),path);
    }
}

export function pathSet(data,newData,path=[]){
    let dataSet = newData;
    if(newData && newData.toJS){
        dataSet = newData.toJS();
    }
    if(path && path.length>0){
        let dataRef = data.toJS();
        let f = dataRef;
        let i=0;
        for(i=0;i<path.length-1;i++){
            f = f[path[i]];
        }
        f[path[i]] = dataSet;
        return Immutable.fromJS(dataRef);
    } else {
        return Immutable.fromJS(newData);
    }
}

export function pathDiff(from,to){
    if(!isSubPath(from,to)){
        throw new Error('pathDiff(from,to) must be given an initial path and a sub path: '+to+' is not a sub path of '+from);
    }
    if(!to){
        throw new Error('pathDiff(from,to) must be passed a "to" path, instead received: '+to);
    }
    if(!from || from.length==0){
        return to;
    } else {
        return to.slice(from.length);
    }
}

export function pathGet(data,path){
    try{
        path.forEach(p=>{
            data = data.get(p);
        });
        return data;
    } catch(e) {
        return null;
    }
}

export function relativeData(data,from,to){
    let diff = pathDiff(from,to);
    if(!diff || diff.length==0){
        return data;
    } else {
        return pathGet(data,diff);
    }
}

export function isSuper(a,b){
    return a===null || (b!==null && _.isEqual(a,b.slice(0,a.length)));
}
export function isSub(a,b){
    return b===null || (a!==null && _.isEqual(b,a.slice(0,b.length)));
}

export function isRoot(a){
    return a===null || a.length===0;
}

export function isPathsEqual(a,b){
    if(isRoot(a)){
        return isRoot(b);
    } else {
        return _.isEqual(a,b);
    }
}

export function isRelativeEqual(a,b){
    
    if(isPathsEqual(a.path,b.path)){
        return Immutable.is(a.data,b.data);
    }
    
    let c,d;
    
    if(isSubPath(b.path,a.path)){
        c = b;
        d = a;
    } else {
        c = a;
        d = b;
    }
    
    let cData = relativeData(c.data,c.path,d.path);
    return Immutable.is(cData,d.data);
}