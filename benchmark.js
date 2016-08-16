var Benchmark = require('benchmark'),
    Fabric = require('./');

var suite = new Benchmark.Suite();

var fabric = new Fabric({
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


var fabricArr = new Fabric(['a','b','c','d','e','f','g','h']);

var rootCursor = fabric.select();
var cursor = fabric.select('a.b.c.d.e.f');

suite
  .add('Fabric#select', function() {
    fabric.select();
    fabric.select('a.b.c.d.e.f');
  })
  .add('Fabric#get', function() {
    rootCursor.get('a.b.c.d.e.f');
    cursor.get();
  })
  .add('Fabric.Root#update', function() {
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
  .add('Fabric.Root#set', function() {
    rootCursor.update(state=>{
        return state.set('g','g2');
    });
  })
  .add('Fabric.Root#delete', function() {
    rootCursor.update(state=>{
        return state.delete('g');
    });
  })
  .add('FabricArr.Root#push', function() {
    fabricArr.select().update(state=>{
        return state.push('i');
    });
  })
  .add('Fabric.cursor#set', function() {
    cursor.update(()=>{
        return 'fabric';
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

//Fabric#select x 320,228 ops/sec ±0.93% (91 runs sampled)
//Fabric#get x 338,584 ops/sec ±0.94% (90 runs sampled)
//Fabric#get2 x 340,872 ops/sec ±0.96% (92 runs sampled)
//Fabric.Root#set x 31,069 ops/sec ±4.10% (82 runs sampled)
//Fabric.cursor#set x 26,116 ops/sec ±3.79% (76 runs sampled)
