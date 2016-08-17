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
            reckon.select().on('CHANGE_FRUIT',()=>{
                assert(reckon.select().get().get('fruit') == 'apple', 'wasnt passed state');
                reckon.select().update(() => {
                    return {
                        fruit:'pear'
                    };
                });
            });
            reckon.select().on('λupdated',()=>{
                assert(reckon.select().get().toJS().fruit=='pear','not updated');
                done();
            });
            reckon.select().emit('CHANGE_FRUIT');
        });

    });
});