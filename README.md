# Reckon [![Build Status](https://travis-ci.org/mj1618/reckon.svg)](https://travis-ci.org/mj1618/reckon)


**Reckon** is an event-based, immutable state container for javascript apps. Reckon manages state as [Facebook Immutable](https://facebook.github.io/immutable-js/) objects. Reckon provides cursors, views and scoped events so that a single Reckon instance can be used for all state in an application.

Reckon is influenced by the following projects and programming paradigms and ideas:
* [Baobab](https://github.com/Yomguithereal/baobab)
* [Redux](https://github.com/reactjs/redux)
* [Flux](https://facebook.github.io/flux/)
* [Immutability](https://en.wikipedia.org/wiki/Immutable_object)
* [Immutabile JS](https://facebook.github.io/immutable-js/)
* [Functional Programming](https://en.wikipedia.org/wiki/Functional_programming)

## Example

```js
let reckon = new Reckon({
    fruits:['apple','pear','banana'],
    veges:['carrot','broccoli','celery']
});

let fruitCursor = reckon.select('fruits');
let fruitJoinView = fruitCursor.addView('Fruit join', fruits => fruits.join());

fruitJoinView.onUpdate(newFruitJoin=>{
    console.log("New fruit join: "+newFruitJoin);
});

fruitCursor.on('ADD_A_FRUIT', name => {
    fruitCursor.update(fruitState => fruitState.push(name));
});

fruitCursor.emit('ADD_A_FRUIT','mandarin');
fruitCursor.emit('ADD_A_FRUIT','grape');

// output:
// New fruit join: apple,pear,banana,mandarin
// New fruit join: apple,pear,banana,mandarin,grape
```

## Installation

To install stable version if you are using npm package manager
```sh
npm install reckon-js --save
```

## Documentation

* The Reckon Object
* Cursors
* Events
* Updates
* Views

### The Reckon Object

Create a reckon object with your initial state

```js
let reckon = new Reckon({
    fruits: [
        'apple',
        'pear'
    ],
    veges: [
        'tomato',
        'cucumber'
    ]
});
```

The state is made immutable with [Immutable JS](https://facebook.github.io/immutable-js/).
Get back the state like this

```js
let state = reckon.get();
state.get('fruits').get(0); //returns 'apple'
```

However, most of the time you will use cursors to access/update the state.


### Cursors

Cursors are used to manipulate a particular part of the state.
Let's say we just want to deal with the fruits

```js
let fruitsCursor = reckon.select('fruits');
fruitsCursor.get(); //returns ['apple','pear'] as an ImmutableJS wrapper
```

Updates happen in an immutable fashion, like this

```js
fruitsCursor.update(currentState => {
    return currentState.push('mandarin').set(1,'banana');
});
fruitsCursor.get(); //return ['apple','banana','mandarin'] as immutable
```
For the full list of immutable opertions refer to the ImmutableJS Documentation.

### Events

You can fire events on a cursor, and you can listen to events on the cursor.

```js
fruitsCursor.on('ADD_FRUIT_EVENT', (data) => {
    fruitsCursor.update(fruits=>fruits.concat(data));
});

fruitsCursor.emit('ADD_FRUIT_EVENT', ['orange','grapefruit']);
```

### Updates



## Contributions

Contributions are greatly appreciated, whether you're new to JS or experienced there are tasks that can be done.

Issues and feature requests are also welcome [here](https://github.com/mj1618/reckon-js/issues).

## License

MIT
