import assert from 'assert';
import Fabric from '../../src/index';
import Immutable from 'immutable';
import {scopes} from '../../src/index';

describe('Fabric Select API',function(){
    describe('data',function(){
        
        it('should show message on exact scope',function(done){
            
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
            
            let fruitSelect = fabric.select('fruit[0]');
            
            fruitSelect.on('SCOPED_EVENT',()=>{
                done();
            });
            
            fruitSelect.emit('SCOPED_EVENT');
            
        });
        
        
        it('should not show message on exact scope',function(){
            
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
            
            let fruitSelect = fabric.select('fruit[0]');
            
            fruitSelect.on('SCOPED_EVENT',()=>{
                throw 'this should not be called';
            });
            
            fabric.select().emit('SCOPED_EVENT');
        });
        
        
        
        it('should show message on super scope',function(done){
            
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
            
            let fruitSelect = fabric.select('fruit[0]');
            let fruitsSelect = fabric.select('fruit');
            
            fruitSelect.on('SCOPED_EVENT',()=>{
                done();
            },scopes.super);
            
            fruitsSelect.emit('SCOPED_EVENT');
            
        });
        
        
        it('should not show message on super scope',function(){
            
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
            
            let fruitSelect = fabric.select('fruit[0]');
            let fruitsSelect = fabric.select('fruit');
            
            fruitsSelect.on('SCOPED_EVENT',()=>{
                throw 'this should not be called';
            },scopes.super);
            
            fruitSelect.emit('SCOPED_EVENT');
        });
        it('should not show message on super exclusive scope',function(){
            
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
            
            let fruitSelect = fabric.select('fruit[0]');
            let fruitsSelect = fabric.select('fruit');
            
            fruitSelect.on('SCOPED_EVENT',()=>{
                throw 'this should not be called';
            },scopes.superExclusive);
            
            fruitSelect.emit('SCOPED_EVENT');
        });
        
        it('should show message on sub scope',function(done){
            
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
            
            let fruitSelect = fabric.select('fruit[0]');
            let fruitsSelect = fabric.select('fruit');
            
            fruitsSelect.on('SCOPED_EVENT',()=>{
                done();
            },scopes.sub);
            
            fruitSelect.emit('SCOPED_EVENT');
            
        });
        
        it('should not show message on sub scope',function(){
            
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
            
            let fruitSelect = fabric.select('fruit[0]');
            let fruitsSelect = fabric.select('fruit');
            
            fruitSelect.on('SCOPED_EVENT',()=>{
                throw 'this should not be called';
            },scopes.sub);
            
            fruitsSelect.emit('SCOPED_EVENT');
        });
        
        
        it('should not show message on sub exclusive scope',function(){
            
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
            
            let fruitSelect = fabric.select('fruit[0]');
            let fruitsSelect = fabric.select('fruit');
            
            fruitSelect.on('SCOPED_EVENT',()=>{
                throw 'this should not be called';
            },scopes.subExclusive);
            
            fruitSelect.emit('SCOPED_EVENT');
        });
        
        
        it('should show message on root scope',function(done){
            
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
            
            let fruitSelect = fabric.select('fruit[0]');
            let fruitsSelect = fabric.select('fruit');
            
            fruitsSelect.on('SCOPED_EVENT',()=>{
                done();
            },scopes.root);
            
            fabric.select().emit('SCOPED_EVENT');
            
        });
        
        it('should show message on root scope',function(done){
            
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
            
            let fruitSelect = fabric.select('fruit[0]');
            
            fruitSelect.on('SCOPED_EVENT',()=>{
                done();
            },scopes.any);
            
            fabric.select().emit('SCOPED_EVENT');
            
        });

    });
});