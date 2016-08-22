import React from 'react';
import TodoHeader from './TodoHeader.jsx';
import TodoList from './TodoList.jsx';
import TodoFooter from './TodoFooter.jsx';

export default class TodoMain extends React.Component {
    constructor(props){
        super(props);
        props.cursor.rootSelect().onUpdate(()=>{
            this.forceUpdate();
        });
    }
    
    render() {
        let cursor = this.props.cursor;
        return (
            <section className="todoapp">
                <TodoHeader cursor={cursor}></TodoHeader>
                <TodoList cursor={cursor}></TodoList>
                { cursor.get().get('items').size > 0 ? 
                    <TodoFooter cursor={cursor}></TodoFooter>
                    : null }
            </section>
        );
    }
}