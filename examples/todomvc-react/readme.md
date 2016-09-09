# ReckonJS

This example shows how ReckonJS can be used with React in a real application!

# ReckonJS TodoMVC Example

The crux of this example is under [/js](https://github.com/mj1618/reckon-js/tree/master/examples/todomvc-react/js) and view the demo application running [here](https://cdn.rawgit.com/mj1618/reckon-js/master/examples/todomvc-react/index.html#/)

Check out [app.js](https://github.com/mj1618/reckon-js/tree/master/examples/todomvc-react/js/app.js) for the starting point of the application, and the react components are in the '.jsx' files. The bundle.js is the compiled version of the code.

# Build and Run

```
git clone https://github.com/mj1618/reckon-js.git
cd reckon-js/examples/todomvc-react
npm install
npm run build
python -m SimpleHTTPServer # or equivelant web server serving the files in this folder
```
The example will be available at http://localhost:8000/index.html

## Editing the code
If you would like to edit the code you can then run watch:
```
npm run watch
```
And the application will be updated as you change the code.

# TodoMVC

Read about the TodoMVC Project [here](http://todomvc.com/)