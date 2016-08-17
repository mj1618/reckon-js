import _ from 'lodash';
import Immutable from 'immutable';

export function isSubPath(path,subPath){
    if(!path || path.length==0){
        return true;
    } else {
        return _.isEqual(subPath.slice(0,path.length),path);
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
    return a===null || (b!==null && _.isEqual(a,b.slice(0,a.length)))
}
export function isSub(a,b){
    return b===null || (a!==null && _.isEqual(b,a.slice(0,b.length)));
}

export function isRoot(a,b){
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
    
    if(!isSubPath(a.path,b.path)){
        if(isSubPath(b.path,a.path)){
            [a,b] = [b,a];
        } else {
            return Immutable.is(a.data,b.data);
        }
    }
    let aData = relativeData(a.data,a.path,b.path);
    return Immutable.is(aData,b.data);
}