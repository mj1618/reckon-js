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
    });
});