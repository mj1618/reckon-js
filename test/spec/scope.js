import assert from 'assert';
import Reckon from '../../src/index';
import Immutable from 'immutable';
import {scopes} from '../../src/index';

describe('Reckon Filter API',function(){
    describe('data',function(){
        
        it('should show message on exact scope',function(done){
            
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
            
            let fruitSelect = reckon.select('fruit[0]');
            
            fruitSelect.on('SCOPED_EVENT',()=>{
                done();
            });
            
            fruitSelect.emit('SCOPED_EVENT');
            
        });
        
        
        it('should not show message on exact scope',function(){
            
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
            
            let fruitSelect = reckon.select('fruit[0]');
            
            fruitSelect.on('SCOPED_EVENT',()=>{
                throw new Error('this should not be called');
            });
            
            reckon.select().emit('SCOPED_EVENT');
        });
        
        
        
        it('should show message on super scope',function(done){
            
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
            
            let fruitSelect = reckon.select('fruit[0]');
            let fruitsSelect = reckon.select('fruit');
            
            fruitSelect.on('SCOPED_EVENT',()=>{
                done();
            },fruitSelect.FILTER_SUPER);
            
            fruitsSelect.emit('SCOPED_EVENT');
            
        });
        
        
        it('should not show message on super scope',function(){
            
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
            
            let fruitSelect = reckon.select('fruit[0]');
            let fruitsSelect = reckon.select('fruit');
            
            fruitsSelect.on('SCOPED_EVENT',()=>{
                throw new Error('this should not be called');
            },fruitsSelect.FILTER_SUPER);
            
            fruitSelect.emit('SCOPED_EVENT');
        });
        it('should not show message on super exclusive scope',function(){
            
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
            
            let fruitSelect = reckon.select('fruit[0]');
            let fruitsSelect = reckon.select('fruit');
            
            fruitSelect.on('SCOPED_EVENT',()=>{
                throw new Error('this should not be called');
            },fruitSelect.FILTER_SUPER_EXCLUSIVE);
            
            fruitSelect.emit('SCOPED_EVENT');
        });
        
        it('should show message on sub scope',function(done){
            
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
            
            let fruitSelect = reckon.select('fruit[0]');
            let fruitsSelect = reckon.select('fruit');
            
            fruitsSelect.on('SCOPED_EVENT',()=>{
                done();
            },fruitsSelect.FILTER_SUB);
            
            fruitSelect.emit('SCOPED_EVENT');
            
        });
        
        it('should not show message on sub scope',function(){
            
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
            
            let fruitSelect = reckon.select('fruit[0]');
            let fruitsSelect = reckon.select('fruit');
            
            fruitSelect.on('SCOPED_EVENT',()=>{
                throw new Error('this should not be called');
            },fruitSelect.FILTER_SUB);
            
            fruitsSelect.emit('SCOPED_EVENT');
        });
        
        
        it('should not show message on sub exclusive scope',function(){
            
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
            
            let fruitSelect = reckon.select('fruit[0]');
            let fruitsSelect = reckon.select('fruit');
            
            fruitSelect.on('SCOPED_EVENT',()=>{
                throw new Error('this should not be called');
            },fruitSelect.FILTER_SUB_EXCLUSIVE);
            
            fruitSelect.emit('SCOPED_EVENT');
        });
        
        
        it('should show message on root scope',function(done){
            
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
            
            let fruitSelect = reckon.select('fruit[0]');
            let fruitsSelect = reckon.select('fruit');
            
            fruitsSelect.on('SCOPED_EVENT',()=>{
                done();
            },fruitsSelect.FILTER_ROOT);
            
            reckon.select().emit('SCOPED_EVENT');
            
        });
        
        it('should show message on root scope',function(done){
            
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
            
            let fruitSelect = reckon.select('fruit[0]');
            
            fruitSelect.on('SCOPED_EVENT',()=>{
                done();
            },fruitSelect.FILTER_ANY);
            
            reckon.select().emit('SCOPED_EVENT');
            
        });

    });
});