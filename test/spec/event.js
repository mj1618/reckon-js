import assert from 'assert';
import Reckon, {filterTypes} from '../../src/index';
import Immutable from 'immutable';
import _ from 'lodash';

describe('Events API', function() {

    describe('listeners', function() {
      
        it('removing',function(){
          
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
            
            let remover = reckon.select().on('TEST_EVENT',()=>{
                throw new Error('should not have called this listener');
            });
            
            remover();
            
            reckon.select().emit('TEST_EVENT');
            
        });
        it('removing with off',function(){
          
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
            let fn = ()=>{
                throw new Error('should not have called this listener');
            };
            reckon.select().on('TEST_EVENT',fn);
            
            reckon.select().off('TEST_EVENT',fn);
            
            reckon.select().emit('TEST_EVENT');
            
        });
        
        it('doesnt remove',function(){
          
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
            let n = 0;
            let fn = ()=>{
                n+=1;
            };
            reckon.select().on('TEST_EVENT',fn);
            
            reckon.select().off('TEST_EVENT',fn,filterTypes.SUB);
            
            reckon.select().emit('TEST_EVENT');
            
            assert.equal(n,1,'listener wasnt called');
            
        });
        
        it('unique listeners',function(){
          
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
            
            let n = 0;
            
            let fn = ()=>{
                if(n>0)
                    throw new Error('function should only have been called once');
                n+=1;
            };
            
            reckon.select().on('TEST_EVENT',fn);
            reckon.select().on('TEST_EVENT',fn);
            reckon.select().emit('TEST_EVENT');
            
        });
        
        
        it('slightly different listeners',function(){
          
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
            
            let n = 0;
            
            let fn = ()=>{
                n+=1;
            };
            
            reckon.select().on('TEST_EVENT',fn);
            reckon.select().on('TEST_EVENT',fn,filterTypes.SUB);
            reckon.select().emit('TEST_EVENT');
            
            assert.equal(2,n,'n should have been 2, actually was: '+n);
            
        });
        
        
        it('once',function(){
          
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
            
            let n = 0;
            
            reckon.select().once('TEST_EVENT',()=>{
                n+=1;
            });
            
            reckon.select().emit('TEST_EVENT');
            reckon.select().emit('TEST_EVENT');
            assert.equal(1,n,'n should have been 1, actually was: '+n);
        });
        
        
        it('before',function(){
          
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
            
            let order=[];
            
            reckon.select().on('TEST_EVENT',()=>{
                order.push('b');
            });
            reckon.select().before('TEST_EVENT',()=>{
                order.push('a');
            });
            reckon.select().emit('TEST_EVENT');
            assert(_.isEqual(order,['a','b']),'events fired in wrong order');
            
        });
        
        it('before',function(){
          
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
            
            let order=[];
            
            reckon.select().before('TEST_EVENT',()=>{
                order.push('a');
            });
            reckon.select().on('TEST_EVENT',()=>{
                order.push('b');
            });
            reckon.select().emit('TEST_EVENT');
            assert(_.isEqual(order,['a','b']),'events fired in wrong order');
            
        });
        
        it('after',function(){
          
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
            
            let order=[];
            
            reckon.select().on('TEST_EVENT',()=>{
                order.push('a');
            });
            reckon.select().after('TEST_EVENT',()=>{
                order.push('b');
            });
            reckon.select().emit('TEST_EVENT');
            assert(_.isEqual(order,['a','b']),'events fired in wrong order');
            
        });
        
        it('after',function(){
          
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
            
            let order=[];
            
            reckon.select().after('TEST_EVENT',()=>{
                order.push('b');
            });
            reckon.select().on('TEST_EVENT',()=>{
                order.push('a');
            });
            reckon.select().emit('TEST_EVENT');
            assert(_.isEqual(order,['a','b']),'events fired in wrong order');
            
        });
        
        
        it('clear',function(){
          
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
            
            reckon.select().on('TEST_EVENT',()=>{
                throw new Error('should not have been called');
            });
            
            reckon.select().clear('TEST_EVENT');
            reckon.select().emit('TEST_EVENT');
            
        });
        
        it('clearAll',function(){
          
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
            
            reckon.select().on('TEST_EVENT',()=>{
                throw new Error('should not have been called');
            });
            
            reckon.select().clearAll();
            reckon.select().emit('TEST_EVENT');
            
        });
        
        
    });
});