import assert from 'assert';
import Fabric from '../../src/index';
import Immutable from 'immutable';
import _ from 'lodash';
describe('History API', function() {

    it('basic history',function(){

        let fabric = new Fabric({
            fruits: [
                'apple',
                'pear'
            ],
            veges: [
                'tomato',
                'cucumber'
            ]
        }, {
            maxHistory:10
        });

        fabric.select('fruits').update(fruits=>{
            return fruits.push('mandarin').remove(0);
        });
        
        fabric.select().update(state=>{
            return state.set("fruits",null);
        });
        
        fabric.select().update(state=>{
            return {};
        });
        
        assert(fabric.select().get().fruits===undefined);
        
        fabric.undo();
        fabric.undo();
        fabric.undo();
        
        assert(fabric.select('fruits[0]').get()==='apple');

    });
});