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

const scopeTypes = {
    EXACT:'EXACT',
    SUPER:'SUPER',
    SUB:'SUB'
};

export const scopes = {
    exact:path=>{
        return {
            type:scopeTypes.EXACT,
            path:path
        };
    },
    super:path=>{
        return {
            type:scopeTypes.SUPER,
            path:path
        };
    },
    sub:path=>{
        return {
            type:scopeTypes.SUB,
            path:path
        };
    },
    root:path=>{
        return {
            type:scopeTypes.EXACT,
            path:[]
        };
    },
    any:path=>{
        return {
            type:scopeTypes.SUB,
            path:[]
        }
    }
}


export function inScope(scope,path){
    if(!scope){
        return true;
    }
    
    switch(scope.type){
        case scopeTypes.EXACT:
            return _.isEqual(scope.path,path);
            break;
        case scopeTypes.SUPER:
            return isSubPath(path,scope.path);
            break;
        case scopeTypes.SUB:
            return isSubPath(scope.path,path);
            break;
        default:
            return false;
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

export function isRelativeEqual(a,b){
    
    if(!isSubPath(a.path,b.path)){
        if(isSubPath(b.path,a.path)){
            [a,b] = [b,a];
        } else {
            return false;
        }
    }
    let aData = relativeData(a.data,a.path,b.path);
    return Immutable.is(aData,b.data);
}