import assert from 'assert';
import Fabric from '../../src/index';
import Immutable from 'immutable';
describe('Events API', function() {

    describe('listeners', function() {
      
        it('removing',function(){
          
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
            
            let remover = fabric.select().on('TEST_EVENT',()=>{
                throw 'should not have called this listener';
            });
            
            remover();
            
            fabric.select().emit('TEST_EVENT');
            
        });
        
        
        it('unique listeners',function(){
          
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
            
            let n = 0;
            
            let fn = ()=>{
                if(n>0)
                    throw 'function should only have been called once';
                n+=1;
            };
            
            fabric.select().on('TEST_EVENT',fn);
            fabric.select().on('TEST_EVENT',fn);
            fabric.select().emit('TEST_EVENT');
            
        });
        
        
        it('slightly different listeners',function(){
          
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
            
            let n = 0;
            
            let fn = ()=>{
                n+=1;
            };
            
            fabric.select().on('TEST_EVENT',fn);
            fabric.select().on('TEST_EVENT',fn,fabric.select().FILTER_SUB);
            fabric.select().emit('TEST_EVENT');
            
            assert.equal(2,n,'n should have been 2, actually was: '+n);
            
        });
    });
});