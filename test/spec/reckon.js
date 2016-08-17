/* eslint-env node, mocha */
import assert from 'assert';
import Reckon from '../../src/index';
describe('Reckon API', function() {

    describe('constructor', function() {
      
        it('constructor data',function(){
          
            let reckon = new Reckon({
                fruits: [
                    'apple',
                    'pear'
                ],
                veges: [
                    'tomato',
                    'cucumber'
                ]
            });
            
            assert(reckon._getJS().fruits[0] === 'apple', 'immutable data not initialised properly');
            assert.throws(()=>reckon._get().fruits[0] = 'banana', 'not immutable');
            
        });
    });
    describe('base events',function(){
        it('check events',function(done){
            let reckon = new Reckon({
                fruit:'apple'
            });
            reckon.on('CHANGE_FRUIT',()=>{
                assert(reckon.get().get('fruit') == 'apple', 'wasnt passed state');
                reckon.update(() => {
                    return {
                        fruit:'pear'
                    };
                });
            });
            reckon.on('λupdated',()=>{
                assert(reckon.get().toJS().fruit=='pear','not updated');
                done();
            });
            reckon.emit('CHANGE_FRUIT');
        });

    });
});