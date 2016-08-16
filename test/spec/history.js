import assert from 'assert';
import Reckon from '../../src/index';
import Immutable from 'immutable';
import _ from 'lodash';
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
            maxHistory:3
        });
        
        
        assert(reckon.select('fruits[0]').get()==='apple');

        reckon.select('fruits').update(fruits=>{
            return fruits.push('mandarin').remove(0);
        });
        
        assert(reckon.select('fruits[0]').get()==='pear');
        
        reckon.select().update(state=>{
            return state.set("fruits",null);
        });
        
        assert(reckon.select('fruits').get()===null);
        
        reckon.select().update(state=>{
            return {};
        });
        
        assert(reckon.select().get().fruits===undefined);
        
        reckon.undo();
        
        assert(reckon.select('fruits').get()===null);
        
        reckon.undo();
        
        assert(reckon.select('fruits[0]').get()==='pear');
        
        reckon.undo();
        
        assert(reckon.select('fruits[0]').get()==='apple');

    });
});