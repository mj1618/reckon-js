import assert from 'assert';
import Fabric from '../../src/index';
import Immutable from 'immutable';
import _ from 'lodash';
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
        it('removing with off',function(){
          
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
            let fn = ()=>{
                throw 'should not have called this listener';
            };
            fabric.select().on('TEST_EVENT',fn);
            
            fabric.select().off('TEST_EVENT',fn);
            
            fabric.select().emit('TEST_EVENT');
            
        });
        
        it('doesnt remove',function(){
          
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
            
            fabric.select().off('TEST_EVENT',fn,fabric.select().FILTER_SUB);
            
            fabric.select().emit('TEST_EVENT');
            
            assert.equal(n,1,'listener wasnt called');
            
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
        
        
        it('once',function(){
          
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
            
            fabric.select().once('TEST_EVENT',()=>{
                n+=1;
            });
            
            fabric.select().emit('TEST_EVENT');
            fabric.select().emit('TEST_EVENT');
            assert.equal(1,n,'n should have been 1, actually was: '+n);
        });
        
        
        it('before',function(){
          
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
            
            let order=[];
            
            fabric.select().on('TEST_EVENT',()=>{
                order.push('b');
            });
            fabric.select().before('TEST_EVENT',()=>{
                order.push('a');
            });
            fabric.select().emit('TEST_EVENT');
            assert(_.isEqual(order,['a','b']),'events fired in wrong order');
            
        });
        
        it('before',function(){
          
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
            
            let order=[];
            
            fabric.select().before('TEST_EVENT',()=>{
                order.push('a');
            });
            fabric.select().on('TEST_EVENT',()=>{
                order.push('b');
            });
            fabric.select().emit('TEST_EVENT');
            assert(_.isEqual(order,['a','b']),'events fired in wrong order');
            
        });
        
        it('after',function(){
          
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
            
            let order=[];
            
            fabric.select().on('TEST_EVENT',()=>{
                order.push('a');
            });
            fabric.select().after('TEST_EVENT',()=>{
                order.push('b');
            });
            fabric.select().emit('TEST_EVENT');
            assert(_.isEqual(order,['a','b']),'events fired in wrong order');
            
        });
        
        it('after',function(){
          
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
            
            let order=[];
            
            fabric.select().after('TEST_EVENT',()=>{
                order.push('b');
            });
            fabric.select().on('TEST_EVENT',()=>{
                order.push('a');
            });
            fabric.select().emit('TEST_EVENT');
            assert(_.isEqual(order,['a','b']),'events fired in wrong order');
            
        });
        
        
        it('clear',function(){
          
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
            
            fabric.select().on('TEST_EVENT',()=>{
                throw 'should not have been called';
            });
            
            fabric.select().clear('TEST_EVENT');
            fabric.select().emit('TEST_EVENT');
            
        });
        
        it('clearAll',function(){
          
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
            
            fabric.select().on('TEST_EVENT',()=>{
                throw 'should not have been called';
            });
            
            fabric.select().clearAll();
            fabric.select().emit('TEST_EVENT');
            
        });
        
        
    });
});