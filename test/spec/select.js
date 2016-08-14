import assert from 'assert';
import Fabric from '../../src/fabric';
import Immutable from 'seamless-immutable';
describe('Fabric Select API',function(){
    describe('data',function(){
        
        it('should select data',function(){
            
            let fabric = new Fabric({
                fruit:'apple'
            });
            let fruitSelect = fabric.select('fruit');
            
            assert(fruitSelect.get()==='apple','select not returning right data');
            
        });
        
        it('should select data',function(){
            
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
            
            let fruitSelect = fabric.select('fruits[0]');
            
            assert(fruitSelect.get()==='apple','select not returning right data');
            
        });
        
    });
    describe('data updates',function(){ 
        it('should update selected data',function(done){
            
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
            
            let fruitSelect = fabric.select('fruits[0]');
            
            fruitSelect.update(()=>{
                return 'banana';
            }).then(()=>{
                assert(fruitSelect.get()==='banana','select data did not update');
                done();
            });
        });
        
        
        
        it('selector gets',function(){
            
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
            
            let fruitSelect = fabric.select('fruits');
            assert(fruitSelect.get()[0]==='apple','select get() returned wrong data');
            assert(fruitSelect.get('[0]')==='apple','select get() returned wrong data');
            assert(fruitSelect.getRoot().fruits[0]==='apple','select get() returned wrong data');
            assert(fruitSelect.getParent().fruits[0]==='apple','select get() returned wrong data');
            
        });
        
    });
    describe('updates',function(){
        it('should fire update on select object change',function(done){
            
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
            
            let fruitSelect = fabric.select('fruits[0]');
            
            fruitSelect.onUpdate(data=>{
                assert(data==='banana','select data did not fire update event and call listener');
                done();
            });
            
            fruitSelect.update(data=>{
                assert(data==='apple','wasnt given proper state in fruitSelect');
                return 'banana';
            });
            
        });
        
        it('should fire update on root object change',function(done){
            
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
            
            let fruitSelect = fabric.select('fruits[0]');
            let rootSelect = fabric.select();
            
            fruitSelect.onUpdate((data)=>{
                assert(data==='banana','did not update data correctly');
                done();
            });
            
            rootSelect.update((state)=>{
                assert(state.fruits[0]==='apple','wasnt given proper state in update()');
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
    });
});