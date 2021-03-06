/* eslint-env node, mocha */
import assert from 'assert';
import Reckon from '../../src/index';
describe('History API', function() {

    it('basic history',function(){

        let reckon = new Reckon({
            fruits: [
                'apple',
                'pear'
            ],
            veges: [
                'tomato',
                'cucumber'
            ]
        }, {
            maxHistory:4
        });
        
        
        assert(reckon.select('fruits[0]').get()==='apple');

        reckon.select('fruits').update(fruits=>{
            return fruits.push('mandarin').remove(0);
        });
        
        assert(reckon.select('fruits[0]').get()==='pear');
        
        reckon.update(state=>{
            return state.set('fruits',null);
        });
        
        assert(reckon.select('fruits').get()===null);
        
        reckon.update(()=>{
            return {};
        });
        
        assert(reckon.get().fruits===undefined);
        
        reckon.undo();
        
        assert(reckon.select('fruits').get()===null);
        
        reckon.undo();
        
        assert(reckon.select('fruits[0]').get()==='pear');
        
        reckon.undo();
        
        assert(reckon.select('fruits[0]').get()==='apple');

    });
});