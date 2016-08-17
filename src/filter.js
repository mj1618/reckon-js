import _ from 'lodash';

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

function isSuper(a,b){
    return a===null || (b!==null && _.isEqual(a,b.slice(0,a.length)))
}
function isSub(a,b){
    return b===null || (a!==null && _.isEqual(b,a.slice(0,b.length)));
}

function isRoot(a,b){
    return a===null || a.length===0;
}

function isEqual(a,b){
    return _.isEqual(a,b);
}

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
            return isEqual(a,b);
        case 'SUPER_EXCLUSIVE':
            return !isEqual(a,b) && isSuper(a,b);
        case 'SUB_EXCLUSIVE':
            return !isEqual(a,b) && isSub(a,b);
        default:
            return false;
    }
}