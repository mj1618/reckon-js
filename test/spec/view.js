import assert from 'assert';
import Fabric from '../../src/index';
import Immutable from 'immutable';
describe('Fabric View API',function(){
    describe('create',function(){
        
        it('created',function(){
            
            let fabric = new Fabric({
                fruit:'apple'
            });
            
            let view = fabric.select().addView('fruit_view',data=>data.get('fruit'));
            
            assert(view.get()==='apple');
            
        });
        
        it('check view updates',function(){
            
            let fabric = new Fabric({
                fruit:'apple'
            });
            
            let view = fabric.select().addView('fruit_view',data=>data.get('fruit'));
            
            fabric.select().update(()=>{
                return {
                    fruit:'pear'
                }
            });
            
            assert(view.get()==='pear');
            
        });
        
        it('check view onupdate',function(done){
            
            let fabric = new Fabric({
                fruit:'apple'
            });
            
            let view = fabric.select().addView('fruit_view',data=>data.get('fruit'));
            view.onUpdate(data=>{
                assert(data==='pear');
                done();
            });
            
            fabric.select().update(()=>{
                return {
                    fruit:'pear'
                }
            });
            
            
        });
        
        it('readme example',function(){
            let fabric = new Fabric({
                fruits:['apple','pear','banana'],
                veges:['carrot','broccoli','celery']
            });

            let fruitCursor = fabric.select('fruits');
            let fruitJoinView = fruitCursor.addView('Fruit join', fruits => fruits.join());
            
            fruitJoinView.onUpdate(newFruitJoin=>{
                console.log("New fruit join: "+newFruitJoin);
            });

            fruitCursor.on('ADD_A_FRUIT', name => {
                fruitCursor.update(fruitState => fruitState.push(name));
            });

            fruitCursor.emit('ADD_A_FRUIT','mandarin');
            fruitCursor.emit('ADD_A_FRUIT','grape');
        });
    });
});