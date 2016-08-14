import _ from 'lodash';

export function isSubPath(path,subPath){
    if(!path || path.length==0){
        return true;
    } else {
        return _.isEqual(path.slice(0,path.length),path);
    }
}

export function pathDiff(from,to){
    if(!isSubPath(from,to)){
        throw 'pathDiff(from,to) must be given an initial path and a sub path: '+to+' is not a sub path of '+from;
    }
    if(!to){
        throw 'pathDiff(from,to) must be passed a "to" path, instead received: '+to;
    }
    if(!from || from.length==0){
        return to;
    } else {
        return to.slice(from.length);
    }
}

export function relativeData(data,from,to){
    return _.get(data,pathDiff(from,to));
}

export function isRelativeEqual(a,b){
    
    if(!isSubPath(a.path,b.path)){
        if(isSubPath(b.path,a.path)){
            [a,b] = [b,a];
        } else {
            return false;
        }
    }
    
    return _.isEqual(relativeData(a.data,a.path,b.path),b.data);
}