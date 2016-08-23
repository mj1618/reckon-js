import ReactDOM from 'react-dom';
import React from 'react';
import TodoMain from './TodoMain.jsx';
import Reckon from 'reckon-js';
import Director from 'director';

let reckon = new Reckon({
    page:'all',
    todoApp: {
        items:[]
    }
},{
    persist:true,
    maxHistory:1000
});

reckon.loadPersisted();

global.reckon = reckon;

var routes = {
    '/': ()=>{
        reckon.update(state=>{
            return state.set('page','all');
        });
    },
    '/active': ()=>{
        reckon.update(state=>{
            return state.set('page','active');
        });
    },
    '/completed': ()=>{
        reckon.update(state=>{
            return state.set('page','completed');
        });
    },
    
};

(new Director.Router(routes)).init('/');

ReactDOM.render(
  <TodoMain cursor={reckon.select('todoApp')}></TodoMain>,
  document.getElementById('todoapp')
);