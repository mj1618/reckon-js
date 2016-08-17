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
import Reckon from 'reckon';

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

The reckon object doubles up as a cursor; you can use it like a cursor on the whole tree. See the next section for how cursors work


### Cursors

Cursors are used to manipulate a particular part of the state.
Let's say we just want to deal with the fruits

```js
let fruitsCursor = reckon.select('fruits');
fruitsCursor.get(); //returns ['apple','pear'] as an ImmutableJS wrapper
```

You can change the data through immutable updates, like this

```js
fruitsCursor.update(currentState => {
    return currentState.push('mandarin').set(1,'banana');
});
fruitsCursor.get(); //returns ['apple','banana','mandarin'] as immutable
```

For the full list of immutable opertions refer to the ImmutableJS Documentation.

#### Reckon Object Cursor

The reckon object doubles up as a cursor on the whole state. For example, these two statements are equivelant

```js
reckon.get()
reckon.select([]).get()
```

In fact you can treat the reckon object as a root cursor in all respects.

### Events

You can fire events on a cursor, and you can listen to events on the cursor.

```js
fruitsCursor.on('ADD_FRUIT_EVENT', (data,fruits) => {
    return fruits.concat(data);
});

fruitsCursor.emit('ADD_FRUIT_EVENT', ['orange','grapefruit']);
```

If your event listener returns anything, it is used to replace the current selectors state.

### Updates

You could use an event listener, and emit an event in order to update your state. But that can get cumbersome. Here's a quicker method that does essentially the same thing

```js
myCursor.update(state=>{
    return state.remove(3).concat([4,5,6]);
});
```

You can also listen for updates on the cursor. This will fire when anything in the cursors state changes, regardless of which cursor made the change:

```js
myCursor.onUpdate( (newState,oldState) => {
    //do some stuff
});
```

Anything you return will be ignored though, so you don't end up with an infinite loop.

### Event Filters

If you add a listener to a selector, by default it listens ONLY to events fired on that selector.
However, what if you want to listen to events up the state tree, or below on the state tree?

```js
let fruitSelect = reckon.select('fruit[0]');
let fruitsSelect = reckon.select('fruit');

fruitSelect.on('SCOPED_EVENT',()=>{
    //this will be called because we passed the SUPER filter
},filterTypes.SUPER);

fruitsSelect.emit('SCOPED_EVENT');
```

The list of filters are:
* CURRENT (default) - must be fired on the same selector, at the same path in the tree
* SUB - anything equal to or below on the state tree
* SUPER - anything equal to or above on the state tree
* ANY - listens to all events
* ROOT - events emitted only on the top of the tree
* SUB_EXCLUSIVE - listens to events strictly below the current selector
* SUPER_EXCLUSIVE - listens to events strictly above the current selector
* AFFECTED - anything where a change to the state in that selector could affect the current selector. i.e. anything above, below or the same as the current selector

## Contributions

Contributions are greatly appreciated, whether you're new to JS or experienced there are tasks available.
Feel free to get in touch.

Issues and feature requests are also welcome [here](https://github.com/mj1618/reckon-js/issues).

## License

MIT
