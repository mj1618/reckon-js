/* eslint-env node, mocha */
import Reckon,{filterTypes} from '../../src/index';

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
            
            reckon.emit('SCOPED_EVENT');
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
            },filterTypes.SUPER);
            
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
            },filterTypes.SUPER);
            
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
            
            fruitSelect.on('SCOPED_EVENT',()=>{
                throw new Error('this should not be called');
            },filterTypes.SUPER_EXCLUSIVE);
            
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
            },filterTypes.SUB);
            
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
            },filterTypes.SUB);
            
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
            
            fruitSelect.on('SCOPED_EVENT',()=>{
                throw new Error('this should not be called');
            },filterTypes.SUB_EXCLUSIVE);
            
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
            
            let fruitsSelect = reckon.select('fruit');
            
            fruitsSelect.on('SCOPED_EVENT',()=>{
                done();
            },filterTypes.ROOT);
            
            reckon.emit('SCOPED_EVENT');
            
        });
        
        it('should show message on any scope',function(done){
            
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
            },filterTypes.ANY);
            
            reckon.emit('SCOPED_EVENT');
            
        });

    });
});