/* eslint-env node, mocha */
import assert from 'assert';
import Reckon from '../../src/index';

describe('Reckon View API',function(){
    describe('create',function(){
        
        it('created',function(){
            
            let reckon = new Reckon({
                fruit:'apple'
            });
            
            let view = reckon.addView('fruit_view',data=>data.get('fruit'));
            
            assert(view.get()==='apple');
            
        });
        
        it('check view updates',function(){
            
            let reckon = new Reckon({
                fruit:'apple'
            });
            
            let view = reckon.addView('fruit_view',data=>data.get('fruit'));
            
            reckon.update(()=>{
                return {
                    fruit:'pear'
                };
            });
            
            assert(view.get()==='pear');
            
        });
        
        it('check view onupdate',function(done){
            
            let reckon = new Reckon({
                fruit:'apple'
            });
            
            let view = reckon.addView('fruit_view',data=>data.get('fruit'));
            view.onUpdate(data=>{
                assert(data==='pear');
                done();
            });
            
            reckon.update(()=>{
                return {
                    fruit:'pear'
                };
            });
            
            
        });
        
        it('readme example',function(){
            let reckon = new Reckon({
                fruits:['apple','pear','banana'],
                veges:['carrot','broccoli','celery']
            });

            let fruitCursor = reckon.select('fruits');
            let fruitJoinView = fruitCursor.addView('Fruit join', fruits => fruits.join());
            
            fruitJoinView.onUpdate(newFruitJoin=>{
                /* eslint-disable no-console */
                console.log('New fruit join: '+newFruitJoin);
                /* eslint-enable no-console */
            });

            fruitCursor.on('ADD_A_FRUIT', name => {
                fruitCursor.update(fruitState => fruitState.push(name));
            });

            fruitCursor.emit('ADD_A_FRUIT','mandarin');
            fruitCursor.emit('ADD_A_FRUIT','grape');
        });
    });
});