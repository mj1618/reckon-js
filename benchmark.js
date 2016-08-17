var Benchmark = require('benchmark'),
    Reckon = require('./');

var suite = new Benchmark.Suite();

var reckon = new Reckon({
    a:{
        b:{
            c:{
                d: {
                    e: {
                        f:'f'
                    }
                }
            }
        }
    },
    g:'g',
    h:'h',
    i:'i'
});

var reckonArr = new Reckon(['a','b','c','d','e','f','g','h']);

var rootCursor = reckon.select();
var cursor = reckon.select('a.b.c.d.e.f');

suite
  .add('Reckon#select', function() {
    reckon.select();
    reckon.select('a.b.c.d.e.f');
  })
  .add('Reckon#get', function() {
    rootCursor.get('a.b.c.d.e.f');
    cursor.get();
  })
  .add('Reckon.Root#update', function() {
    rootCursor.update(()=>{
        return {
            g:'g2',
            h:'h2',
            i:'i2',
            a:{
                b:{
                    c:{
                        d: {
                            e: {
                                f:'f2'
                            }
                        }
                    }
                }
            }
        };
    });
  })
  .add('Reckon.Root#set', function() {
    rootCursor.update(state=>{
        return state.set('g','g2');
    });
  })
  .add('Reckon.Root#delete', function() {
    rootCursor.update(state=>{
        return state.delete('g');
    });
  })
  .add('ReckonArr.Root#push', function() {
    reckonArr.select().update(state=>{
        return state.push('i');
    });
  })
  .add('Reckon.cursor#set', function() {
    cursor.update(()=>{
        return 'reckon';
    });
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .run();
