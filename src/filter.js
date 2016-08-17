import _ from 'lodash';
import {isSuper,isSub,isRoot,isPathsEqual} from './helpers';

let filterTypes = 
    [
        'SUB',
        'SUPER',
        'ANY',
        'ROOT',
        'CURRENT',
        'SUB_EXCLUSIVE',
        'SUPER_EXCLUSIVE',
        'AFFECTED'
    ]
    .reduce((m, v) => { m[v] = v; return m; }, {});

export {
    filterTypes
};

export default function filterPath(f,a=[],b=[]){
    switch(f){
        case 'SUPER':
            return isSuper(a,b);
        case 'SUB':
            return isSub(a,b);
        case 'ANY':
            return true;
        case 'AFFECTED':
            return isSuper(a,b) || isSub(a,b);
        case 'ROOT':
            return isRoot(a,b);
        case 'CURRENT':
            return isPathsEqual(a,b);
        case 'SUPER_EXCLUSIVE':
            return !isPathsEqual(a,b) && isSuper(a,b);
        case 'SUB_EXCLUSIVE':
            return !isPathsEqual(a,b) && isSub(a,b);
        default:
            return false;
    }
}