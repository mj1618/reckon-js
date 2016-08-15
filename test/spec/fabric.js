import assert from 'assert';
import Fabric from '../../src/index';
import Immutable from 'immutable';
describe('Fabric API', function() {

    describe('constructor', function() {
      
        it('constructor data',function(){
          
            let fabric = new Fabric({
                fruits: [
                    'apple',
                    'pear'
                ],
                veges: [
                    'tomato',
                    'cucumber'
                ]
            });
            
            assert(fabric._getJS().fruits[0] === 'apple', 'immutable data not initialised properly');
            assert.throws(()=>fabric._get().fruits[0] = 'banana', 'not immutable');
            
        });
    });
    describe('base events',function(){
        it('check events',function(done){
            let fabric = new Fabric({
                fruit:'apple'
            });
            fabric._on('CHANGE_FRUIT',()=>{
                assert(fabric.select().get().get('fruit') == 'apple', 'wasnt passed state');
                fabric.select().update(() => {
                    return {
                        fruit:'pear'
                    };
                });
            });
            fabric._on('λupdated',()=>{
                assert(fabric.select().get().toJS().fruit=='pear','not updated');
                done();
            });
            fabric._emit('CHANGE_FRUIT');
        });

    });
});