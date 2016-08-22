import React from 'react';
import TodoItem from './TodoItem.jsx';

export default class TodoList extends React.Component {
    
    toggleAll(){
        let cursor = this.props.cursor;
        let someComplete = cursor.get().get('items').toJS().some(it=>it.active===false);
        
        cursor.select('items').update(items=>{
            return items.map(it=>{
                return it.set('active',someComplete);
            });
        });
    }
    
    render() {
        let cursor = this.props.cursor;
        let root = cursor.rootSelect();
        let items = 
            cursor
                .get()
                .get('items')
                .filter(it=>{
                    switch(root.get('page')){
                        case 'active':
                            return it.get('active')===true;
                        case 'completed':
                            return it.get('active')===false;
                        default:
                            return true;
                    }
                });
        let someComplete = cursor.get().get('items').toJS().some(it=>it.active===false);
        
        return (
            <section className="main">
				<input 
                    onChange={()=>{}}
                    onClick={()=>this.toggleAll()} 
                    className="toggle-all" 
                    type="checkbox" 
                    checked={someComplete?'checked':''} 
                    />
				<label htmlFor="toggle-all">Mark all as complete</label>
				<ul className="todo-list">
                    {
                        items.map((it,i) => 
                               <TodoItem 
                                   key={i} 
                                   itemIndex={i} 
                                   cursor={cursor.select(['items',i])} 
                                   item={it} 
                                   /> )
                    }
				</ul>
			</section>
        );
    }
}