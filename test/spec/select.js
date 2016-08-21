/* eslint-env node, mocha */
import assert from 'assert';
import _ from 'lodash';
import Reckon from '../../src/index';

describe('Reckon Select API',function(){
    describe('data',function(){
        
        it('should select data',function(){
            
            let reckon = new Reckon({
                fruit:'apple'
            });
            let fruitSelect = reckon.select('fruit');
            
            assert(fruitSelect.get()==='apple','select not returning right data');
            
        });
        
        it('should select data',function(){
            
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
            
            let fruitSelect = reckon.select('fruits[0]');
            
            assert(fruitSelect.get()==='apple','select not returning right data');
            
        });
        
    });
    describe('data updates',function(){ 
        it('should update selected data',function(){
            
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
            
            let fruitSelect = reckon.select('fruits[0]');
            
            fruitSelect.update(()=>{
                return 'banana';
            });
            assert(fruitSelect.get()==='banana','select data did not update');

        });
        
        
        
        it('selector gets',function(){
            
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
            
            let fruitSelect = reckon.select('fruits');
            assert(fruitSelect.get().toJS()[0]==='apple','select get() returned wrong data');
            assert(fruitSelect.get('[0]')==='apple','select get() returned wrong data');
            assert(fruitSelect.getRoot().toJS().fruits[0]==='apple','select get() returned wrong data');
            assert(fruitSelect.getParent().toJS().fruits[0]==='apple','select get() returned wrong data');
            
        });
        
    });
    describe('updates',function(){
        it('should fire update on select object change',function(done){
            
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
            
            let fruitSelect = reckon.select('fruits[0]');
            
            fruitSelect.onUpdate(data=>{
                assert(data==='banana','select data did not fire update event and call listener');
                done();
            });
            
            fruitSelect.update((state)=>{
                assert(state==='apple','wasnt given proper state in fruitSelect');
                return 'banana';
            });
            
        });
        
        
        it('should not fire update on select object same',function(){
            
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
            
            let fruitSelect = reckon.select('fruits[0]');
            
            fruitSelect.onUpdate(data=>{
                throw new Error('Update should not have been called as data has not changed: '+data);
            });
            
            fruitSelect.update((state)=>{
                assert(state==='apple','wasnt given proper state in fruitSelect');
                return 'apple';
            });
        });
        
        it('should not fire update on select object same',function(){
            
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
            
            let fruitSelect = reckon.select('fruits');
            
            fruitSelect.onUpdate(()=>{
                throw new Error('Update should not have been called as data has not changed: '+fruitSelect.get());
            });
            
            fruitSelect.update((state)=>{
                return state;
            });
            
        });
        
        it('should not fire update on select object same',function(){
            
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
            
            let fruitSelect = reckon.select('fruits');
            let rootSelect = reckon;
            
            fruitSelect.onUpdate(data=>{
                throw new Error('Update should not have been called as data has not changed: '+data);
            });
            
            rootSelect.update((state)=>{
                return state.merge({
                    veges:[]
                });
            });
            
        });
        
        
        it('init',function(){
            let reckon = new Reckon({});
            let fruits = reckon.select('fruits');
            fruits.init(['orange','peach']);
            assert(_.isEqual(fruits.get().toJS(),['orange','peach']));
        });
        
        it('should not fire update on select object same',function(){
            
            let reckon = new Reckon({
                fruits: [
                    {name:'apple'},
                    {name:'pear'}
                ],
                veges: [
                    'tomato',
                    'cucumber'
                ]
            });
            
            let fruitsSelect = reckon.select('fruits');
            let fruitSelect = reckon.select('fruits[0]');
            fruitSelect.onUpdate(data=>{
                throw new Error('Update should not have been called as data has not changed: '+data);
            });
            
            fruitsSelect.update((state)=>{
                return state.map(f=>f.name==='pear'?{name:'orange'}:f);
            });
        });
        
        
        it('sub select',function(){
            
            let reckon = new Reckon({
                fruits: [
                    {name:'apple'},
                    {name:'pear'}
                ],
                veges: [
                    'tomato',
                    'cucumber'
                ]
            });
            
            let fruitsSelect = reckon.select('fruits');
            let fruitSelect = fruitsSelect.select('[0].name');
            assert.equal(fruitSelect.get(),'apple');
        });
        
        
        
        
        it('should fire update on root object change',function(done){
            
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
            
            let fruitSelect = reckon.select('fruits[0]');
            let rootSelect = reckon;
            
            fruitSelect.onUpdate((data)=>{
                assert(data==='banana','did not update data correctly');
                done();
            });
            
            rootSelect.update((state)=>{
                assert(state.toJS().fruits[0]==='apple','wasnt given proper state in update()');
                return {
                    fruits: [
                        'banana',
                        'pear'
                    ],
                    veges: [
                        'tomato',
                        'cucumber'
                    ]
                };
            });
            
        });
        
        it('nested updates shouldnt be allowed',function(){
            assert.throws(()=>{
                let reckon = new Reckon({
                    fruit:'apple'
                });

                reckon.update(()=>{
                    reckon.select('fruit').update(()=>{
                        return 'second';
                    });
                    return 'third';
                });
            },Error);
            
        });
        
    });
});