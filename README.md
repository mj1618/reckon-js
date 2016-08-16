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

// prints:
// New fruit join: apple,pear,banana,mandarin
// New fruit join: apple,pear,banana,mandarin,grape
```

## Installation

Node.js/webpack install stable version
```sh
npm install baobab
```

Dev version
```sh
git+https://github.com/Yomguithereal/baobab.git
```

Download the latest stable version of the script:
```sh
[here](https://raw.githubusercontent.com/mj1618/reckon/master/dist/reckon.min.js)
```


