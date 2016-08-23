import React from 'react';

//This footer should hidden by default and shown when there are todos
export default class TodoFooter extends React.Component {
    
    
    clearCompleted(){
        let cursor = this.props.cursor;
        cursor.select('items').update(state=>{
            return state.filter(it=>it.active);
        });
    }
    
    undo(){
        let cursor = this.props.cursor;
        cursor.getReckon().undo();
    }
    
    redo(){
        let cursor = this.props.cursor;
        cursor.getReckon().redo();
    }
    
    render() {
        let cursor = this.props.cursor;
        let root = cursor.rootSelect();
        let nActive = cursor.get('items').filter(it=>it.get('active')).size;
        let nComplete = cursor.get('items').filter(it=>!it.get('active')).size;
        
        return (
            <footer className="footer">
                <span className="todo-count"><strong>{nActive}</strong> item{nActive!==1?'s':''} left</span>
                <ul className="filters">
                    <li>
                        <a 
                            className={root.get('page')==='all'?'selected':''} 
                            href="#/">
                            All
                        </a>
                    </li>
                    <li>
                        <a 
                            className={root.get('page')==='active'?'selected':''} 
                            href="#/active">
                            Active
                        </a>
                    </li>
                    <li>
                        <a 
                            className={root.get('page')==='completed'?'selected':''} 
                            href="#/completed">
                            Completed
                        </a>
                    </li>
                </ul>
                {
                    cursor.getReckon().nUndos()>0 && 
                        <button 
                            style={{marginLeft:'5px'}}
                            onClick={()=>this.undo()} 
                            className="clear-completed">
                            Undo
                        </button>
                }
                
                {
                    cursor.getReckon().nRedos()>0 && 
                        <button 
                            style={{marginLeft:'5px'}}
                            onClick={()=>this.redo()} 
                            className="clear-completed">
                            Redo
                        </button>
                }
                {
                    nComplete>0 && 
                        <button 
                            onClick={()=>this.clearCompleted()} 
                            className="clear-completed">
                            Clear completed
                        </button>
                }
                
            </footer>
        );
    }
}