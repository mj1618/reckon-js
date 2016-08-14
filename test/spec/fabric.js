import assert from 'assert';
import Fabric from '../../src/fabric';
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
            fabric.on('CHANGE_FRUIT',state=>{
                assert(state.get('fruit') == 'apple', 'wasnt passed state');
                return {
                    fruit:'pear'
                };
            });
            fabric.on(':updated',state=>{
                assert(state.toJS().fruit=='pear','not updated');
                done();
            });
            fabric.emit('CHANGE_FRUIT');
        });

    });

});