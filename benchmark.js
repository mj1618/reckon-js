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



//Baobab#get x 271,057 ops/sec ±2.74% (87 runs sampled)
//Baobab#set x 153,496 ops/sec ±2.60% (91 runs sampled)
//Baobab#unset x 339,614 ops/sec ±5.01% (72 runs sampled)
//Baobab.Cursor#set x 23,104 ops/sec ±2.67% (86 runs sampled)
//Baobab.Cursor#unset x 390,076 ops/sec ±2.88% (89 runs sampled)
//Baobab.Cursor#push x 907 ops/sec ±39.01% (10 runs sampled)
//Baobab.Cursor#unshift x 353 ops/sec ±8.82% (69 runs sampled)
//Baobab.Cursor#splice x 198 ops/sec ±6.49% (70 runs sampled)

//Reckon#select x 320,228 ops/sec ±0.93% (91 runs sampled)
//Reckon#get x 338,584 ops/sec ±0.94% (90 runs sampled)
//Reckon#get2 x 340,872 ops/sec ±0.96% (92 runs sampled)
//Reckon.Root#set x 31,069 ops/sec ±4.10% (82 runs sampled)
//Reckon.cursor#set x 26,116 ops/sec ±3.79% (76 runs sampled)
