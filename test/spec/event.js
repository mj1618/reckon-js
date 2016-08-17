/* eslint-env node, mocha */
import assert from 'assert';
import Reckon, {filterTypes} from '../../src/index';
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
            
            let remover = reckon.on('TEST_EVENT',()=>{
                throw new Error('should not have called this listener');
            });
            
            remover();
            
            reckon.emit('TEST_EVENT');
            
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
            reckon.on('TEST_EVENT',fn);
            
            reckon.off('TEST_EVENT',fn);
            
            reckon.emit('TEST_EVENT');
            
        });
        
        it('doesnt remove',function(){
          
            let reckon = new Reckon(0);
            let fn = n => n+1;
            reckon.on('TEST_EVENT',fn);
            
            reckon.off('TEST_EVENT',fn,filterTypes.SUB);
            
            reckon.emit('TEST_EVENT');
            
            assert.equal(reckon.get(),1,'listener wasnt called');
            
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
            
            reckon.on('TEST_EVENT',fn);
            reckon.on('TEST_EVENT',fn);
            reckon.emit('TEST_EVENT');
            
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
            
            reckon.on('TEST_EVENT',fn);
            reckon.on('TEST_EVENT',fn,filterTypes.SUB);
            reckon.emit('TEST_EVENT');
            
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
            
            reckon.once('TEST_EVENT',()=>{
                n+=1;
            });
            
            reckon.emit('TEST_EVENT');
            reckon.emit('TEST_EVENT');
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
            
            reckon.on('TEST_EVENT',()=>{
                order.push('b');
            });
            reckon.before('TEST_EVENT',()=>{
                order.push('a');
            });
            reckon.emit('TEST_EVENT');
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
            
            reckon.before('TEST_EVENT',()=>{
                order.push('a');
            });
            reckon.on('TEST_EVENT',()=>{
                order.push('b');
            });
            reckon.emit('TEST_EVENT');
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
            
            reckon.on('TEST_EVENT',()=>{
                order.push('a');
            });
            reckon.after('TEST_EVENT',()=>{
                order.push('b');
            });
            reckon.emit('TEST_EVENT');
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
            
            reckon.after('TEST_EVENT',()=>{
                order.push('b');
            });
            reckon.on('TEST_EVENT',()=>{
                order.push('a');
            });
            reckon.emit('TEST_EVENT');
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
            
            reckon.on('TEST_EVENT',()=>{
                throw new Error('should not have been called');
            });
            
            reckon.select('fruits').on('TEST_EVENT',()=>{
                throw new Error('should not have been called');
            });
            
            reckon.clear('TEST_EVENT',['fruits']);
            reckon.emit('TEST_EVENT');
            
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
            
            reckon.on('TEST_EVENT',()=>{
                throw new Error('should not have been called');
            });
            
            reckon.clearAll();
            reckon.emit('TEST_EVENT');
            
        });
        
        
    });
});